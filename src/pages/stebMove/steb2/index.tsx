import { Layout } from '@layouts/Layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Steb2 = dynamic(() => import('@layouts/Steb/Steb2/Steb2'), {
  ssr: false,
});

export default function Steb2Page() {
  return (
    <>
      <Head>
        <title>충남교통연수원</title>
      </Head>
      <Steb2 />
    </>
  );
}

Steb2Page.Layout = Layout;
