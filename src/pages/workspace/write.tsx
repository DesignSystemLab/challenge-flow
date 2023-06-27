import { WritePost } from '@workspace/components/WritePost';
import { CompositionBoundary } from '@shared/boundaries/components/CompositionBoundary';
import { CommonErrorFallback } from '@shared/components/CommonErrorFallback';
import { Loader } from '@shared/components/suspense/Loader';

const write = () => (
  <CompositionBoundary suspense={<Loader />} error={(prop) => <CommonErrorFallback {...prop} />}>
    <WritePost />
  </CompositionBoundary>
);

export default write;
