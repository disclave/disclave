import React from 'react';

export interface WebsiteInfoProps {
  website: string;
}

export const WebsiteInfo: React.VFC<WebsiteInfoProps> = (props) => {
  const url = new URL(props.website);

  return (
    <section className="container mx-auto">
      <div>
        <div className="text-lg">
          <span>Website: </span>
          <span className="font-semibold">{url.host}</span>
        </div>
        <div className="text-lg">
          <span>Page: </span>
          <span className="font-semibold">{url.pathname}</span>
        </div>
        <div className="mt-4">
          <a
            href={props.website}
            className="text-primary hover:text-primary-dark hover:underline"
            target="_blank"
            rel="nofollow noopener">
            Visit this page
          </a>
        </div>
      </div>
    </section>
  );
};
