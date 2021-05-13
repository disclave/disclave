import { useTranslation } from 'next-i18next';
import React from 'react';
import { Dot } from './Dot';
import { Line } from './Line';
import { Row } from './Row';

export const StoryTimeline: React.VFC = () => {
  const { t } = useTranslation('mobile');

  return (
    <div className="relative my-8 pt-4">
      <Line />

      <Row
        title={t('usage.steps.install.title')}
        text={t('usage.steps.install.text')}
        imgSrc1="/images/mobile/pwa/1 - install suggestion.jpg"
        imgSrc2="/images/mobile/pwa/2 - install menu.jpg"
      />

      <Row
        title={t('usage.steps.use app.title')}
        text={t('usage.steps.use app.text')}
        imgSrc1="/images/mobile/pwa/3 - confirm install.jpg"
        imgSrc2="/images/mobile/pwa/4 - app list.jpg"
        inverted
      />
    </div>
  );
};