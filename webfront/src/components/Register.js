import './css/Register.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, TextField, Button, Typography, Container } from '@mui/material';

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
            if(idValue !== "" && pwdValue !== "" && userNameValue !== "")
            {
                const formData = new FormData();
                formData.append('id', idValue); // user_id 값
                formData.append('pwd', pwdValue);  // user_pw 값
                formData.append('userName', userNameValue);
                if(profileImg != null || profileImg != '')
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
    <Container maxWidth='md' sx={{bgcolor: 'white', mt: 8, mb: 4}}>
        <Typography variant='h4' align='center' sx={{pt: 4, pb: 3}}>회원가입</Typography>
        {/*ID*/}    
        <Box className = 'keydata-parent-class' sx={{mt: 4, mb: 4}}>
            <Typography className='' sx={{alignContent:'center'}}> <b>ID:</b> </Typography>
            <TextField onChange={updateIdValue}></TextField>
        </Box>
        {/*PW*/}
        <Box className = 'register-keydata-parent-class' sx={{mt: 4, mb: 4}}>
            <Typography className='' sx={{alignContent:'center'}}> <b>비밀번호:</b> </Typography>
            <TextField type='password' white-space='nowrap' onChange={updatePwdValue}></TextField>
        </Box>
        {/* 닉네임 */}
        <Box className = 'register-keydata-parent-class' sx={{mt: 4, mb: 4}}>
            <Typography className='' sx={{alignContent:'center'}}> <b>닉네임:</b> </Typography>
            <TextField onChange={updateUserNameValue}></TextField>
        </Box>
        {/* 프로필 사진 */}
        <Box className = 'register-keydata-parent-class'>
            <Box className='preview-img-class'>
                <p className=''> <b>프로필 사진</b> </p>
                {preProfileImg ? (<img src={preProfileImg} alt="미리보기" className='register-preview-img-class'/>) : null}
            </Box>
            <input type='file' accept='image/*' name='profileImg' className="input-class" onChange={updateProfileImgEvent}></input>
        </Box>

        <Button className='register-button-class' onClick={registerEvent} sx={{
            mt: 10, 
            justifyContent:'center',
            color: 'black',
            bgcolor: '#3597ffff',
            borderRadius: 4, 
            boxShadow: 4,
            mb: 4
            }}> 회원가입 </Button>
        {/*LoginEvent(idValue, pwdValue)*/}
    </Container>
    );
}
export default Register;