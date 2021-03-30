import React from 'react';
import Image from 'next/image';

export const MainSection: React.VFC = () => {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-4">
          <div>
            <div className="mt-24 text-5xl font-bold">Welcome to Disclave.</div>
            <div className="mt-4 text-xl font-semibold">
              Start discussion anywhere on the internet.
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
