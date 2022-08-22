import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { headerHeight } from "@styles/variables";
import { LessonTabs } from "@components/ui/Tabs";
import { tabsConfig, TabsConfig } from "./Lesson.types";
import { LessonDetailClientResponseDto } from "@common/api/Api";
import Link from "next/link";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface Props {
  courseUserSeq: number;
  lessonSeq: number;
  lessons: LessonDetailClientResponseDto[];
}

export function LessonSidebar(props: Props) {

  // 스테이트.

  const [tabMenu, setTabMenu] = useState<TabsConfig["value"]>(tabsConfig[0].value);

  // 렌더링.

  return (
    <StickySideBar>
      <TabMenu
        tabsConfig={tabsConfig as unknown as Parameters<typeof TabMenu>[0]["tabsConfig"]}
        showBorderBottom={false}
        rerender={false}
        changeMenu={tabMenu}
        onChangeMenu={(v: unknown) => setTabMenu(Array.isArray(v) ? v[0] : v)}
      />
      <React.Fragment>
        <Tab hidden={tabMenu !== "curriculum"}>
          {props.lessons.map((lesson) => (
            <TabItemWrapper
              key={lesson.seq}
              href={`/course/${props.courseUserSeq}/lesson/${lesson.seq}`}
              color={grey[900]}
            >
              <TabItem className={props.lessonSeq === lesson.seq ? "active" : ""}>
                <Box>
                  <LessonTitle variant="body1">{lesson.lessonNm}</LessonTitle>
                  <LessonInfo>
                    <PlayCircleOutlinedIcon fontSize="small" htmlColor={grey[500]} />
                    <Typography className="typo" variant="body2" color={grey[500]}>
                      {Math.floor(lesson.totalTime / 60)}:{lesson.totalTime % 60}
                    </Typography>
                  </LessonInfo>
                </Box>
                <LessonCheck>
                  {props.lessonSeq === lesson.seq && <PlayCircleIcon sx={{ color: "text.secondary" }} style={{ marginRight: 8 }} />}
                  <CheckCircleIcon sx={{ color: lesson.completedYn === "N" ? "#256aef" : "text.secondary" }} />
                </LessonCheck>
              </TabItem>
            </TabItemWrapper>
          ))}
        </Tab>
      </React.Fragment>
    </StickySideBar>
  );

}

const StickySideBar = styled.aside`
  position: sticky;
  top: ${headerHeight};
  margin-left: 40px;
  width: 520px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 1;
  flex-shrink: 0;
  overflow: hidden;
`;

const TabMenu = styled(LessonTabs)`
  padding-bottom: 30px;
`;

const Tab = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;

  .file-list-item {
    background: #efefef;
    margin: 0 1rem;
    margin-bottom: 1rem;
  }
  
  .file-list-title {
    font-weight: bold;
    margin-bottom: 1rem;
  }
`;

const TabItemWrapper = styled(Link)`
  display: block;
`;

const TabItem = styled.div`
  padding: 12px;
  min-height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`

const LessonTitle = styled(Typography)`
  .active & {
    font-weight: 700;
  }
`;

const LessonInfo = styled.div`
  display: flex;
  align-items: center;
  padding-top: 4px;

  .typo {
    margin-left: 4px;
  }
`;

const LessonCheck = styled(Box)`
  display: flex;
  align-items: center;
`;