import { Container } from '@/components/foundation/Container';
import { LoadingState } from '@/components/molecules/LoadingState';

export default function RootLoading() {
  return (
    <Container size="default" className="py-20 flex items-center justify-center">
      <LoadingState variant="skeleton" label="Loading page content..." />
    </Container>
  );
}
