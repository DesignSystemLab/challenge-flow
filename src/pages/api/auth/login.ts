import { errorMessage } from '@shared/errorMessage';
import { responseEntity } from '@shared/responseEntity';
import { auth } from '@shared/firebase';
import { ApplicationError } from '@shared/constants';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { EamilPasswordField } from '@auth/types';

const loginService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body as EamilPasswordField;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    res.status(200).json(
      responseEntity<User>({
        responseData: user,
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
