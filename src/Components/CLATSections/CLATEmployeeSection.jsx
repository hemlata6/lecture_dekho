import { Box, Button, Card, Divider, Grid, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid2';
import employee from '../../Images/employee.svg'
import PropTypes from 'prop-types';
import Network from '../../Netwrok';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import dayjs from 'dayjs';
import instId, { auth } from '../../constant/InstituteId';

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


const CLATEmployeeSection = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const [employees, setEmployees] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0); // State to track the active index
    // const [employee, setEmployee] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 5 : 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        beforeChange: (current, next) => setActiveIndex(next), // Update activeIndex on slide change
        customPaging: (i) => (
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: i === activeIndex ? "#ED1B23" : "#FFD700", // Change color based on active index
                    margin: "0 5px",
                    cursor: "pointer",
                }}
            />
        ),
        appendDots: (dots) => (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                {dots}
            </div>
        ),
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                },
            },
        ],
    };
    const getEmployee = async () => {
        try {
            const response = await Network.fetchEmployee(instId);
            const domainResponse = await Network.fetchDomain();

            // 🔹 **Find the CA Domain**
            const caDomain = domainResponse?.domains.find(domain => domain.name === "CLAT");

            if (!caDomain) {
                console.log("CA domain not found.");
                return;
            }

            // 🔹 **Extract CA Subdomains**
            const caSubdomainIds = caDomain.child.map(sub => sub.id);

            // 🔹 **Filter Employees Matching CA Domain or Subdomains**
            const filterEmployee = response.employees.filter(employee =>
                employee.domains?.some(domain =>
                    domain.id === caDomain.id || caSubdomainIds.includes(domain.id) // ✅ Check if domain or subdomain matches
                )
            );

            setEmployees(filterEmployee); // ✅ Store filtered employees
            console.log("Filtered CA Employees:", filterEmployee);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        getEmployee();
    }, []);

    return (
        <div style={{ paddingTop: isMobile ? '2rem' : '3rem', paddingBottom: isMobile ? '4rem' : '3rem' }}>
            <Grid container spacing={2} sx={{
                width: '98%',
            }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Slider {...settings}>
                        {
                            employees.length > 0 && employees.map((item, index) => {
                                const joiningDate = dayjs(item.joining); // Replace 'item.joining' with the actual key for the joining date
                                const today = dayjs();
                                const years = today.diff(joiningDate, "year");
                                const months = today.diff(joiningDate, "month") % 12;
                                const experience = `${years} Year${years > 1 ? "s" : ""} ${months} Month${months > 1 ? "s" : ""}`;

                                return (
                                    <Box>
                                        <Stack
                                            key={index}
                                            direction={'column'}
                                            sx={{
                                                width: '100%',
                                                maxWidth: isMobile ? '250px' : '250px',
                                                margin: 'auto',
                                            }}
                                        >
                                            <img
                                                alt=""
                                                src={item.profile === null ? employee : Endpoints.mediaBaseUrl + item.image}
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    backgroundColor: '#FFD700',
                                                    borderRadius: '15px 15px 0px 0px',
                                                    py: 1,
                                                }}
                                            >
                                                <Typography
                                                    fontSize={'18px'}
                                                    fontWeight={'500'}
                                                    textAlign={'center'}
                                                    py={0.2}
                                                    color="#ED1B23"
                                                >
                                                    {item?.firstName + ' ' + item?.lastName || 'John Doe'}
                                                </Typography>
                                                <Typography
                                                    fontSize={'14px'}
                                                    fontWeight={'500'}
                                                    textAlign={'center'}
                                                    py={0.2}
                                                    color="#212529"
                                                >
                                                    {item.designation || 'English Language'}
                                                </Typography>
                                                <Typography
                                                    fontSize={'14px'}
                                                    fontWeight={'500'}
                                                    textAlign={'center'}
                                                    py={0.2}
                                                    color="#212529"
                                                >
                                                    {experience || '12 Year Experience'}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                )
                            })
                        }
                    </Slider>
                </Grid>
            </Grid>
        </div>
    )
}

export default CLATEmployeeSection