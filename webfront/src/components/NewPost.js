import { Routes, Route, Link } from 'react-router-dom';
import './css/NewPost.css';
import React, {useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {TextField, Button, Container, Typography, Box} from '@mui/material';
import { PhotoCamera, Visibility } from '@mui/icons-material'

function NewPost() {
  const navigate = useNavigate();

  const [titleValue, SetTitleValue] = useState('');
  const [textValue, SetTextValue] = useState('');
  const [imgValue, SetImgValue] = useState('');
  const [preImgValue, SetPreImgValue] = useState('');
  const [idValue] = useState(sessionStorage.getItem('SuserName') || '');

  const imgRef = useRef();

  const MAX_IMAGE_SIZE = 3 * 1024 * 1024;


  const updateImgEvent = event => {
        const file = event.target.files[0];
        SetImgValue(file);
        encodeFileToBase64(file).then((base64) => SetPreImgValue(base64)); // => SetPreImgValue(base64)
    }

    const encodeFileToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            SetPreImgValue(reader.result);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                console.log(error);
            }
        })
    }

  const CancelPostAdd = () => {
    navigate('/');
  }
  const PostAdd = async () => {
    if(idValue == '')
    {
      alert('로그인 여부를 확인해주세요');
      return;
    }

    if(titleValue === '' || textValue === '')
    {
      alert('제목과 본문을 작성해주세요');
      return;
    }
    else 
      {
      const formData = new FormData();
      formData.append('userId', idValue);
      formData.append('title', titleValue); // user_id 값
      formData.append('text', textValue);  // user_pw 값
      if(imgValue != '')
          formData.append('img', imgValue);
          try
    {
          const response = await fetch('https://myreactstudy1.dothome.co.kr/PostAdd.php', 
              { method: 'POST',
                  body: formData,
              })
              if(!response.ok)
              {
                  alert(response.message);
              }

              const result = await response.json(); //비동기로 JSON에서 변환
                
              if(result.status == 'succeed')
              {
                  alert('글이 등록되었습니다');
                  navigate('/instaCllonePr/home');
              }
              else
              {
                  alert('글 등록에 실패했습니다');
              }
    }
    catch(error)
    {
        console.log(error);
    }
      }
  }


  return (
    <Container maxWidth={"md"}
        sx={{
             bgcolor: 'white', 
             borderRadius: 2, 
             boxShadow: 3,
             //상하 마진
             mt: 6,
             py: 6
          }}>
      <Typography 
        variant='h4'
        
      sx={{
        mr:2,
        flexGrow: 1,
        textAlign:"center",
      }}>새 글 작성</Typography>
      {/* 제목바 */}
      <Box
      sx={{
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'center', 
          mt: 3,
          mb: 1
      }}>
        <TextField 
          label="제목" 
          placeholder="제목을 입력해주세요" 
          onChange={(e) => SetTitleValue(e.target.value)}
          fullWidth
        sx={{
              ml:2
        }}></TextField>
        <Button 
          onClick={PostAdd} 
          sx={{
          bgcolor: '#3597ffff',
          color: 'black',
          height:'60px',
          px:'center',
          width: '150px',
          ml: 15,
          mr: 3
        }}>글 등록하기</Button>
      </Box>
      <TextField
        fullWidth
        label="내용을 입력해주세요"
        multiline
        rows={15}
        onChange={(e) => SetTextValue(e.target.value)}
        sx={{mt: 3, mb: 3}}
      />
      
      {/* dashed: -형태의 선 p : 패딩 hover: 커서가 요소위에 올라가 있을 경우, 애니메이션을 재생하는 것*/}
      <Box
      sx={{
          border: '2px dashed',
          borderColor: 'gray',
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'grey[400]',
          }
        }}
        onClick={() => imgRef.current.click()}>
          {/* multiple : 다중 파일 */}
          <input type='file' ref={imgRef} accept="image/jpeg, image/jpg, image/gif, image/png, image/gif"  onChange={
            (e) => {
              if(e.target.files[0].size > MAX_IMAGE_SIZE){
                alert('3mb 이내의 사진만 선택해주세요');
                return;
              }
              
                updateImgEvent(e)
              }}></input>
              {preImgValue ? (
          <Box sx={{ mb: 2 }}>
            <img src={preImgValue} alt="미리보기" className='newPost-preview-img-class' />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt:3}}>
              <Typography variant='h5'>클릭 또는 사진을 드롭해주세요</Typography>
              <Typography variant='6'>사진은 3mb이하만 첨부 가능합니다</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default NewPost;