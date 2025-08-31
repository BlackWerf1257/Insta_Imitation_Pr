import { Link } from 'react-router-dom';
import './css/info.css';
import { Link as RouterLink } from 'react-router-dom';

function Info() {
  return (
    <div className='InfoBar-Class'>
      <Link component={RouterLink} to="/about" className='item-button-class' sx={{p: 3, color:'#a9a6a6ff'}}>사이트 정보</Link> 
    </div>
  );
}

export default Info;
