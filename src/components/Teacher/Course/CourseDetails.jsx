import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FcOk } from "react-icons/fc";
import { LuFiles } from "react-icons/lu";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { GoFileCode } from "react-icons/go";
import { BsPersonAdd } from "react-icons/bs";
import { PiBookOpenTextLight } from "react-icons/pi";
import { RiHealthBookLine } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Chart from "react-apexcharts";
import BeatLoader from "react-spinners/BeatLoader";

function CourseDetails({ courses }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [Code, setCode] = React.useState("");
  const [Cname, setCname] = React.useState("");
  const [Description, setCDescription] = React.useState("");
  const [Cphoto, setCphoto] = React.useState("");
  const [creditHours, setcreditHours] = React.useState();
  const [language, setLanguage] = React.useState("");
  const [Sdate, setSdate] = React.useState("");
  const [Ldate, setLdate] = React.useState("");
  const [instructor, setInstructor] = React.useState("");
  const [instructorEmail, setInstructorEmail] = React.useState("");

  const course = location.state.course;
  const id = location.pathname.split("/").pop();
  useEffect(() => {
    setCode(course.courseCode);
    setCname(course.name);
    setCDescription(course.description);
    setCphoto(course.image);
    setcreditHours(course.creditHours);
    setLanguage(course.language);
    setSdate(course.startingDate);
    setLdate(course.endingDate);
    setInstructor(course.teacher.user.fullName);
    setInstructorEmail(course.teacher.user.email);
  });

  const [pieChart, setPieChart] = React.useState({
    options: {
      chart: {
        height: 280,
        type: "radialBar",
      },

      series: [67],
      colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "#293450",
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "13px",
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Progress"],
    },
  });
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            backgroundColor: "white",
            height: "80vh",
            width: "160vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BeatLoader
            color="#1665b5"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
        <Box sx={{ backgroundColor: theme.palette.primary.background }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                marginBottom: 13,
                marginTop: 1,
                fontSize: 25,
              }}
            >
              <span className="underline">Course Details</span>
            </p>
          </Box>
          <Box>
            <Grid
              container
              spacing={1}
              sx={{
                marginBottom: 3,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={8}>
                <Box
                  sx={{
                    overflow: "hidden",
                    minHeight: "158vh",
                    marginTop: 1,
                    backgroundColor: theme.palette.primary.background,
                    borderRadius: 1,
                    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bolder",
                          marginLeft: 25,
                          marginTop: 0,
                          paddingTop: 14,
                          fontSize: 20,
                          marginBottom: 10,
                        }}
                      >
                        {Cname}
                      </p>
                      <p
                        style={{
                          fontWeight: "bolder",
                          marginRight: 25,
                          marginTop: 0,
                          paddingTop: 14,
                          fontSize: 20,
                          marginBottom: 10,
                        }}
                      >
                        {Code}
                      </p>
                    </Box>
                    <hr style={{ borderTop: "0.1px solid 	#F0F0F0" }}></hr>
                  </Box>
                  <Box sx={{ marginLeft: 3, marginRight: 3, marginTop: 2 }}>
                    <img
                      src={Cphoto}
                      height={450}
                      width={"100%"}
                      style={{ borderRadius: 7 }}
                    />
                  </Box>
                  <Box>
                    <p
                      style={{
                        fontWeight: "bolder",
                        marginLeft: 25,
                        marginTop: 0,
                        paddingTop: 14,
                        fontSize: 17,
                        marginBottom: 5,
                      }}
                    >
                      Course Description
                    </p>
                    <p
                      style={{
                        marginLeft: 25,
                        marginTop: 0,
                        paddingTop: 14,
                        fontSize: 15,
                        marginBottom: 10,
                        marginRight: 25,
                      }}
                    >
                      {Description}
                    </p>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <p style={{ marginLeft: 25 }}>
                        <span style={{ fontWeight: "bold", fontSize: 16 }}>
                          Total Duration :{" "}
                        </span>
                        {creditHours} Hours
                      </p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginRight: 10,
                      }}
                    >
                      <p style={{ marginRight: 25 }}>
                        <span style={{ fontWeight: "bold", fontSize: 16 }}>
                          Language :{" "}
                        </span>
                        {language}
                      </p>
                    </Box>
                  </Box>

                  <Box>
                    <p
                      style={{
                        fontWeight: "bolder",
                        marginLeft: 25,
                        marginTop: 0,
                        paddingTop: 14,
                        fontSize: 17,
                        marginBottom: 5,
                      }}
                    >
                      What you'll learn?
                    </p>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: 16,
                      }}
                    >
                      <Box sx={{ marginLeft: 3, marginTop: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 2,
                          }}
                        >
                          <FcOk fontSize={24} style={{ marginRight: 10 }} />
                          <p style={{ margin: 0 }}>Code Basics</p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 2,
                          }}
                        >
                          <FcOk fontSize={24} style={{ marginRight: 10 }} />
                          <p style={{ margin: 0 }}>A New Language</p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 2,
                          }}
                        >
                          <FcOk fontSize={24} style={{ marginRight: 10 }} />
                          <p style={{ margin: 0 }}>Code Snippets</p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 2,
                          }}
                        >
                          <FcOk fontSize={24} style={{ marginRight: 10 }} />
                          <p style={{ margin: 0 }}>Brain Storming</p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 2,
                          }}
                        >
                          <FcOk fontSize={24} style={{ marginRight: 10 }} />
                          <p style={{ margin: 0 }}>Code Basics</p>
                        </Box>
                      </Box>
                      <Box sx={{ marginLeft: 3, marginTop: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 2,
                          }}
                        >
                          <FcOk fontSize={24} style={{ marginRight: 10 }} />
                          <p style={{ margin: 0 }}>Checking the Task</p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 2,
                          }}
                        >
                          <FcOk fontSize={24} style={{ marginRight: 10 }} />
                          <p style={{ margin: 0 }}>Assesments</p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 2,
                          }}
                        >
                          <FcOk fontSize={24} style={{ marginRight: 10 }} />
                          <p style={{ margin: 0 }}>Code Basics</p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <Box
                  sx={{
                    overflow: "hidden",
                    minHeight: "49vh",
                    marginTop: 1,
                    backgroundColor: theme.palette.primary.background,
                    borderRadius: 1,
                    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bolder",
                      marginLeft: 25,
                      marginTop: 0,
                      paddingTop: 14,
                      fontSize: 20,
                      marginBottom: 10,
                    }}
                  >
                    At a Glance
                  </p>
                  <hr style={{ borderTop: "0.1px solid 	#F0F0F0" }}></hr>
                  <Box
                    onClick={() =>
                      navigate(`/Teacher/ViewUploadedAssigList/${id}`)
                    }
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 2,
                      justifyContent: "space-between",
                      marginRight: 2,
                      marginTop: 2,
                      ":hover": {
                        color: theme.palette.secondary.main,
                        borderBottom: "0.1px solid 	#F0F0F0",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <LuFiles
                        fontSize={21}
                        style={{ color: theme.palette.secondary.main }}
                      />
                      <p
                        style={{
                          margin: 0,
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Assignments
                      </p>
                    </Box>
                    <Box>
                      <TfiArrowCircleRight
                        fontSize={22}
                        style={{ color: theme.palette.secondary.main }}
                      />
                    </Box>
                  </Box>

                  <Box
                    onClick={() => navigate(`/Teacher/AddAssignment/${id}`)}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 2,
                      justifyContent: "space-between",
                      marginRight: 2,
                      marginTop: 2,
                      ":hover": {
                        color: theme.palette.secondary.main,
                        borderBottom: "0.1px solid 	#F0F0F0",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <BsFileEarmarkPdf
                        fontSize={21}
                        style={{ color: theme.palette.secondary.main }}
                      />
                      <p
                        style={{
                          margin: 0,
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Add Assignment
                      </p>
                    </Box>
                    <Box>
                      <TfiArrowCircleRight
                        fontSize={22}
                        style={{ color: theme.palette.secondary.main }}
                      />
                    </Box>
                  </Box>

                   

                  <Box
                    onClick={() => {
                      navigate("/Teacher/StudentRequests/" + course._id, {
                        state: { course: course },
                      });
                    }}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 2,
                      justifyContent: "space-between",
                      marginRight: 2,
                      marginTop: 2,
                      ":hover": {
                        color: theme.palette.secondary.main,
                        borderBottom: "0.1px solid 	#F0F0F0",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <BsPersonAdd
                        fontSize={21}
                        style={{ color: theme.palette.secondary.main }}
                      />
                      <p
                        style={{
                          margin: 0,
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Student Requests
                      </p>
                    </Box>
                    <Box>
                      <TfiArrowCircleRight
                        fontSize={22}
                        style={{ color: theme.palette.secondary.main }}
                      />
                    </Box>
                  </Box>

                  <Box
                    onClick={() => {
                      navigate("/Teacher/ContentList/" + course._id, {
                        state: { course: course },
                      });
                    }}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 2,
                      justifyContent: "space-between",
                      marginRight: 2,
                      marginTop: 2,
                      ":hover": {
                        color: theme.palette.secondary.main,
                        borderBottom: "0.1px solid 	#F0F0F0",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <PiBookOpenTextLight
                        fontSize={21}
                        style={{ color: theme.palette.secondary.main }}
                      />
                      <p
                        style={{
                          margin: 0,
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Lectures
                      </p>
                    </Box>
                    <Box>
                      <TfiArrowCircleRight
                        fontSize={22}
                        style={{ color: theme.palette.secondary.main }}
                      />
                    </Box>
                  </Box>

                  <Box
                    onClick={() => {
                      navigate("/Teacher/AddCourseContent/" + course._id, {
                        state: { course: course },
                      });
                    }}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 2,
                      justifyContent: "space-between",
                      marginRight: 2,
                      marginTop: 2,
                      ":hover": {
                        color: theme.palette.secondary.main,
                        borderBottom: "0.1px solid 	#F0F0F0",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <RiHealthBookLine
                        fontSize={21}
                        style={{ color: theme.palette.secondary.main }}
                      />
                      <p
                        style={{
                          margin: 0,
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Add Lectures
                      </p>
                    </Box>
                    <Box>
                      <TfiArrowCircleRight
                        fontSize={22}
                        style={{ color: theme.palette.secondary.main }}
                      />
                    </Box>
                  </Box>

                  <Box
                    onClick={() => navigate("/Teacher/StudentList")}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 2,
                      justifyContent: "space-between",
                      marginRight: 2,
                      marginTop: 2,
                      ":hover": {
                        color: theme.palette.secondary.main,
                        borderBottom: "0.1px solid 	#F0F0F0",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <PiStudentFill
                        fontSize={21}
                        style={{ color: theme.palette.secondary.main }}
                      />
                      <p
                        style={{
                          margin: 0,
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Students
                      </p>
                    </Box>
                    <Box>
                      <TfiArrowCircleRight
                        fontSize={22}
                        style={{ color: theme.palette.secondary.main }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    minHeight: "54vh",
                    marginTop: 2,
                    backgroundColor: theme.palette.primary.background,
                    borderRadius: 1,
                    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        marginLeft: 25,
                        marginTop: 0,
                        paddingTop: 14,
                        fontSize: 20,
                        marginBottom: 10,
                      }}
                    >
                      Course Progress
                    </p>
                  </Box>
                  <hr style={{ borderTop: "0.1px solid 	#F0F0F0" }}></hr>
                  <Box sx={{ overflow: "hidden" }}>
                    <Chart
                      options={{
                        chart: {
                          height: 240,
                          type: "radialBar",
                        },
                        colors: ["#24e4ac"],
                        plotOptions: {
                          radialBar: {
                            hollow: {
                              margin: 0,
                              size: "70%",
                              background: "white",
                            },
                            track: {
                              dropShadow: {
                                enabled: true,
                                top: 5,
                                left: 0,
                                blur: 4,
                                opacity: 0.15,
                              },
                            },
                            dataLabels: {
                              name: {
                                offsetY: -10,
                                color: "#2a3290",
                                fontSize: "18px",
                              },
                              value: {
                                color: "#2a3290",
                                fontSize: "30px",
                                fontWeight: "bold",
                                show: true,
                              },
                            },
                          },
                        },
                        fill: {
                          type: "gradient",
                          gradient: {
                            shade: "dark",
                            type: "vertical",
                            gradientToColors: ["#c758d0"],
                            stops: [0, 100],
                          },
                        },
                        stroke: {
                          lineCap: "round",
                        },
                        labels: ["Course Completed"],
                      }}
                      series={[75]}
                      type="radialBar"
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    minHeight: "50vh",
                    marginTop: 2,
                    backgroundColor: theme.palette.primary.background,
                    borderRadius: 1,
                    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      height={100}
                      width={100}
                      style={{ borderRadius: 50, marginTop: 18 }}
                      src="https://demos.creative-tim.com/material-dashboard-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"
                    ></img>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: 20,
                        marginBottom: 4,
                      }}
                    >
                      {instructor}
                    </p>
                    <p
                      style={{ margin: 0, color: theme.palette.secondary.main }}
                    >
                      Assistant Professor
                    </p>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>{instructorEmail}</p>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      endIcon={<CgProfile fontSize={30} />}
                      variant="outlined"
                      color="secondary"
                      sx={{
                        padding: 1.5,
                        borderRadius: 10,
                        ":hover": {
                          backgroundColor: theme.palette.secondary.main,
                          color: theme.palette.primary.background,
                        },
                      }}
                    >
                      Visit Profile
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

export default CourseDetails;
