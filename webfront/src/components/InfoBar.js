import { Link } from 'react-router-dom';
import './css/info.css';

function Info() {
  return (
    <div className='InfoBar-Class'>
      <Link to="/about" className='item-button-class'>사이트 정보</Link> 
    </div>
  );
}

export default Info;
