import React, { useEffect, useRef } from 'react'
import Endpoints from '../constant/endpoints'
import { Box, Button, IconButton, useMediaQuery } from '@mui/material'
import Network from '../Netwrok'
import HomeSection1 from '../Components/HomeSections/HomeSection1'
import HomeSection2 from '../Components/HomeSections/HomeSection2'
import HomeSection3 from '../Components/HomeSections/HomeSection3'
import HomeSection4 from '../Components/HomeSections/HomeSection4'
import HomeSection5 from '../Components/HomeSections/HomeSection5'
import HomeSection6 from '../Components/HomeSections/HomeSection6'
import HomeSection7 from '../Components/HomeSections/HomeSection7'
import ExploreMoreSection1 from '../Components/ExploreMoreSection/ExploreMoreSection1'

const ExploreMorePage = () => {

    return (
        <div id='homePageCss'>
            <div>
                <ExploreMoreSection1 />
                {/* <MenuBar /> */}
                {/* <HomeSection1 />
                <HomeSection2 /> */}
                {/* <HomeSection3 /> */}
                {/* <HomeSection7 />
                <HomeSection6 /> */}
                {/* <div style={{ position: 'absolute', width: 'fit-content' }}>
                    <div style={{ position: 'fixed', left: '-45px', top: '86%', transform: 'translateY(-50%)', padding: '10px', width: '100%', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <IconButton variant="contained" color="primary"
                            onClick={handleWhatsapp}
                            sx={{
                                textTransform: 'none',
                                background: '#28B71D',
                                boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.24)',
                                borderRadius: '40px',
                                gap: '5px',
                                fontWeight: '600',
                                fontSize: '12px',
                                '&:hover': {
                                    background: '#28B71D',
                                },
                                zIndex: 11111111,
                                width: isMobile ? '9%' : '10%'
                            }}
                        >
                            {
                                isMobile ?
                                    <Box
                                        display={'flex'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        gap={1}
                                        sx={{
                                            color: '#fff'
                                        }}
                                    >
                                        <img alt='' style={{ width: isMobile ? '15%' : '100%' }} src={whatsAppSvg} />
                                        WhatsApp us
                                    </Box>
                                    :
                                    <img alt='' style={{ width: isMobile ? '15%' : '100%' }} src={whatsAppSvg} />
                            }
                        </IconButton>
                    </div>
                </div>
                <div style={{ position: 'absolute', width: 'fit-content' }}>
                    <div style={{ position: 'fixed', left: '-45px', top: '80%', transform: 'translateY(-50%)', padding: '10px', width: '100%', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <IconButton variant="contained" color="primary"
                            onClick={handleRedirectToCall}
                            sx={{
                                textTransform: 'none',
                                background: '#ffc700',
                                boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.24)',
                                borderRadius: '40px',
                                gap: '5px',
                                fontWeight: '600',
                                fontSize: '12px',
                                '&:hover': {
                                    background: '#ffc700',
                                },
                                zIndex: 11111111,
                                width: isMobile ? '9%' : '10%'
                            }}
                        >
                            {
                                isMobile ?
                                    <Box
                                        display={'flex'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        gap={1}
                                        sx={{
                                            color: '#fff'
                                        }}
                                    >
                                        <CallIcon sx={{ cursor: 'pointer', fontSize: '18px' }} />
                                        Call Us Now
                                    </Box> :
                                    <CallIcon sx={{ cursor: 'pointer', fontSize: '18px' }} />
                            }

                        </IconButton>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ExploreMorePage