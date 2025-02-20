import { Button, Card, CardActions, CardContent, TextField, Typography, useMediaQuery, Box, Dialog, Stack, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Grid from '@mui/material/Grid2';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import '../../App.css'
import { FreeMode, Pagination } from 'swiper/modules';
import Network from '../../Netwrok';
import Endpoints from '../../constant/endpoints';
import CloseIcon from '@mui/icons-material/Close';
import instId from '../../constant/InstituteId';

const IPMATBannerSection2 = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const isIpad = useMediaQuery('(min-width:768px) and (max-width:1024px)');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [banners, setBanners] = useState([]);
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [courseId, setCourseId] = useState(0);
    const [openThankYouDialog, setOpenThankYouDialog] = useState(false);
    const [domainData, setDomainData] = useState([]);

    const getDomainList = async () => {
        try {
            const response = await Network.fetchDomain();
            let filterCA = response?.domains.filter((item) => item?.name === "IPMAT");

            if (filterCA.length > 0) {
                setDomainData(filterCA[0].child);
            }
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        getDomainList();
    }, []);

    const handleOpenThankYouDialog = () => {
        setOpenThankYouDialog(true);
    };

    const handleCloseThankYouDialog = () => {
        setOpenThankYouDialog(false);
    };

    const handleChangeCourse = (event) => {
        setCourseId(event.target.value);
    };

    const getAllCourses = async () => {
        const response = await Network.fetchCourses(instId);
        // setCourses(response.courses);
        let activeCourses = [];
        let testSeriesCourses = [];

        response.courses.forEach((course) => {
            if (course.active === true) {
                activeCourses.push(course);
                if (course?.tags && course?.tags.some(tag => tag?.tag === "Website")) {
                    testSeriesCourses.push(course); // Add to testSeriesCourses if tag found
                }
            }
        });
        setCourses(testSeriesCourses);
        // setTestSeries(testSeriesCourses);
    };

    const getBanners = async () => {
        try {
            const response = await Network.fetchBannerss(instId);
            const fetchedBanners = response.banners || [];
            let reusltBanner = [];
            fetchedBanners.forEach((item) => {
                // console.log('item', item)
                if (item?.group === 'Website Top Banner') {
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

    useEffect(() => {
        getAllCourses();
        getBanners();
    }, []);

    useEffect(() => {
        if (banners.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === banners.length - 2 ? 0 : prevIndex + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [banners]);

    useEffect(() => {
        if (currentIndex === banners.length - 2) {
            setBanners([...banners]);
        }
    }, [currentIndex])

    return (
        <div style={{ paddingLeft: isMobile ? '3rem' : '1rem', paddingRight: isMobile ? '3rem' : '1rem', paddingTop: isMobile ? '1rem' : '1', paddingBottom: isMobile ? '1rem' : '2rem', background: '#b7b2b221' }}>
            <Grid container>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                    <Swiper
                        slidesPerView={isIpad ? 2 : 1}
                        spaceBetween={isIpad ? 10 : 20}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {banners.length > 0 &&
                            banners.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            paddingTop: '50.25%', // 16:9 aspect ratio
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            transform: 'scale(1, 0.91)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <img
                                            src={Endpoints?.mediaBaseUrl + img?.banner}
                                            alt={`slide-${index}`}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <iframe style={{ width: '100%', height: '100%', border: 'none' }} src='https://forms.classiolabs.com/?instituteid=152' />
                </Grid>
            </Grid>
            <Dialog
                open={openThankYouDialog}
                onClose={handleCloseThankYouDialog}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                        },
                    },
                }}
            >
                <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'flex-end'} alignItems={'center'} p={1}>
                    <CloseIcon sx={{ cursor: "pointer" }} onClick={handleCloseThankYouDialog} />
                </Stack>
                <Stack direction={'column'} spacing={2} p={4}>
                    <Stack direction={'row'} spacing={2} pb={3}>
                        <Typography
                            fontSize={'20px'}
                            fontWeight={'500'}
                            textAlign={'center'}
                        >
                            Thank You {name}! We will get back to you soon.
                        </Typography>
                    </Stack>
                </Stack>
            </Dialog>
        </div>
    )
};

export default IPMATBannerSection2 