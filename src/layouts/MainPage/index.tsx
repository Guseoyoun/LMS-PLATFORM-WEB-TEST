import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { MainDisplayType, useMainDisplay } from '@common/api/mainDisplay';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useRouter } from 'next/router';
import { courseType } from '@common/api/courseClass';
import { logout } from '@common/api';
const LinkList = [
  {
    mainDisplayType: MainDisplayType.EDUCATION_TRANSPORT_WORKER,
    pageType: pageRegType.TYPE_TRANS_EDU,
    displayWord: '운수종사자',
    textColor: '#0A9A4E',
    color: '#0A9A4E',
    lineColor: '#179b52',
    href: '/category',
    imgPath: '/assets/images/hub001.png',
    onClickCard: async () => {
      if (typeof window !== 'undefined' && !localStorage.getItem('site_course_type'))
        return localStorage.setItem('site_course_type', courseType.TYPE_TRANS_WORKER);
      if (
        typeof window !== 'undefined' &&
        localStorage.getItem('site_course_type') === courseType.TYPE_TRANS_WORKER
      )
        return;
      if (localStorage.getItem('site_course_type') !== courseType.TYPE_TRANS_WORKER) {
        if (!!localStorage.getItem('ACCESS_TOKEN')) {
          await logout();
          localStorage.setItem('site_course_type', courseType.TYPE_TRANS_WORKER);
        } else {
        }
      }
      localStorage.setItem('site_course_type', courseType.TYPE_TRANS_WORKER);
    },
  },
  {
    mainDisplayType: MainDisplayType.EDUCATION_GROUND_BUS_DRIVER,
    pageType: pageRegType.TYPE_TRANS_EDU,
    displayWord: '저상버스',
    textColor: '#256AEF',
    color: '#256AEF',
    lineColor: '#2a6fe8',
    href: '/category',
    imgPath: '/assets/images/hub002.png',
    onClickCard: async () => {
      if (typeof window !== 'undefined' && !localStorage.getItem('site_course_type'))
        return localStorage.setItem('site_course_type', courseType.TYPE_LOW_FLOOR_BUS);
      if (
        typeof window !== 'undefined' &&
        localStorage.getItem('site_course_type') === courseType.TYPE_LOW_FLOOR_BUS
      )
        return;
      if (localStorage.getItem('site_course_type') !== courseType.TYPE_LOW_FLOOR_BUS) {
        if (!!localStorage.getItem('ACCESS_TOKEN')) {
          await logout();
          localStorage.setItem('site_course_type', courseType.TYPE_LOW_FLOOR_BUS);
        } else {
        }
      }
      localStorage.setItem('site_course_type', courseType.TYPE_LOW_FLOOR_BUS);
    },
  },
  {
    mainDisplayType: MainDisplayType.EDUCATION_PROVINCIAL_TRAFFIC_SAFETY,
    pageType: pageRegType.TYPE_TRAFFIC_SAFETY_EDU,
    displayWord: '도민교통안전',
    textColor: '#711D14',
    color: '#FEC901',
    lineColor: '#57242b',
    href: 'traffic/category',
    // href: '',
    imgPath: '/assets/images/hub003.png',
    onClickCard: async () => {
      if (typeof window !== 'undefined' && !localStorage.getItem('site_course_type'))
        return localStorage.setItem('site_course_type', courseType.TYPE_PROVINCIAL);
      if (
        typeof window !== 'undefined' &&
        localStorage.getItem('site_course_type') === courseType.TYPE_PROVINCIAL
      )
        return;
      if (localStorage.getItem('site_course_type') !== courseType.TYPE_PROVINCIAL) {
        if (!!localStorage.getItem('ACCESS_TOKEN')) {
          await logout();
        } else {
          return localStorage.setItem('site_course_type', courseType.TYPE_PROVINCIAL);
        }
      }
      localStorage.setItem('site_course_type', courseType.TYPE_PROVINCIAL);
    },
  },
];
const MainPage: NextPage = () => {
  const router = useRouter();
  const { data } = useMainDisplay();
  
  
  if (!data) return <Spinner />;
  return (
    <>
    
    <Head>
      <title>충남교통연수원</title>
    </Head>
    
    <Wrapper>
      <ContentBox>
        <MainInfoBannerBox>
            <LogoBox>
              <Image
                src="/assets/images/cttiLogo.png"
                height={48}
                width={320}
                alt="충남교통연수원 로고"
              />
            </LogoBox>
            <SubTitle>
              <Typography className='word'>충남 교통안전&nbsp;</Typography>
              <Typography className='word accent-word'>온라인교육센터</Typography>
            </SubTitle>
            <InfoBanner>
              <ol>
                <li>
                본 온라인 과정은{' '}
                <span className='accent-word'>차량등록지가 충남 또는 세종시 운수종사자에 해당되는 교육</span>
                으로 타시∙도 차량은 교육을 이수할 수 없습니다.
                </li>
                <li>
                  <span className='accent-word'>운전 중 교육을 진행할 경우{' '}</span>
                  안전을 위해 {' '}
                  <span className='accent-word'>교육이 중단</span>
                  됩니다.
                </li>
                <li>
                  온라인 교육은 네트워크 상태에 따라 데이터 요금이 발생할 수 있습니다.
                  <span className='accent-word'>(Wi-Fi 사용 권장)</span>
                </li>
              </ol>
            </InfoBanner>
          </MainInfoBannerBox>    
            <CardContainer >
              {data.map(item => {
                if (item.status === 1) {
                  const { href,color,textColor,displayWord,imgPath,lineColor,onClickCard } =
                  LinkList.filter(filter => filter.mainDisplayType === item.mainDisplayType)[0];
                  return (
                    <MainCategoryCard bgColor={color}>
                      <Box
                        sx={{
                        cursor: 'pointer',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection:'column'
                        }}
                        onClick={() => {
                          onClickCard();
                          router.push(href);
                        }}
                      >
                        <Box
                          width='100%'
                          overflow="hidden"
                          className="gg"
                        >
                          <Image
                            src={imgPath}
                            width={270}
                            height={184}
                            style={{ aspectRatio: '16 / 9'}}
                            objectFit='scale-down'
                            alt='메인 카드 이미지'
                          />
                        </Box>
                        <CardText>
                          <Box>
                            <Typography
                              component="span"
                              fontWeight="bold"
                              color={textColor}
                              className='category-card-title'
                            >
                              {displayWord}
                            </Typography>
                            <Typography
                              component="span"
                              fontWeight="bold"
                              color="#000"
                              className='category-card-title'
                            >
                              교육
                            </Typography>
                          </Box>
                          <Button color="neutral" sx={{ position: 'relative' }}>
                            <Typography className='category-card-title' fontWeight="bold">바로가기</Typography>
                            <Box
                              className="button-bot-line"
                              borderBottom={`2px solid ${lineColor}`}
                            />
                            <Box
                              className="button-right-line"
                              borderRight={` 2px solid ${lineColor}`}
                            />
                          </Button>
                        </CardText>
                      </Box>
                    </MainCategoryCard>
                  );
                }
              })}
            </CardContainer>
        </ContentBox>
        <FooterContainer>
        <FooterWord>CTTI</FooterWord>
      </FooterContainer>
    </Wrapper>
  </>
  );
};
// Wrap
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  
  margin: 0 auto;
  .MuiButton-root.MuiButton-textNeutral:hover {
    background-color: #fff;
  }
  .MuiButton-root.MuiButton-textNeutral {
    width: 100%;
  }

  .category-card-title {
    font-size: 2rem;
    @media (max-width: 1500px) {
      font-size: 1.5rem;
    }
    @media (max-width: 1080px) {
      font-size: 1.25rem;
    }
    
    @media (max-width: 514px) {
      font-size: 1.5rem;
    }
  }
  
`;
const InfoBanner = styled.div`
  width: 70rem;
  height: 240px;
  background-size: contain;
  background-image: url('assets/images/hub_centerbox.png');
  background-repeat: no-repeat;
  padding: 2rem;
  
  ol {
  margin: 1.25rem auto;
  width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  list-style: disc;
  font-weight: bold;
  line-height: 1.4;
  }
  .accent-word {
    font-weight: bold;
    color: #f41;
  }
  li {
    font-size: 1.25rem;
  }
  @media screen and (max-width: 514px) {
    width: 22rem;
    height: 240px;
    background-image: url('assets/images/hub_mobile_centerbox.png');
    background-size: 100% 100%;
    ol {
    width: 100%;
    margin: 1rem;
    }
    li {
      font-weight: 400;
      width: 90%;
      font-size: 0.75rem;
      line-height: 1.8;
    }
  }
`

const MainInfoBannerBox = styled(Box)`
  width: 90%;
  margin: .25rem auto;
  gap: .5rem;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
`;

const ContentBox = styled(Box)`
  width: 80%;
  margin: 2rem 2rem;
`;
const LogoBox = styled(Box)`
  padding-top: 1rem;
  width: fit-content;
  margin: auto;
`;

const SubTitle = styled(Box)`
  font-size: 18px;
  
  padding: 0.5rem 2.5rem;
  text-align: center;
  width: fit-content;
  margin: auto;
  margin-top: 30px;
  /* color: white; */
  background: #f7f7f7;
  border: 1px solid #236cef;
  border-radius: 24px;
  display: flex;
   .word {
    font-weight: bold;
   }
    .accent-word {
      color: #236cef;
    }
  @media (max-width: 1500px) {
    .word {
    font-weight: bold;
    font-size: 18px;
   }
    
    }
  @media (max-width: 868px) { 
    .word {
    font-weight: bold;
    font-size: 16px;
   }
    }
    @media (max-width: 658px) {
      .word {
    font-weight: bold;
    font-size: 14px;
   }
    }
    @media (max-width: 514px) {
      .word {
    font-weight: bold;
    font-size: 12px;
   }
    }
`;

const CardContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: -8rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 2rem;
  z-index: 10;
  @media (max-width: 500px) {
    
    position: relative;
    flex-direction: column; 
    width: 100%;
    left:0;
    right:0;
    transform: translate(0, 0);
  }
`;

const MainCategoryCard = styled.div<{bgColor: string}>`
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  z-index: 1;
  padding: 2rem 1rem;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
  border-top: ${(props) => (props.bgColor ? `7px solid ${props.bgColor}` : 'black')};
  min-width: 200px;
  @media screen and (max-width: 514px) {
    min-width: 300px;
  }
`;

const CardText = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-top: 2rem;
  .button-bot-line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .button-right-line {
    position: absolute;
    right:4.5%;
    bottom:-8.15%;
    height: 75%;
    transform: rotate(-40deg);
  }
`;
const FooterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: #c53736;
  overflow: hidden;
  
  @media (max-width: 514px) {
      height: 200px;
    }
  
`;
const FooterWord = styled(Box)`
  position:absolute;
  right: 10%;
  bottom: 0%;
  font-size: 15rem;
  font-weight: bold;
  color: #e34546;
  transform: rotate(-15deg);
  @media (max-width: 1500px) {
   font-size: 12rem;
    }
  @media (max-width: 1080px) { 
   font-size: 10rem;
    }
  @media (max-width: 868px) { 
   font-size: 8rem;
    }
    @media (max-width: 658px) {
     font-size: 6rem;
    }
    @media (max-width: 514px) {
     font-size: 5rem;
    }
`;


export default MainPage;
