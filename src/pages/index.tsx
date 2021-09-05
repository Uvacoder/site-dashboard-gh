/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import * as React from 'react';

import { GetStaticProps } from 'next';
import Seo from '@/components/Seo';
import { getAllFiles } from '@/lib/parser';
import { LikePerDate } from '@/types/content';
import Button from '@/components/buttons/Button';

type IndexPageProps = {
  contentMetas: LikePerDate[];
};

export default function HomePage({ contentMetas }: IndexPageProps) {
  console.log(
    '🚀 ~ file: index.tsx ~ line 16 ~ HomePage ~ contentMetas',
    contentMetas
  );
  const [selectedDate, setSelectedDate] = React.useState(contentMetas[0].date);

  const dates = contentMetas.map((meta) => meta.date);
  const slugs = contentMetas[0].data.map((datum) => datum.slug);
  const selectedMeta = contentMetas.find((meta) => meta.date === selectedDate);

  const selectDate = contentMetas.map((meta) => ({
    date: meta.date,
    ...meta.data.find((datum) => datum.slug === selectedDate),
  }));

  return (
    <>
      <Seo templateTitle='Home' />

      <main>
        <section className=''>
          <div className='py-20 layout'>
            <ul>
              {slugs.map((date) => (
                <Button key={date} onClick={() => setSelectedDate(date)}>
                  {date}
                </Button>
              ))}
            </ul>
            <pre className='overflow-x-auto'>
              {JSON.stringify(selectDate, null, 2)}
            </pre>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const contentMetas = await getAllFiles();

  return {
    props: { contentMetas },
  };
};
