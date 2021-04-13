import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

export interface PluginTileProps {
  href?: string;
  logoSrc?: string;
  name: string;
}

export const PluginTile: React.VFC<PluginTileProps> = ({ href, logoSrc, name }) => {
  const boxClassName = classNames(
    'border rounded shadow p-4 w-64 h-64 text-center flex flex-col justify-center',
    {
      'hover:shadow-lg hover:bg-gray-100': href
    }
  );

  const TileBox = () => (
    <div className={boxClassName}>
      <div>{logoSrc ? <Image src={logoSrc} alt={name} width={182} height={182} /> : null}</div>

      <span className="text-lg text-gray-500 font-semibold">{name}</span>
    </div>
  );

  return (
    <>
      {href ? (
        <Link href={href}>
          <a target="_blank" rel="nofollow noopener">
            <TileBox />
          </a>
        </Link>
      ) : (
        <TileBox />
      )}
    </>
  );
};
