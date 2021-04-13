import React from 'react';
import { Layout } from '@/modules/layout';
import { PluginTile } from '@/modules/plugins';
import { reactPluginHref } from '@/consts';
import { DisclaveComments } from '@disclave/react-plugin';

export const PluginsPage: React.VFC = () => {
  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="mx-4">
          <div>
            <h1 className="text-3xl pb-4">Here goes the title</h1>
            <p>Here goes some fancy text</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center my-6">
            <PluginTile
              href={reactPluginHref}
              name="React plugin"
              logoSrc="/images/plugins/react-logo.png"
            />
            <PluginTile name="More coming soon..." />
          </div>
          <div>
            <p>And here will be the info about what to do, if needed plugin is missing</p>
          </div>
          <div>
            <h3 className="text-xl py-4">How does it work</h3>
            <p>Here goes another fancy text about how it looks like on the page</p>
            <div>
              <DisclaveComments />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
