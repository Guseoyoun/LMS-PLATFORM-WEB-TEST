import {
  detailHomework,
  HomeworkInput,
  HomeworkStatus,
  modifyHomework,
  uploadHomework,
} from '@common/api/homework';
import { ErrorMessage } from '@hookform/error-message';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { css } from '@emotion/css';
import { Modal } from '@components/ui';

const defaultValues = {
  status: HomeworkStatus.APPROVE,
};

export function HomeworkModal({
  open,
  handleClose,
  seq,
  contentSeq,
  mode = 'upload',
}: {
  open: boolean;
  handleClose: (isSubmit: boolean) => void;
  seq: number | null;
  contentSeq: number;
  mode: 'modify' | 'upload';
}) {
  const input: HTMLInputElement | null = document.querySelector('#input-file');
  const snackbar = useSnackbar();
  const { detailData, detailError } = detailHomework(Number(seq));
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loading = open && mode === 'modify' && !detailData;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<HomeworkInput>({ defaultValues });

  // Mode useEffect
  useEffect(() => {
    if (open) {
      reset(mode === 'modify' && !!detailData ? { ...detailData } : { ...defaultValues });
    }
  }, [mode, detailData, open, fileInputRef, reset]);

  // File Upload
  const uploadFile = (e: ChangeEvent) => {
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
  };

  // Submit
  const onSubmit: SubmitHandler<HomeworkInput> = async detailData => {
    const s3Files = detailData?.s3Files?.length ? detailData.s3Files : [];
    const inputParams = { ...detailData, contentSeq: contentSeq, s3Files };
    setSubmitLoading(true);
    const files = fileInputRef.current?.files;
    const file = !!files?.length ? files[0] : new Blob([]);
    const fileName = !!files?.length ? files[0].name : undefined;
    const formData = new FormData();
    formData.append('files', file, fileName);
    formData.append(
      'data',
      new Blob([JSON.stringify(inputParams)], { type: 'application/json' })
    );

    if (fileName !== undefined) {
      try {
        if (mode === 'upload') {
          await uploadHomework(formData);
          setSubmitLoading(false);
          snackbar({ variant: 'success', message: '업로드 되었습니다.' });
        } else {
          if (seq) {
            await modifyHomework(seq, formData);
            setSubmitLoading(false);
            snackbar({ variant: 'success', message: '수정 되었습니다.' });
          }
        }
      } catch (e: any) {
        setSubmitLoading(false);
        snackbar(e.message || e.data?.message);
      }
      handleClose(true);
    }
    // else {
    //   alert('과제를 첨부해주십시오.');
    //   setSubmitLoading(false);
    // }
  };

  if (open && detailError) return <div>error</div>;

  return (
    <Modal
      action="저장"
      title="과제 등록"
      maxWidth="sm"
      fullWidth
      loading={loading}
      open={open}
      onCloseModal={() => handleClose(false)}
      actionLoading={submitLoading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box component="form">
        <FormContainer>
          <FormControl className="form-control">
            <TextField
              {...register('subject', { required: '제목을 입력해주세요.' })}
              size="small"
              label="과제명"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="subject" as={<FormHelperText error />} />
          </FormControl>

          <FormControl className="form-control">
            <Typography variant="subtitle2" className="subtitle">
              파일 업로드
            </Typography>
            <label htmlFor="input-file">
              <input
                style={{ display: 'none' }}
                id="input-file"
                type="file"
                multiple={true}
                ref={fileInputRef}
                onChange={uploadFile}
              />
              <Button
                color="neutral"
                variant="outlined"
                startIcon={<UploadOutlinedIcon htmlColor={grey[700]} />}
                onClick={() => fileInputRef.current!.click()}
              >
                파일 선택
              </Button>
            </label>
            {!!fileInputRef.current?.files?.length && (
              <Chip
                className={chipStyles}
                icon={<ImageOutlinedIcon />}
                label={fileName}
                onDelete={() => {
                  if (input) {
                    input.value = '';
                    setFileName(null);
                  }
                }}
              />
            )}
          </FormControl>

          <FormControl className="form-control">
            <FormLabel focused={false}>상태</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="status"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={HomeworkStatus.APPROVE}
                    control={<Radio />}
                    label="정상"
                  />
                  <FormControlLabel
                    value={HomeworkStatus.REJECT}
                    control={<Radio />}
                    label="중지"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </FormContainer>
      </Box>
    </Modal>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .form-control {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 30px;
    }

    .text-area {
      width: 100%;
      min-height: 120px;
    }

    .obj-type {
      width: 100%;
      display: flex;
      flex-direction: row;

      .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        > :not(:last-child) {
          margin-bottom: 12px;
        }

        &.text-field {
          width: 100%;

          > * {
            height: 100%;
          }
        }
      }
    }
  }
`;

const chipStyles = css`
  margin-top: 8px;
`;
