import * as React from "react";
import { Timeline } from "react-svg-timeline";
import styled from "@emotion/styled";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import { motion } from "framer-motion";
import Logo from "../components/logo";
import ProfileForm from "../components/profile-form";
import { ICoreClientApi } from "core";

//////////////////////////////////
const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  // height: '100vh',
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

// export default function Profile(){
const Profile = ({ setAuth, api }: { setAuth: any; api: ICoreClientApi }) => {
  const ref = React.useRef<any>(null);
  const [width, setWidth] = React.useState(0);

  return (
    <div ref={ref}>
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            {/* <HeadingStyle component={motion.div} {...fadeInUp}>
              <Logo />

              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Введите ваши данные ниже
              </Typography>
            </HeadingStyle> */}

            <ProfileForm api={api} setAuth={setAuth} />
          </ContentStyle>
        </Container>
      </RootStyle>
    </div>
  );
};

export default Profile;
