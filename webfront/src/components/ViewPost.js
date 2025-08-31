import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams(); // URL에서 id 추출
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://myreactstudy1.dothome.co.kr/GetPostData.php?id=${id}`)
      .then(result => result.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('에러 발생:', error);
        setLoading(false);
      });
    }, [id]);


const onDeleteClick = () => {
	if(window.confirm("글을 삭제하시겠습니까?")) {
      const formData = new FormData();
      formData.append('id', id);

    	fetch(`https://myreactstudy1.dothome.co.kr/DeletePost.php?id=${id}`, {
      method: 'POST',
      body: formData
    })
      .then(result => result.json())
      .then(data => {
        alert(data.message);
        if(data.status === 'succeed')
          navigate('/');
      })
      .catch(error => {
        console.error('에러 발생:', error);
        setLoading(false);
      });
    }
    else {
    	alert("취소");
    }
};

  if (loading) return <CircularProgress />; //로딩창

  if (!post || post.status === 'failed') return <Typography>게시글을 불러올 수 없습니다.</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4,  borderRadius: 2, boxShadow: 3, mb: 5}} className='upper-parent-class'>
      <Typography variant="h5" display='flex' sx={{justifyContent:'center', align:'center'}}>{post.title}</Typography>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ display: 'flex',  flexDirection: 'row',  justifyContent: 'space-between', mt:5, mb: 3}}>
            <Typography variant="subtitle1" color="black">작성자 : {post.userId}</Typography>
            <Typography variant="subtitle2" color="black" sx={{mr: 3}}> 작성일: {post.created_at} </Typography>
      </Box>
      <Box sx={{ mt: 3, border: '1px solid', width:'100%', height: '55vh', background:'white', boxShadow: 3, pb: 10}}>
        <Typography variant="body1" sx={{
          pl: 3,
          pt: 3
        }}>{post.content}</Typography>
        {[post.image_url ? ( <Box component="img"  src={`${post.image_url}`} alt="첨부 이미지" sx={{
          justifyContent:"center",
          width: '200px',
          height: '200px',
          mt: 3,
          ml: 3,
          alignSelf: 'center'
        }}/> ) : (<></>)]}
      </Box>
      { post.userId === sessionStorage.getItem("SuserName") ? (<Button sx={{ml: 4, p: 2, mt: 3, mb: 3, background:'white', color:'black', borderRadius: 2, boxShadow: 3,}} onClick={onDeleteClick}>글 삭제하기</Button>) : (<></>)}
    </Container>
  );
}

export default PostDetail;