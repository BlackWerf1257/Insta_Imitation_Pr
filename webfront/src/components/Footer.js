// 상단바용 공용 UI
import { Typography } from '@mui/material';
import './css/Footer.css';

function Footer(){
    return (
        <footer className="footer-class">
            <Typography className='footer-text-class' sx={{mt:1, mb: 1, ml: 2}}> Made in 2025年, By Blackwerf1257 </Typography>
        </footer>
      );
}

export default Footer;