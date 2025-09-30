// 상단바용 공용 UI
import React from 'react';
import './css/NavBar.css';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { Link, Box, TextField, Button, Typography, Container, InputAdornment } from '@mui/material';


function NavBar({isLogged, onLogout}){
    const [searchValue, SetSearchValue] = React.useState(''); /* 검색창 데이터 */
    const navigate = useNavigate();

    /* 검색값 업데이트용 */
    const updateSearchValue = event => {
        SetSearchValue(event.target.value);
        //console.log(event.target.value);
    };

    function RandPost(){
    fetch('https://myreactstudy1.dothome.co.kr/RandPost.php')  // 실제 주소로 변경
    .then(res => res.json())
    .then(json => navigate(`/instaCllonePr/post/${json.id}`))
    .catch(err => console.error("데이터 불러오기 실패", err));
    }
    function Search(searchValue){
    //=== 사용해야 빈 문자열인지 비교함
    if(searchValue === "")
    {
            alert("검색할 내용을 입력해주세요")
    }
    else
    {
            console.log("검색 실행")
            //navigate(`/instaCllonePr/search/${searchValue}`);
    }
}


    return (
        <Container sx={{minWidth:"sx"}}>
            <Box sx={{display:'flex', justifyContent: 'center', width:'100%'}}>
                <Link
                    component={RouterLink} to='/instaCllonePr/home' 
                    sx={{
                        mt: 4,
                        mb: 3,
                        fontSize: { xs: "2rem", sm: "3rem", md: "4rem" }, // Responsive h1 size
                        
                        color: 'black',
                        textDecoration: 'none',
                    }}
                >
                    InstaClone
                </Link>
            </Box>
        <Box className='navigation-parent-class'> {/*  sx={{minWidth:"sm", maxWidth:"lg", maxheight:'60px', display: 'flex',  flexDirection: 'row'}} */}
            {/* isLogged ? <LoggedNavButtonFunc/> : <LogOutedNavButtonFunc/> */}
            <Box className="navigation-left-class">
                    <Link component={RouterLink} to='/instaCllonePr/home' className='navigation-button-class'>홈</Link>
                    <Link component={RouterLink} onClick={RandPost} className='navigation-button-class'>탐색</Link>
                </Box>
            <Box className='searchbar-parent-class'>
                <TextField className='searchbar-class' type='text' placeholder='⌕ 검색할 내용을 입력해주세요' onChange={updateSearchValue}
                InputProps={{
                    endAdornment:
                        <InputAdornment disableTypography position="end" className='search-button-class'>
                            <Button className='search-button-class' size='medium' onClick={() => Search(searchValue)}> 검색 </Button>
                        </InputAdornment>
                }}/>
                
            </Box>
        </Box>
            <LoginBtnFunc isLogged={isLogged} onLogout={onLogout}/>
        </Container>
      );
}



//중괄호로 감싸야 함(중괄호 미 사용시 빈 경우가 아닌경우 true로 처리해버리기 때문)
function LoginBtnFunc({isLogged, onLogout}){
    return (
        <div className='login-button-parent-class'>
        {isLogged ? 
        <>
            <Link component={RouterLink} className='login-button-class' onClick={onLogout}>로그아웃</Link>
            <Link component={RouterLink} to="/instaCllonePr/newPost" className='login-button-class'>글 작성하기</Link>
        </>
         :
        ( 
        <>
            <Link component={RouterLink} to="/instaCllonePr/login" className='login-button-class' sx={{
                mr: 3,
                color: 'black', 
                borderRadius: 4, 
                boxShadow: 4,
            }}>로그인</Link>
            <Link component={RouterLink} to='/instaCllonePr/register' className='login-button-class' sx={{
                mr: 3,
                color: 'black',
                borderRadius: 4, 
                boxShadow: 4,
            }}>회원가입</Link>
            
        </>
        )}
        </div>
    )
}





export default NavBar;