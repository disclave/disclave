export const domain = process.env.DOMAIN;

export const disclaveFacebook = 'https://fb.me/disclave';
export const disclaveMessenger = 'https://m.me/disclave';
export const disclaveGithub = 'https://github.com/disclave';
export const disclaveTwitter = 'https://twitter.com/disclave_';
export const disclaveReddit = 'https://reddit.com/u/disclave';

export const reactPluginHref = 'https://www.npmjs.com/package/@disclave/react-plugin';

export const chromeExtensionHref =
  'https://chrome.google.com/webstore/detail/disclave/flpmkapcnkmddagllidpplfimllamjbc';

export const pwaWebsite = 'https://web.dev/progressive-web-apps/';

// TODO: modify to use translations
// TODO: verify openGraph and twitter
export const SEO = {
  title: 'Disclave - discuss any content on the internet',
  description:
    'Disclave is a platform that allows you to comment on any content on the internet. Share your opinion, browse popular websites, share your favorite content, build the community.',
  openGraph: {
    url: 'https://disclave.com/',
    title: 'Disclave - discuss any content on the internet',
    description:
      'Disclave is a platform that allows you to comment on any content on the internet. Share your opinion, browse popular websites, share your favorite content, build the community.',
    images: [
      {
        url: 'https://disclave.com/logo/base_logo_white_3125x1875.png',
        width: 3125,
        height: 1875,
        alt: 'Disclave'
      },
      {
        url: 'https://disclave.com/logo/base_logo_white_1200x720.png',
        width: 1200,
        height: 720,
        alt: 'Disclave'
      },
      {
        url: 'https://disclave.com/logo/base_logo_white_800x480.png',
        width: 800,
        height: 480,
        alt: 'Disclave'
      }
    ]
  },
  twitter: {
    handle: 'disclave_',
    cardType: 'summary_large_image'
  }
};

export const blogPostsImg = {
  widht: 1200,
  height: 630
};
