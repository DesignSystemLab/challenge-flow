import victoryTheme from '@shared/constants/victoryChartTheme';
import { VictoryBar, VictoryChart } from 'victory';
import { Text, Flex } from '@jdesignlab/react';
import { User } from '@jdesignlab/react-icons';
import { workspaceBarChartWrapper } from '../../styles/workspaceGroupStyle';
import { useQueryWorkspacePosts } from '../../hooks/useQueryWorkspacePosts';
import type { QueryablePost } from '../../types';
import type { UserProfile } from '@auth/types';

interface Props {
  members?: UserProfile[];
  workspaceId: string;
}

export const WorkspaceGroupChart = ({ members, workspaceId }: Props) => {
  const { data } = useQueryWorkspacePosts(workspaceId);
  const generateChartData = (posts?: QueryablePost[]) => {
    if (members && posts) {
      return members.map((member) => ({
        member: member.name ?? member.email,
        posts: posts.filter((post) => post.authorId === member.uid).length
      }));
    }
    return [];
  };

  const chartData = generateChartData(data);

  return (
    <div css={workspaceBarChartWrapper}>
      <Flex direction="column" items="center" justify="center">
        <Flex gap="8px" items="center">
          <User stroke="#333333" width={16} height={16} />
          <Text variant="heading">Posts</Text>
        </Flex>
        <VictoryChart
          domainPadding={{ x: 24, y: 5 }}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 }
          }}
        >
          <VictoryBar
            barRatio={0.2}
            cornerRadius={{ top: 5 }}
            theme={victoryTheme}
            labels={({ datum }) => `${datum.posts}`}
            data={chartData}
            x="member"
            y="posts"
            style={{
              data: {
                fill: '#9BCAFA',
                stroke: ({ index = 1 }) => (+index % 2 === 0 ? '#f48fb1' : '#9BCAFA')
              },
              labels: {
                fontSize: 16
              }
            }}
          />
        </VictoryChart>
      </Flex>
    </div>
  );
};
