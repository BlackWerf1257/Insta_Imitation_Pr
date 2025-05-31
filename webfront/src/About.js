import './components/css/About.css';

// 외부페이지는 a 사용
function About(){
  const emailAddress = "mklsjh@naver.com";
  const gitNickname = "Blackwerf1257";

    return(
     <div className={"view-class"}>
       <h2> Credits </h2>
       <button className={"item-button-class"}  onClick={() => window.open("https://icon-icons.com/ko/%EC%95%84%EC%9D%B4%EC%BD%98/pointer-%EC%9D%B4%EB%8F%99-%ED%83%90%EC%83%89-%EB%B0%A9%ED%96%A5-%ED%99%94%EC%82%B4%ED%91%9C/190598")}> 사용한 Favicon </button>

        <h3 className='item-class'> 사용한 기술 스택 </h3>
        <ul>
            <li className='data-Text-Class'> <b>언어</b>: CSS, React, SQLite(예정) </li>
            <li className='data-Text-Class'> <b>툴</b> : Visual Studio Code, Spring(예정)</li>
        </ul>

        <h3/> 연락처
        <ul>
            <li className='data-Text-Class'> <b>이메일</b> : {emailAddress}</li>
            <li className='data-Text-Class'> <b>깃허브</b> : {gitNickname}</li>
            <button className={"item-button-class2"}   onClick={() => window.open("https://github.com/BlackWerf1257/")}> 블로그로 이동하기 </button>
        </ul>
     </div>  
    )
}

export default About;
