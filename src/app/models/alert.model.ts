export interface IAlert {
  id: string;
  variant: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
  title?: string;
  message?: string;
  dismissible?: boolean;
}
