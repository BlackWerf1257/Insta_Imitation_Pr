import './css/Register.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function Register(){
    const navigate = useNavigate();

    const [idValue, SetIdValue] = React.useState('');
    const [pwdValue, SetPwdValue] = React.useState('');
    const [userNameValue, SetUserNameValue] = React.useState('');


    const updateIdValue = event => { SetIdValue(event.target.value); };
    const updatePwdValue = event => { SetPwdValue(event.target.value); };
    const updateUserNameValue = event => { SetUserNameValue(event.target.value); };

    const registerEvent = () => {
            if(idValue !== "" && pwdValue !== "" && userNameValue !== "")
            {
                //임시용
                  navigate('/');
            }
            else {
                alert('항목을 전부 입력해주세요');
            }
         }

    return(
    <div className='register-page-parent-class'>
        {/*ID*/}    
        <div className = 'keydata-parent-class'>
            <p className=''> <b>ID:</b> </p>
            <input className="input-class" onChange={updateIdValue}></input>
        </div>
        {/*PW*/}
        <div className = 'register-keydata-parent-class'>
            <p className=''> <b>비밀번호:</b> </p>
            <input className="input-class" type='password' white-space='nowrap' onChange={updatePwdValue}></input>
        </div>
        {/* 닉네임 */}
        <div className = 'register-keydata-parent-class'>
            <p className=''> <b>닉네임:</b> </p>
            <input className="input-class" onChange={updateUserNameValue}></input>
        </div>
        {/* 프로필 사진 */}
        <div className = 'register-keydata-parent-class'>
            <p className=''> <b>닉네임:</b> </p>
            <input type='file' accept='image/*' name='profileImg' className="input-class" onChange={''}></input>
        </div>

        <button className='register-button-class' onClick={registerEvent}> 회원가입 </button>
        {/*LoginEvent(idValue, pwdValue)*/}
    </div>
    );
}

export default Register;