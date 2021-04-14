import React from 'react';

export interface ExtensionsSectionProps {
  className?: string;
}

export const ExtensionsSection: React.VFC<ExtensionsSectionProps> = (props) => {
  return <section className={props.className}>Extensions info</section>;
};
