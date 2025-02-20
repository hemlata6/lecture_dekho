import { Box, Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Network from "../Netwrok";
import employeesss from '../../src/Images/employee.svg'
import instId from "../constant/InstituteId";
import dayjs from 'dayjs';

const FacultySection = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const settings = {
        // dots: true,
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
    const [activeIndex, setActiveIndex] = useState(0);
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        getEmployee();
    }, []);

    const getEmployee = async () => {
        try {
            const response = await Network.fetchEmployee(instId);
            setEmployee(response?.employees);

        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    console.log('employee', employee);
    

    return (
        <React.Fragment>
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', }}>
            <Grid item xs={12} sm={12} md={12} lg={12}
                sx={{
                    borderRadius: '10px',
                    background: '#fff',
                    py: [2, 3]
                }}
            >
                {/* <Stack direction={'row'} spacing={2}>
                    <Typography
                        sx={{ mb: 3 }}
                        fontSize={'18px'}
                        fontWeight={'600'}
                        textAlign={isMobile ? 'start' : 'center'}
                        py={[0, 3]}
                    >
                        Faculty Profile
                    </Typography>
                </Stack> */}
                {
                    <Slider {...settings}>
                        {
                            employee.length > 0 && employee.map((item, index) => {

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
                                                src={item.profile === null ? employeesss : Endpoints.mediaBaseUrl + item.profile}
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
                }
                  <Box sx={{mt: 3, mb: 3, textAlign: "center"}}>
                  <Button
                  sx={{
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
                  }}
                >
                  Explore Lectures Faculty Wise
                </Button>
                  </Box>
            </Grid>
        </div>
    </React.Fragment>
    )
};

export default FacultySection;