import { EditPost } from '@workspace/components/EditPost';
import { fetchGetPost } from '@workspace/remotes/fetchGetPost';
import { CompositionBoundary } from '@shared/boundaries/components/CompositionBoundary';
import { CommonErrorFallback } from '@shared/components/CommonErrorFallback';
import { Loader } from '@shared/components/suspense/Loader';
import { getSession } from 'next-auth/react';
import type { QueryablePost } from '@workspace/types';
import type { GetServerSideProps } from 'next';

interface Props {
  post: QueryablePost;
}

const edit = (props: Props) => {
  const { post } = props;
  const { title, content, postId } = post;

  return (
    <CompositionBoundary suspense={<Loader />} error={(prop) => <CommonErrorFallback {...prop} />}>
      <EditPost title={title} content={content} postId={postId} />
    </CompositionBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { postId } = context.query;
  if (typeof postId === 'string') {
    const data = await fetchGetPost(postId);
    if (data.authorId !== session?.user.uid) {
      return {
        redirect: {
          destination: '/500',
          permanent: false
        }
      };
    }
    return { props: { post: data } };
  }
  return {
    redirect: {
      destination: '/500',
      permanent: false
    }
  };
};

export default edit;
