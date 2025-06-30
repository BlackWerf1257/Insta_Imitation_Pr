import {React, useState } from 'react';
import { Box, Button, Container, Grid, Typography,  } from '@mui/material'

function MainPage() {
    const tempData = [
    {
        id: 1,
        title: 'title1',
        content: 'data1'
    },
    {
        id: 2,
        title: 'title2',
        content: 'data2'
    },
    {
        id: 3,
        title: 'title3',
        content: 'data3'
    },
    {
        id: 4,
        title: 'title4',
        content: 'data4'
    },
    {
        id: 5,
        title: 'title5',
        content: 'data5'
    },
    {
        id: 6,
        title: 'title6',
        content: 'data6'
    },
    {
        id: 7,
        title: 'title7',
        content: 'data7'
    },
    {
        id: 8,
        title: 'title8',
        content: 'data8'
    },
    {
        id: 9,
        title: 'title9',
        content: 'data9'
    },
    {
        id: 10,
        title: 'title10',
        content: 'data10'
    },
    {
        id: 11,
        title: 'title11',
        content: 'data11'
    },
    {
        id: 12,
        title: 'title12',
        content: 'data12'
    },
    {
        id: 13,
        title: 'title13',
        content: 'data13'
    },
    {
        id: 14,
        title: 'title14',
        content: 'data14'
    },
    {
        id: 15,
        title: 'title15',
        content: 'data15'
    },
    {
        id: 16,
        title: 'title16',
        content: 'data16'
    },
    {
        id: 17,
        title: 'title17',
        content: 'data17'
    },
    {
        id: 18,
        title: 'title18',
        content: 'data18'
    },
    {
        id: 19,
        title: 'title19',
        content: 'data19'
    },
    {
        id: 20,
        title: 'title20',
        content: 'data20'
    },
    {
        id: 21,
        title: 'title21',
        content: 'data21'
    },
    {
        id: 22,
        title: 'title22',
        content: 'data22'
    },
    
];

    const INITIAL_SHOW_ITEM_COUNT = 20;
    let prevShowItemCnt = 20;
    const ITEM_ADD_TO_SHOW = 20;
    const [itemShowCnt, UpdateItemShowCnt] = useState(INITIAL_SHOW_ITEM_COUNT); 
    const handleMoreItemBtn = () => { UpdateItemShowCnt(prevShowItemCnt => Math.min(prevShowItemCnt + ITEM_ADD_TO_SHOW, tempData.length));
    };

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

            {tempData.slice(0, itemShowCnt).map((item) => (
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
                    }} onClick={() => alert(`실행됨 ${item.id}`)}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body2">{item.content}</Typography>
                </Box>
                </Grid>
            ))}
        </Grid>
        <Button onClick={handleMoreItemBtn}> 더 보기 </Button>
    </Container>
  );
}
export default MainPage;