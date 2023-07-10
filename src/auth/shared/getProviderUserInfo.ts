import type { User } from 'firebase/auth';

interface ExtendsUser extends User {
  reloadUserInfo?: {
    screenName?: string;
    displayName?: string;
  };
}

type ProviderUser = {
  providerUserName: string;
  providerUserEmail: string;
};

export const getProviderUserInfo = (extendUser: ExtendsUser): ProviderUser => {
  let providerUserName = '';
  let providerUserEmail = '';
  if (extendUser.reloadUserInfo) {
    providerUserName = extendUser.reloadUserInfo.displayName ?? extendUser.reloadUserInfo.screenName ?? '';
    providerUserEmail = extendUser.email ?? '';
  }
  return { providerUserName, providerUserEmail };
};
