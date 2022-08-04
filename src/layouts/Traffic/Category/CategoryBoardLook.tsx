import { Box, Container } from "@mui/material";
import styled from '@emotion/styled';
import { QnaAccordion } from "@components/ui/QnaAccordion.tsx";
import dateFormat from "dateformat";
import { useInfiniteScrollQna } from "@hooks/useInfiniteScrollQna";

export function CategoryBoardLook() {

  const [target , loadedItem , loading] = useInfiniteScrollQna(`/qna`)

  return (

    <Container>
      {loadedItem && loadedItem.map((data) => {
        const accordionInfo = [{ 
          title: data.title, 
          answeredYN: data.answeredYn,
          children: [{ 
            firstContent: data.content, 
            secondContent: dateFormat(data.createdDtime, 'isoDate'),
            thirdContent: data.s3Files[0] ? data.s3Files[0].name : "파일없음",
            fourthContent: dateFormat(data.qnaAnswer?.createdDtime, 'isoDate'),
            fifthContent : data.qnaAnswer?.content
          }]
        }]
        return <QnaAccordion qnaAccordionList={accordionInfo}/>
      })}
      <Box ref={target} height='100px' >{loading ? <div /> : ""}</Box>
    </Container>

  )

}

const NtContainer = styled(Container)`
  width: 100%;
  height: 100%;
`