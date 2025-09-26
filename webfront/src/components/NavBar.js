// 상단바용 공용 UI
import React from 'react';
import './css/NavBar.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Box, TextField, Button, Typography, Container, InputAdornment } from '@mui/material';


function NavBar({isLogged, onLogout}){
    const [searchValue, SetSearchValue] = React.useState(''); /* 검색창 데이터 */

    /* 검색값 업데이트용 */
    const updateSearchValue = event => {
        SetSearchValue(event.target.value);
        //console.log(event.target.value);
    };

    return (
        <Container sx={{minWidth:"sx"}}>
                <Typography
                    className="navbar-title-class"
                    sx={{
                        fontWeight: "bold",
                        mt: 4,
                        mb: 3,
                        fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" }, // Responsive h1 size
                        maxWidth: "100%",
                    }}
                >
                    InstaClone
                </Typography>
        <Box sx={{minWidth:"sm", maxWidth:"lg", maxheight:'60px', display: 'flex',  flexDirection: 'row'}}> {/* className='navigation-parent-class' */}
            { isLogged ? <LoggedNavButtonFunc/> : <LogOutedNavButtonFunc/> }
            <Box className='search-bar-parent-class' sx={{display:'flex', flexDirection: 'row'}}>
                <TextField className='searchbar-class' type='text' placeholder='⌕ 검색할 내용을 입력해주세요' onChange={updateSearchValue}
                InputProps={{
                    endAdornment:
                        <InputAdornment disableTypography position="end">
                            <Button className='search-button-class' onClick={() => Search(searchValue)}> 검색하기 </Button>
                        </InputAdornment>
                }}/>
                
            </Box>
        </Box>
            <LoginBtnFunc isLogged={isLogged} onLogout={onLogout}/>
        </Container>
      );
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
    }
}

/**/
function LoggedNavButtonFunc(){
                return(
                <Box sx={{display: 'flex',  flexDirection: 'row',  mr:'3'}}>
                    <Link component={RouterLink} to="/" sx={{
                        m: 3,
                        color: 'black',
                        borderRadius: 2, 
                        boxShadow: 3,
                    }}>홈</Link>
                    <Link component={RouterLink} to="/search" sx={{
                        mr: 3,
                        color: 'black',
                        borderRadius: 4, 
                        boxShadow: 3,}}>탐색</Link>
                </Box>
                )
}
function LogOutedNavButtonFunc(){

            return(
            <Box sx={{display:"flex", maxWidth:"300px",  flexDirection: 'row', m:'30'}}>
                    <Link component={RouterLink} to="/" className='login-button-class'>홈</Link>
                    <Link component={RouterLink} to="/search" className='login-button-class'>탐색</Link>
            </Box>
            )
}

//중괄호로 감싸야 함(중괄호 미 사용시 빈 경우가 아닌경우 true로 처리해버리기 때문)
function LoginBtnFunc({isLogged, onLogout}){
    return (
        <div className='login-button-parent-class'>
        {isLogged ? 
        <>
            <Link component={RouterLink} className='login-button-class' onClick={onLogout} sx={{
                mr: 3,
                color: 'black', 
                borderRadius: 4, 
                boxShadow: 4,
            }}>로그아웃</Link>
            <Link component={RouterLink} to="/newPost" className='login-button-class' sx={{
                mr: 3,
                color: 'black', 
                borderRadius: 4, 
                boxShadow: 4,
            }}>글 작성하기</Link>
        </>
         :
        ( 
        <>
            <Link component={RouterLink} to="/login" className='login-button-class' sx={{
                mr: 3,
                color: 'black', 
                borderRadius: 4, 
                boxShadow: 4,
            }}>로그인</Link>
            <Link component={RouterLink} to='/register' className='login-button-class' sx={{
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