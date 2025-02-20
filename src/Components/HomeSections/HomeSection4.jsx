import { Box, Grid, Paper, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
// import Grid from '@mui/material/Grid2';
import Group1000001779 from '../../Images/Group1000001779.svg';
import PhoneIcon from '../../Images/PhoneIcon.svg';
import TabletIcon from '../../Images/TabletIcon.svg';
import desktopIcon from '../../Images/desktopIcon.svg';
import playStore from '../../Images/playStore1.svg';
import appStore from '../../Images/appStore.svg';
import windowsStore from '../../Images/windowsStore.svg';

const HomeSection4 = () => {

    const isMobile = useMediaQuery("(min-width:600px)");

    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '0.5rem', paddingBottom: isMobile ? '2rem' : '0.5rem' }}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={5} md={5} lg={5}
                    display={'flex'}
                    justifyContent={['center', 'start']}
                    alignItems={'center'}
                >
                    <img style={{ position: 'relative', top: isMobile ? '84px' : '0px', width: isMobile ? '90%' : '80%' }} alt='' src={Group1000001779} />
                </Grid>
                <Grid xs={12} sm={7} md={7} lg={7}>
                    <Grid container spacing={2} sx={{ marginLeft: 0, pl: 1.5, pr: 1.5 }}>
                        <Grid xs={12} sm={12} md={12} lg={12}>
                            <Stack direction={'column'} spacing={2}>
                                <Typography
                                    textAlign={['center', 'start']}
                                    fontSize={['20px', '30px']}
                                    fontWeight={'500'}
                                    color='#000'
                                >
                                    <span style={{ color: '#002B77', fontSize: isMobile ? '35px' : '25px', fontWeight: '600' }}>ProVidhya</span> is now available on all the platforms
                                    Get the Powerful Learning App
                                </Typography>
                                <Typography
                                    textAlign={['center', 'start']}
                                    fontSize={['16px', '20px']}
                                    fontWeight={'bold'}
                                    color='#4E4B66'
                                >
                                    Download lessons and learn anytime, anywhere just made for your ease of learning
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={12}>
                            <Stack direction={'row'} display={isMobile ? 'flex' : ''} justifyContent={'start'} alignItems={'center'} gap={['1rem', '1rem']} mt={2}>
                                <Tooltip title="Coming Soon" placement="right">
                                    <Paper
                                        sx={{
                                            padding: '1rem'
                                        }}
                                    >
                                        <Box display={isMobile ? '' : 'none'}>
                                            <Box display={'flex'} justifyContent={'center'}>
                                                <img style={{ width: '100%', height: "77px" }} alt='' src={PhoneIcon} />
                                            </Box>
                                            <Typography
                                                textAlign={'center'}
                                                fontSize={'14px'}
                                                fontWeight={'bold'}
                                            >
                                                Mobile
                                            </Typography>
                                            <Typography
                                                textAlign={'center'}
                                                fontSize={'14px'}
                                                color='#6E7191'
                                            >
                                                IOS & Android
                                            </Typography></Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <img
                                                alt=''
                                                src={playStore}
                                                style={{
                                                    position: 'relative',
                                                    // right: isMobile ? '0.5rem' : '1rem',
                                                    width: '100%',
                                                    maxWidth: '100px'
                                                }}
                                            />
                                        </Box>
                                    </Paper>
                                </Tooltip>
                                <Tooltip title="Coming Soon" placement="right">
                                    <Paper
                                        sx={{
                                            padding: '1rem'
                                        }}
                                    >
                                        <Box display={isMobile ? '' : 'none'}>
                                            <Box display={'flex'} justifyContent={'center'} py={1}>
                                                <img style={{ width: '100%', height: "60px" }} alt='' src={TabletIcon} />
                                            </Box>
                                            <Typography
                                                textAlign={'center'}
                                                fontSize={'14px'}
                                                fontWeight={'bold'}
                                            >
                                                Tablets
                                            </Typography>
                                            <Typography
                                                textAlign={'center'}
                                                fontSize={'14px'}
                                                color='#6E7191'
                                            >
                                                Android & iPAD
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}> <img
                                            style={{
                                                position: 'relative',
                                                // right: isMobile ? '0.5rem' : '1rem',
                                                width: '100%',
                                                maxWidth: '100px'
                                            }}
                                            alt=''
                                            src={appStore}
                                        /></Box>
                                    </Paper>
                                </Tooltip>
                                <Tooltip title="Coming Soon" placement="right">
                                    <Paper
                                        sx={{
                                            padding: '1rem'
                                        }}
                                    >
                                        <Box display={isMobile ? '' : 'none'}>
                                            <Box display={'flex'} justifyContent={'center'} py={1}>
                                                <img style={{ width: '100%', height: "60px" }} alt='' src={desktopIcon} />
                                            </Box>
                                            <Typography
                                                textAlign={'center'}
                                                fontSize={'14px'}
                                                fontWeight={'bold'}
                                            >
                                                Desktops
                                            </Typography>
                                            <Typography
                                                textAlign={'center'}
                                                fontSize={'14px'}
                                                color='#6E7191'
                                            >
                                                All Browsers
                                            </Typography>

                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <img
                                                style={{
                                                    position: 'relative',
                                                    // right: isMobile ? '0.5rem' : '1rem',
                                                    width: '100%',
                                                    maxWidth: '100px'
                                                }}
                                                alt=''
                                                src={windowsStore}
                                            />
                                        </Box>
                                    </Paper>
                                </Tooltip>
                            </Stack>
                        </Grid>
                        {/* <Grid xs={12} sm={12} md={12} lg={12} width={'100%'}>
                            <Stack direction={'row'} spacing={2} display={isMobile ? 'flex' : 'grid'} justifyContent={isMobile ? 'start' : 'center'} alignItems={'center'} gap={['1rem', '3.5rem']}>
                                <img
                                    alt=''
                                    src={playStore}
                                    style={{
                                        width: '100%',
                                        maxWidth: '170px'
                                    }}
                                />
                                <img
                                    style={{
                                        position: 'relative',
                                        right: isMobile ? '0.5rem' : '1rem',
                                        width: '100%',
                                        maxWidth: '170px'
                                    }}
                                    alt=''
                                    src={appStore}
                                />
                                <img
                                    style={{
                                        position: 'relative',
                                        right: isMobile ? '0.5rem' : '1rem',
                                        width: '100%',
                                        maxWidth: '170px'
                                    }}
                                    alt=''
                                    src={windowsStore}
                                />
                            </Stack>
                        </Grid> */}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeSection4