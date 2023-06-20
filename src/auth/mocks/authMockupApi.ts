import { rest } from 'msw';

type userType = {
  id: string;
  password: string;
};
const USER: userType = { id: 'test01@test.com', password: 'testtest' };

export const authMockupApi = [
  rest.post('/auth/login', async (req, res, ctx) => {
    const { id, password } = (await req.json()) as userType;
    if (USER.id === id && USER.password === password) {
      res(
        ctx.status(200),
        ctx.json({
          success: true,
          message: null,
          responseData: {
            auth: true,
            token: 'd3a88eec'
          }
        })
      );
    }
    res(
      ctx.status(403),
      ctx.json({
        success: false,
        message: null,
        responseData: null
      })
    );
  })
];
