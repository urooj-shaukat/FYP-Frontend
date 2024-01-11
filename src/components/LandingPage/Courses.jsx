import React from 'react';
import CourseCard from './CourseCard';
import Box from '@mui/material/Box';

function Courses() {
    const courses = [{
        student: 40,
        name: 'Data Science',
        image:'https://egrad.wpengine.com/wp-content/uploads/2022/11/course02-640x430.jpg',
        description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
        credits: 3,
        lectures: 15,
        teacher: "Faisal"
    },
    {
        student: 40,
        name: 'Data Science',
        image:'https://egrad.wpengine.com/wp-content/uploads/2022/11/course01-640x430.jpg',
        description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
        credits: 3,
        lectures: 15,
        teacher: "Faisal"
    },
    {
        student: 40,
        name: 'Data Science',
        image:'https://egrad.wpengine.com/wp-content/uploads/2022/11/course03-1-640x430.jpg',
        description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
        credits: 3,
        lectures: 15,
        teacher: "Faisal"
    },
    {
        student: 40,
        name: 'Data Science',
        image:'https://egrad.wpengine.com/wp-content/uploads/2022/11/course02-640x430.jpg',
        description: 'Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.',
        credits: 3,
        lectures: 15,
        teacher: "Faisal"
    }];
    return (
        <Box>
            <Box className="courseMain_container">
                {courses.map((course) => {
                    return <CourseCard course={course}></CourseCard>
                })}
            </Box>
        </Box>
    );
}

export default Courses;
