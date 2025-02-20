import { Box, Button, Dialog, Divider, Grid, keyframes, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Endpoints from "../../constant/endpoints";
import parse from "html-react-parser";
import ProceedToCheckoutForm from "../CommanSections/ProceedToCheckoutForm";
import { useNavigate } from "react-router-dom";

const MultipleCourseCart = () => {

    const zoomInOut = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

    const navigate = useNavigate();
    const isMobile = useMediaQuery("(min-width:600px)");
    let cartData = localStorage.getItem('cartCourses');
    const [cartCourses, setCartCourses] = useState([]);
    const [finalAmounts, setFinalAmounts] = useState(0);
    const [proceedToCheckoutModal, setProceedToCheckoutModal] = useState(false);

    useEffect(() => {
        if (cartData !== null && cartData !== undefined) {
            setCartCourses(cartData ? JSON.parse(cartData) : [])
        }
    }, [cartData])

    useEffect(() => {
        if (cartCourses) {
            updateFinalAmount(cartCourses)
        }
    }, [cartCourses])

    const handleRemoveItem = (item, i) => {
        let temp = [];
        cartCourses.forEach((item, x) => {
            if (x !== i) {
                temp.push(item)
            }
        })
        setCartCourses(temp);
        localStorage.setItem('cartCourses', JSON.stringify(temp));
        if (temp?.length === 0) {
            navigate(`/courseDetails?courseName=${encodeURIComponent('CA')}`)
        }
    }

    const updateFinalAmount = (cartItems) => {
        const totalAmount = cartItems.reduce((sum, item) => {
            const taxLab = item.taxLab ?? 0;
            const taxLabAmount = (item.finalPrice * taxLab) / 100;
            return sum + (item.finalPrice + taxLabAmount);
        }, 0);

        setFinalAmounts(totalAmount);
    };

    const handleProceedToCheckout = () => {
        setProceedToCheckoutModal(true)
    }


    return (
        <React.Fragment>
            <Box sx={{ mt: 4, mb: 4, paddingLeft: isMobile ? '6rem' : '1rem', paddingRight: isMobile ? '6rem' : '1rem', paddingTop: isMobile ? '2rem' : '0.5rem', paddingBottom: isMobile ? '2rem' : '0.5rem' }}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container>
                            {
                                cartCourses?.length > 0 && cartCourses?.map((item, i) => {
                                    return <Grid item xs={12} sm={12} md={12} lg={12} key={i} sx={{ position: "relative" }}>
                                        <Grid container sx={{ marginTop: "10px" }}>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Box sx={{
                                                    background: "rgb(123 127 129 / 7%)",
                                                    margin: "15px", borderRadius: "8px", display: "flex", justifyContent: "center"
                                                }}>
                                                    <img src={item?.logo ? Endpoints?.mediaBaseUrl + item?.logo : 'img/folder-2.png'} style={{ width: '70%', padding: '5px', maxHeight: '200px', minHeight: "150px" }} alt="Preview" className='mobile-view-image' />

                                                </Box>
                                                <Box sx={{
                                                    background: "rgb(123 127 129 / 7%)",
                                                    margin: "15px", borderRadius: "8px", display: "flex", justifyContent: "center"
                                                }}>
                                                    {
                                                        item?.introVideo && (

                                                            <video controls src={item?.introVideo ? Endpoints?.mediaBaseUrl + item?.introVideo : ''} style={{ width: "70%", maxHeight: '200px', minHeight: "150px", padding: '5px' }} />

                                                        )
                                                    }
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={8} lg={8} sx={{ padding: "10px" }}>
                                                <Typography variant='h5' fontWeight={"bold"} sx={{ color: "#000" }}>
                                                    {item?.title}
                                                </Typography>

                                                {item?.paid ? (
                                                    <p>
                                                        <p style={{ fontWeight: 'bold' }}>
                                                            <p style={{ marginBottom: 0 }}>
                                                                Price Rs. {item?.finalPrice.toFixed(2)}
                                                            </p>
                                                        </p>
                                                    </p>
                                                ) : (
                                                    <p>Free</p>
                                                )}
                                                <Typography variant='p' sx={{}} className='desktop-view-discrip'>
                                                    {item?.description ? parse(item?.description) : ""}
                                                </Typography>
                                                <Box>
                                                    <Button onClick={() => handleRemoveItem(item, i)} sx={{ textTransform: "initial", fontSize: 'small', padding: '10px 0' }}>Remove from Cart</Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Grid>
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Stack direction={'row'} spacing={2}
                    sx={{
                        position: 'fixed',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        top: '88%'
                    }}
                >
                    {
                        finalAmounts > 0 && (
                            <Button
                                onClick={handleProceedToCheckout}
                                sx={{
                                    position: 'relative',
                                    borderRadius: `4px`,
                                    fontWeight: '700',
                                    background: `rgb(221, 42, 61)`,
                                    color: `rgb(255, 255, 255)`,
                                    boxShadow: `rgba(0, 0, 0, 0.5) 4px 3px 14px 0px`,
                                    display: `flex`,
                                    justifyContent: 'center',
                                    gap: 1,
                                    alignItems: 'baseline',
                                    padding: `14px 11px`,
                                    fontSize: `12px`,
                                    animation: `${zoomInOut} 1.5s infinite ease-in-out`,
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    boxSizing: 'border-box',
                                    textDecoration: 'none',
                                    ":hover": {
                                        background: 'red!important'
                                    },
                                }}
                            >
                                Procced to checkout
                                <span style={{ color: 'yellow', fontSize: '10px', textTransform: 'none' }}>
                                    Total Price: ₹{finalAmounts.toFixed(2)}
                                </span>
                            </Button>
                        )
                    }

                </Stack>
            </Box>
            <Dialog
                open={proceedToCheckoutModal}
                onClose={() => setProceedToCheckoutModal(false)}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                        },
                    },
                }}
            >
                <ProceedToCheckoutForm setProceedToCheckoutModal={setProceedToCheckoutModal} cartCourses={cartCourses} />
            </Dialog>
        </React.Fragment>
    )
};

export default MultipleCourseCart;