import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LogoImage from '../assets/logo.png'
import ForgotPassImage from '../assets/pic2.png'
import CircleImage from '../assets/circle.png'
import { useTheme } from '@emotion/react';
import { MuiOtpInput } from 'mui-one-time-password-input'

function OTP() {
    const theme = useTheme()
    const [otp, setOtp] = React.useState('')



    //axios function request here below the states



    return (
        <div>
            <Box sx={{ flexDirection: 'row', display: 'flex', height: '100vh' }}>
                <Box bgcolor={theme.palette.secondary.main} sx={{ borderBottomRightRadius: 16, borderTopRightRadius: 16, width: '60%' }} >
                    <Typography variant='h4' sx={{ color: theme.palette.primary.background, marginLeft: 3, marginTop: 4, fontWeight: 'bold' }}><img src={LogoImage} height={30} /> <span style={{ color: '#9F8C62' }}>Pro</span>Grade </Typography>
                    <Box sx={{ marginLeft: 4, marginTop: 4 }}>
                        <Typography variant='h4' sx={{ color: theme.palette.primary.background, fontWeight: 'bold' }}>Welcome to <span style={{ color: '#9F8C62' }}>Pro</span>Grade </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 4 }}>
                        <Typography variant='h5' sx={{ color: theme.palette.primary.background }}>Forgot Password? </Typography>
                    </Box>
                    <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                        <img style={{ maxWidth: '100%', maxHeight: '60vh' }} src={ForgotPassImage} />
                    </Box>
                </Box>
                <Box sx={{ width: '80%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <img src={CircleImage} height='150vh' />
                    </Box>
                    <Box sx={{ marginLeft: 10, marginRight: 10, justifyContent: 'center' }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: 2 }}>OTP Verification</Typography>
                        <Typography>Enter the OTP sent to <span style={{ fontWeight: 'bold' }}>user@gmail.com</span> </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
                            <MuiOtpInput value={otp} onChange={(e) => setOtp(e.target.value)} color="secondary" />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
                            <Typography variant='body2' style={{ fontWeight: 'bold' }} >Don’t receive code ? <span style={{ color: '#6614A5' }}>Re-send</span></Typography>
                        </Box>
                        <Box sx={{ marginTop: 5 }}>
                            <Button variant="contained" color="secondary" sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                                SUBMIT
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default OTP;
