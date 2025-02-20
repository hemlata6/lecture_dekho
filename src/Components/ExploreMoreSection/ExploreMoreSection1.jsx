import { Box, Button, Card, Dialog, DialogActions, DialogContent, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid2';
import Network from '../../Netwrok';
import Endpoints from '../../constant/endpoints';
import { useLocation, useNavigate } from 'react-router-dom';
import instId from '../../constant/InstituteId';
import SuggestedCourseDialog from '../CommanSections/SuggestedCourseDialog';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import parse from "html-react-parser";
import suggestImg from '../../Images/2.png'

const ExploreMoreSection1 = () => {

    const isMobile = useMediaQuery("(min-width:600px)");
    let cartData = localStorage.getItem('cartCourses');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const courseName = queryParams.get("courseName");
    const [domainData, setDomainData] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [courses, setCourses] = useState([]);
    const [courseByTagName, setCourseByTagName] = useState({})
    const [suggestedCourseDialog, setSuggestedCourseDialog] = useState(false);
    const [cartCourses, setCartCourses] = useState([]);
    const [finalAmounts, setFinalAmounts] = useState(0);
    const [addedSuggestCourse, setAddedSuggestCourse] = useState({});
    const [finalAmountsss, setFinalAmountsss] = useState(0);
    const [suggestedCourseId, setSuggestedCourseId] = useState(null);
    const [courseExpandedDescriptions, setCourseExpandedDescriptions] = useState(false);
    const [fullDes, setFullDes] = useState('');

    useEffect(() => {
        if (cartData !== null && cartData !== undefined) {
            setCartCourses(cartData ? JSON.parse(cartData) : [])
        }
    }, [cartData])

    useEffect(() => {
        getDomainList();
        getAllCourses();
    }, []);

    useEffect(() => {
        if (domainData.length > 0 && !selectedDomain) {
            setSelectedDomain(domainData[0].id);
        }
    }, [domainData]);
    useEffect(() => {
        if (cartCourses?.length > 0) {
            localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
        }
    }, [cartCourses])

    useEffect(() => {
        const coursesByTag = {};
        const filteredCourses = courses.filter(course =>
            course.domain?.some(domain => domain.id === selectedDomain)
        );
        filteredCourses.forEach(course => {
            if (course.tags?.length > 0) {
                course.tags.forEach(tag => {
                    if (!coursesByTag[tag.tag]) {
                        coursesByTag[tag.tag] = [];
                    }
                    coursesByTag[tag.tag].push(course);
                });
            } else {
                if (!coursesByTag["Other Courses"]) {
                    coursesByTag["Other Courses"] = [];
                }
                coursesByTag["Other Courses"].push(course);
            }
        });
        setCourseByTagName(coursesByTag)
    }, [courses, selectedDomain])

    const handleChangeDomain = (event) => {
        setSelectedDomain(event.target.value);
    };

    const getDomainList = async () => {
        try {
            const response = await Network.fetchDomain();

            const caDomain = response?.domains.find(domain => domain.name === courseName);

            if (!caDomain || !caDomain.child) {
                return;
            }

            const caSubdomains = caDomain.child;

            setDomainData(caSubdomains);
        } catch (error) {
            console.error("Error fetching domains:", error);
        }
    };

    const getAllCourses = async () => {
        try {
            const response = await Network.fetchCourses(instId);
            const domainResponse = await Network.fetchDomain();

            const caDomain = domainResponse?.domains.find(d => d.name === courseName);
            if (!caDomain) {
                return;
            }

            const caSubdomains = caDomain.child;
            const caCourses = response.courses.filter(course =>
                course.domain?.some(domain => caSubdomains.some(sub => sub.id === domain.id))
            );

            setDomainData(caSubdomains);
            setCourses(caCourses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
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

            localStorage.setItem('cartCourses', JSON.stringify(updatedCart));
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

    const getLowestFinalPrice = (coursePricing) => {
        if (!coursePricing?.length) return null;

        return coursePricing?.reduce((lowest, course) => {
            const finalPrice = course.price - (course.price * (course.discount / 100));
            return finalPrice < lowest ? finalPrice : lowest;
        }, Infinity);
    };


    return (
        <div style={{ paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '1rem', paddingBottom: isMobile ? '2rem' : '1rem' }}>
            <Box sx={{ padding: '2rem' }}>
                <Grid container spacing={2} sx={{marginLeft: "0px"}}>
                    <Grid item xs={12} sm={2} md={2} lg={2} sx={{ paddingLeft: "0px !important", paddingTop: !isMobile ? "0px !important" : "" }}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Subdomain</InputLabel>
                            <Select
                                label="Subdomain"
                                value={selectedDomain || ""}
                                onChange={handleChangeDomain}
                                sx={{
                                    width: '100%',
                                    // maxWidth: '250px'
                                }}
                            >
                                {domainData.map((domain) => (
                                    <MenuItem key={domain.id} value={domain.id}>{domain.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} lg={2} sx={{ paddingLeft: !isMobile ? "0px !important" : "", paddingTop: !isMobile ? "0px !important" : "" }}>
                        {cartCourses?.length > 0 && (<Box sx={{ width: "100%" }}><Button disabled={cartCourses?.length > 0 ? false : true} onClick={handleShowCart} sx={{ fontWeight: "bold", color: "#000", fontSize: "14px", border: "1px solid #80808038", textTransform: "initial", background: '#1356C5', color: '#fff', padding: "14px 11px", width: "100%" }} className='button-hover'><ArrowForwardIcon />&nbsp; Go to Cart Details</Button></Box>)}
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "20px" }}>
                        {Object.keys(courseByTagName).length > 0 ? (
                            Object.keys(courseByTagName).map((tag, index) => (
                                <Box key={index} sx={{ marginBottom: '20px', width: '100%' }}>
                                    <Typography variant="h6" fontWeight="bold" pb={2}>
                                        {tag}
                                    </Typography>
                                    <div className='desktop-plan-box'>
                                        <Grid container>
                                            {
                                                courseByTagName[tag]?.map((item, i) => {
                                                    return <Grid item xs={12} sm={2.4} md={2.4} lg={2.4} sx={{ padding: "10px", textAlign: "center" }}>
                                                        <Box sx={{ borderRadius: "10px", position: "relative", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                                                            <img
                                                                alt={item?.title}
                                                                src={suggestImg}
                                                                // src={Endpoints?.mediaBaseUrl + item?.logo} 
                                                                style={{ width: "100%", height: "130px", borderBottom: "1px solid #a9a9a92e" }} />
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
                                                                        sx={{ background: "#1356C5", color: "#fff", margin: "10px 0px 10px 0px", width: "100%", fontWeight: "bold", fontSize: "10px", padding: "6px" }}
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
                                                                    sx={{ background: "#0c858b", color: "#fff", margin: "10px 0px 10px 0px", width: "100%", fontWeight: "bold", fontSize: "10px" }}
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
                                    </div>
                                    {/* <Grid container spacing={2} justifyContent="flex-start">
                                        {courseByTagName[tag].map((course, idx) => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={idx} justifyContent="center">
                                                <Card
                                                    sx={{
                                                        border: '1px solid #000',
                                                        borderRadius: '10px',
                                                        boxShadow: '2px 6px 8px',
                                                        transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
                                                        ':hover': {
                                                            boxShadow: '6px 5px 8px',
                                                            transform: 'scale(1.05)',
                                                        },
                                                        padding: '10px',
                                                        width: isMobile ? '250px' : '320px',
                                                        // height: '350px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Stack spacing={1} direction="column" width="100%">
                                                        <img
                                                            alt={course?.title}
                                                            src={`${Endpoints.mediaBaseUrl}/${course?.logo}`}
                                                            style={{
                                                                width: '100%',
                                                                height: '140px',
                                                                objectFit: 'cover',
                                                                borderRadius: '10px',
                                                            }}
                                                        />

                                                        <Typography
                                                            textAlign="start"
                                                            fontSize="14px"
                                                            fontWeight="700"
                                                            p={0.5}
                                                        >
                                                            {course?.title}
                                                        </Typography>

                                                        <Typography
                                                            textAlign="start"
                                                            fontSize="12px"
                                                            fontWeight="500"
                                                            p={0.5}
                                                            sx={{
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {(() => {
                                                                if (!course?.description) return "";
                                                                const doc = new DOMParser().parseFromString(course?.description, "text/html");
                                                                return doc.body.textContent || "";
                                                            })()}
                                                        </Typography>

                                                        <Typography textAlign="start" fontSize="12px" fontWeight="500" p={0.5}>
                                                            {course.paid ? (
                                                                course.discount > 0 && course.discount !== null ? (
                                                                    <>
                                                                        <Typography
                                                                            component="span"
                                                                            sx={{ fontWeight: '500', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                                        >
                                                                            ₹{(Number(course.price) - (Number(course.price) * (Number(course.discount) / 100))).toFixed(2)}
                                                                        </Typography>
                                                                        &nbsp; <s>₹{course.price}</s> &nbsp;
                                                                        <Typography
                                                                            component="span"
                                                                            sx={{ color: 'red', fontWeight: 'bold' }}
                                                                        >
                                                                            -{course.discount}%
                                                                        </Typography>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {course.price !== null ?
                                                                            <Typography
                                                                                component="span"
                                                                                sx={{ fontWeight: '500', background: 'rgba(255, 215, 0, 0.6)', padding: '2px 5px', borderRadius: '4px' }}
                                                                            >
                                                                                ₹{parseFloat(course.price).toFixed(2)}
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
                                                        </Typography>

                                                        <Stack direction="row" spacing={1} p={[0.5, 1]} justifyContent="center">
                                                            <a href={`/course?courseId=${encodeURIComponent(course?.id)}`} style={{ width: !isMobile ? "100%" : '94%' }}>
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
                                                                        // px: 1,
                                                                        width: '100%'
                                                                    }}
                                                                >
                                                                    View More
                                                                </Button>
                                                            </a>
                                                            <Button
                                                                onClick={() => handleAddtoCart(course)}
                                                                sx={{
                                                                    textTransform: 'none',
                                                                    borderRadius: '5px',
                                                                    background: '#ff3c00',
                                                                    ":hover": {
                                                                        background: '#ff3c00'
                                                                    },
                                                                    fontSize: '12px',
                                                                    color: '#fff',
                                                                    // px: 1,
                                                                    width: '100%'
                                                                }}
                                                            >
                                                                {cartCourses.some(item => item.id === course?.id) ? "Remove" : "Add to Cart"}

                                                            </Button>
                                                        </Stack>
                                                    </Stack>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid> */}
                                </Box>
                            ))
                        ) : (
                            <Typography>No courses available for this subdomain.</Typography>
                        )}
                    </Grid>
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
                </Grid>
            </Box>
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
        </div>
    )
};

export default ExploreMoreSection1