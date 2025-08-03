import './css/Register.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 

function Register(){
    const navigate = useNavigate();

    const [idValue, SetIdValue] = useState('');
    const [pwdValue, SetPwdValue] = useState('');
    const [userNameValue, SetUserNameValue] = useState('');

    const [profileImg, SetProfileImg] = useState([]);
    const [preProfileImg, SetPreProfileImg] = useState([]);


    const updateIdValue = event => { SetIdValue(event.target.value); };
    const updatePwdValue = event => { SetPwdValue(event.target.value); };
    const updateUserNameValue = event => { SetUserNameValue(event.target.value); };

    const updateProfileImgEvent = event => {
        const file = event.target.files[0];

        //파일 확장자 확인
        switch(file.type){
    	case 'image/jpeg':
    	case 'image/jpg':
    	//case 'gif':
    	case 'image/png':
                 break;
        default:
            alert('프로필 사진은 jpeg, jpg, png타입의 이미지만 가능합니다');
            return;
        }

        SetProfileImg(file);
        encodeFileToBase64(file).then((base64) => SetPreProfileImg(base64));
    }

    const encodeFileToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            SetPreProfileImg(reader.result);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                console.log(error);
            }
        })
    }


    const registerEvent = async () => {
            if(idValue !== "" && pwdValue !== "" && userNameValue !== "" && profileImg != null)
            {
                const formData = new FormData();
                formData.append('id', idValue); // user_id 값
                formData.append('pwd', pwdValue);  // user_pw 값
                formData.append('userName', userNameValue);
                formData.append('profileImg', profileImg);


                //임시용
                try
                {
                const response = await fetch('https://myreactstudy1.dothome.co.kr/Register.php', 
                    { method: 'POST',
                        body: formData,
                    })
                if(!response.ok)
                {
                    alert(response.message);
                }

                const result = await response.json(); //비동기로 JSON에서 변환
                alert(result.message);
                
                    if(result.status == 'succeed')
                        navigate('/');

                }
                catch(error)
                {
                    console.log(error);
                }
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
            <div className='preview-img-class'>
                <p className=''> <b>프로필 사진</b> </p>
                {preProfileImg ? (<img src={preProfileImg} alt="미리보기" className='preview-img-class'/>) : null}
            </div>
            <input type='file' accept='image/*' name='profileImg' className="input-class" onChange={updateProfileImgEvent}></input>
        </div>

        <button className='register-button-class' onClick={registerEvent}> 회원가입 </button>
        {/*LoginEvent(idValue, pwdValue)*/}
    </div>
    );
}
export default Register;