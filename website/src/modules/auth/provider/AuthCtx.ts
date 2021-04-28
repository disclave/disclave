import React from 'react';
import { Session } from '@disclave/server';

export interface AuthCtxData {
  iframe: boolean;
  session?: Session | null;
}

export const AuthCtx = React.createContext<AuthCtxData>(undefined);
