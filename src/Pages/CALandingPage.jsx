import React from 'react';
import CourseSection2 from '../Components/CASections/CourseSection2'
import CourseSection3 from '../Components/CASections/CourseSection3'
import CSEmployeeSection from '../Components/CASections/CAEmployeeSection'
import CABannerSection from '../Components/CASections/CABAnnerSection'

const CALandingPage = () => {

    return (
        <div id='homePageCss'>
            <div>
                <CourseSection2 />
                <CourseSection3 />
                <CSEmployeeSection />
                <CABannerSection />
            </div>
        </div>
    )
}

export default CALandingPage