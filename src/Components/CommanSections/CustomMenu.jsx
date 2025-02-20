import { Box, Button, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const DomainMenu = ({ domainData, courses, setAnchorElOnlineCourse }) => {

  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
  };

  const getCoursesForDomain = (domainId) => {
    const matchedCourses = courses.filter((course) =>
      course.domain.some((d) => d.id === domainId)
    );
    return matchedCourses.map((course) => course);
  };


  const handleOpenCourse = (item) => {
    setSelectedCourse(item)
    navigate(`/course?courseId=${encodeURIComponent(item?.id)}`);
    // navigate(`https://course.classiolabs.com/course/${item?.id}`);
    // const url = `https://course.classiolabs.com/course/${item?.id}`
    // window.open(url, '_blank', 'noreferrer');
    // handleClose();
    // handleCloseOnlineCourse();
  };

  const menuClosed = () => {
    setAnchorElOnlineCourse(null)
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
      <Box sx={{ textAlign: "right" }}> <CloseIcon onClick={menuClosed} sx={{ fontSize: "16px", mr: 1 }} /></Box>
      <div>
        <ul style={{ listStyle: "none", padding: 0, display: 'flex', gap: 1 }}>
          {domainData?.map((domain) => (
            <Typography key={domain.id}
              sx={{
                px: 0.5,
                py: 0.1,
                textAlign: 'start'
              }}
            >
              <li
                key={domain.id}
                style={{
                  cursor: "pointer",
                  margin: "10px",
                  color: selectedDomain?.id === domain.id ? "blue" : "black",
                  ":hover": {
                    background: '#003085',
                    color: '#fff'
                  },
                  textAlign: 'start',
                  fontWeight: "700",
                  fontSize: '12px'
                }}
                onClick={() => handleDomainClick(domain)}
              >
                {domain.name}
              </li>
              {/* <ul style={{ marginTop: '5px', padding: 0, listStyle: 'none', marginLeft: '5px' }}>
                {getCoursesForDomain(domain.id)?.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleOpenCourse(item)}
                    style={{ padding: '5px', cursor: 'pointer' }}
                  >
                    <Typography
                      sx={{
                        fontSize: '12px',
                        color: '#555',
                        "&:hover": {
                          color: 'blue',
                        },
                      }}
                    >
                      {item?.title}
                    </Typography>
                  </li>

                ))}
              </ul> */}
            </Typography>
          ))}
        </ul>
      </div>
      {selectedDomain && selectedDomain.child.length > 0 && (
        <div>
          {selectedDomain && selectedDomain.child.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {selectedDomain?.child.map((sub) => {
                const matchedCourses = courses.filter((course) =>
                  course.active && course.domain.some((domainItem) => domainItem.id === sub.id)
                );
                return (
                  <li
                    key={sub.id}
                    style={{
                      cursor: "pointer",
                      margin: "10px",
                      fontSize: "12px",
                      padding: "2px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ fontWeight: "700", fontSize: '12px' }}>{sub.name}</span>
                      <span style={{ color: "gray" }}>{sub.child.length === 0 ? <>➤</> : <></>}</span>
                    </div>
                    {matchedCourses.length > 0 && (
                      <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
                        {matchedCourses.map((course, index) => {
                          return <li
                            key={index}
                            onClick={() => handleOpenCourse(course)}
                            style={{
                              padding: "5px",
                              cursor: "pointer",
                              fontWeight: "bold",
                              borderRadius: "4px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '10px',
                                color: selectedCourse?.id === course.id ? "blue" : "black",
                                "&:hover": {
                                  color: 'blue',
                                },
                              }}
                            >
                              {course?.title}
                            </Typography>
                          </li>

                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : ("")}
        </div>
      )
      }
    </div>
  );
};

export default DomainMenu;
