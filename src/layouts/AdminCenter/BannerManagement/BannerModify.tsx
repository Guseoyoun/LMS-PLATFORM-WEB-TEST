import { BbsType, uploadFile } from '@common/api/adm/file';
import { BannerRes, createBannerAdm, useBannerListAdm, useSingleBannerAdm } from '@common/api/banner';
import { ContentType } from '@common/api/content';
import { ProductStatus } from '@common/api/course';
import { YN } from '@common/constant';
import { Table } from '@components/ui';
import { FileUploader } from '@components/ui/FileUploader';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import { ko } from 'date-fns/locale';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useRouter } from 'next/router';

interface FormType {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  status: ProductStatus;
  toUrl: string;

  files: File[];
}

const defaultValues = {
  status: ProductStatus.APPROVE,
  files: [],
  startDate: dateFormat(new Date(), 'yyyy-mm-dd'),
  endDate: dateFormat(new Date(), 'yyyy-mm-dd'),
};

export function BannerModify() {
  const snackbar = useSnackbar();
  const router = useRouter();
  const { bannerId } = router.query;
  const [isFileDelete, setIsFileDelete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
    setValue,
    watch,
  } = useForm<FormType>({ defaultValues });
  const { data, error, mutate } = useSingleBannerAdm(Number(bannerId));

  const fileHandler = async (files: File[], bannerSeq: number) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: bannerSeq,
        fileType: BbsType.TYPE_BANNER,
        files,
      });
    }
  };

  useEffect(() => {
    setValue('title', data.title);
    setValue('content', data.content);
    setValue('startDate', data.startDate);
    setValue('endDate', data.endDate);
    setValue('toUrl', data.toUrl);
  }, []);

  const onSubmit: SubmitHandler<FormType> = async ({ files, ...rest }, e) => {
    console.log('onSubmit triggered', files, rest, e);
    return;
    // try {
    //   const { data }: { data: BannerRes } = await createBannerAdm(rest);
    //   await fileHandler(files, data.seq);
    //   snackbar({ variant: 'success', message: '성공적으로 완료되었습니다.' });
    //   console.log(data);
    // } catch (e: any) {
    //   snackbar({ variant: 'error', message: e.data.message });
    // }
  };

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
    setIsFileDelete(false);
  };

  return (
    <BannnerUploadContainer>
      <Box className="form-box" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" fontWeight="bold">
          배너 등록
        </Typography>
        <TextField placeholder="배너 제목" {...register('title', { required: '배너이름을 입력해주세요.' })} />

        <Typography fontWeight="bold">게시 시작날짜</Typography>
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          showPopperArrow={false}
          minDate={new Date()}
          customInput={<TextField InputProps={{ endAdornment: <CalendarMonthIcon /> }} />}
          selected={new Date(watch().startDate)}
          onSelect={() => {}}
          onChange={date => setValue('startDate', date ? dateFormat(date, 'yyyy-mm-dd') : dateFormat(new Date(), 'yyyy-mm-dd'))}
        />
        <Typography fontWeight="bold">게시 종료날짜</Typography>
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          showPopperArrow={false}
          minDate={new Date()}
          customInput={<TextField InputProps={{ endAdornment: <CalendarMonthIcon /> }} />}
          selected={new Date(watch().endDate)}
          onSelect={() => {}}
          // popperPlacement="right"
          onChange={date => setValue('endDate', date ? dateFormat(date, 'yyyy-mm-dd') : dateFormat(new Date(), 'yyyy-mm-dd'))}
        />

        <TextField placeholder="페이지 이동 url" {...register('toUrl', { required: '입력해주세요.' })} />
        <FormControl className="form-control">
          <FormLabel focused={false}>상태</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="status"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value={ProductStatus.APPROVE} control={<Radio />} label="정상" />
                <FormControlLabel value={ProductStatus.REJECT} control={<Radio />} label="중지" />
              </RadioGroup>
            )}
          />
        </FormControl>

        <FileUploader register={register} regName="files" onFileChange={handleFileChange}>
          <FileUploader.Label>파일업로드</FileUploader.Label>
        </FileUploader>

        <Button variant="contained" type="submit">
          업로드
        </Button>
      </Box>
    </BannnerUploadContainer>
  );
}

const BannnerUploadContainer = styled(Box)`
  .form-box {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
