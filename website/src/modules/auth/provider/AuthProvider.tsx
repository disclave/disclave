import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { AuthCtx, AuthCtxData } from '@/modules/auth/provider/AuthCtx';
import { Session } from '@disclave/server';

export interface AuthProviderProps {
  iframe: boolean;
  session?: Session | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [session, setSession] = useState<Session | null>(props.session);
  const [nextAuthSession] = useSession();

  useEffect(() => {
    if (!props.iframe) return;

    if (!window) {
      console.error('Window not available. Can not initialize message listener.');
      return;
    }

    const eventListener = (ev: MessageEvent) => {
      if (ev.origin != process.env.DOMAIN) return;

      const data = JSON.parse(ev.data);
      if (data.type != 'SESSION') return;

      const msgSession = data.content?.session;
      setSession(msgSession);
    };

    window.addEventListener('message', eventListener, false);
    return () => {
      window.removeEventListener('message', eventListener);
    };
  }, [props.iframe]);

  useEffect(() => {
    if (props.iframe) return;
    setSession(nextAuthSession as any);
  }, [nextAuthSession]);

  const ctxData: AuthCtxData = {
    iframe: props.iframe,
    session: session
  };

  return <AuthCtx.Provider value={ctxData}>{props.children}</AuthCtx.Provider>;
};
