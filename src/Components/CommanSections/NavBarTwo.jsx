import { useMediaQuery, Box, Button, Typography, Drawer, List, ListItem, ListItemButton, Collapse, IconButton, MenuItem, Avatar, Menu, Badge, ListItemText, Chip, Dialog, Stack, Popover, Tooltip } from '@mui/material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
// import Logo from './Images/logo.svg'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Logo from '../../Images/image-removebg-preview (36) 2@2x.png';
import { useNavigate } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import upscSyllabusPdf from '../pdfFile/UPSC-Syllabus--PDF.pdf';
// import mppscSyllabusPdf from '../pdfFile/MPPSC SYLLABUS PRE+MAINS.pdf';
// import axios from 'axios';
// import Papa from 'papaparse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import Network from '../Network';
import Network from '../../Netwrok';
import Vector from '../../Images/Vector.svg'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DomainMenu from './CustomMenu';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import instId, { auth } from '../../constant/InstituteId';

const NavBarTwo = forwardRef(({ref, downloadAppRef }) => {

    let cartData = localStorage.getItem('cartCourses');
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
    const [domainData, setDomainData] = useState([]);
    const [cartItem, setCartItem] = useState([])
    const [refresh, setrefresh] = useState(false)

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: isMobile ? -0 : -40,
            top: isMobile ? -10 : 5,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useImperativeHandle(ref, () => ({

        update() {
          handleCartCount()
        }
    
      }));
    
      const handleCartCount = () => {
        setrefresh(!refresh)
      }
      useEffect(() => {
        if (cartData !== null && cartData !== undefined) {
          setCartItem(cartData ? JSON.parse(cartData) : [])
        }
      }, [cartData, refresh])

    useEffect(() => {
        getAllCourses();
        getDomainList();
        getAllAnnouncement();
    }, []);

    const handleScroll = () => {
        downloadAppRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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

    const getDomainList = async () => {
        try {
            const response = await Network.fetchDomain();

            const domainsWithSubdomains = response?.domains?.map(domain => ({
                ...domain,
                subdomains: domain.child || []
            }));

            setDomainData(domainsWithSubdomains);
        } catch (error) {
            console.error("Error fetching domains:", error);
        }
    };

    const getAllCourses = async () => {
        try {
            const response = await Network.fetchCourses(instId);
            const domainResponse = await Network.fetchDomain();

            const allDomains = domainResponse?.domains?.map(domain => ({
                ...domain,
                subdomains: domain.child || []
            }));

            const filteredCourses = response?.courses?.filter(course =>
                course.domain?.some(domain =>
                    allDomains?.some(parentDomain =>
                        parentDomain.subdomains.some(sub => sub?.id === domain?.id)
                    )
                )
            );

            setDomainData(allDomains);
            setCourses(filteredCourses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };


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

    const handleNavigateAboutUs = () => {
        navigate('/about');
    };

    // console.log('domainData', domainData, courses);


    const DrawerList = (
        <Box sx={{ width: 320 }} role="presentation">
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
                {/* <ListItem disablePadding>
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
                            Scholarship 
                        </Typography>
                    </ListItemButton>
                </ListItem> */}
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
                        <DomainMenu domainData={domainData} courses={courses} />
                    </List>
                </Collapse>
                <ListItem disablePadding>
                    <ListItemButton >
                        {/* <Badge badgeContent={<p style={{ fontSize: 10 }}>Soon</p>} color='error' > */}
                        <Typography
                            onClick={handleNavigateAboutUs}
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
                            About Us
                        </Typography>
                        {/* </Badge> */}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        {/* <Badge badgeContent={<p style={{ fontSize: 10 }}>Coming Soon</p>} color='warning' > */}
                        <StyledBadge badgeContent={'Coming Soon'} color="secondary">
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
                        </StyledBadge>
                        {/* </Badge> */}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <StyledBadge badgeContent={'Coming Soon'} color="secondary">
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
                        </StyledBadge>
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
                        onClick={handleScroll}
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
                        Download Our App
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

    const handleDomainClick = (event, domain) => {
        if (domain.child?.length > 0) {
            setAnchorElSubMenu(event.currentTarget);
            setSubDomains(domain.child);
        } else {
            setAnchorElSubMenu(null);
            // Logic for handling domain without children
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

    const renderDomainMenu = (domains, handleDomainClick) => {
        return domains?.map((domain) => (
            <MenuItem
                key={domain.id}
                onClick={(event) => handleDomainClick(event, domain)}
                sx={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}
            >
                {domain.name}
                {domain.child?.length > 0 && <ArrowRightIcon />}
                {domain.child?.length > 0 && (
                    <Popover
                        open={Boolean(anchorElSubMenu) && subDomains === domain.child}
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
                        {renderDomainMenu(domain.child, handleDomainClick)}
                    </Popover>
                )}
            </MenuItem>
        ));
    };

    const handleSubdomainClick = (event, subdomain) => {
        setSubDomains([subdomain]);
        setAnchorElSubMenu(event.currentTarget);
    };

    const handleCartClick = () => {
        navigate("/cart-courses")
      }

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
                    width={'15%'}
                >
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                        <img alt='' onClick={(e) => handleNavBarClick(e, 'Home')} style={{ cursor: 'pointer' }} width={'100%'} src={Logo} />
                    </Box>
                </Box>
                <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} alignItems={'center'} gap={6}>
                    <Stack direction={'row'} spacing={6}>
                        <Typography
                            // onClick={(e) => handleNavBarClick(e, 'Home')}
                            color='Black'
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
                            // onClick={handleClickOnlineCourse}
                            color='Black'
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
                            {/* <img alt='' style={{ transform: anchorElOnlineCourse ? 'rotate(180deg)' : 'rotate(0deg)' }} src={Vector} /> */}
                        </Typography>
                        <Typography
                            // onClick={handleNavigateAboutUs}
                            color='Black'
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
                            Contact Us
                        </Typography>
                      
                    </Stack>
                    <Stack>
                        <Badge badgeContent={cartItem.length} color="secondary" onClick={handleCartClick}>
                            <AddShoppingCartIcon sx={{ cursor: 'pointer' }} />
                        </Badge>
                    </Stack>
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
                // onClose={handleCloseOnlineCourse}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                    },
                }}
            >
                {/* {domainData.map((domain) => (
                    <MenuItem key={domain.id} onClick={(event) => handleDomainClick(event, domain)}>
                        {domain.name} {domain.subdomains.length > 0 && <ArrowRightIcon />}
                        {domain.subdomains.length > 0 && (
                            <Popover
                                open={Boolean(anchorElSubMenu) && subDomains === domain.subdomains}
                                anchorEl={anchorElSubMenu}
                                onClose={handleCloseSubMenu}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                PaperProps={{
                                    sx: { mt: 1, p: 0 },
                                }}
                            >
                                {domain.subdomains.map((sub) => (
                                    <MenuItem key={sub.id} onClick={(event) => handleSubdomainClick(event, sub)}>
                                        {sub.name}
                                        {courses.some(course => course.domain.some(d => d.id === sub.id)) && <ArrowRightIcon />}
                                    </MenuItem>
                                ))}
                            </Popover>
                        )}
                    </MenuItem>
                ))} */}
                <DomainMenu domainData={domainData} courses={courses} setAnchorElOnlineCourse={setAnchorElOnlineCourse} />
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
})

export default NavBarTwo