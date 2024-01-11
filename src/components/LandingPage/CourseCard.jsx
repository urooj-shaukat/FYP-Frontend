import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography } from '@mui/material';
import { CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../../App.css'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';

function CourseCard({ course }) {
    return (
        <Box sx={{ marginBottom: 0, }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card sx={{ maxWidth: 440, boxShadow: 'box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', borderRadius: 9, marginTop: 2, marginLeft: 5, ":hover": { backgroundColor: "#ff2712", color: 'white' } }}>
                        <CardActionArea className="container" sx={{ marginTop: 4, paddingLeft: 3, paddingRight: 3, }}>
                            <CardMedia sx={{ borderRadius: 8 }}>
                                <div>
                                    <img src={course.image} alt="Avatar" className="image" width='100%' />
                                    <div className="middle">
                                        <div className="text">Computer Science</div>
                                    </div>
                                </div>
                            </CardMedia>

                            <CardContent sx={{ ":hover": { backgroundColor: "#ff2712", color: 'white' } }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <PeopleAltIcon sx={{ marginRight: 2, color: '#fecf03' }}></PeopleAltIcon>
                                    <Typography sx={{ marginBottom: 2, fontWeight: 'bold', color: '#fecf03', fontSize: 19 }} >
                                        {course.student} Students
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontWeight: 'bold', fontSize: 30 }} gutterBottom variant="h5">
                                    {course.name}
                                </Typography>
                                <Typography className='cut-off-text' variant="body2" >
                                    {course.description}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3, marginBottom: 3 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', marginRight: 4 }}>
                                        <AccessTimeFilledIcon sx={{marginRight: 1,}} />
                                        <Typography sx={{fontWeight:'bold'}}>{course.credits} Credits</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <LibraryBooksIcon sx={{marginRight: 1}} />
                                        <Typography sx={{fontWeight:'bold'}}>{course.lectures} Lectures</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: 'row',justifyContent:'space-between' }} >
                                    <Box sx={{ display: 'flex', flexDirection: 'row',marginTop:1 }}>
                                        <SchoolIcon sx={{marginRight: 1}}/>
                                        <Typography sx={{fontWeight:'bold'}}>Prof. {course.teacher}</Typography>
                                    </Box>
                                    <Box>
                                        <Button sx={{ ":hover": { backgroundColor: "white", color: 'red' }, backgroundColor: '#2a3290', color: 'white', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5, paddingBottom: 2, paddingTop: 2, borderRadius: 6 }} variant='outlined' size="small" color="primary">
                                            Enroll Now!
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>


                        </CardActionArea>
                        <CardActions>

                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </Box>
    );
}

export default CourseCard;
