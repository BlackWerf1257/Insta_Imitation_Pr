import './App.css';
import { useLocation, Routes, Route, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar';
//import Root from './components/Root';
import Footer from './components/Footer';
import Info from './components/InfoBar';
import Login from './components/Login';
import About from './About';
import { useState, useEffect } from 'react';
//index에서 BrowserRouter로 감쌈(Router 사용 금지)

//
function App() {
  const location = useLocation();
  const [isLogged, SetLoggedBool] = useState(() => {return sessionStorage.getItem('SboolLogged') || false});
  const [userName, SetUserName] = useState(() => {return sessionStorage.getItem('SuserName') || ''});

   useEffect(() => {
    //값이 null이 아닌지 판단
     if (location.state && typeof location.state.isLogged !== 'undefined'){
        SetLoggedBool(location.state.isLogged);
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
        sessionStorage.setItem("SboolLogged", isLogged);
        sessionStorage.setItem("SuserName", userName);
   }, [isLogged, userName]); 


  /* useEffect(() => {
  console.log("🔄 isLogged 상태 변경됨:", isLogged);
}, [isLogged]);

useEffect(() => {
  console.log("🛬 location.state 감지됨:", location.state);
}, [location.state]);*/
   

const Logout = () => {
  if(isLogged === true && userName !== '')
  {
  sessionStorage.removeItem('SboolLogged');
  sessionStorage.removeItem('SuserName');
  SetLoggedBool(false);
  SetUserName('');
  alert('로그아웃 되었습니다');
  }
};

  return (

    <div className='App-container'>
          <NavBar isLogged={isLogged} onLogout={Logout}></NavBar>

      <main className='Main-container-class'>
        <Routes>
            <Route path="/about" element={<About/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
        <>
          
        </>
      </main>

      <Info></Info>
      <Footer></Footer>
    </div>
  );
}

export default App;
