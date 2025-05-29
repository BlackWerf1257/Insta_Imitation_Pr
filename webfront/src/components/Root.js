import { Router, Routes, Route} from 'react-router-dom';
import About from '../About';

function Root() {
  return (
        <Routes>
            <Route path="/about" element={<About/>} />
        </Routes>
  );
}

export default Root;