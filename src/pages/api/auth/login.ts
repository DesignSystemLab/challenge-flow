import { errorMessage } from '@shared/errorMessage';
import { responseEntity } from '@shared/responseEntity';
import { auth } from '@shared/firebase';
import { ApplicationError } from '@shared/constants';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { UserSession, EamilPasswordField } from '@auth/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const loginService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body as EamilPasswordField;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const token = await user.getIdToken();
    res.status(200).json(
      responseEntity<UserSession>({
        responseData: {
          user,
          token
        },
        success: true
      })
    );
  } catch (error) {
    res.status(400).json(
      responseEntity<null>({
        responseData: null,
        success: false,
        message: errorMessage(error) ?? ApplicationError.SERVER
      })
    );
  }
};

export default loginService;
