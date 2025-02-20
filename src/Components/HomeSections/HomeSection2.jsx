import { Box, Card, Divider, Grid, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
// import Grid from '@mui/material/Grid2';
import CounterUp from '../CommanSections/CounterUp';

const HomeSection2 = () => {

    const isMobile = useMediaQuery("(min-width:600px)");

    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '1rem', paddingBottom: isMobile ? '2rem' : '1rem' }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box
                        sx={{
                            // width: '100%',
                            p: isMobile ? 4 : 1,
                            boxShadow: '#3e7add82 2px 6px 18px 0px',
                            borderRadius: '15px'
                        }}
                    >
                        <Stack direction={'column'} spacing={2}>
                            <Typography
                                fontSize={'20px'}
                                fontWeight={'600'}
                                textAlign={'start'}
                            >
                                At ProVidhya, You will get
                            </Typography>
                            <Grid container sx={{justifyContent: "space-around"}}>
                                <Grid item  xs={12} sm={3} md={3} lg={3}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        py: [1, 2]
                                    }}
                                >
                                    <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                                        <CounterUp target={8000} duration={1} />
                                        <Typography>
                                            Learning Hours
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs={12} sm={3} md={3} lg={3}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        py: [1, 2]
                                    }}
                                >
                                    <Stack direction={'column'}>
                                        <Typography
                                            textAlign={'center'}
                                            color='#1356C5'
                                            fontSize={'2rem'}
                                            fontWeight={'bold'}
                                        >
                                            1:1
                                        </Typography>
                                        <Typography>
                                            Mentorship or DCS
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs={12} sm={3} md={3} lg={3}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        py: [1, 2]
                                    }}
                                >
                                    <Stack direction={'column'}>
                                        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                            <CounterUp target={23} duration={1} />
                                            <Typography
                                                color='#1356C5'
                                                fontSize={'2rem'}
                                            >
                                                Yrs
                                            </Typography>
                                        </Stack>
                                        <Typography>
                                            Experience Faculties
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs={12} sm={2.5} md={2.5} lg={2.5}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        py: [1, 2]
                                    }}
                                >
                                    <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                                        <Stack direction={'row'} alignItems={'center'}>
                                            <CounterUp target={100} duration={1} />
                                        </Stack>
                                        <Typography>
                                            All India Rank
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}

export default HomeSection2