import { formatDateToYYYYMMDD, formatDate } from '@shared/utils/date';
import { createDateRange } from '@shared/utils/createDateRange';
import { Text, Flex, Button } from '@jdesignlab/react';
import { selectorStyle, scheduleListStyle } from '../../styles/sidebarStyle';
import { useQueryWorkspace } from '../../hooks/useQueryWorkspace';

export const ScheduleList = () => {
  const { data } = useQueryWorkspace();
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

  return (
    <ol css={scheduleListStyle} role="listbox">
      {range.map((rangeItem) => {
        const formatDateByYMD = formatDateToYYYYMMDD(rangeItem.date);
        const formatDateByKo = formatDate(rangeItem.date, 'ko');
        const turn = rangeItem.order.toString();
        return (
          <li css={selectorStyle} key={formatDateByYMD}>
            <Button variant="unstyled" onClick={() => {}} type="button">
              <Text variant="heading" color="primary-400">
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
