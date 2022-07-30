import { Container } from "@mui/material";
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { qnaList } from "@common/api/qna";
import { BoardAccordion } from "@components/ui";
import { useState } from "react";
import { QnaAccordion } from "@components/ui/QnaAccordion.tsx";

export function CategoryBoardLook() {

  const [ page, setPage ] = useState(0);
  const { data, error, mutate } = qnaList({ page });
  

  console.log("1대1문의 data : ", data)
  
  return (

    <Container>
      {data && data?.map((data) => {
        const accordionInfo = [{ 
          date: data.createdDtime, 
          title: data.title, 
          children: [{ firstContent: data.content, secondContent: data.content}] 
        }]
        return <QnaAccordion qnaAccordionList={accordionInfo}/>
      })}
    </Container>

  )

}

const NtContainer = styled(Container)`
  /* box-sizing: border-box;
  border: 1px solid black; */
  width: 100%;
  height: 100%;
`