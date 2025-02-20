import { Box, Card, Divider, Grid, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
// import Grid from '@mui/material/Grid2';

const AboutSection1 = () => {

    const isMobile = useMediaQuery("(min-width:600px)");

    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '1rem', paddingBottom: isMobile ? '2rem' : '1rem' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography
                            fontSize={'25px'}
                            fontWeight={'600'}
                            fontFamily={`"Poppins", serif`}
                            textAlign={isMobile ? 'start' : 'center'}
                            color='#1356C5'
                        >
                            About ProVidhya
                        </Typography>
                        <Typography
                            fontSize={'20px'}
                            fontWeight={'500'}
                            fontFamily={`"Poppins", serif`}
                            textAlign={isMobile ? 'start' : 'center'}
                            color='#1356C5'
                        >
                            'विद्या धनं सर्वधन प्रधानम्'<br />
                            'Knowledge is the supreme wealth among all kinds of wealth'
                        </Typography>
                        <Typography
                            fontSize={'18px'}
                            // fontWeight={'500'}
                            fontFamily={`"Poppins", serif`}
                            textAlign={isMobile ? 'start' : 'center'}
                            lineHeight={'35px'}
                        >
                            At ProVidhya, we believe that the journey of choosing a career begins as early as Class X, when students start deciding their academic streams, whether it's Commerce, PCM, PCB, or Humanities. While many think that PCM and PCB only lead to engineering or medical fields, we aim to break this misconception.
                        </Typography>
                        <Typography
                            fontSize={'18px'}
                            // fontWeight={'500'}
                            fontFamily={`"Poppins", serif`}
                            textAlign={isMobile ? 'start' : 'center'}
                            lineHeight={'35px'}
                        >
                            Careers in fields like Law, Chartered Accountancy (CA), Company Secretaryship (CS), Management, and other professional areas are equally fulfilling and offer fantastic opportunities. That’s why we have created a platform where students can explore and succeed in CA, CS, CLAT, Other Law Entrances, IPM-CUET, and other Management Entrances, all under one roof.
                        </Typography>
                        <Typography
                            fontSize={'18px'}
                            // fontWeight={'500'}
                            fontFamily={`"Poppins", serif`}
                            textAlign={isMobile ? 'start' : 'center'}
                            lineHeight={'35px'}
                        >
                            What makes ProVidhya special is our strong dedication to Academics and Pro-Academics. Our experienced mentors and leadership team provide personalized mentorship that focuses on each student’s individual growth and success in their chosen field.
                        </Typography>
                        <Typography
                            fontSize={'18px'}
                            // fontWeight={'500'}
                            fontFamily={`"Poppins", serif`}
                            textAlign={isMobile ? 'start' : 'center'}
                            lineHeight={'35px'}
                        >
                            Our mission is to help students confidently explore career paths “beyond Engineering and Medicine” and achieve their dreams. With ProVidhya, every student can find fantastic opportunities to build a bright future.
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default AboutSection1