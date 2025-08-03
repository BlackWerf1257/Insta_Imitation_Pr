import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

function PostDetail() {
  const { id } = useParams(); // URL에서 id 추출
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(true);

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

  if (loading) return <CircularProgress />; //로딩창

  if (!post || post.status === 'failed') return <Typography>게시글을 불러올 수 없습니다.</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }} className='upper-parent-class'>
      <Box sx={{ display: 'flex', justifyContent: 'center',  alignItems: 'center'}}>
            <Typography vari    ant="h4" gutterBottom>{post.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom sx={{marginLeft: '200px'}}> 작성일: {post.created_at}      </Typography>
      </Box>
    <Typography variant="subtitle2" gutterBottom>작성자 : {post.userId}</Typography>
      <Box sx={{ mt: 3, border: '1px solid', width:'100%', height: '55vh'}}>
        <Typography variant="body1">{post.content}</Typography>
      </Box>
      {post.image && (
        <Box sx={{ mt: 3 }}>
          <img src={post.image} alt="첨부 이미지" style={{ maxWidth: '100%' }} />
        </Box>
      )}
    </Container>
  );
}

export default PostDetail;