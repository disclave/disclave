import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Button, FormErrorContainer, FormFactory, TextField } from '@disclave/ui';
import { useLoading } from '@disclave/ui';
import { useRouter } from 'next/router';
import { websiteHref } from '@/pages/website/[website]';
import { stringToUrl } from '@disclave/client';

const FormField = {
  url: 'url'
} as const;

interface FormData {
  [FormField.url]: string;
}

export const Form = FormFactory<FormData>();

export const MainSection: React.VFC = () => {
  const { t } = useTranslation('home');
  const [loading, runWithLoading, error] = useLoading(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    await runWithLoading(async () => {
      const url = stringToUrl(data.url);
      const href = websiteHref(data.url);
      await router.push(href);
    });
  };

  return (
    <section className="bg-secondary">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-4">
          <div>
            <div className="lg:mt-32 text-5xl font-bold">{t('main.title')}</div>
            <div className="mt-4 text-xl font-semibold">{t('main.subtitle')}</div>
            <div className="mt-12 mb-12 lg:mt-20 lg:pr-12">
              <Form onSubmit={onSubmit} className="space-y-4">
                <TextField
                  disabled={loading}
                  name={FormField.url}
                  options={{ required: true }}
                  placeholder={t('main.form.url.placeholder')}
                  type="url"
                />
                <FormErrorContainer error={error} />
                <Button type="submit" disabled={loading}>
                  {t('main.form.submit.label')}
                </Button>
              </Form>
            </div>
          </div>
          <div className="justify-self-center">
            <Image src="/images/home/main/hero.svg" alt="" width={630} height={540} quality={100} />
          </div>
        </div>
      </div>
    </section>
  );
};
