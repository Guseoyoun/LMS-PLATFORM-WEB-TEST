import useResponsive from '@hooks/useResponsive';
import { CNCalendar } from '@layouts/Calendar';
import { CalendarMobile } from '@layouts/CalendarMobile';
import { Box, styled } from '@mui/material';
import StebHeader from '../StebHeader/StebHeader';


export default function Steb1() {
  const isDesktop = useResponsive();
  return (
    <Steb1Wrap>
      {isDesktop && <StebHeader value={1} />}
      {isDesktop ? <CNCalendar /> : <CalendarMobile />}
    </Steb1Wrap>
  );
}

const Steb1Wrap = styled(Box)``;
