import styled from '@emotion/styled';
import {
  Box,
  FormControl,
  Select,
  Typography,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import React, { useState } from 'react';
import {
  userBusinessTypeOne,
  userBusinessTypeTwo,
} from '@layouts/MeEdit/TransWorker/TransWorker';
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { UserTransSaveInputDataType } from '@common/api/courseClass';

interface Props {
  isIndividual: boolean;
  setIsIndividual: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<UserTransSaveInputDataType>;
  watch: UseFormWatch<UserTransSaveInputDataType>;
}

export function CompanyInfo({ register, watch }: Props) {
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [businessSubType, setBusinessSubType] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);

  return (
    <CompanyInfoWrap>
      <Box>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
          <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
          <span>업체정보</span>
        </Typography>
      </Box>
      <Box>
        <Typography mb={1}>운수구분</Typography>
        <FormControl fullWidth>
          <Select labelId="businessType" id="businessType" {...register('businessType')}>
            {userBusinessTypeOne.map(item => (
              <MenuItem key={item.enType} value={item.enType}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mt={2}>
        <Typography mb={1}>업종구분</Typography>
        <FormControl fullWidth>
          <Select
            labelId="businessSubType"
            id="businessSubType"
            {...register('businessSubType')}
          >
            {userBusinessTypeTwo
              .filter(filter => filter.category === watch().businessType)
              .map(item => (
                <MenuItem key={item.enType} value={item.enType}>
                  {item.type}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Typography mt={2} mb={1}>
        회사명
      </Typography>
      <TextField
        placeholder="회사명 또는 차량등록지역"
        {...register('businessName')}
        fullWidth
      />
      <Box display="flex" mt={2}>
        <Box>※</Box>
        <Box display="flex" flexDirection="column" ml={1}>
          <Typography>
            자동차등록증 상의 회사명(상호)를 반드시 국문으로 입력하시기 바랍니다.
          </Typography>
          <ExampleMessege>예시 {'>'} ss물류 → 에스에스물류</ExampleMessege>
        </Box>
      </Box>
      <Box display="flex">
        <Box>※</Box>
        <Box display="flex" flexDirection="column" ml={1}>
          <Typography>회사명이 없을 경우 차량등록지역을 입력해 주십시오.</Typography>
          <ExampleMessege>예시 {'>'} 공주시</ExampleMessege>
        </Box>
      </Box>
      <Typography>예약구분</Typography>
    </CompanyInfoWrap>
  );
}

const CompanyInfoWrap = styled(Box)``;

const ExampleMessege = styled(Typography)`
  color: red;
`;
