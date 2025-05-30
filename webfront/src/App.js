import './App.css';
import { useLocation, Routes, Route} from 'react-router-dom';
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
  const [isLogged, SetLoggedBool] = useState(false);
   useEffect(() => {
     if (location.state && typeof location.state.isLogged !== 'undefined'){
        alert(location.state.isLogged);
     }
   });

  return (

    <div className='App-container'>
          <NavBar></NavBar>

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
