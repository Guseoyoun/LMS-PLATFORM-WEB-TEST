import React from "react";
import styled from "@emotion/styled";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { CourseModuleFindResponseDto, SurveyResponseDto } from "@common/api/Api";
import LessonContentSurveyQuestion from "./LessonContentSuerveyQuestion";
import ApiClient from "@common/api/ApiClient";
import { useRouter } from "next/router";

export interface Props {
  courseUserSeq: number;
  courseModule: CourseModuleFindResponseDto;
  survey: SurveyResponseDto;
}

export default function LessonContentSurvey(props: Props) {

  const router = useRouter();

  // 스테이트.

  const [loading, setLoading] = React.useState<boolean>(false);
  const [snackbar, setSnackbar] = React.useState<"FAILED" | "SUCCESS" | null>(null);
  const [errors, setErrors] = React.useState<boolean[]>(new Array(props.survey.surveyQuestionList.length).fill(false));

  // 이펙트.

  React.useEffect(() => {

    setLoading(false);
    setSnackbar(null);
    setErrors(new Array(props.survey.surveyQuestionList.length).fill(false));

  }, [props.survey]);

  // 렌더링.

  return (
    <SurveyContainer
      autoComplete="off"
      onSubmit={(e) => {

        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        let hasError = false;
        const errors = props.survey.surveyQuestionList.map((_, i) => {

          const value = formData.get(`question_${i}`);
          const isError = value === null || value === undefined || value === "";
          if (isError) hasError = true;
          return isError;

        });

        if (hasError) {

          setErrors(errors);
          return;
          
        }

        const awnserList = props.survey.surveyQuestionList.map((question, i) => ({
          awnser: formData.get(`question_${i}`),
          surveyQuestionSeq: question.seq,
        }));

        ApiClient.survey
          .participateSurveyUsingPost({
            courseUserSeq: props.courseUserSeq,
            surveySeq: props.survey.seq,
            answerList: awnserList,
          })
          .then((res) => setSnackbar(res.data.success ? "SUCCESS" : "FAILED"))
          .catch(() => setSnackbar("FAILED"))
          .finally(() => setLoading(false));

      }}
    >
      <SurveyHeader>
        <SurveyHeaderTitle>{props.survey.title}</SurveyHeaderTitle>
        <SurveyHeaderCompletedText>{props.courseModule.submitYn === "Y" ? "완료" : "미완료"}</SurveyHeaderCompletedText>
      </SurveyHeader>
      <SurveyContent>
        {props.survey.surveyQuestionList.map((question, index) => (
          <LessonContentSurveyQuestion
            key={index}
            index={index}
            question={question}
            error={errors[index]}
            loading={loading}
          />
        ))}
      </SurveyContent>
      <SurveySubmitButton variant="contained" type="submit">제출하기</SurveySubmitButton>
      <Snackbar
        open={snackbar !== null}
        autoHideDuration={2000}
        onClose={() => snackbar === "SUCCESS" ? router.replace(router.asPath) : setSnackbar(null)}
      >
        <Alert
          severity={snackbar === "SUCCESS" ? "success" : "error"}
          sx={{ width: '100%' }}
          onClose={() => snackbar === "SUCCESS" ? router.replace(router.asPath) : setSnackbar(null)}
        >
          {snackbar === "SUCCESS" ? "전송하였습니다." : "실패하였습니다."}
        </Alert>
      </Snackbar>
    </SurveyContainer>
  );

}

const SurveyContainer = styled.form`
  margin: 0 auto;
  display: flex;
  position: relative;
  width: 100%;
  max-width: 1000px;
  flex-direction: column;
`;

const SurveyHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #AEAEAE;
`;

const SurveyHeaderTitle = styled.span`
  flex-grow: 1;
  font-size: 1.5rem;
  font-weight: 700;
`

const SurveyHeaderCompletedText = styled.span`
  color: #404040;
`

const SurveyContent = styled.div`
  margin-bottom: 2rem;
`;

const SurveySubmitButton = styled(Button)`
  display: block;
`;
