import { formatDateToYYYYMMDD, formatDate } from '@shared/utils/date';
import { createDateRange } from '@shared/utils/createDateRange';
import { convertToNumeric } from '@shared/utils/string';
import { Text, Flex, Button } from '@jdesignlab/react';
import { useRouter } from 'next/router';
import { workspaceMachineContext } from '../../machines/workspaceMachineContext';
import { selectorStyle, scheduleListStyle } from '../../styles/sidebarStyle';
import { useQueryWorkspace } from '../../hooks/useQueryWorkspace';

export const ScheduleList = () => {
  const { query } = useRouter();
  const { data } = useQueryWorkspace(query.workspaceId as string);
  const [state, send] = workspaceMachineContext.useActor();

  if (!data) {
    return (
      <Flex justify="center" items="center" style={{ height: '100%' }}>
        <Text color="info">🥹 스터디 데이터가 존재하지 않습니다.</Text>
      </Flex>
    );
  }
  const startDate = data.challengeInfo.duration.start;
  const endDate = data.challengeInfo.duration.end;
  const range = createDateRange(startDate, endDate, data.challengeInfo.isDaily);

  const handleChangePeriod = (period: number) => {
    send({ type: 'SELECT_PERIOD', period: `turn${period}` });
  };

  return (
    <ol css={scheduleListStyle} role="listbox">
      {range.map((rangeItem) => {
        const formatDateByYMD = formatDateToYYYYMMDD(rangeItem.date);
        const formatDateByKo = formatDate(rangeItem.date, 'ko');
        const turn = rangeItem.order;
        const current = convertToNumeric(state.context.period) === turn;
        return (
          <li css={selectorStyle} key={formatDateByYMD}>
            <Button
              variant="unstyled"
              onClick={() => {
                handleChangePeriod(turn);
              }}
              type="button"
            >
              <Text variant="heading" color={current ? 'primary-500' : 'blueGrey-base'}>
                {`Lesson ${turn}`}
              </Text>
              <Text variant="label" size="sm" color="blueGrey-base">
                ~{formatDateByKo}
              </Text>
            </Button>
          </li>
        );
      })}
    </ol>
  );
};
