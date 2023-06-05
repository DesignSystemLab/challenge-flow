import { ErrorModal } from '@shared/components/ErrorModal';
import { Loading } from '@shared/components/Icons';
import { ErrorBoundary } from 'react-error-boundary';

const index = () => (
  <div>
    <Loading />
    <ErrorBoundary FallbackComponent={ErrorModal} />
  </div>
);

export default index;
