import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import dateFormat from 'dateformat';
import styled from '@emotion/styled';
import { width } from '@mui/system';
import { format } from 'date-fns';
import { CategoryBoard } from '@common/api/categoryBoard';
import { downloadFile } from '@common/api/file';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { S3Files } from 'types/file';
import { TuiViewer } from '@components/common/TuiEditor';

interface BoardAccordionAccordionList {
  seq: number;
  date: string;
  name: string;
  children: {
    content: string;
    s3Files: S3Files;
  };
}

export function BoardAccordionV2({
  accordianInfo,
}: {
  accordianInfo: BoardAccordionAccordionList[];
}) {
  const [value, setValue] = React.useState<number>(null);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setValue(newExpanded ? panel : null);
    };

  return (
    <Wrap>
      {/* {boardAccordionList.map(({ date, name, icon, children }, idx) => ( */}
      {accordianInfo.map(({ seq, date, name, children: { content, s3Files } }, index) => (
        <MuiAccordion
          key={seq}
          disableGutters
          elevation={0}
          expanded={value === seq}
          onChange={handleChange(seq)}
          // onClick={() => handleValue(seq)}
          sx={{
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ position: 'absolute', width: '100px' }} />}
            aria-controls="panel1a-content"
            id="panel1d-header"
            sx={{
              padding: 0,
              '&:hover': {
                backgroundColor: grey[50],
              },
            }}
          >
            <BoardBox>
              <BoardSeqBox textAlign="center">{seq}</BoardSeqBox>
              <BoardSeqTitleBox paddingLeft="1rem">{name}</BoardSeqTitleBox>
              <BoardCreatedBox textAlign="center">{date.toString()}</BoardCreatedBox>
            </BoardBox>
          </AccordionSummary>
          <BoardAccordionDetails>
            <nav aria-label="secondary mailbox folders">
              <List disablePadding={true}>
                {/* {children.map(({ name, isActive }, idx) => ( */}
                {/* {content.map(({ name, isActive }) => ( */}
                <BoardContentBox
                  // key={name} // key props error
                  sx={{
                    display: 'flex',
                    width: '100%',
                    // backgroundColor: `${isActive ? grey[50] : 'inherit'}`,
                  }}
                >
                  <Box width="10%" />
                  <BoardContent>
                    <TuiViewer initialValue={content} />
                  </BoardContent>

                  <Box width="20%" />
                </BoardContentBox>
                {/* // ))} */}
                <Box sx={{ margin: '10px 120px' }}>
                  {s3Files.length > 0 && (
                    <Box display="flex" alignItems="center" mt={4}>
                      {' '}
                      <FileDownloadIcon />
                      첨부파일
                    </Box>
                  )}
                  <Box
                    sx={{ cursor: 'pointer', color: '#236cef' }}
                    onClick={async () => {
                      try {
                        const blobData = await downloadFile(s3Files[0].seq);

                        const url = window.URL.createObjectURL(new Blob([blobData]));
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${s3Files[0].name}`;
                        a.click();
                        a.remove();
                      } catch (e: any) {
                        console.log(e);
                      }
                    }}
                  >
                    {s3Files[0]?.name}
                  </Box>
                </Box>
              </List>
            </nav>
          </BoardAccordionDetails>
        </MuiAccordion>
      ))}
    </Wrap>
  );
}

const Wrap = styled(Box)`
  .MuiAccordionSummary-expandIconWrapper {
    position: absolute;
    right: 0;
    width: 100px;
    height: 24px;
    @media (max-width: 768px) {
      bottom: 16px;
    }
  }
  border-top: 1px solid #cdcdcd;
  border-bottom: 1px solid #cdcdcd;
`;

const BoardBox = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 85px;
  .CategoryBoardOne {
    color: #a59d9d;
  }

  .CategoryBoardTwo {
    font-weight: bold;
    font-size: 1.3rem;
    width: 100%;
  }
`;

const BoardSeqBox = styled(Box)`
  width: 20%;
`;
const BoardSeqTitleBox = styled(Box)`
  width: 50%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const BoardCreatedBox = styled(Box)`
  width: 30%;
`;

const BoardAccordionDetails = styled(AccordionDetails)`
  background: #fbfbfb;
  margin: 0;
  padding: 2rem 0;
  border-top: 1px solid #cdcdcd;
`;
const BoardContentBox = styled(Box)``;
const BoardContent = styled(Box)`
  width: 70%;
  white-space: pre-wrap;
`;
