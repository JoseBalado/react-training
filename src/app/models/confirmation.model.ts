import * as React from 'react';

export enum IConfirmationType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE'
}

export interface IConfirmation {
  id: string;
  title: React.ReactNode;
  body: React.ReactNode;
  action?: string;
  type: IConfirmationType;
  data?: any;
  submitLabel?: string;
}
