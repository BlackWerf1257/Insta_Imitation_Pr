import './App.css';
import NavBar from './components/NavBar';
import Root from './components/Root';
import Footer from './components/Footer';
import Info from './components/InfoBar';
//index에서 BrowserRouter로 감쌈(Router 사용 금지)

//
function App() {
  return (
    <div className='App-container'>
          <NavBar></NavBar>

      <main className='Main-container-class'>
        <Root/>
      </main>

      <Info></Info>
      <Footer></Footer>
    </div>
  );
}

export default App;
