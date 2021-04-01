export const swOnLoadEventListener = async () => {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
  } catch (e) {
    console.error('Service Worker registration failed: ', e);
  }
};
