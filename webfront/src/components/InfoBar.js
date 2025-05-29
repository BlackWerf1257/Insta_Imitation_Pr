import { Link } from 'react-router-dom';

function Info() {
  const emailAddress = "mklsjh@naver.com";

  return (
    <div className='InfoBar-Class'>
      <Link to="/about" className=''>About</Link> 
    </div>
  );
}

export default Info;
