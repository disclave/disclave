import React from 'react';
import Image from 'next/image';

export interface PluginTileProps {
  href?: string;
  logoSrc?: string;
  name: string;
}

export const PluginTile: React.VFC<PluginTileProps> = ({ logoSrc, name }) => {
  return (
    <div className="border rounded shadow p-4 w-64 h-64 text-center flex flex-col justify-center">
      <div>{logoSrc ? <Image src={logoSrc} alt={name} width={182} height={182} /> : null}</div>

      <span className="text-lg text-gray-500 font-semibold">{name}</span>
    </div>
  );
};
