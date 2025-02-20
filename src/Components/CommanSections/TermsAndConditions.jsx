import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";

const TermsAndConditions = () => {

    const isMobile = useMediaQuery("(min-width:600px)");

    return (
        <React.Fragment>
            <div className="">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        //   height: "100vh", 
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <Box
                        sx={{
                            padding: "20px",
                            // maxWidth: "1000px",
                            width: "100%",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div style={{ paddingLeft: isMobile ? '7rem' : '1rem', paddingRight: isMobile ? '7rem' : '1rem', paddingTop: isMobile ? '1rem' : '0.2rem', paddingBottom: isMobile ? '1rem' : '0.2rem' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                                        <Typography variant="h4" fontWeight="bold" color="primary">
                                            Terms and Conditions
                                        </Typography>
                                    </Box>
                                    <Divider
                                        sx={{
                                            width: "50%",
                                            margin: "10px auto",
                                            backgroundColor: "#e0e0e0",
                                            mb: 4
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'right'}
                                        fontSize={'15px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        Effective Date: 22 Feb 2024
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'center'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        Welcome to Providya! Please read these Terms and Conditions carefully before using our website or services. By accessing or using our website, you agree to comply with these Terms and Conditions.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        1. Acceptance of Terms
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        By using the Providya website or services, you agree to be bound by these Terms and Conditions, including any updates or changes made to them. If you do not agree with these terms, please do not use our services.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        2. Use of Services
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of others. You must not engage in any activity that could harm or interfere with the proper functioning of the Providya website or services.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        3. Account Registration
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        To access certain features of our website or services, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information, including your username and password. You agree to notify us immediately of any unauthorized use of your account.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        4. Privacy Policy
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        Providya is committed to protecting your privacy. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our website or services, you consent to the collection and use of your information as described in the Privacy Policy.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        5. Payment and Refunds
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        You agree to pay all applicable fees for the services you use through Providya. All payments are subject to our refund policy, which may vary based on the service or product. Please refer to our refund policy for more details.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        6. Limitation of Liability
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        Providya shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services. We are not responsible for any loss of data, information, or profits.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        7. Changes to Terms and Conditions
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        Providya reserves the right to update or modify these Terms and Conditions at any time. We will notify you of any significant changes by posting the revised Terms on our website. It is your responsibility to review these terms periodically to stay informed of any changes.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        8. Governing Law
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Indore, Madhya Pradesh, India.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'center'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        If you have any questions or concerns regarding these Terms and Conditions, please contact us at support@providya.com.
                                    </Typography>
                                </Grid>

                            </Grid>
                        </div>
                    </Box>
                </Box>
            </div>
        </React.Fragment>
    )
};

export default TermsAndConditions;