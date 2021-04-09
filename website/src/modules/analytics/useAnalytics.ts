import { useEffect } from 'react';
import { analytics } from '@disclave/client';
import { useRouter } from 'next/router';

export const useAnalytics = () => {
  const routers = useRouter();

  const logEvent = (url: string) => {
    analytics().setCurrentScreen(url);
    analytics().logEvent('screen_view');
  };

  useEffect(() => {
    routers.events.on('routeChangeComplete', logEvent);
    logEvent(window.location.pathname);

    return () => {
      routers.events.off('routeChangeComplete', logEvent);
    };
  }, []);
};
