type AppErrorCode = 'SERVER' | 'UNKNOWN' | 'FIREBASE' | 'FROBIDDEN' | 'NOTFOUND' | 'UNAUTHORIZED' | 'BADREQUEST';
export const ApplicationError: Record<AppErrorCode, string> = {
  FIREBASE: '파이어베이스 통신 중 오류가 발생하였습니다.', // 503
  SERVER: '내부 서버에서 오류가 발생하였습니다.', // 500
  UNKNOWN: '알 수 없는 오류입니다.', // unknown
  BADREQUEST: '잘못된 요청입니다.', // 400
  UNAUTHORIZED: '인증되지 않은 사용자입니다.', // 401
  FROBIDDEN: '요청이 거부되었습니다.', // 403
  NOTFOUND: '요청 주소가 존재하지 않습니다.' // 404
};
