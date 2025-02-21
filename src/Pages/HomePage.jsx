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
import MenuBar from '../Components/CommanSections/MenuBar'
import FacultySection from './FacultySection'
import CourseSection3 from '../Components/CASections/CourseSection3'
import MostSellingCourse from './MostSellingCourse'

const HomePage = () => {

    // const handleWhatsapp = (event) => {
    //     event.preventDefault();

    //     // Replace the phone number and construct the WhatsApp URL
    //     const phoneNumber = '+919522512624';
    //     const encodedMessage = encodeURIComponent(message);
    //     const whatsappURL = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=Hey,+${encodedMessage}+%21&type=phone_number&app_absent=0`;

    //     // Open the WhatsApp URL in a new tab
    //     window.open(whatsappURL, '_blank');
    // };

    // const handleRedirectToCall = () => {
    //     window.location.href = "tel:+919522512624";
    // };


    return (
        <div id='homePageCss'>
            <div>
                <HomeSection1 />
                {/* <HomeSection2 /> */}
                {/* <CourseSection3 /> */}
                <MostSellingCourse />
                <HomeSection7 />
                <HomeSection6 />
               <FacultySection />
            </div>
        </div>
    )
}

export default HomePage