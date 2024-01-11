import React from "react";
import Navbar from "./Navbar";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { IoIosPeople } from "react-icons/io";
import Grid from "@mui/material/Grid";
import { useTheme } from "@emotion/react";
import { TbSettingsCog } from "react-icons/tb";
import { FaCode } from "react-icons/fa6";
import { SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { SiCoursera } from "react-icons/si";
import { AiOutlineAntDesign } from "react-icons/ai";
import { TbBrandKotlin } from "react-icons/tb";
import Footer from '../LandingPage/Footer'

function LandingPage() {
  const theme = useTheme();
  return (
    <Box>
      <Navbar />
      <Box sx={{ marginTop: 15 }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Box>
                <p style={{ fontSize: 60, fontWeight: "bolder", margin: 0 }}>
                  Present Education in a
                </p>
                {/* <p>Present Education in beautiful</p> */}
                <div class="wrapper">
                  <ul class="dynamic-txts">
                    <li>
                      <span style={{ marginRight: 22 }}>Professional </span>
                    </li>
                    <li>
                      <span>Competent</span>
                    </li>
                    <li>
                      <span>Developing</span>
                    </li>
                    <li>
                      <span>Friendly</span>
                    </li>
                  </ul>
                  <div class="static-txt">
                    <p
                      style={{ margin: 0, fontSize: 60, fontWeight: "bolder" }}
                    >
                      environment
                    </p>
                  </div>
                </div>
              </Box>
              <Box>
                <p
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  A modern and unique style to make your Educational platform
                  <br />
                  standout. Crafting an unparalleled educational platform.
                  <br />
                  Elevate your offering with innovative designs, interactive
                  <br />
                  interfaces, and engaging content. Redefine the learning
                  <br />
                  experience, attracting learners with its modernity.
                </p>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box sx={{ height: "200" }}>
              <lottie-player
                id="myLottieAnimation2"
                src="https://lottie.host/a5ab99ff-baa0-4b70-ac32-9019bd752521/9Ed1qNCjHX.json"
                background="##fff"
                speed="1"
                loop
                autoplay
                direction="1"
                mode="normal"
              ></lottie-player>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 8,
            marginBottom: 5,
          }}
        >
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Box
              sx={{
                height: "40vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                ":hover": {
                  background:
                    "linear-gradient(to right, #3F5EFB, #FC466B)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                  color: "white",
                },
                borderRadius: 5,
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <IoIosPeople
                fontSize={60}
                style={{ color: theme.palette.secondary.main }}
              />
              <p style={{ fontWeight: "bolder", fontSize: 20, margin: 0 }}>
                WHO WE ARE
              </p>
              <p>
                Lorem ipsum dolor,consectetur quam <br />
                impedit natus fuga blanditiis veritatis asperiores ipsam
                aperiam, <br />
                vitae hic assumenda velit quod!
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Box
              sx={{
                height: "40vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                ":hover": {
                  background:
                    "linear-gradient(to right, #3F5EFB, #FC466B)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                  color: "white",
                },
                borderRadius: 5,
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <TbSettingsCog
                fontSize={60}
                style={{ color: theme.palette.secondary.main }}
              />
              <p style={{ fontWeight: "bolder", fontSize: 20, margin: 0 }}>
                OUR MISSION
              </p>
              <p>
                Lorem ipsum dolor,consectetur quam <br />
                impedit natus fuga blanditiis veritatis asperiores ipsam
                aperiam, <br />
                vitae hic assumenda velit quod!
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Box
              sx={{
                height: "40vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                ":hover": {
                  background:
                    "linear-gradient(to right, #3F5EFB, #FC466B)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                  color: "white",
                },
                borderRadius: 5,
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <FaCode
                fontSize={60}
                style={{ color: theme.palette.secondary.main }}
              />
              <p style={{ fontWeight: "bolder", fontSize: 20, margin: 0 }}>
                OUR VISION
              </p>
              <p>
                Lorem ipsum dolor,consectetur quam <br />
                impedit natus fuga blanditiis veritatis asperiores ipsam
                aperiam, <br />
                vitae hic assumenda velit quod!
              </p>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <p
            style={{
              // fontWeight: "bold",
              marginBottom: 10,
              marginTop: 1,
              fontSize: 45,
            }}
          >
            <span className="underline">Popular Languages</span>{" "}
          </p>
        </Box>

        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <Grid item xs={12} sm={12} md={6} lg={1.5}>
            <Box
              sx={{
                height: "20vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                background:
                  "linear-gradient(to right, #3F5EFB, #FC466B)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                color: "white",
                borderTopLeftRadius: 34,
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <SiPython fontSize={45} />
              <p style={{ fontWeight: "bolder" }}>PYTHON</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={1.5}>
            <Box
              sx={{
                height: "20vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                ":hover": {
                  background:
                    "linear-gradient(to right, #3F5EFB, #FC466B)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                  color: "white",
                },
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <FaJava
                fontSize={45}
                style={{ color: theme.palette.secondary.main }}
              />
              <p style={{ fontWeight: "bolder" }}>JAVA</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={1.5}>
            <Box
              sx={{
                height: "20vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                ":hover": {
                  background:
                    "linear-gradient(to right, #3F5EFB, #FC466B)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                  color: "white",
                },
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <TbBrandCpp
                fontSize={45}
                style={{ color: theme.palette.secondary.main }}
              />
              <p style={{ fontWeight: "bolder" }}>CPP</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={1.5}>
            <Box
              sx={{
                height: "20vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                ":hover": {
                  background:
                    "linear-gradient(to right, #3F5EFB, #FC466B)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                  color: "white",
                },
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <SiCoursera
                fontSize={45}
                style={{ color: theme.palette.secondary.main }}
              />
              <p style={{ fontWeight: "bolder" }}>C</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={1.5}>
            <Box
              sx={{
                height: "20vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                ":hover": {
                  background:
                    "linear-gradient(to right, #3F5EFB, #FC466B)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                  color: "white",
                },
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <AiOutlineAntDesign
                fontSize={45}
                style={{ color: theme.palette.secondary.main }}
              />
              <p style={{ fontWeight: "bolder" }}>DESIGN</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={1.5}>
            <Box
              sx={{
                height: "20vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                ":hover": {
                  background:
                    "linear-gradient(to right, #3F5EFB, #FC466B)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                  color: "white",
                },
                borderTopRightRadius: 34,
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <TbBrandKotlin
                fontSize={45}
                style={{ color: theme.palette.secondary.main }}
              />
              <p style={{ fontWeight: "bolder" }}>KOTLIN</p>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 8,
            marginBottom: 5,
          }}
        >
          <Grid item xs={12} sm={12} md={6} lg={9} sx={{ marginBottom: 10 }}>
            <Box
              sx={{
                height: "70vh",
                marginRight: 4,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",

                borderRadius: 2,
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <Box>
                <dotlottie-player
                  id="myLottieAnimation3"
                  src="https://lottie.host/c3e4293f-4fe3-4ccc-a3a5-3b699ba4f845/xs1e2Zsw3B.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></dotlottie-player>
              </Box>
              <Box>
                <p style={{ fontWeight: "bolder", fontSize: 22 }}>
                  Introduction to Python
                </p>
                <p>
                  Hamburger pork beef shank turducken drumstick pork loin. Pork<br/>
                  short ribs rump fatback capicola ham strip steak jowl filet<br/>
                  mignon buffalo alcatra swine
                </p>
                <ul>
                  <li style={{marginBottom:15, fontFamily:'Nunito, sans-serif'}}>
                  Pig swine prosciutto rump pork chop
                  </li>
                  <li style={{marginBottom:15, fontFamily:'Nunito, sans-serif'}}>
                  Tail spare ribs capicola flank shank
                  </li>
                  <li style={{marginBottom:15, fontFamily:'Nunito, sans-serif'}}>
                  Beef ribs sirloin cupim frankfurter
                  </li>
                  <li style={{marginBottom:15, fontFamily:'Nunito, sans-serif'}}>
                  Tail spare ribs capicola flank shank
                  </li>
                </ul>
                <Button sx={{padding:2,borderRadius:10,marginTop:5, backgroundColor:theme.palette.secondary.main, color:theme.palette.primary.background}}>Start learn now</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </Box>
  );
}

export default LandingPage;
