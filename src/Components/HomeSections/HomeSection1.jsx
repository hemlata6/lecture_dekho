import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid2';
import { Button, Grid, useMediaQuery } from '@mui/material';
import CustomCarousel from '../CommanSections/CustomCarousel';
import Network from '../../Netwrok';
import instId from '../../constant/InstituteId';

const HomeSection1 = () => {

  const isMobile = useMediaQuery("(min-width:600px)");
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    try {
      const response = await Network.fetchBannerss(instId);
      const fetchedBanners = response.banners || [];
      let reusltBanner = [];
      fetchedBanners.forEach((item) => {
        // console.log('item', item)
        if (item?.group === 'Website Top Banner') {
          reusltBanner.push(item);
        };
      })
      // setBanners(reusltBanner || []);
      if (reusltBanner.length > 0) {
        const extendedBanners = [...reusltBanner, reusltBanner[0]];
        setBanners(extendedBanners);
      } else {
        setBanners([]);
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error);
      setBanners([]);
    }
  };

  return (
    <div style={{ paddingLeft: isMobile ? '0rem' : '0rem', paddingRight: isMobile ? '0rem' : '0rem', paddingTop: isMobile ? '0rem' : '0rem', paddingBottom: isMobile ? '2rem' : '0rem' }}>
      <Button sx={{
        width: "100%",
        background: '#FDA41D',
        color: '#fff',
        fontSize: isMobile ? '16px' : '12px',
        fontWeight: "bold",
        px: [2, 6],
        py: 1,
        textTransform: 'capitalize',
        '&:hover': {
          background: '#FDA41D',
          color: '#fff',
        },
      }}>For Enquiry : 9039946454</Button>
      {banners?.length > 0 && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ background: '#b7b2b221', py: [1, 3], width: "100%" }}>
            <CustomCarousel banners={banners} setBanners={setBanners} />
          </Grid>
        </Grid>
      )}

    </div>
  )
}

export default HomeSection1