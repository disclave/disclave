import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faFacebookMessenger,
  faGithub,
  faTwitter,
  faReddit
} from '@fortawesome/free-brands-svg-icons';
import styles from './SocialBtn.module.css';

export enum Type {
  FACEBOOK = 'FACEBOOK',
  MESSENGER = 'MESSENGER',
  GITHUB = 'GITHUB',
  TWITTER = 'TWITTER',
  REDDIT = 'REDDIT'
}

export interface SocialBtnProps {
  type: Type;
  href: string;
  title?: string;
  className?: string;
}

export const SocialBtn: React.FC<SocialBtnProps> = (props) => {
  const className = [
    'inline-block rounded',
    'text-center text-white',
    'bg-gray-600 transition-colors',
    'h-9 w-9',
    typeClass(props.type),
    props.className ?? ''
  ].join(' ');

  return (
    <a href={props.href} className={className} target="_blank">
      <FontAwesomeIcon icon={icon(props.type)} title={props.title} className="h-9 w-9" />
    </a>
  );
};

const icon = (type: Type) => {
  switch (type) {
    case Type.FACEBOOK:
      return faFacebookF;
    case Type.MESSENGER:
      return faFacebookMessenger;
    case Type.GITHUB:
      return faGithub;
    case Type.TWITTER:
      return faTwitter;
    case Type.REDDIT:
      return faReddit;
  }
};

const typeClass = (type: Type) => {
  switch (type) {
    case Type.FACEBOOK:
      return styles.linkFacebook;
    case Type.MESSENGER:
      return styles.linkMessenger;
    case Type.GITHUB:
      return styles.linkGithub;
    case Type.TWITTER:
      return styles.linkTwitter;
    case Type.REDDIT:
      return styles.linkReddit;
  }
};
