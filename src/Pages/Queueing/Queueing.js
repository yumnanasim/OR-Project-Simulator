import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Container, Button, Breadcrumbs, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import useApp from "../../hooks/useApp";
import DetailsTable from "../../components/DetailsTable/DetailsTable";
import PerformanceMeasures from "../../components/PerformanceMeasures/PerformanceMeasures";
import InputParameters from "../../components/InputParameters/Inputparameters";
import { useNavigate } from "react-router-dom";
import QueueLengthGraph from "../../components/Graphs/queuelength.graph";
import WaitingInTheQueueGraph from "../../components/Graphs/Waitinginthequeue.graph";
import TurnaroundTimeGraph from "../../components/Graphs/Turnaroundtime.graph";
import ServerUtilizationGraph from "../../components/Graphs/ServerUtilization.graph";

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


const Queueing= () => {
  const classes = useStyles();
  const { performanceMeasures } = useApp();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar sx={{ p: 1 }}>
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography fontWeight={"bold"} variant="h4" className={classes.appHeading}>
            Queueing Models
          </Typography>
          
        </Container>
      </AppBar>
      <Container sx={{ pt: "70px" }} maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{my:2}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
       
        <Typography color="text.primary">Queueing</Typography>
      </Breadcrumbs>
        <InputParameters />
        <DetailsTable />
        {/* <PerformanceMeasures performanceMeasures={performanceMeasures} /> */}
        <ServerUtilizationGraph/>
        <QueueLengthGraph />
        <WaitingInTheQueueGraph />
        <TurnaroundTimeGraph/>
      </Container>
    </div>
  );
};

export default Queueing;
