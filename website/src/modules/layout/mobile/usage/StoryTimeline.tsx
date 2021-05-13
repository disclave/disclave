import { useTranslation } from 'next-i18next';
import React from 'react';
import { Dot } from './Dot';
import { Line } from './Line';
import { Row } from './Row';

export const StoryTimeline: React.VFC = () => {
  const { t } = useTranslation('mobile');

  return (
    <div className="relative my-8 py-1">
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

      <Row
        title={t('usage.steps.share.title')}
        text={t('usage.steps.share.text')}
        imgSrc1="/images/mobile/pwa/5 - share menu.jpg"
        imgSrc2="/images/mobile/pwa/6 - share to disclave.jpg"
      />

      <Row
        title={t('usage.steps.result.title')}
        text={t('usage.steps.result.text')}
        imgSrc1="/images/mobile/pwa/7 - view in disclave.jpg"
        imgSrc2="/images/mobile/pwa/8 - quick share.jpg"
        inverted
      />
    </div>
  );
};
