import './css/Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

function Login() {
  const [idValue, SetIdValue] = useState('');
  const [pwdValue, SetPwdValue] = useState('');
  const navigate = useNavigate();

  const updateIdValue = event => { SetIdValue(event.target.value); };
  const updatePwdValue = event => { SetPwdValue(event.target.value); };

  const logEvent = () => {
    if (idValue !== "" && pwdValue !== "") {
      fetch(`https://myreactstudy1.dothome.co.kr/Login.php?id=${idValue}&pwd=${pwdValue}`, { method: 'POST' })
        .then((response) => {
          if (!response.ok) {
            console.log(response.status);
            alert('네트워크 오류가 발생했습니다.');
            return null; // 추가
          }
          return response.json();
        })
        .then((result) => {
          if (result && result.status === 'succeed') { // 조건 수정
            navigate('/', { state: { isLogged: true, userId: idValue } });
          } else if (result) {
            alert('ID나 비밀번호가 일치하지 않습니다.');
          }
        })
        .catch(error => { // 에러 처리 추가
          console.error('Fetch error:', error);
          alert('로그인 처리 중 문제가 발생했습니다.');
        });
    }
    else
        alert('ID와 비밀번호를 입력해주세요');
  };

  return (
    <Container maxWidth= "md" sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, mt: 8, mb : 4 }}>
      <Typography variant='h4'>로그인</Typography>
      {/* ID */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 3, mb: 2, width: '100%' }}>
        <Typography sx={{ minWidth: 60 }}> <b>ID:</b> </Typography>
        <TextField
          className="input-class"
          onChange={updateIdValue}
          sx={{ bgcolor: 'white', ml: 3, flexGrow: 1 }}
        />
      </Box>

      {/* PW */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 3, width: '100%' }}>
        <Typography sx={{ minWidth: 60 }}> <b>비밀번호:</b> </Typography>
        <TextField
          className="input-class"
          type='password'
          onChange={updatePwdValue}
          sx={{ bgcolor: 'white', ml: 3, flexGrow: 1 }}
        />
      </Box>

      <Button
        className='login-button-class-2'
        onClick={logEvent}
        variant="contained"
        sx={{ width: '100%' }}
      >
        로그인
      </Button>
    </Container>
  );
}

export default Login;