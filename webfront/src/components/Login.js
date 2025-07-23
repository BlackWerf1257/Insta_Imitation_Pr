import './css/Login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


function Login(){
        const [idValue, SetIdValue] = React.useState('');
        const [pwdValue, SetPwdValue] = React.useState('');
        const [isLoginSucceed, SetLoginBool] = useState(false);
        const [data, SetData] = useState('');
    
        const updateIdValue = event => { SetIdValue(event.target.value); };
        const updatePwdValue = event => { SetPwdValue(event.target.value); };


         const navigate = useNavigate();

         const logEvent = () => {
            if(idValue !== "" && pwdValue !== "")
            {
                fetch(`https://myreactstudy1.dothome.co.kr/Login.php?id=${idValue}&pwd=${pwdValue}`, { method: 'POST',})
                .then((response) => {
                if(!response.ok)
                console.log(response.status);
                else
                    return response.json();
                })
                .then((result) => {
                    if(result['status'] == 'succeed')
                        navigate('/', { state: { isLogged: true, userId: idValue } });
                })
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