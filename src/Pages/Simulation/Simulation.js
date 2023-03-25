import React from "react";
import { makeStyles } from "@mui/styles";
// import { Link } from "react-router-dom";
import {
  Theme,
  AppBar,
  Container,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputDistributionParameters from "../../components/InputdistributionParameters/InputdistributionParameters";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 20,
  },
  appHeading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px !important",
    },
  },
  appButton: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px !important",
    },
  },
}));

const Simulation = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar sx={{ p: 1 }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            fontWeight={"bold"}
            variant="h4"
            className={classes.appHeading}
          >
            Simulation Models
          </Typography>
          
        </Container>
      </AppBar>
      <Container sx={{ pt: "70px" }} maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{my:2}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
       
        <Typography color="text.primary">Simulation</Typography>
      </Breadcrumbs>
        <InputDistributionParameters />
      </Container>
    </div>
  );
};

export default Simulation;
