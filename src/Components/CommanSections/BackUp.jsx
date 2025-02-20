import { useMediaQuery, Box, Button, Typography, Drawer, List, ListItem, ListItemButton, Collapse, IconButton, MenuItem, Avatar, Menu, Badge, ListItemText, Chip, Dialog, Stack, Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import Logo from './Images/logo.svg'
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Logo from '../../Images/logo.svg';
import { useNavigate } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import upscSyllabusPdf from '../pdfFile/UPSC-Syllabus--PDF.pdf';
// import mppscSyllabusPdf from '../pdfFile/MPPSC SYLLABUS PRE+MAINS.pdf';
// import axios from 'axios';
// import Papa from 'papaparse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import Network from '../Network';
// import Grid from '@mui/material/Grid2';
import moment from 'moment';
import Network from '../../Netwrok';
import Vector from '../../Images/Vector.svg'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import instId, { auth } from '../../constant/InstituteId';

const NavBarTwo = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState('Home');
    const [anchorElOnlineCourse, setAnchorElOnlineCourse] = useState(null);
    const [anchorEScholarship, setanchorEScholarship] = useState(null);
    const [anchorAbout, setanchorAbout] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const openOnlineCourse = Boolean(anchorElOnlineCourse);
    const openSholarship = Boolean(anchorEScholarship);
    const openAbout = Boolean(anchorAbout);
    const [openLeft, setOpenLeft] = useState(false);
    const [openScholarshipExp, setOpenScholarshipExp] = useState(false);
    const [openAboutUs, setOpenAboutUs] = useState(false);
    const [openCourse, setOpenCourse] = React.useState(false);
    const [openAnnouncement, setOpenAnnouncement] = React.useState(false);
    const [openContactUs, setOpenContactUs] = React.useState(false);
    const [courses, setCourses] = useState([]);
    const [testSeries, setTestSeries] = useState([]);
    const [isSticky, setIsSticky] = useState(false);
    const [anncouncementData, setAnncouncementData] = useState([]);

    const handleClickCourse = (event) => {
        setOpenCourse((prevOpen) => !prevOpen);
        event.stopPropagation();
    };
    const handleOpenContactUs = (event) => {
        setOpenContactUs(true);
        event.stopPropagation();
    };

    const handleBuyCourse = (item) => {
        // navigate(`/courseDetails/${item?.id}`);
        // navigate(`https://course.classiolabs.com/course/${item?.id}`);
        const url = `https://course.classiolabs.com/course/${item?.id}`
        window.open(url, '_blank', 'noreferrer');
        handleClose();
        handleCloseOnlineCourse();
    };

    const getAllAnnouncement = async () => {
        const response = await Network.fetchAnnouncementUrl(instId);
        setAnncouncementData(response?.announcement);
    };

    const [domainData, setDomainData] = useState([]);

    const getDomainList = async () => {
        try {
            const response = await Network.fetchDomain();
            setDomainData(response?.domains);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        getDomainList();
        getAllAnnouncement();
    }, []);

    const getAllCourses = async () => {
        const response = await Network.fetchCourses(instId);
        // setCourses(response.courses);
        let activeCourses = [];
        let testSeriesCourses = [];

        response.courses.forEach((course) => {
            if (course.active === true) {
                activeCourses.push(course);
                if (course?.tags && course?.tags.some(tag => tag?.tag === "Website")) {
                    testSeriesCourses.push(course); // Add to testSeriesCourses if tag found
                }
            }
        });
        setCourses(activeCourses);
        setTestSeries(testSeriesCourses);
    };

    useEffect(() => {
        getAllCourses();
    }, []);

    const handleClickOnlineCourse = (event) => {
        setAnchorElOnlineCourse(event.currentTarget);
    };

    const handleClickAboutUs = (event) => {
        setanchorAbout(event.currentTarget);
    };
    const handleClickCloseAboutUs = (event) => {
        setanchorAbout(null);
    };

    const handleCloseScholarship = (event) => {
        setanchorEScholarship(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseOnlineCourse = () => {
        setAnchorElOnlineCourse(null);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpenLeft(newOpen);
    };

    const handleNavigateWeb = () => {
        const url = 'https://amber-jordan-31.tiiny.site'
        window.open(url, '_blank', 'noreferrer');
    };
    const handleNavigatePragyan = () => {
        const url = 'https://pragyan.classiolabs.com/'
        window.open(url, '_blank', 'noreferrer');
    };
    const handleNavigateAPRE = () => {
        const url = 'https://apre.aurousacademy.com'
        window.open(url, '_blank', 'noreferrer');
    };

    const handleNavBarClick = (e, course) => {
        setSelectedCourse(course);
        if (course === 'Home') {
            navigate('/');
        };
    };

    const handleOpenNavMen2Close = () => {
        setOpenLeft(false);
    };

    const handleOpenNavMenu2 = () => {
        setOpenLeft(true);
    };

    const handlePlayStore = () => {
        const section5Element = document.querySelector('.home-section-5');
        if (section5Element) {
            section5Element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleOpenAnnouncement = () => {
        setOpenAnnouncement(true);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListItem sx={{ display: 'flex', justifyContent: 'end' }}>
                    <CloseIcon onClick={handleOpenNavMen2Close} />
                </ListItem>
                <ListItem
                    sx={{
                        cursor: 'pointer'
                    }}
                >
                    <img onClick={(e) => handleNavBarClick(e, 'About Aurous')} style={{ cursor: 'pointer' }} width={'90%'} alt='' src={Logo} />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={(e) => handleDownloadPdf(e, 'apre')}>
                        <Typography
                            variant="body1" sx={{
                                fontSize: '1.2rem',
                                ':hover': {
                                    color: '#DD4223'
                                },
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                width: '100%'
                            }} >
                            Scholarship Events
                            {/* {openScholarshipExp === true ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
                        </Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleClickCourse} >
                        <Typography
                            variant="body1" sx={{
                                fontSize: '1.2rem',
                                ':hover': {
                                    color: '#DD4223'
                                },
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                width: '100%'
                            }} >
                            Courses
                            {openCourse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </Typography>
                    </ListItemButton>
                </ListItem>
                <Collapse in={openCourse} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {courses && courses.map((filteredCourse, index) => (
                            <ListItemButton key={index} sx={{ fontSize: '15px' }} onClick={() => handleBuyCourse(filteredCourse)}>
                                {filteredCourse.title}
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
                <ListItem disablePadding>
                    <ListItemButton >
                        {/* <Badge badgeContent={<p style={{ fontSize: 10 }}>Soon</p>} color='error' > */}
                        <Typography
                            onClick={handleNavigateWeb}
                            variant="body1" sx={{
                                fontSize: '1.2rem',
                                ':hover': {
                                    color: '#DD4223'
                                },
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                width: '100%'
                            }} >
                            Academic
                        </Typography>
                        {/* </Badge> */}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        {/* <Badge badgeContent={<p style={{ fontSize: 10 }}>Soon</p>} color='error' > */}
                        <Typography
                            onClick={handleOpenContactUs}
                            variant="body1" sx={{
                                fontSize: '1.2rem',
                                ':hover': {
                                    color: '#DD4223'
                                },
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                width: '100%'
                            }} >
                            Student Zone
                        </Typography>
                        {/* </Badge> */}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        {/* <Badge badgeContent={<p style={{ fontSize: 10 }}>Soon</p>} color='error' > */}
                        <Typography
                            onClick={handleNavigateWeb}
                            variant="body1" sx={{
                                fontSize: '1.2rem',
                                ':hover': {
                                    color: '#DD4223'
                                },
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                width: '100%'
                            }} >
                            Result
                        </Typography>
                        {/* </Badge> */}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleOpenAnnouncement} >
                        <Typography
                            variant="body1" sx={{
                                fontSize: '1.2rem',
                                ':hover': {
                                    color: '#DD4223'
                                },
                                display: 'flex',
                                justifyContent: 'start',
                                gap: '0.5rem',
                                alignItems: 'center',
                                cursor: 'pointer',
                                width: '100%'
                            }} >
                            Resources
                            {/* <img alt='' src={new_icon_blink1} /> */}
                        </Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <Button
                        onClick={handlePlayStore}
                        sx={{
                            color: '#fff',
                            background: '#003085',
                            // border: '1px solid #065290',
                            ':hover': {
                                background: '#003085',
                            },
                            fontWeight: '500',
                            textTransform: 'none',
                            borderRadius: '4px',
                            paddingRight: '2rem',
                            paddingLeft: '2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <PersonOutlineOutlinedIcon sx={{ fontSize: '18px' }} />
                        Student Login
                    </Button>
                </ListItem>
            </List>
        </Box>
    );

    const handleDownloadPdf = (e, value) => {
        if (value === 'pragyan') {
            handleNavigatePragyan();
        } else if (value === 'apre') {
            handleNavigateAPRE();
        } else if (value === 'aboutUs') {
            handleNavigateAboutUs();
        } else if (value === 'ourTeam') {
            handleNavigateOurTeam();
        }
    };

    useEffect(() => {
        // getInstituteDetail();
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavigateAboutUs = () => {
        navigate('/about');
    };
    const handleNavigateOurTeam = () => {
        navigate('/ourTeam');
    };

    const [selectedDomain, setSelectedDomain] = useState(null);
    // const [anchorElSubMenu, setAnchorElSubMenu] = useState(null);
    // const [subDomains, setSubDomains] = useState([]);

    // const handleDomainClick = (event, domain) => {
    //     if (domain.child?.length) {
    //         setAnchorElSubMenu(event.currentTarget);
    //         setSubDomains(domain.child);
    //     } else {
    //         setAnchorElSubMenu(null);
    //         handleBuyCourse(domain);
    //     }
    // };

    // const handleCloseSubMenu = () => {
    //     setAnchorElSubMenu(null);
    //     setSubDomains([]);
    // };

    // const [anchorElOnlineCourse, setAnchorElOnlineCourse] = useState(null);
    const [anchorElSubMenu, setAnchorElSubMenu] = useState(null);
    // const [openOnlineCourse, setOpenOnlineCourse] = useState(false);
    const [subDomains, setSubDomains] = useState([]);

    const handleDomainClick = (event, item) => {
        if (item.child?.length) {
            setAnchorElSubMenu(event.currentTarget); // Set the anchor element
            setSubDomains(item.child); // Set subdomains for rendering
        } else {
            setAnchorElSubMenu(null); // Close submenu if no children
        }
    };


    const handleCloseSubMenu = () => {
        setAnchorElSubMenu(null);
    };

    const handleOpenMenu = (event) => {
        setAnchorElOnlineCourse(event.currentTarget);
        // setOpenOnlineCourse(true);
    };

    const handleCloseMenu = () => {
        setAnchorElOnlineCourse(null);
        // setOpenOnlineCourse(false);
        handleCloseSubMenu();
    };

    const domainList = [
        {
            id: 326,
            name: 'CA Final',
            parentId: '420',
            child: [
                {
                    id: 329,
                    name: 'CA Final 11',
                    parentId: '420',
                    child: null
                }
            ]
        },
        {
            id: 328,
            name: 'CA Final Final',
            parentId: '420',
            child: null
        },
    ]


    console.log('subDomains', subDomains)

    const renderDomainMenu = (domainData, courses, handleDomainClick, handleCloseSubMenu) => {
        const getMatchingCourses = (domainId) => {
            return courses.filter(course =>
                course.domain?.some(domain => domain.id === domainId)
            );
        };

        return (
            <Menu
                anchorEl={anchorElOnlineCourse}
                id="account-menu"
                open={openOnlineCourse}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {domainData.map((item) => {
                    const matchingCourses = getMatchingCourses(item.id);

                    // console.log('item.id:', item.id);
                    console.log('matchingCourses:', item.id, matchingCourses);

                    return (
                        <MenuItem
                            key={item.id}
                            onClick={(event) => handleDomainClick(event, item)}
                            sx={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}
                        >
                            {item.name}
                            {(item.child?.length || matchingCourses.length) ? <ArrowRightIcon /> : null}

                            {item.child?.length || matchingCourses.length ? (
                                <Popover
                                    open={Boolean(anchorElSubMenu) && subDomains === item.child}
                                    anchorEl={anchorElSubMenu}
                                    onClose={handleCloseSubMenu}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    PaperProps={{
                                        sx: {
                                            mt: 1,
                                            p: 0,
                                        },
                                    }}
                                >
                                    {/* Recursive call for child items */}
                                    {item.child?.length && renderDomainMenu(item?.child, courses, handleDomainClick, handleCloseSubMenu)}

                                    {
                                        matchingCourses.map((item, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    onClick={() => handleBuyCourse(item)}
                                                    sx={{ fontSize: '14px', pl: 4 }}
                                                >
                                                    {item.title}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                    {/* Display matching courses */}
                                    {/* {matchingCourses.map(course => (
                                   <MenuItem
                                       key={course.id}
                                       onClick={() => handleBuyCourse(course)}
                                       sx={{ fontSize: '14px', pl: 4 }}
                                   >
                                       {course.title}
                                   </MenuItem>
                               ))} */}
                                </Popover>
                            ) : null}
                        </MenuItem>
                    );
                })}
            </Menu>
        );
    };

    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '0rem', paddingRight: isMobile ? '6rem' : '0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', background: '#fff' }}>
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                        <img alt='' onClick={(e) => handleNavBarClick(e, 'Home')} style={{ cursor: 'pointer' }} width={'100%'} src={Logo} />
                    </Box>
                </Box>
                <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} alignItems={'center'} gap={4}>
                    <Typography
                        onClick={handleClickAboutUs}
                        color='#1356C5'
                        display={'flex'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        gap={1}
                        fontSize={['12px', '14px']}
                        fontWeight={'700'}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        Home
                        {/* <img alt='' style={{ transform: anchorAbout ? 'rotate(180deg)' : 'rotate(0deg)' }} src={PolygonDown} /> */}
                    </Typography>
                    <Typography
                        // onClick={handleClickScholarship}
                        onClick={(e) => handleDownloadPdf(e, 'apre')}
                        color='#1356C5'
                        display={'flex'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        gap={1}
                        fontSize={['12px', '14px']}
                        fontWeight={'700'}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        Scholarship Events
                        {/* <img alt='' style={{ transform: anchorEScholarship ? 'rotate(180deg)' : 'rotate(0deg)' }} src={PolygonDown} /> */}
                    </Typography>
                    <Typography
                        onClick={handleClickOnlineCourse}
                        color='#1356C5'
                        display={'flex'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        gap={1}
                        fontSize={['12px', '14px']}
                        fontWeight={'700'}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        Courses
                        <img alt='' style={{ transform: anchorElOnlineCourse ? 'rotate(180deg)' : 'rotate(0deg)' }} src={Vector} />
                    </Typography>
                    <Typography
                        color='#1356C5'
                        display={'flex'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        gap={1}
                        fontSize={['12px', '14px']}
                        fontWeight={'700'}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        Academic
                    </Typography>
                    <Typography
                        onClick={handleOpenContactUs}
                        color='#1356C5'
                        display={'flex'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        gap={1}
                        fontSize={['12px', '14px']}
                        fontWeight={'700'}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        Student Zone
                    </Typography>
                    <Typography
                        color='#1356C5'
                        display={'flex'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        gap={1}
                        fontSize={['12px', '14px']}
                        fontWeight={'700'}
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        Result
                        {/* <img alt='' src={PolygonDown} /> */}
                    </Typography>
                    <Typography
                        onClick={handleOpenAnnouncement}
                        color='#1356C5'
                        display={'flex'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        gap={0.5}
                        fontSize={['12px', '14px']}
                        fontWeight={'700'}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        Resources
                        {/* <img alt='' src={new_icon_blink1} /> */}
                    </Typography>
                    <Button
                        // onClick={handlePlayStore}
                        sx={{
                            color: '#fff',
                            background: '#003085',
                            // border: '1px solid #065290',
                            ':hover': {
                                background: '#003085',
                            },
                            fontWeight: '500',
                            fontSize: ['12px', '14px'],
                            textTransform: 'none',
                            borderRadius: '4px',
                            paddingRight: '1rem',
                            paddingLeft: '1rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <PersonOutlineOutlinedIcon sx={{ fontSize: '18px' }} />
                        Student Login
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Box
                    display={'flex'}
                    justifyContent={'start'}
                    ml={1}
                >
                    <img alt='' onClick={(e) => handleNavBarClick(e, 'Home')} style={{ cursor: 'pointer' }} width={'70%'} src={Logo} />
                </Box>
                <Box display={'flex'} justifyContent={'end'} alignItems={'center'} gap={1}>
                    <Box
                        display={'flex'}
                        justifyContent={'end'}
                        sx={{
                            background: '#fff',
                            borderRadius: '50%',
                            padding: '5px'
                        }}
                        onClick={() => {
                            window.location.href = 'tel:+919876554321';
                        }}
                    >
                        <CallOutlinedIcon sx={{ fontWeight: 'bold', cursor: 'pointer' }} />
                    </Box>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu2}
                        sx={{ color: '#000' }}
                    >
                        <MenuIcon sx={{ fontSize: '30px' }} />
                    </IconButton>
                </Box>
                <Drawer anchor="right" open={openLeft} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </Box>
            <Menu
                anchorEl={anchorAbout}
                id="account-menu"
                open={openAbout}
                onClose={handleClickCloseAboutUs}
                onClick={handleClickCloseAboutUs}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{ fontSize: '12px' }} onClick={(e) => handleNavigateAboutUs(e)}>
                    About Us
                </MenuItem>
                <MenuItem sx={{ fontSize: '12px' }} onClick={(e) => handleNavigateOurTeam(e)}>
                    Our Team
                </MenuItem>
            </Menu>
            <Menu
                anchorEl={anchorEScholarship}
                id="account-menu"
                open={openSholarship}
                onClose={handleCloseScholarship}
                onClick={handleCloseScholarship}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{ fontSize: '12px' }} onClick={(e) => handleNavigatePragyan(e)}>
                    PRAGYAN 2025-2026
                </MenuItem>
                <MenuItem sx={{ fontSize: '12px' }} onClick={(e) => handleNavigateAPRE(e)}>
                    APRE 2025-2026
                </MenuItem>
            </Menu>
            <Menu
                anchorEl={anchorElOnlineCourse}
                id="account-menu"
                open={openOnlineCourse}
                onClose={handleCloseOnlineCourse}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {renderDomainMenu(domainList, courses, handleDomainClick, handleCloseSubMenu)}
            </Menu>
            <Popover
                open={Boolean(anchorElSubMenu)}
                anchorEl={anchorElSubMenu}
                onClose={handleCloseSubMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        // ml: 1,
                        // width: '200px',
                        p: 0,
                    },
                }}
            >
                {subDomains.map((subItem) => (
                    <MenuItem
                        key={subItem.id}
                        // onClick={() => {
                        //     handleBuyCourse(subItem);
                        // handleCloseSubMenu();
                        // }}
                        sx={{ fontSize: '14px' }}
                    >
                        {subItem.name}
                        {subItem.child?.length ? <ArrowRightIcon /> : null}
                    </MenuItem>
                ))}
            </Popover>
        </div>
    )
}

export default NavBarTwo