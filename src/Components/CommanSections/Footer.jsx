import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
// import Grid from '@mui/material/Grid2';
import logo from '../../Images/image-removebg-preview (36) 2@2x.png';
import telegram from '../../Images/telegram.svg';
import facebook from '../../Images/facebook.svg';
import insta from '../../Images/insta.svg';
import youtube from '../../Images/youtube.svg';
import { useNavigate } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const handlePrivacyPolicy = () => {
        navigate("/Privacy-policy")
    }

    const handleTermsAndConditions = () => {
        navigate("/terms-conditions")
    }
    const handleYoutube = () => {
        window.open("https://youtube.com/@providhyacs?si=Cx2nvSk3DXLqw6uV", "_blank");
    }
    const handleTeleGram = () => {
        window.open("https://t.me/ProVidhya", "_blank");
    }
    const handleFaceBook = () => {
        window.open("https://www.facebook.com/share/19wNpVcQMB/?mibextid=wwXIfr", "_blank");
    }
    const handleInstagram = () => {
        window.open("https://www.instagram.com/providhya.indore?igsh=eXFjdmxsMmJiMGc0", "_blank");
    }

    return (
        <div style={{ paddingLeft: isMobile ? '0rem' : '0rem', paddingRight: isMobile ? '0rem' : '0rem', paddingTop: '0rem', paddingBottom: '0rem' }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: '#452A00', py: [2, 4], textAlign: "center", borderTopLeftRadius: "50px", borderTopRightRadius: "50px" }}>
                    <img
                        alt=''
                        src={logo}
                        style={{
                            width: '150px'
                        }}
                    />
                    <Typography
                        sx={{ fontSize: "13px", mb: 2 }}
                        fontWeight={500}
                        color='#fff'
                    >
                        India’s Most Trusted CA, CS, CMA, CFA Lecture Provider team.
                    </Typography>
                    <Typography
                        sx={{ mb: 2 }}
                        fontWeight={500}
                        color='#fff'
                    >
                        CA Final, CA Inter, CMA Final, CMA Inter - Group Vise, Subject vise
                    </Typography>
                    <Typography
                        // textAlign={'center'}
                        sx={{ mb: 2 }}
                        fontWeight={500}
                        color='#fff'
                    >
                        Combos, Best Offering available at <span style={{ color: "#FE9803" }}>LECTURE DEKHO.COM</span>
                    </Typography>
                    <Typography
                        sx={{ mb: 2 }}
                        fontSize={'16px'}
                        color='#fff'
                        fontWeight={500}
                    >
                        CA FINAL | CA INTER | CMA FINAL | CMA INTER | LIVE CLASSES | RECORDED LECTURES | PENDRIVE LECTURES | FASTTRACK LECTURES
                    </Typography>
                    <Typography
                        sx={{ fontSize: "13px", mb: 2 }}
                        fontWeight={500}
                        color='#fff'
                    >
                        Any Enquiry or Doubt or Consulting, Feel free to reach us out at : teamlecturedekho@gmail.com or 9039946454
                    </Typography>
                </Grid>
            </Grid>
        </div >
    )
}

export default Footer