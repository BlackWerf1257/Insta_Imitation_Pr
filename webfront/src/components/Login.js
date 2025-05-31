import './css/Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; 


function Login(){
        const [idValue, SetIdValue] = React.useState(''); /* 검색창 데이터 */
        const [pwdValue, SetPwdValue] = React.useState(''); /* 검색창 데이터 */
    
        const updateIdValue = event => { SetIdValue(event.target.value); };
         const updatePwdValue = event => { SetPwdValue(event.target.value); };

         const navigate = useNavigate();

         const logEvent = () => {
            if(idValue !== "" && pwdValue !== "")
            {
                //임시용
                  navigate('/', { state: { isLogged: true, userId: idValue } });
            }
            else {
                alert('ID와 비밀번호를 입력해주세요');
            }
         }

    return(
    <div className='login-page-parent-class'>
        {/*ID*/}    
        <div className = 'keydata-parent-class'>
            <p className=''> <b>ID:</b> </p>
            <input className="input-class" onChange={updateIdValue}></input>
        </div>
        {/*PW*/}
        <div className = 'keydata-parent-class'>
            <p className=''> <b>비밀번호:</b> </p>
            <input className="input-class" type='password' white-space='nowrap' onChange={updatePwdValue}></input>
        </div>

        <button className='login-button-class-2' onClick={logEvent}> 로그인 </button>
        {/*LoginEvent(idValue, pwdValue)*/}
    </div>
    );
}

export default Login;