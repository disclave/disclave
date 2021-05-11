import React from 'react';
import { Button } from '@disclave/ui';
import { pluginsHref } from '@/pages/plugins';

export interface PluginsSectionProps {
  className?: string;
}

export const PluginsSection: React.VFC<PluginsSectionProps> = (props) => {
  return (
    <section className={props.className}>
      <h2 className="text-3xl font-semibold">Comments on your website</h2>
      <p className="py-8">
        Want to display comments and allow your users to interaccted with them, without leaving
        your website? Install Disclave plugin and let users promote your website.
      </p>
      <Button href={pluginsHref()} outlined>
        Use plugins
      </Button>
      <div className="pt-8">
        <img src="/images/home/plugins/1.jpg" alt="" width={600} height={400} />
      </div>
    </section>
  );
};
