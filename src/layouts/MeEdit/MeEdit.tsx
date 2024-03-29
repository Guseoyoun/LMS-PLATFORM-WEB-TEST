import * as React from 'react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import {  modifyMyUser, useMyUser } from '@common/api/user';
import { useRouter } from 'next/router';
import { useDialog } from '@hooks/useDialog';
import { YN } from '@common/constant';
import { TransWorker } from './TransWorker';
import { BoxProps } from '@material-ui/core';
import { Educator } from './Educator';
import { logout } from '@common/api';
import { courseType } from '@common/api/courseClass';

const tabsConfig = [
  { label: '운수종사자', value: 'TYPE_TRANS_EDU' },
  { label: '도민교통안전교육자', value: 'TYPE_TRAFFIC_SAFETY_EDU' },
];
export const locationList = [
  // { ko: '충남', en: 'CHUNGNAM' },
  { ko: '천안', en: 'CHEONAN' },
  { ko: '공주', en: 'GONGJU' },
  { ko: '보령', en: 'BORYEONG' },
  { ko: '아산', en: 'ASAN' },
  { ko: '서산', en: 'SEOSAN' },
  { ko: '논산', en: 'NONSAN' },
  { ko: '계룡', en: 'GYERYONG' },
  { ko: '당진', en: 'DANGJIN' },
  { ko: '금산', en: 'GEUMSAN' },
  { ko: '부여', en: 'BUYEO' },
  { ko: '서천', en: 'SEOCHEON' },
  { ko: '청양', en: 'CHEONGYANG' },
  { ko: '홍성', en: 'HONGSEONG' },
  { ko: '예산', en: 'YESAN' },
  { ko: '태안', en: 'TAEAN' },
  { ko: '세종', en: 'SEJONG' }
];



export const residenceList = [
  // { ko: '충남', en: 'CHUNGNAM' },
  { ko: '천안', en: 'CHEONAN' },
  { ko: '공주', en: 'GONGJU' },
  { ko: '보령', en: 'BORYEONG' },
  { ko: '아산', en: 'ASAN' },
  { ko: '서산', en: 'SEOSAN' },
  { ko: '논산', en: 'NONSAN' },
  { ko: '계룡', en: 'GYERYONG' },
  { ko: '당진', en: 'DANGJIN' },
  { ko: '금산', en: 'GEUMSAN' },
  { ko: '부여', en: 'BUYEO' },
  { ko: '서천', en: 'SEOCHEON' },
  { ko: '청양', en: 'CHEONGYANG' },
  { ko: '홍성', en: 'HONGSEONG' },
  { ko: '예산', en: 'YESAN' },
  { ko: '태안', en: 'TAEAN' },
  { ko: '세종', en: 'SEJONG' },
  { ko: '서울', en: 'SEOUL' },
  { ko: '부산', en: 'BUSAN' },
  { ko: '대구', en: 'DAEGU' },
  { ko: '인천', en: 'INCHEON' },
  { ko: '광주', en: 'GWANGJU' },
  { ko: '대전', en: 'DAEJEON' },
  { ko: '울산', en: 'ULSAN' },
  { ko: '경기', en: 'GYEONGGI' },
  { ko: '강원', en: 'GANGWON' },
  { ko: '충북', en: 'CHUNGBUK' },
  { ko: '전북', en: 'JEONBUK' },
  { ko: '전남', en: 'JEONNAM' },
  { ko: '경북', en: 'GYEONGBUK' },
  { ko: '경남', en: 'GYEONGNAM' },
  { ko: '제주', en: 'JEJU' },
];

export function MeEdit() {
  const router = useRouter();
  const { user, error } = useMyUser();
  const dialog = useDialog();
  const [nameInput, setNameInput] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [smsChecked, setSmsChecked] = useState(false);

  const [tabValue, setTabValue] = useState<string>();
  const onChangeTabValue = async (newString: string) => {
    if (user?.regCategory !== newString) {
      const confirm = window.confirm(
        '다른 타입의 정보를 수정하시려면 재로그인이 필요합니다. 로그아웃 하시겠습니까?'
      );
      if (confirm) {
        await logout();
        router.push('/category');
      } else {
        return;
      }
    }
    setTabValue(newString);
  };

  useEffect(() => {
    if (user) setTabValue(user.regCategory);
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dialogConfirmed = await dialog({
      title: '회원 정보 수정',
      description: '회원 정보를 수정하시겠습니까?',
      confirmText: '수정하기',
      cancelText: '취소하기',
    });
    await handleOnCloseConfirm(dialogConfirmed);
  };

  const handleOnCloseConfirm = async (isConfirm: boolean) => {
    if (isConfirm) {
      const emailYn = emailChecked ? YN.YES : YN.NO;
      const smsYn = smsChecked ? YN.YES : YN.NO;
      await modifyMyUser({ name: nameInput, emailYn, smsYn });
      return router.push('/me');
    }
  };

  if (!user) return <div></div>; //태그없으면 에러뜸
  return (
    <Box>
      {typeof window !== 'undefined' &&
      localStorage.getItem('site_course_type') === courseType.TYPE_PROVINCIAL ? (
        <Educator locationList={locationList} />
      ) : (
        <TransWorker type="transport" locationList={locationList} />
      )}
    </Box>
  );
}

interface TabPanelProps extends BoxProps {
  children: React.ReactNode;
  value: undefined | string;
  index: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...rest } = props;
  return (
    <Box hidden={value !== index} {...rest}>
      {children}
    </Box>
  );
};
