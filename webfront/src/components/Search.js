import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, Button, Container, Grid, Typography,  } from '@mui/material'


function MainPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    

    const INITIAL_SHOW_ITEM_COUNT = 20;
    let prevShowItemCnt = 20;
    const ITEM_ADD_TO_SHOW = 20;
    const [itemShowCnt, UpdateItemShowCnt] = useState(INITIAL_SHOW_ITEM_COUNT); 
    const handleMoreItemBtn = () => { UpdateItemShowCnt(prevShowItemCnt => Math.min(prevShowItemCnt + ITEM_ADD_TO_SHOW, data.length));
    };

    useEffect(() => {
        fetch('https://myreactstudy1.dothome.co.kr/Search.php')  // 실제 주소로 변경
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error("데이터 불러오기 실패", err));
    }, []);


//xs: 모바일, sm: 태블릿, md,lg,xl: 데스크톱
//각 줄은 12 / size의 값으로 표시됨
//Max 20개
  return (
    <Container maxWidth="md">
    <Grid container rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
                justifyContent: "flex-start",
                alignItems: "center", // 아이템 수직 중앙 정렬
                padding: "20px",
                display: "flex",     // 디폴트값
                flexWrap: "wrap",    // 줄바꿈 허용
        }}>

            {data.slice(0, itemShowCnt).map((item) => (
                <Grid
                    item
                    key={item.id}
                    xs={6}
                    sm={4}
                    md={3} 
                >
                <Box sx={{
                        border: '1px solid #ddd', // 각 아이템의 시각적 구분
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        width: '100px',
                        wordBreak: 'break-word', //텍스트가 벗어날때 자동으로 줄 바꿈
                        overflow: 'hidden',
                    }} onClick={() =>  navigate(`/instaCllonePr/post/${item.id}`)}>
                        <Typography variant="subtitle2">{item.title}</Typography>
                        <Typography variant="body6">{item.content.slice(0, 10)}</Typography>
                </Box>
                </Grid>
            ))}
        </Grid>
        { data.length > INITIAL_SHOW_ITEM_COUNT  ? (<Button onClick={handleMoreItemBtn}> 더 보기 </Button>) : (<></>)}
    </Container>
  );
}
export default MainPage;