import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import '../src/index.css'
import Network from './Netwrok';
import { useMediaQuery } from '@mui/material';
import Endpoints from './constant/endpoints';
import CALandingPage from './Pages/CALandingPage';
import CSLandingPage from './Pages/CSLaningPage';
import CLATLandingPage from './Pages/CLATLandingPage';
import IPMATLandingPage from './Pages/IPMMATLandingPage';
import ExploreMorePage from './Pages/ExploreMorePage';
import AboutSectionPage from './Pages/AboutSectionPage';
import CoursePage from './Pages/CoursePage';
import instId from './constant/InstituteId';
import PrivacyAndPolicy from './Components/CommanSections/PrivacyAndPolicy';
import TermsAndConditions from './Components/CommanSections/TermsAndConditions';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import MultipleCourseCart from './Components/ExploreMoreSection/MultiplaCourseCart';
import NavBarTwo from './Components/CommanSections/NavBarTwo';
import Footer from './Components/CommanSections/Footer';
import HomeSection4 from './Components/HomeSections/HomeSection4';
import ExploreAllCourses from './Pages/ExploreAllCourse';

function App() {

  const downloadAppRef = useRef(null);

  useEffect(() => {
    getInstituteDetail();
  }, []);


  useEffect(() => {
    if (window.location.hash === "#downloadOurApp") {
      downloadAppRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const getInstituteDetail = async () => {
    try {
      let response = await Network.fetchInstituteDetail(instId);
      Endpoints.mediaBaseUrl = response?.instituteTechSetting?.mediaUrl
      // setGalleryList(response?.institute?.gallery);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BrowserRouter>
      <NavBarTwo downloadAppRef={downloadAppRef} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Explore-all' element={<ExploreAllCourses />} />
        <Route path='/CA' element={<CALandingPage />} />
        <Route path='/CS' element={<CSLandingPage />} />
        <Route path='/CLAT' element={<CLATLandingPage />} />
        <Route path='/IPMAT-CUET' element={<IPMATLandingPage />} />
        <Route path='/courseDetails' element={<ExploreMorePage />} />
        <Route path='/about' element={<AboutSectionPage />} />
        <Route path='/course' element={<CoursePage />} />
        <Route path='/cart-courses' element={<MultipleCourseCart />} />
        <Route path='/Privacy-policy' element={<PrivacyAndPolicy />} />
        <Route path='/terms-conditions' element={<TermsAndConditions />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
      <div ref={downloadAppRef}>
        <Footer />
      </div>
      {/* <a href="tel:9589613810">
        <button class="btn-floating phone">
          <img src="https://i.imgur.com/FZuns9L.png" alt="Phone" />
          <span>9589613810</span>
        </button>
      </a> */}
      {/* <FloatingWhatsApp /> */}
    </BrowserRouter>
  )
}

export default App
