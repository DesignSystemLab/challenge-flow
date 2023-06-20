import { server } from './server';
import { serviceWorker } from './browser';

if (typeof window === 'undefined') {
  server.listen();
} else {
  serviceWorker.start();
}

export {};
