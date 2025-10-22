import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Box, Button, Container, Grid, Typography, CircularProgress } from '@mui/material';

function Search() {
    // useParams에서 'data' 값을 추출하여 searchValueInput에 저장
    const { data: searchValueInput } = useParams(); 
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const INITIAL_SHOW_ITEM_COUNT = 10;
    const ITEM_ADD_TO_SHOW = 10;
    const [itemShowCnt, UpdateItemShowCnt] = useState(INITIAL_SHOW_ITEM_COUNT); 
    
    const handleMoreItemBtn = () => { 
        UpdateItemShowCnt(prevShowItemCnt => Math.min(prevShowItemCnt + ITEM_ADD_TO_SHOW, data.length));
    };

    useEffect(() => {
        if (!searchValueInput) {
            setLoading(false);
            return; 
        }

        setLoading(true);
        setError(null);
        
        fetch(`https://myreactstudy1.dothome.co.kr/Search.php?input=${searchValueInput}`) 
            .then(res => res.json())
            .then(json => {
                //받은 데이터가 배열인지 확인
                let processedData = [];
                
                if (Array.isArray(json)) {
                    // 1. 데이터가 배열인 경우 (단일 검색 결과)
                    processedData = json;
                } else if (json && json.id) {
                    // 2. 데이터가 단일 객체인 경우 (검색 결과 한 개)
                    processedData = [json];
                }
                
                setData(processedData);
                setLoading(false);
            })
            .catch(err => {
                console.error("데이터 불러오기 실패", err);
                setError(err.message);
                setData([]); // 실패 시 빈 배열로 초기화
                setLoading(false);
            });
            
    }, [searchValueInput]); 

    // --- 렌더링 시작 ---

    if (loading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;

    return (
        <Container maxWidth="md">
            {/* 1. 검색어 출력 */}
            <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 3 }}>
                검색 결과: 
                <Box component="span" fontWeight="bold" color="primary.main" sx={{ ml: 1 }}>
                    {searchValueInput || "전체"}
                </Box>
            </Typography>


            {/* 검색 결과 목록 */}
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                
                {data.slice(0, itemShowCnt).map((item) => (
                    <Grid 
                        item key={item.id || item.title} size={12}>
                        <Box 
                            
                            sx={{
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                p: 2,
                                height: '150px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: '#f5f5f5' }
                            }} 
                            onClick={() => navigate(`/instaCllonePr/post/${item.id}`)}
                        >
                            <Typography variant="subtitle1" fontWeight="bold" noWrap>{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary" noWrap sx={{mt: 2}}>{item.userId}</Typography>
                            <Typography variant="body2" sx={{ mt: 4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                {item.content}
                            </Typography>
                        </Box>
                    </Grid>
                ))}

                {data.length === 0 && !loading && (
                    <Grid item xs={12}>
                        <Typography color="text.secondary">검색 결과가 없습니다.</Typography>
                    </Grid>
                )}
            </Grid>
            
            {/* 더 보기 버튼 */}
            {data.length > itemShowCnt ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 5 }}>
                    <Button onClick={handleMoreItemBtn} variant="contained"> 
                        더 보기 ({itemShowCnt} / {data.length})
                    </Button>
                </Box>
            ) : (<></>)
        }
        </Container>
    );
}

export default Search;