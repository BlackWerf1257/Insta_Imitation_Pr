// 상단바용 공용 UI
import React from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';


function NavBar(){
    const [logState, setState] = React.useState(false); 
    return (
        <>
        <h1 to="/" className="navbar-title-class"> InstaClone </h1>
        <div className='navigation-parent-class'>
            { logState ? <LoggedNavButtonFunc/> : <LogOutedNavButtonFunc/> }
            <div className='searchbar-parent-class'>
                <input className='searchbar-class'/>
                <button className='search-button-class'> 검색하기 </button>
            </div>
        </div>
            <LoginBtnFunc logStatus={logState}/>
        </>
      );
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
function LoginBtnFunc({logStatus}){

    return (
        <>
        {logStatus ? (<Link to="/logout" className='login-button-class'>로그아웃</Link>) : 
        ( <Link to="/login" className='login-button-class'>로그인</Link>)}
        </>
    )
}


export default NavBar;