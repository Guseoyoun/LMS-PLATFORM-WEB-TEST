import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { grey } from '@mui/material/colors';
import { Box, MenuItem } from '@mui/material';
import { Link } from '@components/common';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const showRemoteList = [
  // { href: '/course/[courseSeq]' },
  // { href: '/admin-center' },
  { href: '/category' },
];

const IndicatorBox = ({ index, value }: { index: number; value: number }) => {
  return (
    <Box
      sx={{
        opacity: index !== value && 0,
        height: '4px',
        width: '100%',
        background: 'rgb(194,51,51)',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0px',
          height: '0px',
          borderTop: '16px solid rgb(194,51,51)',
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
        }}
      ></Box>
    </Box>
  );
};

export function NavBarV2() {
  const router = useRouter();
  const [isShowRemote, setIsShowRemote] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showIndicatorValue, setShowIndicatorValue] = useState(null);
  // const menuRef = useRef(anchorEl); // current에 안담겨
  // // let open = true;
  const open = Boolean(anchorEl); // let -> const

  const handleHover = (e: React.MouseEvent<HTMLDivElement>, showValue: number) => {
    setAnchorEl(e.currentTarget);
    setShowIndicatorValue(showValue);
  };
  // const handleOut = (e: React.MouseEvent<HTMLDivElement>) => {
  const handleOut = () => {
    setAnchorEl(null);
    setShowIndicatorValue(null);
  };

  useEffect(() => {
    const show = showRemoteList.some(e => router.route.includes(e.href));
    setIsShowRemote(show);
  }, [router]);

  return (
    <ContentContainer>
      <HeaderBackground
        className={`dropdown-back  ${open ? '' : 'hidden'}`}
        // onMouseOver={(e)=>handleHover(e)}
        // onMouseOut={handleOut}
      ></HeaderBackground>
      <NavContainer>
        <HeaderTitleWrap>
          {TransHeaderList.map((item, index) => (
            <HeaderItem
              key={item.category}
              className={'dropdown-box-wrap'}
              onMouseOver={e => handleHover(e, index)}
              onMouseOut={handleOut}
            >
              <Link href={item.href} color={grey[900]}>
                <Box className="header-title">{item.category}</Box>
              </Link>
              <IndicatorBox index={index} value={showIndicatorValue} />
              <Box className={`dropdown-box ${open ? '' : 'hidden'}`}>
                <Box className="link-wrap">
                  {item.items.map(menuItem => {
                    if (menuItem.href === '/me') return;
                    return (
                      <Link
                        className="link-items"
                        href={menuItem.href}
                        key={menuItem.title}
                      >
                        <MenuItem className="link-item">{menuItem.title}</MenuItem>
                      </Link>
                    );
                  })}
                </Box>
              </Box>
            </HeaderItem>
          ))}
        </HeaderTitleWrap>
      </NavContainer>
      
    </ContentContainer>
  );
}

const ContentContainer = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  color: black;
  flex-basis: 850px;
  color: black;
  /* padding-bottom: 12px; */
  padding: 0 10px;

  .bold-600 {
    font-weight: 600;
  }

  .dropdown-back {
    position: absolute;
    background: white;
    width: 100%;
    top: 78px;
    /* box-shadow: 2px 10px 12px 1px rgba(0, 0, 0, 0.1); */
    left: 0;
    min-height: 200px;
    /* border-radius: 0 0 4px 4px; */
    transition: min-height 0.2s ease-in-out;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid rgb(194, 51, 51);
  }
  .hidden {
    /* display: none; */
    min-height: 0;
  }
`;

const NavContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    height: 100%;
  }

  .link-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
    /* height: 200px; */
  }
  .link-items {
    display: flex;
    flex-grow: 1;
    align-items: center;
    color: black;
  }
  .link-item {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  li {
    width: 100px;
  }
  a {
    &:first-of-type {
      margin-left: 0;
    }
  }

  .dropdown-box-wrap {
    position: relative;

    .dropdown-box {
      border-left: 1px solid #e1e1e1;
    }
    :last-child {
      .dropdown-box {
        border-right: 1px solid #e1e1e1;
      }
    }
  }
  .dropdown-box {
    position: relative;
    margin-top: 16px;
    height: 160px;
    transition: height 0.2s ease-in-out;
    overflow: hidden;
  }
  .hidden {
    height: 0;
  }
`;
const HeaderTitleWrap = styled(Box)`
  display: flex;
  height: 100%;
  width: calc(100% - 160px);
  margin: auto;
`;

const HeaderBackground = styled(Box)``;
const HeaderItem = styled(Box)`
  width: 100px;
  flex-grow: 1;
`;
const RemoteWrap = styled(Box)`
  position: absolute;
  right: 120px;
  width: 120px;
  top: 470px;
  /* box-shadow: 0 0 0.5rem 2px #999797; */

  .remote-box {
    border: 2px solid #999797;
    border-radius: 0.25rem;
  }
  .remote-circle-box {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }
  .remote-circle {
    display: flex;
    justify-content: center;
    width: 40px;
    height: 40px;
    overflow: hidden;
    padding: 0;
    border: 2px solid #999797;
    border-radius: 20px;
  }
`;

export const TransHeaderList = [
  {
    category: '온라인교육',
    href: '/stebMove/steb1',
    items: [
      { title: '교육일정', href: '/stebMove/steb1' },
      { title: '교육예약', href: '/stebMove/steb1' },
    ],
  },
  {
    category: '마이페이지',
    href: '/me',
    items: [
      { title: '내 정보', href: '/me' },
      // { title: '정보수정', href: '/me/edit' },
      { title: '학습현황', href: '/me/my-course?tab=ing' },
      { title: '증명서발급', href: '/me/certificate' },
      { title: '온라인 학습 신청내역', href: '/me/enroll-history' },
    ],
  },
  {
    category: '고객센터',
    href: '/service',
    items: [
      { title: '공지사항', href: '/service?tab=Notice' },
      { title: '자주묻는질문', href: '/service?tab=Faq' },
      { title: '교육문의', href: '/service?tab=Question' },
      { title: '문의내역조회', href: '/service?tab=Look' },
    ],
  },
];
