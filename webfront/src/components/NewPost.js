import { Routes, Route, Link } from 'react-router-dom';
import './css/NewPost.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 

function NewPost() {
  const navigate = useNavigate();

  const [titleValue, SetTitleValue] = useState('');
  const [textValue, SetTextValue] = useState('');
  const [imgValue, SetImgValue] = useState('');
  const [idValue, SetIdValue] = useState(sessionStorage.getItem('SuserName') || '');

  const CancelPostAdd = () => {
    navigate('/');
  }
  const PostAdd = async () => {
    if(idValue == '')
    {
      alert('로그인 여부를 확인해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('userId', idValue);
    formData.append('title', titleValue); // user_id 값
    formData.append('text', textValue);  // user_pw 값
    if(imgValue != '')
      formData.append('img', imgValue);

    if(titleValue === '' || textValue === '')
    {
      alert('제목과 본문을 작성해주세요');
      return;
    }

    try
    {
          const response = await fetch('https://myreactstudy1.dothome.co.kr/PostAdd.php', 
              { method: 'POST',
                  body: formData,
              })
              if(!response.ok)
              {
                  alert(response.message);
              }

              const result = await response.json(); //비동기로 JSON에서 변환
                
              if(result.status == 'succeed')
              {
                  alert('글이 등록되었습니다');
                  navigate('/');
              }
              else
              {
                  alert('글 등록에 실패했습니다');
              }
    }
    catch(error)
    {
        console.log(error);
    }
  }

  const updateTitleValue = event => { SetTitleValue(event.target.value); };
  const updateTextValue = event => { SetTextValue(event.target.value); };

  return (
  <div className='newPost-parent-class'>
    <div className='title-class'>
      <p className='title-text-class'>제목 </p>
      <input className='title-input-class' onChange={updateTitleValue}/>
    </div>
    <textarea className='text-input-class' placeholder='내용을 입력 해주세요' onChange={updateTextValue}/>
    <div className='lower-parent-class'>
        <button onClick={PostAdd} className='newPost-button-class'>포스트 등록하기</button>
        <button onClick={CancelPostAdd} className='newPost-button-class'>메인으로 돌아가기</button>
    </div>
  </div>  
  );
}

export default NewPost;