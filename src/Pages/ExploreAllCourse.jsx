import React, { useEffect, useState } from "react";
import Network from "../Netwrok";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, Grid, InputLabel, ListItemText, MenuItem, Select, Stack, Tooltip, Typography, useMediaQuery } from "@mui/material";
import instId from "../constant/InstituteId";
import Endpoints from "../constant/endpoints";
import parse from "html-react-parser";
import SuggestedCourseDialog from "../Components/CommanSections/SuggestedCourseDialog";
import { useLocation, useNavigate } from "react-router-dom";

const ExploreAllCourses = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const tagData = location?.state
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

    useEffect(() => {
        if (tagData) {
            // Ensure it's an array
            setSelectedFaculty(Array.isArray(tagData) ? tagData : [tagData]);
        } else {
            setSelectedFaculty([]);
        }
    }, [tagData]);

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
        if (selectExam?.id) {
            setStageList(selectExam?.child);
            // setSelectStage(selectExam?.child[0])
        }
        if (selectStage?.id) {
            setSubjectList(selectStage?.child);
        }


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

        // Filter by selected Subjects (if any subjects are selected)
        if (selectedSubjects.length > 0) {
            filtered = filtered.filter(course =>
                course.domain.find(subject => selectedSubjects.find(sel => sel.id === subject.id))
            );
        }
        if (selectedFaculty.length > 0) {
            filtered = filtered.filter(course =>
                course.tags.find(subject => selectedFaculty.find(sel => sel.id === subject.id))
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
            // const list = response?.tags.filter((item) => item?.availablePublic === true);
            const list = response?.tags
            setTagsLists(list);
        } catch (error) {
            console.error("Error fetching domains:", error);
        }
    };

    const getAllCourses = async () => {
        try {
            const response = await Network.fetchCourses(instId);
            let templist = [];
            response.courses.forEach((course) => {
                if (course.active == true) {
                    templist.push(course);
                }
            })
            setCoursesList(templist);
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

    const handleShowCart = () => {
        navigate("/cart-courses")
    }

    const getLowestPrice = (coursePricing) => {
        if (!coursePricing || coursePricing.length === 0) return null;

        return coursePricing
            .map(({ price, discount }) => price - (price * (discount / 100))) // Apply discount
            .reduce((minPrice, currentPrice) => Math.min(minPrice, currentPrice), Infinity); // Get minimum price
    };

    return (

        <React.Fragment>
            <Box sx={{ padding: isMobile ? "0.5rem 6rem" : "15px" }}>
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

                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} lg={3} sx={{ textAlign: 'end', mb: !isMobile ? 2 : "" }}>
                        {
                            cartCourses?.length > 0 && (
                                <Button sx={{ fontWeight: "bold", fontSize: "14px", border: "1px solid #80808038", textTransform: "initial", background: '#FDA41D', color: '#fff', padding: "10px", width: !isMobile ? "100%" : "50%" }} onClick={handleShowCart} className='button-hover'> View cart</Button>
                            )
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={3} md={3} lg={3} sx={{ borderRight: "1px solid #a9a9a980" }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1, mb: 1 }}>
                            Select Subject
                        </Typography>
                        <Box sx={{ display: "grid", borderBottom: "1px solid #a9a9a980" }}>
                            {
                                subjectList?.length > 0 && subjectList?.map((item, i) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={selectedSubjects.some((sub) => sub.id === item.id)}
                                                onChange={() => handleSubjectChange(item)}
                                            />
                                        }
                                        label={item?.name}
                                    />
                                ))
                            }

                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1, mb: 1 }}>
                            Select Faculty
                        </Typography>
                        <Box sx={{ display: "grid" }}>
                            {
                                tagsLists?.length > 0 && tagsLists?.map((item, i) => (
                                    <FormControlLabel
                                        key={item.id}
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={selectedFaculty.some((sub) => sub.id === item.id)}
                                                onChange={() => handleFacultyChange(item)}
                                            />
                                        }
                                        label={item?.tag}
                                    />
                                ))
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9} lg={9}>
                        <Grid container sx={{ padding: 1, justifyContent: "start" }}>
                            {
                                filteredCourses && filteredCourses.map((item, i) => {

                                    let lowestPrice = getLowestPrice(item?.coursePricing);

                                    return <Grid key={i} item xs={12} sm={3} md={3} lg={3} sx={{ padding: "10px", textAlign: "center" }}>
                                        <Box sx={{
                                            borderRadius: "10px", position: "relative", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                            //  height: "380px"
                                        }}>
                                            <Stack
                                                direction={'row'}
                                                sx={{
                                                    padding: '0.5rem'
                                                }}
                                            >
                                                <img
                                                    alt={item?.title}
                                                    src={Endpoints?.mediaBaseUrl + item?.logo}
                                                    style={{ width: "100%", minHeight: "150px", borderBottom: "1px solid #a9a9a92e", borderRadius: "8px" }} />
                                            </Stack>
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
                                                                        ₹{lowestPrice.toLocaleString("en-IN")}
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
                                                                sx={{ background: "#3300FD", color: "#fff", margin: "10px 0px 10px 0px", width: "100%", fontWeight: "bold", fontSize: "10px", padding: "6px", textTransform: "none" }}
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
                                                            sx={{ background: "#FDA41D", color: "#fff", margin: "10px 0px 10px 0px", width: "100%", fontWeight: "bold", fontSize: "10px", textTransform: 'none' }}
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
                        </Grid>
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

export default ExploreAllCourses;