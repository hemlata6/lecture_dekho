import { Box, Button, Card, Divider, Grid, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Network from '../../Netwrok';
import Endpoints from '../../constant/endpoints';
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


const CLATCourseSection = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [courses, setCourses] = useState([]);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const [domainData, setDomainData] = useState([]);
    const [employee, setEmployee] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // 🔹 **Fetch Domain List (CA & Subdomains)**
    const getDomainList = async () => {
        try {
            const response = await Network.fetchDomain();

            // 🔹 **Find the CA Domain**
            const caDomain = response?.domains.find(domain => domain.name === "CLAT");

            if (!caDomain || !caDomain.child) {
                // console.log("CA domain not found or has no subdomains.");
                return;
            }

            // 🔹 **Extract Only CA Subdomains**
            const caSubdomains = caDomain.child; // ✅ Get only subdomains inside "child"

            setDomainData(caSubdomains); // ✅ Store CA subdomains in state
            // console.log("CA Subdomains:", caSubdomains);
        } catch (error) {
            console.error("Error fetching domains:", error);
        }
    };


    // 🔹 **Fetch Courses Related to CA & Subdomains**
    const getAllCourses = async () => {
        try {
            const response = await Network.fetchCourses(instId);
            const domainResponse = await Network.fetchDomain();

            // 🔹 **Find CA Domain**
            const caDomain = domainResponse?.domains.find(d => d.name === "CLAT");
            if (!caDomain) {
                // console.log("CA domain not found.");
                return;
            }

            // 🔹 **Extract CA Subdomains**
            const caSubdomains = caDomain.child; // ✅ Get all CA subdomains (with id, name)

            // 🔹 **Filter Courses Matching CA Subdomains & Trending Tag**
            const caCourses = response.courses.filter(course =>
                course.domain?.some(domain => caSubdomains.some(sub => sub.id === domain.id)) &&
                course.tags?.some(tag => tag.tag === "Trending Courses") // ✅ Filter for Trending Courses
            );

            setDomainData(caSubdomains); // ✅ Store CA subdomains
            setCourses(caCourses); // ✅ Store filtered CA courses
            // console.log("CA Subdomains:", caSubdomains);
            // console.log("Trending Courses Matching CA Subdomains:", caCourses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        getAllCourses();
        getDomainList();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.domain?.some(domain => domain.id === domainData[value]?.id)
    );

    const getEmployee = async () => {
        try {
            const response = await Network.fetchEmployee(instId);
            let filterEmployee = response.employees.filter((item) => item?.group === "CLAT");
            setEmployee(filterEmployee);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log('domainData', domainData);

    useEffect(() => {
        getEmployee();
        getAllCourses();
        getDomainList();
    }, []);

    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '1rem', paddingBottom: isMobile ? '2rem' : '1rem' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ width: '100%' }}>
                        <Stack
                            direction={'row'}
                            justifyContent={'center'}
                            sx={{
                                width: '100%',
                            }}
                        >
                            <AppBar position="static"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // width: '50%',
                                    background: '#fff',
                                    borderRadius: '10px',
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="scrollable"
                                    scrollButtons="auto"
                                >
                                    {domainData.map((item, i) => (
                                        <Tab sx={{ color: "#000" }} key={i} label={item?.name} />
                                    ))}
                                </Tabs>
                            </AppBar>
                        </Stack>
                        {domainData.map((item, index) => (
                            <TabPanel key={index} value={value} index={index}>
                                <Typography variant="h6" fontWeight="bold" pb={2}>
                                    Trending Courses
                                </Typography>
                                {filteredCourses.length > 0 ? (
                                    <Grid container spacing={2} justifyContent="center">
                                        {filteredCourses.map((course, index) => {
                                            // console.log('course', course);
                                            return (
                                                <Grid item key={index} xs={12} sm={6} md={4} lg={3} width={isMobile ? '100%' : '100%'}>
                                                    <Card
                                                        sx={{
                                                            width: '100%',
                                                            maxWidth: '280px',
                                                            border: '1px solid #000',
                                                            borderRadius: '15px',
                                                            boxShadow: '2px 6px 8px',
                                                            transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
                                                            ':hover': {
                                                                boxShadow: '6px 5px 8px',
                                                                transform: 'scale(1.05)',
                                                            },
                                                            height: '100%'
                                                        }}
                                                    >
                                                        <Stack spacing={1} direction="column">
                                                            {/* 🔹 Course Image */}
                                                            <Stack spacing={2} p={1}>
                                                                <img
                                                                    alt={course?.title}
                                                                    src={Endpoints?.mediaBaseUrl + course?.logo}
                                                                    style={{
                                                                        width: '100%',
                                                                        borderRadius: '10px'
                                                                    }}
                                                                />
                                                            </Stack>

                                                            {/* 🔹 Course Title */}
                                                            <Typography
                                                                textAlign={['center', 'start']}
                                                                fontSize={'14px'}
                                                                fontWeight={'700'}
                                                                p={1}
                                                            >
                                                                {course?.title}
                                                            </Typography>

                                                            {/* <Typography>
                                                                {course?.description}
                                                            </Typography> */}

                                                            {/* 🔹 View More Button */}
                                                            <Stack direction="row" spacing={1} p={1} justifyContent={['center', 'start']}>
                                                                <a href={`/course?courseId=${encodeURIComponent(course?.id)}`} style={{ width: '94%' }}>
                                                                    <Button
                                                                        sx={{
                                                                            textTransform: 'none',
                                                                            borderRadius: '5px',
                                                                            background: '#ff3c00',
                                                                            ":hover": {
                                                                                background: '#ff3c00'
                                                                            },
                                                                            fontSize: '12px',
                                                                            color: '#fff',
                                                                            width: '100%'
                                                                        }}
                                                                    >
                                                                        View More
                                                                    </Button>
                                                                </a>
                                                            </Stack>
                                                        </Stack>
                                                    </Card>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                ) : (
                                    <Typography>No trending courses available.</Typography>
                                )}

                            </TabPanel>
                        ))}
                        <Stack direction={'row'} spacing={2} py={2} justifyContent={'center'}>
                            <a href={`/courseDetails?courseName=${encodeURIComponent('CLAT')}`}>
                                <Button
                                    sx={{
                                        background: '#007aff',
                                        color: '#fff',
                                        fontSize: isMobile ? '16px' : '12px',
                                        px: [2, 5],
                                        py: 1,
                                        textTransform: 'capitalize',
                                        '&:hover': {
                                            background: '#007aff',
                                            color: '#fff',
                                        },
                                    }}
                                >
                                    Explore Now
                                </Button>
                            </a>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default CLATCourseSection