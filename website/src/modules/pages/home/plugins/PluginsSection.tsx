import React from 'react';

export interface PluginsSectionProps {
  className?: string;
}

export const PluginsSection: React.VFC<PluginsSectionProps> = (props) => {
  return <section className={props.className}>Plugins info</section>;
};
