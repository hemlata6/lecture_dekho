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

const HomeSection6 = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const [gallerData, setGallerData] = useState([]);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNavigate = () => {
        navigate('/gallery');
    };

    const settings = {
        dots: true, // Enable dots for navigation
        infinite: true, // Infinite looping
        speed: 500, // Transition speed
        slidesToShow: 1, // Show one image at a time
        slidesToScroll: 1, // Scroll one image at a time
        autoplay: true, // Enable autoplay
        autoplaySpeed: 2000, // Autoplay speed in milliseconds
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
    };

    const [banners, setBanners] = useState([]);

    const getBanners = async () => {
        try {
            const response = await Network.fetchBannerss(instId);
            const fetchedBanners = response.banners || [];
            let reusltBanner = [];
            fetchedBanners.forEach((item) => {
                // console.log('item', item)
                if (item?.group === 'Website footer banner') {
                    reusltBanner.push(item);
                };
            })
            // setBanners(reusltBanner || []);
            if (reusltBanner.length > 0) {
                const extendedBanners = [...reusltBanner, reusltBanner[0]];
                setBanners(extendedBanners);
            } else {
                setBanners([]);
            }
        } catch (error) {
            console.error('Failed to fetch banners:', error);
            setBanners([]);
        }
    };


    // const fetchGallerAPI = async () => {
    //     try {
    //         const response = await Network.fetchInstituteDetail(instId);
    //         setGallerData(response?.institute?.gallery);
    //         // Endpoints.mediaBaseUrl = response.instituteTechSettingModals.mediaUrl;
    //     } catch (error) {
    //         console.log(error);
    //     };
    // };

    useEffect(() => {
        // fetchGallerAPI();
        getBanners();
    }, []);

    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '2rem', paddingBottom: isMobile ? '4rem' : '2rem' }}>
            <Grid container>
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
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Slider {...settings}>
                        {
                            banners.map((item, i) => (
                                <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    key={i}
                                >
                                    <Grid
                                    className='aaaaaaaaaa'
                                        item
                                        xs={12}
                                        sm={3}
                                        lg={12}
                                        md={3}
                                        sx={{ px: 0, py: 2 }}
                                        display={'flex'}
                                        justifyContent={'center'}
                                    >
                                        <img
                                            style={{
                                                width: "100%",
                                                height: isMobile ? "60vh" : "25vh",
                                                // objectFit: "cover",
                                            }}
                                            alt={`Slide ${i}`}
                                            src={`${Endpoints.mediaBaseUrl}${item?.banner}`}
                                        />
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Slider>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeSection6;