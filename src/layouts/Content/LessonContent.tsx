import React from "react";
import styled from "@emotion/styled";
import { Box, LinearProgress, Typography } from "@mui/material";
import { VideoPlayer } from "@components/common";
import type { LessonDetailClientResponseDto } from "@common/api/Api";
import type { Notice } from "./Lesson.types";
import ApiClient from "@common/api/ApiClient";

interface Props {
  courseUserSeq: number;
  courseProgressSeq: number | null;
  lesson: LessonDetailClientResponseDto | null;
  notice: Notice[];
}

export function LessonContent(props: Props) {

  // 스테이트.

  const [progress, setProgress] = React.useState<number>(0);

  // 레퍼런스.

  const prevCourseUserSeq = React.useRef<number | null>(null);
  const prevCourseProgressSeq = React.useRef<number | null>(null);
  const prevLesson = React.useRef<LessonDetailClientResponseDto | null>(null);

  const apiTimer = React.useRef<number | null>(null);
  const apiSeconds = React.useRef<number>(0);
  const apiVideoSeconds = React.useRef<number>(0);

  const vidoeDurationSeconds = React.useRef<number>(0);
  const videoCurrentSeconds = React.useRef<number>(0);
  const videoPlayedSeconds = React.useRef<number>(0);
  const videoIsSeeking = React.useRef<boolean>(false);
  const videoIsPaused = React.useRef<boolean>(true);
  const videoIsFirst = React.useRef<boolean>(true);

  // 콜백

  const updateProgress = React.useCallback(() => {

    setProgress(vidoeDurationSeconds.current > 0 ? (props.lesson.totalTime + videoPlayedSeconds.current) / vidoeDurationSeconds.current : 1);

  }, [props.lesson.totalTime]);

  // 콜백 - 타이머.

  const stopTimer = React.useCallback(async (mode: "PREV" | "CURRENT" | "RESET") => {

    if (apiTimer.current !== null) {

      window.clearInterval(apiTimer.current);

      if (mode !== "RESET") {

        if (
          (mode === "CURRENT" && (props.lesson === null || props.courseProgressSeq === null)) ||
          (mode === "PREV" && props.courseUserSeq === prevCourseUserSeq.current && props.lesson.seq === prevLesson.current.seq)
        ) return;
  
        const courseUserSeq = mode === "PREV" ? prevCourseUserSeq.current : props.courseUserSeq;
        const courseProgressSeq = mode === "PREV" ? prevCourseProgressSeq.current : props.courseProgressSeq;
        const lessonSeq = mode === "PREV" ? prevLesson.current.seq : props.lesson.seq;
        const currentSecond = videoCurrentSeconds.current;

        await ApiClient.courseLog
          .createCourseModulesUsingPost1({
            courseUserSeq: courseUserSeq,
            lessonSeq: lessonSeq,
            studyTime: apiVideoSeconds.current,
          })
          .then(() => {

            return ApiClient.courseProgress
              .updateCourseProgressUsingPut({
                courseUserSeq: courseUserSeq,
                courseProgressSeq: courseProgressSeq,
                lessonSeq: lessonSeq,
                studyLastTime: currentSecond,
              });
  
          });

      }

    }

    apiTimer.current = null;
    apiSeconds.current = 0;
    apiVideoSeconds.current = 0;

  }, [props.courseProgressSeq, props.courseUserSeq, props.lesson]);

  const startTimer = React.useCallback(() => {

    stopTimer("RESET");

    if (props.lesson === null || props.courseProgressSeq === null) return;

    apiTimer.current = window.setInterval(() => {

      apiSeconds.current++;

      if (apiSeconds.current >= 300) {

        ApiClient.courseLog
          .createCourseModulesUsingPost1({
            courseUserSeq: props.courseUserSeq,
            lessonSeq: props.lesson.seq,
            studyTime: apiVideoSeconds.current,
          });

        apiSeconds.current = 0;
        apiVideoSeconds.current = 0;

      }

    }, 1000);

  }, [props.courseProgressSeq, props.courseUserSeq, props.lesson, stopTimer]);

  // 콜백 - 이벤트.

  const onPause = React.useCallback(() => {

    videoIsPaused.current = true;

  }, []);

  const onPlaying = React.useCallback(() => {

    if (props.lesson === null || props.courseProgressSeq === null) return;

    if (videoIsFirst.current) {

      ApiClient.courseLog
        .createCourseModulesUsingPost1({
          courseUserSeq: props.courseUserSeq,
          lessonSeq: props.lesson.seq,
          studyTime: 0,
        });

      videoIsFirst.current = false;

      startTimer();

    }

    videoIsPaused.current = false;

  }, [props.courseProgressSeq, props.courseUserSeq, props.lesson, startTimer]);

  const onSeeking = React.useCallback(() => {

    videoIsSeeking.current = true;

  }, []);

  const onSeeked = React.useCallback(() => {

    videoIsSeeking.current = false;

  }, []);

  const onTimeChange = React.useCallback((time: number) => {

    if (time === videoCurrentSeconds.current) return;
    if (time !== videoCurrentSeconds.current + 1 || videoIsPaused.current || videoIsSeeking.current) {

      videoCurrentSeconds.current = time;
      return;

    }

    videoCurrentSeconds.current = time;
    videoPlayedSeconds.current++;
    apiVideoSeconds.current++;

    if (videoCurrentSeconds.current === vidoeDurationSeconds.current) stopTimer("CURRENT");

    updateProgress();

  }, [stopTimer, updateProgress]);

  // 이펙트.

  React.useEffect(() => {

    stopTimer("PREV");

    vidoeDurationSeconds.current = props.lesson ? props.lesson.min * 60 + props.lesson.sec : 0;
    videoCurrentSeconds.current = props.lesson ? props.lesson.studyLastTime : 0;
    videoPlayedSeconds.current = 0;
    videoIsSeeking.current = false;
    videoIsPaused.current = true;
    videoIsFirst.current = true;

    prevCourseUserSeq.current = props.courseUserSeq;
    prevCourseProgressSeq.current = props.courseProgressSeq;
    prevLesson.current = props.lesson;
    
    updateProgress();

  }, [props.lesson, props.courseProgressSeq, props.courseUserSeq, stopTimer, updateProgress]);

  // 렌더링.

  return (
    <LessonVideoContainer>
      {props.lesson !== null && props.courseProgressSeq !== null ?
        (
          <React.Fragment>
            <VideoWrapper>
              <VideoPlayer
                playlist={props.lesson.s3Files[0]?.path}
                initialPlayerId="lesson-player"
                initialConfig={{ autostart: false }}
                seconds={props.lesson.studyLastTime}
                onPause={onPause}
                onPlaying={onPlaying}
                onSeeking={onSeeking}
                onSeeked={onSeeked}
                onTimeChange={onTimeChange}
              />
            </VideoWrapper>
            <ContentInfoContainer>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
                {props.lesson.lessonNm}
              </Typography>
              <ContentInfoProgressContainer>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#ff5600">
                    {Math.floor(progress * 100)}% 수강 완료
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress variant="determinate" value={Math.floor(progress * 100)} />
                </Box>
              </ContentInfoProgressContainer>
            </ContentInfoContainer>
          </React.Fragment>
        ) :
        <LessonVideoNotFount>강의가 존재하지 않습니다.</LessonVideoNotFount>
      }
    </LessonVideoContainer>
  );

}

const LessonVideoContainer = styled.div`
  flex: 1;
`;

const LessonVideoNotFount = styled.div`
  display: flex;
  aspect-ratio: 16 / 9;
  align-items : center;
  justify-content: center;
`

const VideoWrapper = styled.div`
  display: flex;
  aspect-ratio: 16 / 9;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const ContentInfoContainer = styled(Box)`
  margin-top: 10px;
`;

const ContentInfoProgressContainer = styled(Box)``;