import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Container, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import useApp from "../../hooks/useApp";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: 20,
  },
  // appHeading: {
  //   [theme.breakpoints.down("sm")]: {
  //     fontSize: "11px !important",
  //   },
  // },
  // appButton: {
  //   [theme.breakpoints.down("sm")]: {
  //     fontSize: "10px !important",
  //   },
  // },
}));

const Home = () => {
  const classes = useStyles();
  const { performanceMeasures } = useApp();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      {/* <AppBar sx={{ p: 2 }}>
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
            Operations Research Project
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/simulation")}
            className={classes.appButton}
          >
            Custom Distributions
          </Button>
        </Container>
      </AppBar> */}
      <Container sx={{ pt: "100px" }} maxWidth="lg">
      <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center',marginTop:'50px', gap:'50px'}}>
          <div>

          <Typography variant="h3" sx={{fontWeight:600}}>Queueing Simulation System</Typography>
          </div>
          <div style={{marginTop:'-20px'}}>

          <Typography variant="h3" sx={{fontWeight:600}}>Operations Research Project</Typography>

          </div>
        </div>
        <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center',marginTop:'50px', gap:'50px'}}>
          <div>

          <Button color="primary" variant="contained" size="large" sx={{width:'400px',fontSize:'2rem', borderRadius:'20px'}} onClick={() => navigate("/queueing")}>
            Queueing Models
          </Button>
          </div>
          <div>

          <Button color="primary" variant="contained" size="large" sx={{width:'400px',fontSize:'2rem', borderRadius:'20px'}} onClick={() => navigate("/simulation")}>
            Simulation Models
          </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
