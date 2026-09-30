'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Server, Lock, Cpu, ShieldCheck, Zap } from 'lucide-react';

interface TopologyNode {
  id: string;
  label: string;
  category: 'Ingress' | 'Core GPU Engine' | 'Security & Isolation' | 'Storage & Index';
  description: string;
  specs: string;
  status: 'ONLINE' | 'ACTIVE';
}

const NODES: TopologyNode[] = [
  {
    id: 'node-vpc',
    label: 'Isolated Customer VPC',
    category: 'Security & Isolation',
    description:
      'Zero external network egress. All data stays strictly confined to your private cloud perimeter.',
    specs: 'AWS / GCP / Azure PrivateLink or On-Prem Bare Metal',
    status: 'ACTIVE',
  },
  {
    id: 'node-vllm',
    label: 'Dedicated vLLM Cluster',
    category: 'Core GPU Engine',
    description:
      'High-throughput FP8/AWQ quantized inference instances tuned with custom LoRA adapters.',
    specs: 'NVIDIA H100 / A100 / L40S Tensor Cores · Sized To Your Load',
    status: 'ACTIVE',
  },
  {
    id: 'node-mcp',
    label: 'Autonomous MCP Servers',
    category: 'Ingress',
    description:
      'Model Context Protocol endpoints connecting ERPs, ATS systems, databases, and agent clients.',
    specs: 'Strict Zod schema validation & Idempotent dispatch',
    status: 'ONLINE',
  },
  {
    id: 'node-milvus',
    label: 'Private Vector Store (Qdrant/Milvus)',
    category: 'Storage & Index',
    description: 'Encrypted semantic vector index with zero-retention ephemeral embeddings.',
    specs: 'HNSW Indexing Tuned For Recall',
    status: 'ONLINE',
  },
];

export function EnterpriseTopologyViewer({ className }: { className?: string }) {
  const [selectedNode, setSelectedNode] = useState<TopologyNode>(NODES[1] as TopologyNode);

  return (
    <div
      className={cn(
        'rounded-2xl border border-border-strong bg-surface-panel p-6 sm:p-8 space-y-6 text-left shadow-md',
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sage-100/70 border border-accent-secondary/20 text-accent-secondary text-xs font-mono font-semibold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero-Egress Private Cloud Topology</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-display font-normal text-text-primary">
            Enterprise Architecture &amp; Hardware Isolation
          </h4>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
          <span>VPC Air-Gap Active</span>
        </div>
      </div>

      {/* Interactive Topology Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NODES.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNode(node)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all cursor-pointer relative',
                isSelected
                  ? 'bg-surface-panel-elevated border-accent-primary shadow-hover -translate-y-0.5'
                  : 'bg-surface-canvas border-border-subtle hover:border-border-strong',
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-accent-primary font-semibold uppercase tracking-wider">
                  {node.category}
                </span>
                <span className="text-[10px] font-mono text-accent-secondary font-medium bg-sage-100/60 px-1.5 py-0.5 rounded">
                  {node.status}
                </span>
              </div>
              <h5 className="text-sm font-bold text-text-primary leading-snug">{node.label}</h5>
              <p className="text-xs text-text-secondary line-clamp-2 mt-1.5 leading-relaxed">
                {node.description}
              </p>

              {isSelected && (
                <motion.div
                  layoutId="topology-node-selected"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Detail Inspector for Selected Node */}
      <div className="p-5 rounded-xl bg-surface-canvas border border-border-subtle space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-accent-primary" />
            <h5 className="text-sm font-bold text-text-primary font-mono">{selectedNode.label}</h5>
          </div>
          <span className="text-xs font-mono text-text-secondary bg-surface-panel-subtle px-2 py-0.5 rounded border border-border-subtle">
            {selectedNode.specs}
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
          {selectedNode.description}
        </p>
      </div>

      {/* Hardware Posture Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono text-text-secondary">
        <div className="flex items-center gap-2 bg-surface-panel-subtle/70 p-3 rounded-lg border border-border-subtle">
          <ShieldCheck className="w-4 h-4 text-accent-secondary shrink-0" />
          <span>Zero Telemetry Data Retention</span>
        </div>
        <div className="flex items-center gap-2 bg-surface-panel-subtle/70 p-3 rounded-lg border border-border-subtle">
          <Cpu className="w-4 h-4 text-accent-primary shrink-0" />
          <span>Dedicated On-Prem GPUs</span>
        </div>
        <div className="flex items-center gap-2 bg-surface-panel-subtle/70 p-3 rounded-lg border border-border-subtle">
          <Zap className="w-4 h-4 text-accent-primary shrink-0" />
          <span>Data Residency Set Per Contract</span>
        </div>
      </div>
    </div>
  );
}
