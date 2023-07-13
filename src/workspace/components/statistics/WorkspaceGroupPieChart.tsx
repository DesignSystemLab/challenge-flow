import victoryTheme from '@shared/constants/victoryChartTheme';
import { VictoryPie } from 'victory';
import { Text, Flex } from '@jdesignlab/react';
import { Code } from '@jdesignlab/react-icons';
import { workspaceBarChartWrapper } from '../../styles/workspaceGroupStyle';
import { useQueryWorkspacePosts } from '../../hooks/useQueryWorkspacePosts';
import type { QueryablePost } from '../../types';
import type { UserProfile } from '@auth/types';

interface Props {
  members?: UserProfile[];
  workspaceId: string;
}

export const WorkspaceGroupPieChart = ({ members, workspaceId }: Props) => {
  const { data } = useQueryWorkspacePosts(workspaceId);
  const generateChartData = (posts?: QueryablePost[]) => {
    if (members && posts) {
      return members.map((member) => {
        const writeWordLength = posts.reduce((acc, post) => {
          if (post.authorId === member.uid) {
            // eslint-disable-next-line no-return-assign, no-param-reassign
            return (acc += post.content.length);
          }
          return acc;
        }, 0);

        return {
          x: member.name ?? member.email,
          y: writeWordLength
        };
      });
    }
    return [];
  };

  const chartData = generateChartData(data);

  return (
    <div css={workspaceBarChartWrapper}>
      <Flex direction="column" items="center" justify="center">
        <Flex gap="8px" items="center">
          <Code stroke="#333333" width={16} height={16} />
          <Text variant="heading">Word</Text>
        </Flex>
        <VictoryPie
          height={320}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 }
          }}
          innerRadius={70}
          labels={({ datum }) => `${datum.y}\n${datum.x}`}
          theme={victoryTheme}
          data={chartData}
        />
      </Flex>
    </div>
  );
};
