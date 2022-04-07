import Head from 'next/head';
import MainPage from '../layouts/MainPage/index';
import { Layout } from '@layouts/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>TITLE</title>
        <meta name="description" content="lms platform service"/>
      </Head>
      <MainPage/>
    </>
  );
}

Home.Layout = Layout;
