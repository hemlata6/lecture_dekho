import { Box, Card, Divider, Grid, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
// import Grid from '@mui/material/Grid2';
import CounterUp from '../CommanSections/CounterUp';

const HomeSection3 = () => {

    const isMobile = useMediaQuery("(min-width:600px)");

    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '1rem', paddingBottom: isMobile ? '3rem' : '1rem' }}>
            <Grid container>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                    <Stack direction={'column'} spacing={2} alignItems={isMobile ? 'start' : 'center'}>
                        <Typography
                            sx={{
                                background: '#1356C5',
                                color: 'white',
                                padding: 1,
                                fontSize: '18px',
                                fontWeight: 500,
                                width: isMobile ? '24%' : '55%',
                                // width: {xs: '49%', sm: '20%', md: '22%', lg: '22%'},
                            }}
                        >
                            Welcome To ProVidhya
                        </Typography>
                        <Typography
                            color='#000'
                            fontSize={isMobile ? '20px' : '20px'}
                            textAlign={isMobile ? 'start' : 'center'}
                        >
                            ProVidhya, guided by the belief "विद्या धनं सर्वधन प्रधानम्,"
                        </Typography>
                        <Typography
                            color='#002D78'
                            fontSize={isMobile ? '18px' : '18px'}
                            textAlign={isMobile ? 'start' : 'center'}
                        >
                            Empowers students to explore diverse career paths beyond engineering and medicine.
                        </Typography>
                        <Typography
                            color='#000'
                            fontSize={isMobile ? '20px' : '18px'}
                            textAlign={isMobile ? 'start' : 'center'}
                        >
                            We offer personalized mentorship and support for various entrance exams, helping students confidently pursue their dreams and build a bright, Successful future in fields like <span style={{ fontWeight: '600', background: 'yellow', padding: '0.2rem' }}>Law, CA, CS, and Management</span>.
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} py={2}>
                    <Box
                        sx={{
                            background: '#C4C4C4',
                            height: '42vh',
                            width: '100%',
                            borderRadius: '15px'
                        }}
                    >

                    </Box>
                </Grid>
            </Grid>
        </div >
    )
}

export default HomeSection3