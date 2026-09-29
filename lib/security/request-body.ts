/**
 * Bounded JSON body reader for edge route handlers.
 *
 * `Request.json()` buffers the entire body with no ceiling, so a single
 * oversized POST can exhaust the isolate's memory. This reader streams the
 * body, aborts as soon as the byte ceiling is crossed, and only then parses.
 * The limit is enforced on bytes actually received, not on the client-declared
 * `content-length`, because the header is attacker-controlled and may lie.
 */

export const MAX_REQUEST_BODY_BYTES = 256 * 1024;

export type ReadJsonFailure = 'PAYLOAD_TOO_LARGE' | 'INVALID_JSON' | 'EMPTY_BODY';

export type ReadJsonResult =
  | { ok: true; value: unknown }
  | { ok: false; code: ReadJsonFailure; maxBytes?: number };

function concat(chunks: Uint8Array[], total: number): Uint8Array {
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

export async function readJsonBody(
  req: Request,
  maxBytes: number = MAX_REQUEST_BODY_BYTES,
): Promise<ReadJsonResult> {
  // Cheap early rejection. Untrusted, so it can only ever reject — never admit.
  const declared = req.headers.get('content-length');
  if (declared !== null) {
    const declaredBytes = Number(declared);
    if (Number.isFinite(declaredBytes) && declaredBytes > maxBytes) {
      return { ok: false, code: 'PAYLOAD_TOO_LARGE', maxBytes };
    }
  }

  if (!req.body) {
    return { ok: false, code: 'EMPTY_BODY', maxBytes };
  }

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      total += value.byteLength;
      if (total > maxBytes) {
        // Stop pulling. Nothing further from this socket is ever buffered.
        await reader.cancel().catch(() => undefined);
        return { ok: false, code: 'PAYLOAD_TOO_LARGE', maxBytes };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, code: 'INVALID_JSON', maxBytes };
  }

  if (total === 0) {
    return { ok: false, code: 'EMPTY_BODY', maxBytes };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(new TextDecoder().decode(concat(chunks, total)));
  } catch {
    return { ok: false, code: 'INVALID_JSON', maxBytes };
  }

  return { ok: true, value: parsed };
}
