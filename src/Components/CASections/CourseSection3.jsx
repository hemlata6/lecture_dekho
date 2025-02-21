import { Backdrop, Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, Divider, Grid, Paper, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
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
import { Circle } from "styled-spinkit";
import parse from "html-react-parser";

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


const CourseSection3 = () => {

  const isMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [domainData, setDomainData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [courseExpandedDescriptions, setCourseExpandedDescriptions] = useState(false);
  const [fullDes, setFullDes] = useState('');

  useEffect(() => {
    // getEmployee();
    getAllCourses();
    // getDomainList();
  }, []);

  // const handleChange = (event, newValue) => {
  //     setValue(newValue);
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getDomainList = async () => {
    try {
      const response = await Network.fetchDomain();

      const caDomain = response?.domains.find(domain => domain.name === "CA");

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
    setIsLoading(true)
    try {
      const response = await Network.fetchCourses(instId);
      const domainResponse = await Network.fetchDomain();
      const caDomain = domainResponse?.domains?.find(d => d.name === "CA");
      if (!caDomain) {
        // console.log("CA domain not found.");
        return;
      }
      const caSubdomains = caDomain.child;
      const caCourses = response?.courses?.filter(course =>
        course.active === true &&
        course.domain?.some(domain => caSubdomains?.some(sub => sub?.id === domain?.id)) &&
        course.tags?.some(tag => tag.tag === "Trending Courses")
      );

      // setDomainData(caSubdomains);
      setDomainData(domainResponse?.domains);
      setCourses(caCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setIsLoading(false)
  };

  const filteredCourses = courses.filter(course =>
    course.domain?.some(domain => domain.id === domainData[value]?.id)
  );

  const getLowestFinalPrice = (coursePricing) => {
    if (!coursePricing.length) return null;

    return coursePricing.reduce((lowest, course) => {
      const finalPrice = course.price - (course.price * (course.discount / 100));
      return finalPrice < lowest ? finalPrice : lowest;
    }, Infinity);
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

  console.log('domainData', domainData);
  

  return (
    <div style={{ paddingLeft: isMobile ? '6rem' : '', paddingRight: isMobile ? '6rem' : '', paddingTop: isMobile ? '2rem' : '', paddingBottom: isMobile ? '2rem' : '' }} >
      <Grid sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h6" fontWeight="bold" pb={2} sx={{ textAlign: "center" }} >
            Most Selling Courses
          </Typography>

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

                {/* <Typography variant="h6" fontWeight="bold" pb={2} textAlign={'cetner'} >
                  Trending Courses
                </Typography> */}
                <div className='desktop-plan-box'>
                  <Grid container sx={{ padding: 1, justifyContent: "center" }}>
                    {
                      filteredCourses && filteredCourses.map((item, i) => {
                        return <Grid item xs={12} sm={2.4} md={2.4} lg={2.4} sx={{ padding: "10px", textAlign: "center" }}>
                          <Box sx={{ borderRadius: "10px", position: "relative", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                            <img
                              alt={item?.title}
                              src={Endpoints?.mediaBaseUrl + item?.logo}
                              style={{ width: "100%", height: "120px", maxHeight: "120px", minHeight: "120px", borderBottom: "1px solid #a9a9a92e" }} />
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
                            <Box sx={{ position: "absolute", bottom: "0", left: 0, right: 0, padding: "0px 10px 0 10px" }}>
                              {/* <a href={`/course?courseId=${encodeURIComponent(item?.id)}`}> */}
                              <Button
                                sx={{ background: "#FDA41D", color: "#fff", margin: "10px 0px 10px 0px", width: "100%", fontWeight: "bold", fontSize: "10px" }}
                                // onClick={() => handleEnrollNow(item)}
                                className='button-hover'
                              >
                                Add to cart
                              </Button>
                              {/* </a> */}
                            </Box>
                          </Box>
                        </Grid>
                      })
                    }
                  </Grid>
                </div>
                {/* {filteredCourses.length > 0 ? (
                  <Grid container spacing={3} justifyContent={!isMobile ? "left" : "center"}>
                    {filteredCourses.map((course, index) => {
                      const removeHtmlTags = (html) => {
                        if (!html) return "";
                        const doc = new DOMParser().parseFromString(html, "text/html");
                        return doc.body.textContent || "";
                      };
                      return (
                        <Grid item key={index} xs={6} sm={6} md={4} lg={2} sx={{ height:!isMobile ? "280px" : "280px" }}>
                          <Card
                            sx={{
                              position: "relative",
                              // width: '100%',
                              // maxWidth: isMobile ? '280px' : '400px',
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
                              <Stack spacing={2} sx={{borderBottom: "1px solid #a9a9a92e"}}>
                                <img
                                  alt={course?.title}
                                  src={Endpoints?.mediaBaseUrl + course?.logo}
                                  style={{
                                    width: '100%',
                                    borderRadius: '10px',
                                    height:"90px"
                                  }}
                                />
                              </Stack>

                              <Typography
                                textAlign={'start'}
                                fontSize={'15px'}
                                fontWeight={'700'}
                                pl={1}
                                pr={1}
                              >
                                {course?.title}
                              </Typography>

                              <Typography
                                p={1}
                                fontSize={'12px'}
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  // whiteSpace: 'nowrap',
                                }}
                              >
                                <Tooltip title={removeHtmlTags(course?.description)}>
                                  {removeHtmlTags(course?.description.replace(/<[^>]*>/g, ' ')
                                    .split(/\s+/)
                                    .slice(0, 10)
                                    .join(' '))}
                                </Tooltip>

                              </Typography>
                              <Typography p={1} fontSize={'12px'}>
                                {
                                  (() => {
                                    const finalPrice = getLowestFinalPrice(course?.coursePricing);
                                    if (!finalPrice) return "₹ 0";

                                    return ` ₹${finalPrice}`;
                                  })()
                                }
                              </Typography>
                              <Stack direction="row" spacing={1} justifyContent={['center', 'start']} width={'100%'} sx={{ position: "absolute", bottom: 0 }}>
                                <a href={`/course?courseId=${encodeURIComponent(course?.id)}`} style={{ width: "100%" }}>
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
                      );
                    })}
                  </Grid>

                ) : (
                  <Typography>No trending courses available.</Typography>
                )} */}

              </TabPanel>
            ))}
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
          </Box>
        </Grid>
      </Grid>
      {isLoading &&
        <Backdrop
          sx={{ color: "aliceblue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <Circle color={"#fafafa"} size={50} />
        </Backdrop>
      }
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
    </div >
  )
}

export default CourseSection3