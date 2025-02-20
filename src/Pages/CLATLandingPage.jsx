import React, { useEffect, useRef } from 'react'
import CLATBannerSection1 from '../Components/CLATSections/CLATBannerSection1'
import CLATBannerSection from '../Components/CLATSections/CLATBanner'
import CLATCourseSection from '../Components/CLATSections/CLATCoursesSection'
import CLATEmployeeSection from '../Components/CLATSections/CLATEmployeeSection';

const CLATLandingPage = () => {


    return (
        <div id='homePageCss'>
            <div>
                {/* <CourseSection1 /> */}
                {/* <CourseSection2 /> */}
                {/* <CourseSection3 /> */}
                <CLATBannerSection1 />
                <CLATCourseSection />
                <CLATEmployeeSection />
                <CLATBannerSection />
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

export default CLATLandingPage