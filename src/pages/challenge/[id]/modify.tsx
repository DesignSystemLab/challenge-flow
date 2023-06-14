import { ParsedUrlQuery } from 'querystring';
import { CreateChallengeForm } from '@challenge/components/CreateChallengeForm';
import { ChallengeAPI } from '@challenge/remotes';
import { ChallengePostFields } from '@challenge/types';
import { GetServerSideProps } from 'next';

interface QueryInterface extends ParsedUrlQuery {
  id?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as QueryInterface;
  if (id) {
    const postInfo = await ChallengeAPI.getPostDetail(id);
    return { props: { postInfo } };
  }
  return { props: {} };
};

const ModifyPost = ({ postInfo }: { postInfo: ChallengePostFields }) => (
  <div>
    <CreateChallengeForm fillData={postInfo} />
  </div>
);
export default ModifyPost;
