import { setupServer } from 'msw/node';
import { authMockupApi } from '../auth/mocks/authMockupApi';

export const server = setupServer(...authMockupApi);
