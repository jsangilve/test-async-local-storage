import { AsyncLocalStorage } from 'async_hooks';

export const globalStorage = new AsyncLocalStorage<{
  userId: string;
  orgId: string;
}>();
