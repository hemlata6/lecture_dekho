import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";

const PrivacyAndPolicy = () => {

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
                                            Privacy and Policy
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
                                        Effective Date : 22 Feb 2024
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
                                        At ProVidya Education, we are committed to safeguarding the privacy of our students, staff, and visitors. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with us, whether through our website, mobile application, or in person.
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
                                        1. Information We Collect
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        We may collect the following types of personal information:
                                    </Typography>
                                    <Box
                                        sx={{
                                            paddingLeft: isMobile ? '1rem' : '0.5rem',
                                        }}
                                    >
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Personal Identification Information:</span> Name, contact details (email, phone number), address, and date of birth.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Educational Information:</span> Academic background, coaching program details, and performance records.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Payment Information:</span> Billing details, transaction data, and payment history.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Usage Data:</span> Information related to how you interact with our website, mobile application, and services (IP address, device information, browser type, pages visited).
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Other Information:</span> Any other information you voluntarily provide to us (e.g., feedback, queries, additional documents).
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        2.  How We Use Your Information
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        We use your information for the following purposes:
                                    </Typography>
                                    <Box
                                        sx={{
                                            paddingLeft: isMobile ? '1rem' : '0.5rem',
                                        }}
                                    >
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>To Provide Services:</span> To enroll you in coaching programs, provide study materials, and offer personalized mentoring.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Communication:</span> To send you important updates, notifications, and information related to your course or inquiries.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Marketing and Promotions:</span> To inform you about new courses, promotions, events, and other educational offerings.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Improvement of Services:</span> To understand how students use our services, to improve content, curriculum, and overall student experience.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Payment Processing:</span> To process your transactions and maintain records for billing purposes.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Legal Compliance:</span> To comply with applicable laws and regulations.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        3. Sharing Your Information
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        We do not sell or share your personal information with third parties, except:
                                    </Typography>
                                    <Box
                                        sx={{
                                            paddingLeft: isMobile ? '1rem' : '0.5rem',
                                        }}
                                    >
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Service Providers:</span> We may share your information with trusted third-party service providers (e.g., payment processors, IT services) who help us deliver our services.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Legal Obligations:</span> If required by law or in response to legal requests, we may disclose your information to authorities.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Consent</span> We may share information with third parties when you have provided explicit consent for us to do so.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        4. Data Security
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        We take reasonable precautions to ensure that your personal data is protected from unauthorized access, alteration, or disclosure. We implement technical, administrative, and physical security measures to safeguard your information.
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
                                        5. Your Data Rights
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        As a user, you have certain rights related to your personal data, including:
                                    </Typography>
                                    <Box
                                        sx={{
                                            paddingLeft: isMobile ? '1rem' : '0.5rem',
                                        }}
                                    >
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Access:</span> You may request access to the personal information we hold about you.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Correction</span> You can request that we update or correct any inaccurate information.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Deletion:</span> You may request the deletion of your personal information, subject to legal and operational obligations.
                                        </Typography>
                                        <Typography
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                            fontWeight={'400'}
                                            color={'#4E4B66'}
                                            py={1}
                                            display={'list-item'}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>Opt-Out:</span> You have the right to opt out of receiving marketing communications from us.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        6. Cookies and Tracking Technologies
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        Our website and mobile application use cookies and similar tracking technologies to enhance user experience and collect usage data. You can manage your cookie preferences through your browser settings.
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
                                        7. Third-Party Links
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites.
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
                                        8. Changes to This Policy
                                    </Typography>
                                    <Typography
                                        textAlign={'left'}
                                        fontSize={'20px'}
                                        fontWeight={'400'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated "Last Updated" date.
                                    </Typography>
                                    <Typography
                                        textAlign={'start'}
                                        fontSize={'24px'}
                                        fontWeight={'700'}
                                        color={'#4E4B66'}
                                        py={1}
                                    >
                                        This Privacy policy is also associated with ProVidya
                                        Education Developer console account as well as ProVidya Test Series
                                        Play Store listed Android Application.
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

export default PrivacyAndPolicy;