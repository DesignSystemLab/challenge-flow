import { setupWorker } from 'msw';
import { authMockupApi } from '../auth/mocks/authMockupApi';

export const serviceWorker = setupWorker(...authMockupApi);
