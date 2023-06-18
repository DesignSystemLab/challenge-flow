export interface Response<T> {
  success: boolean;
  message?: string;
  responseData: T;
}
export const responseEntity = <T>(props: Response<T>): Response<T> => {
  const { responseData, success, message = '' } = props;
  return {
    responseData,
    success,
    message
  };
};
