import './App.css';
import { useLocation, Routes, Route, useNavigate} from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import NavBar from './components/NavBar';
//import Root from './components/Root';
import Footer from './components/Footer';
import Info from './components/InfoBar';
import Login from './components/Login';
import PostsGrid from './components/MainPage';
import About from './About';
import Register from './components/Register';
import NewPost from './components/NewPost';
import ViewPost from './components/ViewPost';
import { Container } from '@mui/material';
//index에서 BrowserRouter로 감쌈(Router 사용 금지)

//
function App() {
  const location = useLocation();
  const [isLogged, SetLoggedBool] = useState(() => 
    {const loggedBool = sessionStorage.getItem('SboolLogged');
      return loggedBool === 'true';
  });
  const [userName, SetUserName] = useState(() => {return sessionStorage.getItem('SuserName') || ''});

  
   useEffect(() => {
    //값이 null이 아닌지 판단
     if (location.state && typeof location.state.isLogged !== 'undefined'){
        SetLoggedBool(!!location.state.isLogged); //명시적으로 Boolean으로 전환
        SetUserName(location.state.userId);
     }
     /*if(sessionStorage.getItem('SboolLogged') !== null && sessionStorage.getItem('SuserName') !== null){
        SetLoggedBool(sessionStorage.getItem('SboolLogged'));
        SetUserName(sessionStorage.getItem('SuserName'));
        console.log(sessionStorage.getItem('SuserName'));
     }*/
   }, [location.state]);

   //값 업데이트 이후에만 작동
   useEffect(() => {
        //Web Storage API_sessionStorage: 저장공간 세션이 유지되는 동안 제공, localStorage: 브라우저를 새로 열어도 유지
        //키-쌍의 형태로 저장
        sessionStorage.setItem("SboolLogged", isLogged.toString());
        sessionStorage.setItem("SuserName", userName);
   }, [isLogged, userName]); 


  /* useEffect(() => {
  console.log("🔄 isLogged 상태 변경됨:", isLogged);
}, [isLogged]);

useEffect(() => {
  console.log("🛬 location.state 감지됨:", location.state);
}, [location.state]);*/
   

const Logout = () => {
    if (isLogged && userName !== '') {
    sessionStorage.setItem('SboolLogged', 'false');
    sessionStorage.removeItem('SuserName'); // 사용자 이름은 제거 (혹시 모르니 확실히)

    // 2. React 상태 업데이트
    SetLoggedBool(false);
    SetUserName('');
    alert('로그아웃 되었습니다');
    }
};

  return (

    <Container className='App-container'>
          <NavBar isLogged={isLogged} onLogout={Logout}></NavBar>

      <main className='Main-container-class'>
       
        <Routes>
            <Route path="/instaCllonePr/home" element={<PostsGrid/>} />
            <Route path="/instaCllonePr/about" element={<About/>} />
            <Route path="/instaCllonePr/login" element={<Login/>} />
            <Route path="/instaCllonePr/register" element={<Register/>} />
            <Route path="/instaCllonePr/newPost" element={<NewPost/>} />
            <Route path="/instaCllonePr/post/:id" element={<ViewPost/>} />
            
        </Routes>
        <>
        </>
      </main>

      <Info></Info>
      <Footer></Footer>
    </Container>
  );
}

export default App;
