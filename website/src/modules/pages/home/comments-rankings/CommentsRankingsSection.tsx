import React from 'react';
import { useTranslation } from 'next-i18next';

export const CommentsRankingsSection: React.VFC = () => {
  const { t } = useTranslation('home');

  return (
    <section>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-4">
          <div>Top comments</div>
          <div>Latest comments</div>
        </div>
      </div>
    </section>
  );
};
