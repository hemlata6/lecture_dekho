import { Box, Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import Network from '../../Netwrok';
import Endpoints from '../../constant/endpoints';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import instId from '../../constant/InstituteId';

const HomeSection5 = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const [gallerData, setGallerData] = useState([]);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNavigate = () => {
        navigate('/gallery');
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        appendDots: (dots) => (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                {dots}
            </div>
        ),
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
        ],
    };

    const fetchGallerAPI = async () => {
        try {
            const response = await Network.fetchInstituteDetail(instId);
            setGallerData(response?.institute?.gallery);
            // Endpoints.mediaBaseUrl = response.instituteTechSettingModals.mediaUrl;
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        fetchGallerAPI();
    }, []);

    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '2rem', paddingBottom: isMobile ? '4rem' : '2rem' }}>
            <Grid container spacing={2}>
                {/* <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography
                            fontSize={'20px'}
                            fontWeight={'500'}
                            textAlign={['center', 'start']}
                        >
                            Trending Free Lectures
                        </Typography>
                        <Typography
                            fontSize={'18px'}
                            fontWeight={'500'}
                            textAlign={['center', 'start']}
                        >
                            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        </Typography>
                    </Stack>
                </Grid> */}
                <Grid xs={12} sm={12} md={12} lg={12}>
                    <Slider {...settings}>
                        {
                            gallerData.map((item, i) => (
                                <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    key={i}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        lg={3}
                                        md={3}
                                        sx={{ px: 2, py: 2 }}
                                    >
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "cover",
                                            }}
                                            alt={`Slide ${i}`}
                                            src={`${Endpoints.mediaBaseUrl}${item}`}
                                        />
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Slider>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} display={'flex'} justifyContent={'center'}>
                    <Button
                        sx={{
                            color: '#fff',
                            background: '#1356C5',
                            ":hover": {
                                background: '#1356C5'
                            },
                            textTransform: 'none',
                            p: '7px 20px 7px 20px',
                        }}
                    >
                        Explore More
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeSection5;