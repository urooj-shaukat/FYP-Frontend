import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LogoImage from '../assets/logo.png'
import ForgotPassImage from '../assets/pic2.png'
import CircleImage from '../assets/circle.png'
import { useTheme } from '@emotion/react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';

function ForgotPassword() {
    const theme = useTheme()
    const [email, setEmail] = React.useState('')



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

                    <Box sx={{ marginLeft: 10, marginRight: 10 }}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 1 }}>Forgot Password? </Typography>
                        <Typography>Don’t worry ! It happens. Please enter the active Email Address we will send the OTP in this email.</Typography>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
                            <FormControl sx={{ width: '100%', marginTop: 4 }} value={email}>
                                <InputLabel htmlFor="outlined-adornment-email" color='secondary'>Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    color='secondary'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Button
                                                aria-label="toggle email visibility"
                                                edge="end"
                                                color='secondary'
                                            >
                                                {<EmailIcon />}
                                            </Button>
                                        </InputAdornment>
                                    }
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ marginTop: 5 }}>
                            <Button variant="contained" color="secondary" endIcon={<LoginIcon />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                                Continue
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default ForgotPassword;
