// 상단바용 공용 UI
import React from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';


function NavBar({isLogged, onLogout}){
    const [searchValue, SetSearchValue] = React.useState(''); /* 검색창 데이터 */

    /* 검색값 업데이트용 */
    const updateSearchValue = event => {
        SetSearchValue(event.target.value);
        //console.log(event.target.value);
    };

    return (
        <>
        <h1 className="navbar-title-class"> InstaClone </h1>
        <div className='navigation-parent-class'>
            { isLogged ? <LoggedNavButtonFunc/> : <LogOutedNavButtonFunc/> }
            <div className='searchbar-parent-class'>
                <input className='searchbar-class' type='text' onChange={updateSearchValue}/>
                <button className='search-button-class' onClick={() => Search(searchValue)}> 검색하기 </button>
            </div>
        </div>
            <LoginBtnFunc isLogged={isLogged} onLogout={onLogout}/>
        </>
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
                <>
                        <nav className="">
                        <Link to="/" className='navigation-button-class'>홈</Link>
                        <Link to="/search" className='navigation-button-class'>탐색</Link>
                        <Link to="/upload" className='navigation-button-class'>업로드</Link>
                        <Link to="/alarm" className='navigation-button-class'>알림</Link>
                        <Link to="/msg" className='navigation-button-class'>메시지</Link>
                        </nav>
                </>
                )
}
function LogOutedNavButtonFunc(){

            return(
            <>
                    <nav className="">
                    <Link to="/" className='navigation-button-class'>홈</Link>
                    <Link to="/search" className='navigation-button-class'>탐색</Link>
                    </nav>
            </>
            )
}

//중괄호로 감싸야 함(중괄호 미 사용시 빈 경우가 아닌경우 true로 처리해버리기 때문)
function LoginBtnFunc({isLogged, onLogout}){
    return (
        <div className='login-button-parent-class'>
        {isLogged ? (<button className='login-button-class' onClick={onLogout}>로그아웃</button>) : 
        ( <Link to="/login" className='login-button-class'>로그인</Link>)}
        </div>
    )
}



export default NavBar;