import React, { useEffect, useState } from "react";
import Network from "../Netwrok";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, Grid, InputLabel, ListItemText, MenuItem, Select, Stack, Tooltip, Typography, useMediaQuery } from "@mui/material";
import instId from "../constant/InstituteId";
import Endpoints from "../constant/endpoints";
import parse from "html-react-parser";
import Carousel from 'react-multi-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SuggestedCourseDialog from "../Components/CommanSections/SuggestedCourseDialog";

const MostSellingCourse = () => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const isMobile = useMediaQuery("(min-width:600px)");
    const [examList, setExamList] = useState([]);
    const [stageList, setStageList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [selectExam, setSelectExam] = useState({});
    const [selectStage, setSelectStage] = useState({});
    const [tagsLists, setTagsLists] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState([]);
    const [courseExpandedDescriptions, setCourseExpandedDescriptions] = useState(false);
    const [fullDes, setFullDes] = useState('');
    const [addedSuggestCourse, setAddedSuggestCourse] = useState({});
    const [suggestedCourseId, setSuggestedCourseId] = useState(null);
    const [suggestedCourseDialog, setSuggestedCourseDialog] = useState(false);
    const [cartCourses, setCartCourses] = useState([]);
    const [finalAmounts, setFinalAmounts] = useState(0);
    const [finalAmountsss, setFinalAmountsss] = useState(0);

    // console.log('filteredCourses', filteredCourses);
    // console.log('cartCourses', cartCourses);

    useEffect(() => {
        getDomainList();
        getTagsListApi();
        getAllCourses();
    }, []);

    // useEffect(() => {
    //     if (examList?.length > 0) {
    //         setSelectExam(examList[0]);
    //     }
    //     if (stageList) {
    //         setSelectStage(stageList[0])
    //     }

    // }, [examList, stageList]);

    useEffect(() => {
        setStageList(selectExam?.child);
        setSubjectList(selectStage?.child);
    }, [selectExam, selectStage]);

    useEffect(() => {
        let filtered = coursesList;

        if (selectExam?.id) {
            filtered = filtered.filter(course =>
                course.domain.some(domainItem => domainItem.id === selectExam.id)
            );
        }

        // Filter by selected Stage
        if (selectStage?.id) {
            filtered = filtered.filter(course =>
                course.domain.some(domainItem => domainItem.id === selectStage.id)
            );
        }

        setFilteredCourses(filtered);
    }, [selectExam, selectStage, selectedSubjects, coursesList, selectedFaculty]);

    useEffect(() => {
        const cartData = localStorage.getItem("cartCourses");
        if (cartData) {
            setCartCourses(JSON.parse(cartData));
        }
    }, []);

    useEffect(() => {
        if (cartCourses.length > 0) {
            localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
        } else {
            localStorage.removeItem("cartCourses", JSON.stringify(cartCourses));
        }
    }, [cartCourses]);

    const getDomainList = async () => {
        try {
            const response = await Network.fetchDomain();

            const domainsWithSubdomains = response?.domains?.map(domain => ({
                ...domain,
                subdomains: domain.child || []
            }));
            setSelectExam(domainsWithSubdomains[0])
            setExamList(domainsWithSubdomains);
        } catch (error) {
            console.error("Error fetching domains:", error);
        }
    };

    const getTagsListApi = async () => {
        try {
            const response = await Network.getTagsListApi(instId);
            const list = response?.tags
            setTagsLists(list);
        } catch (error) {
            console.error("Error fetching domains:", error);
        }
    };

    const getAllCourses = async () => {
        try {
            const response = await Network.fetchCourses(instId);

            let CourseList = response?.courses

            setCoursesList(CourseList);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleSelectExam = (e) => {
        let examlists = e.target.value
        setSelectExam(e.target.value)
        setStageList(examlists?.child)
    }

    const handleSelectStage = (e) => {
        let examlists = e.target.value
        setSelectStage(e.target.value)
        setSubjectList(examlists?.child)
    }

    const handleSubjectChange = (subject) => {
        setSelectedSubjects((prevSelected) => {
            if (prevSelected.some((item) => item.id === subject.id)) {
                // Remove subject if already selected
                return prevSelected.filter((item) => item.id !== subject.id);
            } else {
                // Add subject if not selected
                return [...prevSelected, subject];
            }
        });
    };

    const handleFacultyChange = (subject) => {
        setSelectedFaculty((prevSelected) => {
            if (prevSelected.some((item) => item.id === subject.id)) {
                // Remove subject if already selected
                return prevSelected.filter((item) => item.id !== subject.id);
            } else {
                // Add subject if not selected
                return [...prevSelected, subject];
            }
        });
    };

    const truncateDescription = (description) => {
        // Replace &nbsp; and other HTML entities with plain text equivalents
        const decodedDescription = description
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&') // Example for handling other entities, can add more if needed
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

        // Strip any remaining HTML tags
        const strippedDescription = decodedDescription
            .replace(/<[^>]*>/g, ' ') // Remove HTML tags
            .split(/\s+/)
            .slice(0, 10) // Get first 10 words
            .join(' ');

        return strippedDescription;
    };
    const toggleExpandDescription = (des) => {
        setFullDes(des)
        setCourseExpandedDescriptions(true);
    };

    const handleAddtoCart = (course) => {

        setCartCourses((prevCart) => {
            const isAlreadyAdded = prevCart.some(item => item.id === course.id);

            let updatedCart;

            if (isAlreadyAdded) {
                updatedCart = prevCart.filter(item => item.id !== course.id);
            } else {
                setAddedSuggestCourse(course);
                setSuggestedCourseId(course.id);
                setSuggestedCourseDialog(true);
                return prevCart;
            }
            return updatedCart;
        });
    };

    const handleCloseSuggestedCourseDialog = () => {
        setSuggestedCourseDialog(false);
    };

    const handleFinalAmountUpdate = (amount) => {
        setFinalAmountsss(amount);
    };


    return (

        <React.Fragment>
            <Box sx={{ padding: isMobile ? "0.5rem 6rem" : "10px" }}>
                <Grid container spacing={2} sx={{ mt: 2, mb: 2, borderBottom: "1px solid #a9a9a980" }}>
                    <Grid item xs={12} sm={9} md={9} lg={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="demo-simple-select-label">Select Exam</InputLabel>
                                    <Select
                                        // multiple
                                        label="Select Exam"
                                        fullWidth
                                        variant="outlined"
                                        value={selectExam}
                                        onChange={handleSelectExam}
                                    >
                                        {examList?.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                <ListItemText primary={option?.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="demo-simple-select-label">Select Stage</InputLabel>
                                    <Select
                                        // multiple
                                        label="Select Exam"
                                        fullWidth
                                        variant="outlined"
                                        value={selectStage}
                                        onChange={handleSelectStage}
                                    >
                                        {stageList?.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                <ListItemText primary={option?.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>

                        {/* <Grid container sx={{ padding: 1, justifyContent: "start" }}>
                            {
                                filteredCourses && filteredCourses.map((item, i) => {
                                    return <Grid item xs={12} sm={3} md={3} lg={3} sx={{ padding: "10px", textAlign: "center" }}>
                                        <Box sx={{ borderRadius: "10px", position: "relative", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", height: "380px" }}>
                                            <img
                                                alt={item?.title}
                                                src={Endpoints?.mediaBaseUrl + item?.logo}
                                                style={{ width: "100%", height: "150px", maxHeight: "150px", minHeight: "150px", borderBottom: "1px solid #a9a9a92e", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} />
                                            <Box sx={{ pb: 4, textAlign: "left", paddingLeft: "15px" }}>
                                                <Typography variant='h5' fontWeight={"bold"} sx={{ mt: 2, mb: 2, color: "black", fontSize: "15px" }}>
                                                    {item?.title}

                                                </Typography>
                                                <Typography variant='p' className='desktop-view-discrip' sx={{ fontSize: "12px" }}>
                                                    {setCourseExpandedDescriptions === false ? truncateDescription(item?.description) : truncateDescription(item?.description)}
                                                    {item?.description.length > 100 && (
                                                        <span style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px', textDecoration: 'underline' }} onClick={() => toggleExpandDescription(item?.description)}>
                                                            {setCourseExpandedDescriptions ? 'more' : 'more'}
                                                        </span>
                                                    )}
                                                </Typography>
                                                <Box sx={{ marginBottom: "20px", mt: 1 }}>
                                                    {item.paid ? (
                                                        item.discount > 0 && item.discount !== null ? (
                                                            <>
                                                                <Typography
                                                                    component="span"
                                                                    sx={{ fontWeight: '500', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                                >
                                                                    ₹{(Number(item.price) - (Number(item.price) * (Number(item.discount) / 100))).toFixed(2)}
                                                                </Typography>
                                                                &nbsp; <s>₹{item.price}</s> &nbsp;
                                                                <Typography
                                                                    component="span"
                                                                    sx={{ color: 'red', fontWeight: 'bold' }}
                                                                >
                                                                    -{item.discount}%
                                                                </Typography>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {item.price !== null ?
                                                                    <Typography
                                                                        component="span"
                                                                        sx={{ fontWeight: '500', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                                    >
                                                                        ₹{parseFloat(item.price).toFixed(2)}
                                                                    </Typography>
                                                                    :
                                                                    <Typography
                                                                        component="span"
                                                                        sx={{ fontWeight: '500', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                                    >
                                                                        ₹0
                                                                    </Typography>

                                                                }
                                                            </>
                                                        )
                                                    ) : (
                                                        <Typography
                                                            component="span"
                                                            sx={{ fontWeight: '600', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                        >
                                                            Free
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                            <Box sx={{ position: "absolute", bottom: "0", left: 0, right: 0, padding: "0px 10px 0 10px", display: "flex", justifyContent: "space-between" }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                                        <a href={`/course?courseId=${encodeURIComponent(item?.id)}`}>
                                                            <Button
                                                                sx={{ background: "#3300FD", color: "#fff", margin: "10px 0px 10px 0px", width: "100%", fontWeight: "bold", fontSize: "10px", padding: "6px" }}
                                                                // onClick={() => handleEnrollNow(item)}
                                                                className='button-hover'
                                                            >
                                                                View More
                                                            </Button>
                                                        </a>
                                                    </Grid>
                                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                                        <Button
                                                            onClick={() => handleAddtoCart(item)}
                                                            sx={{ background: "#FDA41D", color: "#fff", margin: "10px 0px 10px 0px", width: "100%", fontWeight: "bold", fontSize: "10px" }}
                                                            className='addtocart-hover'
                                                        >
                                                            {cartCourses.some(a => a.id === item?.id) ? "Remove" : "Add to Cart"}

                                                        </Button>
                                                    </Grid>
                                                </Grid>


                                            </Box>
                                        </Box>
                                    </Grid>
                                })
                            }
                        </Grid> */}
                        <Swiper
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 4 }
                            }}
                            spaceBetween={10}
                            navigation={true}
                            pagination={false}
                            modules={[Navigation]}
                        >
                            {filteredCourses && filteredCourses.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Grid item xs={12} sx={{ padding: "10px", textAlign: "center" }}>
                                        <Box sx={{
                                            borderRadius: "10px", position: "relative", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                            //  height: "380px" 
                                        }}>
                                            <img
                                                alt={item?.title}
                                                src={Endpoints?.mediaBaseUrl + item?.logo}
                                                style={{ width: "100%", minHeight: "150px", borderBottom: "1px solid #a9a9a92e", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} />
                                            <Box sx={{ pb: 4, textAlign: "left", paddingLeft: "15px" }}>
                                                <Tooltip title={item?.title}>
                                                    <Typography variant='h5' fontWeight={"bold"} sx={{ mt: 2, mb: 2, color: "black", fontSize: "15px" }}>
                                                        {item?.title?.split(" ").slice(0, 7).join(" ")}
                                                        {item?.title?.split(" ").length > 7 && "..."}
                                                    </Typography>
                                                </Tooltip>
                                                <Typography variant='p' className='desktop-view-discrip' sx={{ fontSize: "12px" }}>
                                                    {setCourseExpandedDescriptions === false ? truncateDescription(item?.description) : truncateDescription(item?.description)}
                                                    {item?.description.length > 100 && (
                                                        <span style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px', textDecoration: 'underline' }} onClick={() => toggleExpandDescription(item?.description)}>
                                                            {setCourseExpandedDescriptions ? 'more' : 'more'}
                                                        </span>
                                                    )}
                                                </Typography>
                                                <Box sx={{ marginBottom: "20px", mt: 1 }}>
                                                    {item.paid ? (
                                                        item.discount > 0 && item.discount !== null ? (
                                                            <>
                                                                <Typography
                                                                    component="span"
                                                                    sx={{ fontWeight: '500', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                                >
                                                                    ₹{(Number(item.price) - (Number(item.price) * (Number(item.discount) / 100))).toFixed(2)}
                                                                </Typography>
                                                                &nbsp; <s>₹{item.price}</s> &nbsp;
                                                                <Typography
                                                                    component="span"
                                                                    sx={{ color: 'red', fontWeight: 'bold' }}
                                                                >
                                                                    -{item.discount}%
                                                                </Typography>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {item.price !== null ?
                                                                    <Typography
                                                                        component="span"
                                                                        sx={{ fontWeight: '500', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                                    >
                                                                        ₹{parseFloat(item.price).toFixed(2)}
                                                                    </Typography>
                                                                    :
                                                                    <Typography
                                                                        component="span"
                                                                        sx={{ fontWeight: '500', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                                    >
                                                                        ₹0
                                                                    </Typography>

                                                                }
                                                            </>
                                                        )
                                                    ) : (
                                                        <Typography
                                                            component="span"
                                                            sx={{ fontWeight: '600', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                        >
                                                            Free
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                            <Box sx={{ position: "absolute", bottom: "0", left: 0, right: 0, padding: "0px 10px 0 10px", display: "flex", justifyContent: "space-between" }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <a href={`/course?courseId=${encodeURIComponent(item?.id)}`}>
                                                            <Button
                                                                sx={{ background: "#3300FD", color: "#fff", margin: "10px 0px", width: "100%", fontWeight: "bold", fontSize: "10px", padding: "6px" }}
                                                            >
                                                                View More
                                                            </Button>
                                                        </a>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            onClick={() => handleAddtoCart(item)}
                                                            sx={{ background: "#FDA41D", color: "#fff", margin: "10px 0px", width: "100%", fontWeight: "bold", fontSize: "10px" }}
                                                        >
                                                            {cartCourses.some(a => a.id === item?.id) ? "Remove" : "Add to Cart"}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Stack direction={'row'} spacing={2} py={2} justifyContent={'center'}>
                            <a href={`Explore-all`}>
                                <Button
                                    sx={{
                                        background: '#FDA41D',
                                        color: '#fff',
                                        fontSize: isMobile ? '16px' : '12px',
                                        fontWeight: "bold",
                                        px: [2, 7],
                                        py: 1,
                                        textTransform: 'capitalize',
                                        '&:hover': {
                                            background: '#FDA41D',
                                            color: '#fff',
                                        },
                                    }}
                                >
                                    Explore All
                                </Button>
                            </a>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Dialog
                open={suggestedCourseDialog}
                onClose={() => setSuggestedCourseDialog(false)}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                        },
                    },
                }}
            >
                <SuggestedCourseDialog
                    addedSuggestCourse={addedSuggestCourse}
                    // courseId={course}
                    suggestedCourseId={suggestedCourseId}
                    handleClose={handleCloseSuggestedCourseDialog}
                    onFinalAmountUpdate={handleFinalAmountUpdate}
                    setCartCourses={setCartCourses} setFinalAmounts={setFinalAmounts}
                />
            </Dialog>
            <Dialog open={courseExpandedDescriptions} onClose={() => setCourseExpandedDescriptions(false)}>

                <DialogContent dividers>
                    <Typography variant='body1'>
                        {parse(fullDes)}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCourseExpandedDescriptions(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default MostSellingCourse;