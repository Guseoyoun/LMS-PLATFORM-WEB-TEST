import { BoardType,CategoryBoardInput,removeCategoryBoard } from "@common/api/categoryBoard";
import { YN } from "@common/constant";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Editor as EditorType } from "@toast-ui/react-editor";
import styled from "@emotion/styled";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Box,Button,Chip,FormControl,FormControlLabel,FormHelperText,FormLabel,Radio,RadioGroup,TextField } from "@mui/material";
import { TuiEditor } from "@components/common/TuiEditor";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { css } from "@emotion/css";
import { ErrorMessage } from "@hookform/error-message";
import { FileUploader } from "@components/ui/FileUploader";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import { ProductStatus } from "@common/api/course";
import { useDialog } from "@hooks/useDialog";
import { useSnackbar } from "@hooks/useSnackbar";
import router from "next/router";
import { Spinner } from "@components/ui";

const BoardTypeReg = [
  { type: BoardType.TYPE_NOTICE_PROVINCIAL, ko: "공지사항" },
  { type: BoardType.TYPE_FAQ_PROVINCIAL, ko: "자주묻는질문" },
];

interface Props {
  mode?: "upload" | "modify";
  category?: CategoryBoardInput;
  courseSeq?: number;
  onHandleSubmit: ({
    categoryBoardInput,
    files,
    categorySeq,
    courseSeq,
    setLoading,
  }: {
    categoryBoardInput: CategoryBoardInput;
    files?: File[];
    categorySeq?: number;
    courseSeq?: number;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void;
}

interface FormType extends CategoryBoardInput {
  files: File[];
}

const defaultValues = {
  boardType: BoardType.TYPE_NOTICE_PROVINCIAL,
  noticeYn: YN.YES,
  publicYn: YN.YES,
  status: ProductStatus.APPROVE,
  files: [],
};

export function CategoryTrafficUploadForm({
  mode = "upload",
  category,
  onHandleSubmit,
}: Props) {
  const editorRef = useRef<EditorType>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const dialog = useDialog();
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
    watch,
  } = useForm<FormType>({ defaultValues });

  useEffect(() => {
    if (mode === "modify" && !!category) {
      reset({ ...category });
      setFileName(category.s3Files[0]?.name || null);
    }
  }, [mode, category, reset]);

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
  };

  const handleDeleteFile = async () => {
    resetField("files");
    setFileName(null);
  };

  const onClickRemoveCategoryTraffic = async (seq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: "삭제하기",
        description: "정말로 삭제하시겠습니까?",
        confirmText: "확인",
        cancelText: "취소",
      });
      if (dialogConfirmed) {
        await removeCategoryBoard(seq);
        snackbar({ variant: "success", message: "성공적으로 삭제되었습니다." });
        router.push(`/admin-center/category-traffic`);
      }
    } catch (e) {
      snackbar({ variant: "error", message: e.data.message });
    }
  };

  const onSubmit: SubmitHandler<FormType> = async (
    { files, ...category },
    event
  ) => {
    event?.preventDefault();

    if (!editorRef.current) return;
    const markdownContent = editorRef.current.getInstance().getMarkdown();
    const contentHtml = editorRef.current.getInstance().getHTML();
    const categoryBoardInput = {
      ...category,
      content: markdownContent,
      contentHtml: contentHtml,
    };
    onHandleSubmit({ categoryBoardInput, files, setLoading });
  };

  return (
    <Container>
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={boxStyles}
      >
        <FormControl className={pt20}>
          <FormLabel focused={false}>게시판타입(도민)</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="boardType"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value={"TYPE_NOTICE_PROVINCIAL"}
                  control={<Radio />}
                  label="공지사항"
                />
                <FormControlLabel
                  value={"TYPE_FAQ_PROVINCIAL"}
                  control={<Radio />}
                  label="자주묻는질문"
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        <InputContainer>
          <FormControl className={textField}>
            <TextField
              {...register("subject", {
                required: `${
                  BoardTypeReg.filter(
                    (item) => item.type === watch().boardType
                  )[0].ko
                }  제목을 입력해주세요.`,
              })}
              size="small"
              // label="공지사항 제목"
              label={`${
                BoardTypeReg.filter(
                  (item) => item.type === watch().boardType
                )[0].ko
              } 제목`}
              variant="outlined"
            />
            <ErrorMessage
              errors={errors}
              name="subject"
              as={<FormHelperText error />}
            />
          </FormControl>
        </InputContainer>

        <TuiEditor
          initialValue={(category && category.content) || " "}
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
        />

        <FormLabel sx={{ mt: 2, mb: 1 }}>첨부파일업로드</FormLabel>
        <div className="board-uploader">
          <FileUploader
            register={register}
            regName="files"
            onFileChange={handleFileChange}
          >
            {}
          </FileUploader>
          {fileName ? (
            <Chip
              icon={<OndemandVideoOutlinedIcon />}
              label={fileName}
              onDelete={handleDeleteFile}
              sx={{ pl: "5px", ml: "5px", maxWidth: "700px" }}
            />
          ) : null}
        </div>

        <FormControl className={pt20}>
          <FormLabel focused={false}>공지여부</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="noticeYn"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value={YN.YES}
                  control={<Radio />}
                  label="공지Y"
                />
                <FormControlLabel
                  value={YN.NO}
                  control={<Radio />}
                  label="공지N"
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        <FormControl className={pt20}>
          <FormLabel focused={false}>공개여부</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="publicYn"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value={YN.YES}
                  control={<Radio />}
                  label="공개Y"
                />
                <FormControlLabel
                  value={YN.NO}
                  control={<Radio />}
                  label="공개N"
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        <ButtonBox>
          <SubmitBtn variant='contained' type='submit' disabled={loading}>
            { loading ? <Spinner fit={true} /> : mode === 'upload' ? '업로드하기' : '수정하기' }
          </SubmitBtn>
          {mode !== "upload" &&
            <DeleteBtn
              color="warning"
              variant="contained"
              onClick={() => onClickRemoveCategoryTraffic(category.seq)}
              disabled={loading}
            >
              {loading ? <Spinner fit={true} /> : "삭제"}
            </DeleteBtn>
          }
        </ButtonBox>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 8px;

  .form-control {
    margin: 12px auto 12px 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  .thumbnail-uploader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 36px;

    .subtitle {
      margin-bottom: 8px;
    }
  }
`;

const ButtonBox = styled(Box)`
  margin: 20px 0 20px 0;
`;

const SubmitBtn = styled(Button)`
  width: 15%;
  float: right;
  margin: 0 0 0 5px;
`;

const DeleteBtn = styled(Button)`
  width: 15%;
  float: right;
`;

const textField = css`
  margin-bottom: 20px;
`;

const boxStyles = css`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const pt20 = css`
  margin-bottom: 20px;
`;
