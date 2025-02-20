import { Typography } from '@mui/material';
import React from 'react'

const CourseList = ({ courses, selectedDomains }) => {
    // Filter courses based on selected domains
    const filteredCourses = courses.filter((course) =>
        course.domain.some((courseDomain) =>
            selectedDomains?.some(
                (selectedDomain) => selectedDomain.id === courseDomain.id
            )
        )
    );

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Courses in Selected Domains:
            </Typography>
            {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                    <div key={course.id} style={{ marginBottom: "15px" }}>
                        <Typography variant="h6">{course.title}</Typography>
                        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: course.description }} />
                    </div>
                ))
            ) : (
                <Typography variant="body2">No courses found for selected domains.</Typography>
            )}
        </div>
    );
};

export default CourseList