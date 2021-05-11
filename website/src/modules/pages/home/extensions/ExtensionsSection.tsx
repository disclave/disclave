import React from 'react';
import { Button } from '@disclave/ui';
import { extensionsHref } from '@/pages/extensions';

export interface ExtensionsSectionProps {
  className?: string;
}

export const ExtensionsSection: React.VFC<ExtensionsSectionProps> = (props) => {
  return (
    <section className={props.className}>
      <h2 className="text-3xl font-semibold">Comment without leaving website</h2>
      <p className="py-8">
        Comment any website on the Internet, directly from your browser, without leaving it. Easily read others opinions and let them know, what do you think.
      </p>
      <Button href={extensionsHref()} outlined>
        Install extension
      </Button>
      <div className="pt-8">
        <img src="/images/home/extensions/1.svg" alt="" width={1061} height={531} />
      </div>
    </section>
  );
};
