import { responseEntity } from '@shared/responseEntity';
import { auth } from '@shared/firebase';
import { ApplicationError } from '@shared/constants';
import { signOut } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

const logoutService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await signOut(auth);
    res.status(200).json(
      responseEntity<boolean>({
        responseData: true,
        success: true
      })
    );
  } catch (error) {
    res.status(400).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: ApplicationError.SERVER
      })
    );
  }
};

export default logoutService;
