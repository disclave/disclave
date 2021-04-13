import React from 'react';
import { Layout } from '@/modules/layout';
import { PluginTile } from '@/modules/plugins';

export const PluginsPage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <h1>Here goes the title</h1>
          <p>Here goes some fancy text</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center my-6">
            <PluginTile name="React plugin" logoSrc="/images/plugins/react-logo.png" />
            <PluginTile name="More coming soon" />
          </div>
          <p>And here will be the info about what to do, if needed plugin is missing</p>
        </div>
      </section>
    </Layout>
  );
};
