import { Routes, Route} from 'react-router-dom';
import About from '../About';
import Login from './Login';
import Main from '../App';

function Root() {
  return (
        <Routes>
            <Route path="/about" element={<About/>} />
            <Route path="/*" element={<Main/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
  );
}

export default Root;