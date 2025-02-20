import { Box, Card, Divider, Grid, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useRef, useState } from 'react'
// import Grid from '@mui/material/Grid2';
import image1 from '../../Images/CA.jpg'
import image2 from '../../Images/CS.jpg'
import image3 from '../../Images/CLAT.jpg'
import image4 from '../../Images/IPM.jpg'

const HomeSection7 = () => {

    const isMobile = useMediaQuery("(min-width:600px)");

    const domains = [
        {
            id: 1,
            domain: 'JEE',
            subDomain: [
                {
                    id: 2,
                    domain: 'JEE Main'
                },
                {
                    id: 3,
                    domain: 'JEE Advance'
                },
            ]
        },
        {
            id: 4,
            domain: 'ITI',
            subDomain: [
                {
                    id: 5,
                    domain: 'ITI Main'
                },
                {
                    id: 6,
                    domain: 'ITI Advance'
                },
            ]
        },
        {
            id: 7,
            domain: 'CAT',
            subDomain: [
                {
                    id: 8,
                    domain: 'CAT Main'
                },
                {
                    id: 9,
                    domain: 'CAT Advance'
                },
            ]
        },
        {
            id: 10,
            domain: 'CAT',
            subDomain: [
                {
                    id: 11,
                    domain: 'CAT Main'
                },
                {
                    id: 12,
                    domain: 'CAT Advance'
                },
            ]
        },
    ];

    const [selectedDomain, setSelectedDomain] = useState(null);

    const handleDomainClick = (domain) => {
        setSelectedDomain(domain.id === selectedDomain?.id ? null : domain);
    };

    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '1rem', paddingBottom: isMobile ? '2rem' : '1rem' }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} py={2}>
                    <Typography
                        fontSize={'25px'}
                        textAlign={'center'}
                        fontWeight={'500'}
                    >
                        Explore Courses by Categories
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}
                    display={{ xs: 'block', sm: 'flex', md: 'flex', lg: 'flex' }}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={2}
                    py={1}
                    
                >
                    <Stack direction={isMobile ? 'row' : 'column'} spacing={[2, 10]} justifyContent={'center'}>
                        <Stack direction={'row'} justifyContent={'center'}>
                            <a href='/CA'>
                                <img
                                    alt=''
                                    src={image1}
                                    style={{
                                        width: '100%',
                                        maxWidth: '280px',
                                        borderRadius: '10px'
                                    }}
                                />
                            </a>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'center'}>
                            <a href='/CS'>
                                <img
                                    alt=''
                                    src={image2}
                                    style={{
                                        width: '100%',
                                        maxWidth: '280px',
                                        borderRadius: '10px'
                                    }}
                                />
                            </a>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'center'}>
                            <a href='/CLAT'>
                                <img
                                    alt=''
                                    src={image3}
                                    style={{
                                        width: '100%',
                                        maxWidth: '280px',
                                        borderRadius: '10px'
                                    }}
                                />
                            </a>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'center'}>
                            <a href='/IPMAT-CUET'>
                                <img
                                    alt=''
                                    src={image4}
                                    style={{
                                        width: '100%',
                                        maxWidth: '280px',
                                        borderRadius: '10px'
                                    }}
                                />
                            </a>
                        </Stack>
                    </Stack>
                </Grid>
                {/* <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={5}
                    py={2}
                >
                    {
                        domains.map((item, index) => {
                            return (
                                <Box
                                    key={index}
                                    onClick={() => handleDomainClick(item)}
                                    sx={{
                                        border: '1px solid #000',
                                        width: '10%',
                                        p: 1,
                                        cursor: 'pointer',
                                        backgroundColor: selectedDomain?.id === item.id ? '#f0f0f0' : '#fff',
                                        ":hover": {
                                            background: '#1356C5'
                                        }
                                    }}
                                >
                                    <Typography
                                        fontSize={'14px'}
                                        textAlign={'center'}
                                        sx={{
                                            cursor: 'pointer',
                                            // backgroundColor: selectedDomain?.id === item.id ? '#f0f0f0' : '#fff',
                                            ":hover": {
                                            background: '#1356C5'
                                        }
                                        }}
                                    >
                                        {item?.domain}
                                    </Typography>
                                </Box>
                            )
                        })
                    }
                </Grid>
                {
                    selectedDomain && (
                        <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                            <Typography
                                fontSize="20px"
                                textAlign="center"
                                fontWeight="500"
                                mt={2}
                            >
                                Subdomains for {selectedDomain.domain}
                            </Typography>
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                gap={2}
                                mt={2}
                            >
                                {selectedDomain.subDomain.map((sub) => (
                                    <Box
                                        key={sub.id}
                                        sx={{
                                            border: '1px solid #000',
                                            width: '15%',
                                            p: 1,
                                            textAlign: 'center',
                                            backgroundColor: '#f9f9f9',
                                        }}
                                    >
                                        <Typography fontSize="14px">{sub.domain}</Typography>
                                    </Box>
                                ))}
                            </Grid>
                        </Grid>
                    )
                } */}
            </Grid>
        </div >
    )
}

export default HomeSection7