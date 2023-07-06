import { WritePost } from '@workspace/components/WritePost';
import { CompositionBoundary } from '@shared/boundaries/components/CompositionBoundary';
import { CommonErrorFallback } from '@shared/components/CommonErrorFallback';
import { Loader } from '@shared/components/suspense/Loader';
import { getSession } from 'next-auth/react';
import type { ContextProps, PeriodFormat } from '@workspace/types';
import type { GetServerSideProps } from 'next';

interface Props extends ContextProps {
  period: PeriodFormat;
}

const write = (props: Props) => (
  <CompositionBoundary suspense={<Loader />} error={(prop) => <CommonErrorFallback {...prop} />}>
    <WritePost {...props} />
  </CompositionBoundary>
);

export default write;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { workspaceId, period } = context.query;

  return { props: { userSession: session, workspaceId, period } };
};
