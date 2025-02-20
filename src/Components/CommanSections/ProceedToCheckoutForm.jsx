import { Box, Button, Card, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import instId from "../../constant/InstituteId";
import { BASE_URL } from "../../constant/endpoints";
import axios from "axios";

const ProceedToCheckoutForm = ({ cartCourses, setProceedToCheckoutModal }) => {

    const isMobile = useMediaQuery("(min-width:600px)");
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [payloadCart, setPayloadCart] = useState([]);
    const [checkCoupon, setCheckCoupon] = useState([]);
    const [finalAmounts, setFinalAmounts] = useState(0);
    const [reedemCode, setReedemCode] = useState(false);
    const [couponNumber, setCouponNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isCouponValid, setIsCouponValid] = useState(null);

    const getColor = () => {
        if (isCouponValid === null) return 'darkblue';
        return isCouponValid ? '#329908' : 'red';
    };

    const handleNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setNumber(value);
            setError('');
            if (value.length < 10) {
                setError('Number must be 10 digits long');
            }
        }
    };

    useEffect(() => {
        if (cartCourses?.length > 0) {
            const updatedTotal = cartCourses.reduce((sum, item) => sum + (item.finalPrice ?? 0), 0);

            const updatedPurchaseArray = cartCourses.map(item => ({
                "purchaseType": "course",
                "entityId": item?.id,
                "campusId": 0,
                "courseId": 0,
                "coursePricingId": item.coursePricingId
            }));
            const checkCouponArray = cartCourses.map(item => ({
                "purchaseType": "course",
                "entityId": item?.id
            }));
            setCheckCoupon(checkCouponArray)
            setPayloadCart(updatedPurchaseArray);
            setFinalAmounts(updatedTotal);
        } else {
            // Reset if cart is empty
            setFinalAmounts(0);
            setPayloadCart([]);
        }
    }, [cartCourses]);

    const handleReedemCode = () => {
        setReedemCode(!reedemCode)
    }

    const handleCoupon = (e) => {
        setCouponNumber(e.target.value);
        setErrorMessage('');
        setIsCouponValid(null);
    }
    const handleCheckCoupon = async (e) => {
        e.preventDefault();
        const body = {
            "getCheckoutUrls": checkCoupon,
            "coupon": couponNumber,
            "contact": Number(number),
            "instId": instId,
            "amount": finalAmounts
        }
        try {
            const response = await axios.post(BASE_URL + `/student/coupon/verify`, body);
            // const response = await CourseNetwrok.checkCouponApi(body);
            if (response.data.errorCode === 0) {
                setCouponDiscount(response.data?.discount);
                setIsCouponValid(response.data?.valid);
                setErrorMessage("");
            } else {
                setIsCouponValid(response.data?.valid === null ? false : response.data?.valid);
                setErrorMessage(response.data?.message ? response.data?.message : "Invalid Coupon Code");
                setCouponDiscount(0)
                // setErrorMessage("Invalid Coupon Code")
            }
        } catch (err) {
            console.log(err);
        };
    };

    const handleSubmit = async () => {
        const body = {
            "firstName": title,
            "lastName": title,
            "contact": number,
            "email": email,
            "instId": instId,
            "campaignId": null,
            "coupon": "",
            "coursePricingId": 0,
            "entityModals": payloadCart
        }
        try {
            const response = await axios.post(BASE_URL + `/admin/payment/fetch-public-checkout-url`, body);

            if (response?.data?.status === true) {

                const width = 480;
                const height = 1080;
                const left = window.screenX + (window.outerWidth / 2) - (width / 2);
                const top = window.screenY + (window.outerHeight / 2) - (height / 2);

                window.open(
                    response?.data?.url,
                    'sharer',
                    `location=no,width=${width},height=${height},top=${top},left=${left}`
                );

                // window.open(response?.data?.url, '_blank', "noopener,noreferrer");
                // window.open(response?.data?.url, 'sharer', "location=no,width=480,height=1080");

                setTitle('');
                setNumber('');
                setEmail('')
                setPayloadCart([])
                setProceedToCheckoutModal(false)
            }

        } catch (err) {
            console.log(err);
        };
    };

    return (
        <React.Fragment>
            <Typography sx={{ mt: 3, mb: 1, py: 1 }}>
                <Card sx={{
                    width: "100%",
                    // boxShadow: "rgba(0, 0, 0, 0.11) 0px 3px 8px", 
                    textAlign: "center",
                    mb: 3
                }}>
                    <Typography padding={1} mt={3} fontWeight={'bold'} variant='h5'>
                        Please fill this details
                    </Typography>
                    <Grid container sx={{ margin: "20px 0", justifyContent: "center", paddingLeft: !isMobile ? "10px" : "", paddingRight: !isMobile ? "10px" : "" }}>
                        <Grid item xs={12} sm={10} md={10} lg={10}>
                            <TextField
                                className='mobile-fill-textfield'
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Name"
                                name="name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: "10px", fontSize: '14px'
                                    }
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                    }
                                }}
                                sx={{ gridColumn: "span 12", mb: 2 }}
                            />
                            <TextField
                                inputProps={{
                                    maxLength: 10
                                }}
                                className='mobile-fill-textfield'
                                fullWidth
                                variant="outlined"
                                type="number"
                                label="Number"
                                name="number"
                                value={number}
                                onChange={handleNumberChange}
                                error={!!error}
                                helperText={error}
                                InputProps={{
                                    style: {
                                        borderRadius: "10px", fontSize: '14px'
                                    }
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                    }
                                }}
                                sx={{ gridColumn: "span 12", mb: 2 }}
                            />
                            <TextField
                                className='mobile-fill-textfield'
                                fullWidth
                                variant="outlined"
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: "10px", fontSize: '14px'
                                    }
                                }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                    }
                                }}
                                sx={{ gridColumn: "span 12", mb: 1 }}
                            />
                            <Box sx={{ textAlign: "end" }}>    <Typography variant="p" fontWeight={'bold'} onClick={handleReedemCode} sx={{ cursor: 'pointer', color: "#3f8abf", margin: "4px 0px 0px 4px", fontSize: "10px", }}>Reedem Code</Typography></Box>
                            {
                                reedemCode === true && (
                                    <div className='mobile-fill-textfield'>
                                        <InputLabel sx={{
                                            width: '100%',
                                            textAlign: "left",
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                            color: 'black',
                                        }}>Enter Coupon</InputLabel>

                                        <OutlinedInput
                                            className='mobile-coupon-field'
                                            fullWidth
                                            type="text"
                                            // label="Enter Coupon"
                                            name="number"
                                            value={couponNumber}
                                            onChange={handleCoupon}
                                            id="outlined-adornment-weight"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        disabled={couponNumber && number ? false : true}
                                                        aria-label="toggle password visibility"
                                                        onClick={handleCheckCoupon}
                                                        edge="end"
                                                        sx={{ fontSize: "12px", color: getColor() }}
                                                    >
                                                        {isCouponValid === true ? <><CheckIcon color="success" />Applied</> : "Apply"}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            //   endAdornment={<InputAdornment position="end" onClick={handleSendOtp}>Resend Otp</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            InputProps={{
                                                style: {
                                                    borderRadius: "10px", fontSize: '14px'
                                                }
                                            }}
                                            sx={{ gridColumn: "span 12", borderRadius: "10px" }}
                                        />
                                        {errorMessage && <FormHelperText error sx={{ mt: 1 }}>{errorMessage}</FormHelperText>}
                                    </div>
                                )
                            }
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                // margin: "16px",
                                width: "100%"
                            }}>
                                <Typography variant="h6" color={'darkblue'}><b>Total price :</b> </Typography>
                                <Typography variant="h6" fontWeight={'bold'}>
                                    ₹{finalAmounts.toFixed(2)}
                                </Typography>
                            </Box>

                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: "200px", padding: "10px", margin: "15px", fontSize: '13px' }}
                        onClick={handleSubmit}
                        disabled={title === '' || number === '' || email === ''}
                    >
                        Pay
                    </Button>
                </Card>
            </Typography>
        </React.Fragment>
    )
};

export default ProceedToCheckoutForm;