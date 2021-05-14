import React from 'react';
import { Anchor, Paragraph, T1, T2, T3 } from '../base';

export const CookiePolicyText: React.VFC = () => {
  return (
    <>
      <T1>Cookie Policy</T1>

      <Paragraph>
        We use cookies to help improve your experience of our website at{' '}
        <Anchor href="https://disclave.com">https://disclave.com</Anchor>. This cookie policy is part of
        Disclave&#39;s privacy policy. It covers the use of cookies between your device and our
        site.
      </Paragraph>
      <Paragraph>
        We also provide basic information on third-party services we may use, who may also use
        cookies as part of their service. This policy does not cover their cookies.
      </Paragraph>
      <Paragraph>
        If you don’t wish to accept cookies from us, you should instruct your browser to refuse
        cookies from <Anchor href="https://disclave.com">https://disclave.com</Anchor>. In such a case, we may
        be unable to provide you with some of your desired content and services.
      </Paragraph>

      <T2>What is a cookie?</T2>

      <Paragraph>
        A cookie is a small piece of data that a website stores on your device when you visit. It
        typically contains information about the website itself, a unique identifier that allows the
        site to recognize your web browser when you return, additional data that serves the cookie’s
        purpose, and the lifespan of the cookie itself.
      </Paragraph>
      <Paragraph>
        Cookies are used to enable certain features (e.g. logging in), track site usage (e.g.
        analytics), store your user settings (e.g. time zone, notification preferences), and to
        personalize your content (e.g. advertising, language).
      </Paragraph>
      <Paragraph>
        Cookies set by the website you are visiting are usually referred to as first-party cookies.
        They typically only track your activity on that particular site.
      </Paragraph>
      <Paragraph>
        Cookies set by other sites and companies (i.e. third parties) are called third-party cookies
        They can be used to track you on other websites that use the same third-party service.
      </Paragraph>

      <T2>Types of cookies and how we use them</T2>

      <T3>Essential cookies</T3>

      <Paragraph>
        Essential cookies are crucial to your experience of a website, enabling core features like
        user logins, account management, shopping carts, and payment processing.
      </Paragraph>
      <Paragraph>We use essential cookies to enable certain functions on our website.</Paragraph>

      <T3>Performance cookies</T3>

      <Paragraph>
        Performance cookies track how you use a website during your visit. Typically, this
        information is anonymous and aggregated, with information tracked across all site users.
        They help companies understand visitor usage patterns, identify and diagnose problems or
        errors their users may encounter, and make better strategic decisions in improving their
        audience’s overall website experience. These cookies may be set by the website you’re
        visiting (first-party) or by third-party services. They do not collect personal information
        about you.
      </Paragraph>
      <Paragraph>We use performance cookies on our site.</Paragraph>

      <T3>Functionality cookies</T3>

      <Paragraph>
        Functionality cookies are used to collect information about your device and any settings you
        may configure on the website you’re visiting (like language and time zone settings). With
        this information, websites can provide you with customized, enhanced, or optimized content
        and services. These cookies may be set by the website you’re visiting (first-party) or by
        third-party services.
      </Paragraph>
      <Paragraph>We do not use this type of cookie on our site.</Paragraph>

      <T3>Targeting/advertising cookies</T3>

      <Paragraph>
        Targeting/advertising cookies help determine what promotional content is most relevant and
        appropriate to you and your interests. Websites may use them to deliver targeted advertising
        or limit the number of times you see an advertisement. This helps companies improve the
        effectiveness of their campaigns and the quality of content presented to you. These cookies
        may be set by the website you’re visiting (first-party) or by third-party services.
        Targeting/advertising cookies set by third-parties may be used to track you on other
        websites that use the same third-party service.
      </Paragraph>
      <Paragraph>We do not use this type of cookie on our site.</Paragraph>
    </>
  );
};
