import { getDate, formatDateTime } from './../../shared/utils/date';
import { ChallengeFormStates } from '@challenge/types';
import { useEffect, useState } from 'react';

export const useFormChangeHandler = () => {
  const [postValue, setPostValue] = useState<ChallengeFormStates>({
    title: '',
    isDaily: true,
    skill: null,
    content: '',
    memberCapacity: 0,
    duration: {
      start: formatDateTime(getDate()),
      end: formatDateTime(getDate())
    },
    dueAt: formatDateTime(getDate())
  });

  // TODO: radio value boolean type 받도록 변경
  // TODO: Textarea onChange type 변경?
  // TODO: Textarea -> Markdown모듈로 변경
  const valueChangeHandler = (event: any) => {
    let { name, value } = event.target;
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    if (name === 's_duration') {
      setPostValue((prevState) => ({
        ...prevState,
        duration: {
          ...prevState.duration,
          start: value
        }
      }));
    } else if (name === 'e_duration') {
      setPostValue((prevState) => ({
        ...prevState,
        duration: {
          ...prevState.duration,
          end: value
        }
      }));
    } else {
      postValue[name] = value;
      setPostValue({ ...postValue });
    }
  };

  // TODO: select value type number 추가?
  const selectValueChangeHandler = (value: string | null) => {
    postValue['memberCapacity'] = Number(value);
    setPostValue({ ...postValue });
  };

  return { postValue, setPostValue, valueChangeHandler, selectValueChangeHandler };
};
