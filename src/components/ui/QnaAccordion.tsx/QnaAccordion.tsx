import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from '@emotion/styled';
import { AnsweredYn } from '@common/api/qna';
import dateFormat from 'dateformat';

interface QnaBoardAccordionList {
  // date?: string | undefined;
  // answerType: string | undefined; // 질문 or 답변
  seq: number;
  title: string | undefined;
  date?: string | undefined;
  answeredYN: string;
  children: {
    firstContent?: string;
    secondContent?: string;
    thirdContent?: string;
    fourthContent?: string;
    fifthContent?: string;
    sixthContent?: string;
    isActive?: boolean;
  }[];
}

export function QnaAccordion({
  qnaAccordionList,
}: {
  qnaAccordionList: QnaBoardAccordionList[];
}) {
  return (
    <Wrap>
      <TableContainer sx={{ width: '100%' }}>
        {qnaAccordionList.map(({ seq, title, date, answeredYN, children }, idx) => (
          <MuiAccordion
            key={title}
            disableGutters
            elevation={0}
            sx={{
              overflow: 'hidden', //scroll
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              className="Asdasd"
              expandIcon={
                <ExpandMoreIcon sx={{ position: 'absolute', width: '100px' }} />
              }
              aria-controls="panel1a-content"
              sx={{
                padding: 0,
                '&:hover': {
                  backgroundColor: grey[50],
                },
              }}
            >
              <TableBody sx={{ display: 'table', width: '100%' }}>
                <BoardBox>
                  <Box className="QnaBoardOne">{seq}</Box>
                  {/* <Typography className="QnaBoardTwo" width="55%">
                    {title}
                  </Typography> */}
                  <Typography className="QnaBoardTwo">{title}</Typography>
                  <Box className="QnaBoardThird">
                    <Chip
                      sx={{ width: '80px', marginLeft: '10px', marginBottom: '3px' }}
                      // variant="outlined"
                      size="small"
                      label={
                        answeredYN === AnsweredYn.ANSWEREDY ? '답변 완료' : '답변 대기'
                      }
                      color={
                        answeredYN === AnsweredYn.ANSWEREDY ? 'secondary' : 'warning'
                      }
                    />
                  </Box>
                  <Box className="QnaBoardFour">{dateFormat(date, 'yyyy-mm-dd')}</Box>
                </BoardBox>
              </TableBody>
            </AccordionSummary>
            <BoardAccordionDetails>
              <nav aria-label="secondary mailbox folders">
                <List disablePadding={true}>
                  {children.map(
                    ({
                      firstContent,
                      secondContent,
                      thirdContent,
                      fourthContent,
                      fifthContent,
                      sixthContent,
                      isActive,
                    }) => (
                      <ListItem
                        disablePadding
                        key={idx} // key props error
                        sx={{
                          backgroundColor: `${isActive ? grey[50] : 'inherit'}`,
                        }}
                      >
                        <TableBody sx={{ display: 'table', width: '100%' }}>
                          <TableRow>
                            <TableCellLeft
                              align="center"
                              sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                            >
                              질문
                            </TableCellLeft>
                            <TableCellRight>
                              <QuestionBoardBox
                                display="flex"
                                flexDirection={'column'}
                                width="100%"
                              >
                                <ListItemText
                                  primary={secondContent}
                                  className="SecondContent"
                                />
                                <ListItemText
                                  primary={firstContent}
                                  className="FirstContent"
                                />
                                <ListItemText
                                  primary={thirdContent}
                                  className="ThirdContent"
                                />
                              </QuestionBoardBox>
                            </TableCellRight>
                          </TableRow>

                          {answeredYN === AnsweredYn.ANSWEREDY ? (
                            <TableRow sx={{ backgroundColor: 'white' }}>
                              <TableCellLeft
                                align="center"
                                sx={{
                                  fontSize: '1.2rem',
                                  fontWeight: 'bold',
                                  backgroundColor: 'white',
                                }}
                              >
                                답변
                              </TableCellLeft>
                              <TableCellRight>
                                <AnswerBoardBox
                                  display="flex"
                                  flexDirection={'column'}
                                  width="100%"
                                >
                                  <ListItemText
                                    primary={fourthContent}
                                    className="FourthContent"
                                  />
                                  <ListItemText
                                    primary={fifthContent}
                                    className="FifthContent"
                                  />
                                  <ListItemText
                                    primary={sixthContent}
                                    className="SixthContent"
                                  />
                                </AnswerBoardBox>
                              </TableCellRight>
                            </TableRow>
                          ) : (
                            <div></div>
                          )}
                        </TableBody>
                      </ListItem>
                    )
                  )}
                </List>
              </nav>
            </BoardAccordionDetails>
          </MuiAccordion>
        ))}
      </TableContainer>
    </Wrap>
  );
}

const Wrap = styled(Box)`
  .MuiAccordionSummary-expandIconWrapper {
    position: absolute;
    right: 0;
    width: 100px;
    height: 24px;
  }
`;

const BoardBox = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  .QnaBoardOne {
    color: #a59d9d;
    text-align: center;
    width: 10%;
  }
  .QnaBoardTwo {
    // font-weight: bold;
    // font-size: 1.3rem;
    text-align: center;
    width: 55%;
  }
  .QnaBoardThird {
    font-weight: bold;
    font-size: 1.3rem;
    width: 15%;
    text-align: center;
  }
  .QnaBoardFour {
    text-align: center;
    width: 20%;
  }
`;

const QuestionBoardBox = styled(Box)`
  .QnaBoardOne {
    color: #a59d9d;
  }

  .QnaBoardTwo {
    // font-weight: bold;
    // font-size: 1.3rem;
    width: 100%;
  }
`;

const AnswerBoardBox = styled(Box)`
  .QnaBoardTwo {
    // font-weight: bold;
    // font-size: 1.3rem;
    width: 100%;
  }
`;

const BoardAccordionDetails = styled(AccordionDetails)`
  background-color: #e0e0e0;
  padding: 0px;
  /* margin-bottom: 30px; */
`;

const TableCellLeft = styled(TableCell)`
  width: 20%;
`;
const TableCellRight = styled(TableCell)`
  width: 780%;
  position: relative;

  .FirstContent {
    width: 100%;
    height: 100%;
    position: flex;
  }

  .SecondContent {
    color: #a59d9d;
    position: relative;
    width: 20%;
    float: right;
    text-align: center;
    margin-left: 80%;
    margin-top: -2%;
    margin-bottom: -0.5%;
  }

  .ThirdContent {
    color: #a59d9d;
    position: relative;
    float: right;
    text-align: center;
  }

  .FourthContent {
    color: #a59d9d;
    position: relative;
    width: 20%;
    float: right;
    text-align: center;
    margin-left: 80%;
    margin-top: -2%;
    margin-bottom: -0.5%;
  }

  .SixthContent {
    color: #a59d9d;
    position: relative;
    float: right;
    text-align: center;
  }
`;
