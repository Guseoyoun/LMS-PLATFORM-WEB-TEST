import * as React from 'react';
import { Container, Box, Switch, Button, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getMyUser, modifyMyUser, MyUser } from '@common/api/user';
import { Confirm } from '@components/common';
import { useRouter } from 'next/router';
import { PasswordChangeModal } from './PasswordChangeModal/PasswordChangeModal';

export function MeEdit() {
  const router = useRouter();
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ myInfo, setMyInfo ] = useState<MyUser['data'] | {}>({});
  const [ openConfirmDialog, setOpenConfirmDialog ] = useState(false);
  const [ openPromptDialog, setOpenPromptDialog ] = useState(false);
  const [ nameInput, setNameInput ] = useState('');
  const emailYnRef = useRef<boolean>(false);
  const smsYnRef = useRef<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data } = await getMyUser();
      setLoading(false);
      setMyInfo(data);
      setNameInput(data.name);
    })();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpenConfirmDialog(true);
  };

  const handleOnCloseConfirm = async (isConfirm: boolean) => {
    setOpenConfirmDialog(false);

    if (isConfirm) {
      try {
        const emailYn = emailYnRef.current ? 'Y' : 'N';
        const smsYn = smsYnRef.current ? 'Y' : 'N';
        await modifyMyUser({ name: nameInput, emailYn, smsYn });
        return router.push('/me');
      } catch (e) {

      }
    }
  };

  return (
    <Container
      sx={{
        marginBottom: 8,
        padding: '72px 120px 48px'
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 1
      }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="이름"
          name="name"
          autoComplete="name"
          autoFocus
          size="small"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mt: '8px'
        }}
        >
          <Typography variant="body2">이메일 수신 여부</Typography>
          <Switch
            name="emailYn"
            sx={{ ml: 'auto' }}
            onChange={(e, checked) => {
              emailYnRef.current = checked;
            }}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mt: '8px'
        }}
        >
          <Typography variant="body2">SMS 수신 여부</Typography>
          <Switch
            name="smsYn"
            sx={{ ml: 'auto' }}
            onChange={(e, checked) => {
              smsYnRef.current = checked;
            }}
          />
        </Box>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="neutral"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => setOpenPromptDialog(true)}
        >
          비밀번호 변경
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          수정하기
        </Button>
      </Box>

      <Confirm
        open={openConfirmDialog}
        title={'회원 정보 수정'}
        content={'회원 정보를 수정하시겠습니까?'}
        confirmText="수정하기"
        cancelText="취소하기"
        onClose={handleOnCloseConfirm}
      />
      <PasswordChangeModal
        open={openPromptDialog}
        onClose={() => setOpenPromptDialog(false)}
      />
    </Container>
  );
}
