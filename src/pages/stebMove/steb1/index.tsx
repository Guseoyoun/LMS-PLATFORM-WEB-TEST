import { Layout } from '@layouts/Layout';
import { Steb1 } from '@layouts/Steb';
import { Container } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function Steb1Page() {

  return (
    <Container className={styles.globalContainer}>
      <Head>
        <title>Steb1 Page</title>
      </Head>
      <Steb1 />
    </Container> 
  )
}

Steb1Page.Layout = Layout;