import React, { useMemo, useState } from "react";
import {
  calculateArrivalsFromInterArrivals,
  generateRandomExponential,
  generateServiceTimes,
  serviceTimes as orignalServiceTime,
  calculateInterArrivalTimes,
  arrivalTimes as orignalArivalTimes,
} from "../utils/common.js";
import {mmc_calculation} from "../utils/MMC";

export const AppContext = React.createContext({});

const MeanInterArival = 4.75;
const MeanServiceTime = 5.4;

const AppProvider = ({ children }) => {
  const [numberOfCustomers, setNumberOfCustomers] = useState(1);
  const [speed, setSpeed] = useState(0);
  const [numberOfServers, setNumberOfServers] = useState(1);
  const [customerRecords, setCustomerRecords] = useState([]);
  const [distribution, setDistribution] = useState("mmc");
  const [distributionInput, setDistributionInput] = useState({ c: 1 });
  const [queueLengthServers, setQueueLengthServers] = useState([]);
  const [waitingInTheQueueServers, setWaitingInTheQueueServers] = useState([]);

  const lamda = useMemo(() => 1 / MeanInterArival, []);
  const meu = useMemo(() => 1 / MeanServiceTime, []);
  const performanceMeasures = useMemo(
    () => mmc_calculation(lamda, meu, numberOfServers),
    [lamda, meu, numberOfServers]
  );

  const generate = (interArrivals, serviceTimes) => {
    const arrivals = calculateArrivalsFromInterArrivals(interArrivals);
    let servers = new Array(numberOfServers).fill({ endTime: 0 });
    servers = servers.map((server, index) => ({
      ...server,
      serverNum: index + 1,
      customers: [],
    }));
    const customers = [];

    arrivals.forEach((_, i) => {
      let startTime = -1;
      let serverNum = 0;
      for (let j = 0; j < servers.length; j++) {
        const server = servers[j];
        if (server.endTime <= arrivals[i]) {
          startTime = arrivals[i];
          serverNum = server.serverNum;
          server.endTime = startTime + serviceTimes[i];
          break;
        }
      }
      if (startTime === -1) {
        let sorted = servers.sort((a, b) => a.endTime - b.endTime);
        serverNum = sorted[0].serverNum;
        startTime = sorted[0].endTime;
        sorted[0].endTime = startTime + serviceTimes[i];
      }
      let endTime = startTime + serviceTimes[i];
      let arrival = arrivals[i];
      let waitTime = startTime - arrival;
      let turnaroundTime = endTime - arrival;
      let obj = {
        arrival,
        interArrival: interArrivals[i],
        serviceTime: serviceTimes[i],
        server: serverNum,
        startTime,
        endTime,
        waitTime,
        turnaroundTime,
      };
      customers.push(obj);
      servers.find((item) => item.serverNum === serverNum)?.customers.push(obj);
    });
    setCustomerRecords(customers);
    return servers;
  };

  const generateArrivals = () => {
    const serviceTimes = [];
    const interArrivals = [];
    for (let i = 0; i < numberOfCustomers; i++) {
      interArrivals.push(generateRandomExponential(MeanInterArival));
      serviceTimes.push(generateRandomExponential(MeanServiceTime));
    }

    interArrivals[0] = 0;
    return generate(interArrivals, serviceTimes);
  };

  return (
    <AppContext.Provider
      value={{
        numberOfCustomers,
        setNumberOfCustomers,
        speed,
        setSpeed,
        numberOfServers,
        setNumberOfServers,
        setCustomerRecords,
        customerRecords,
        generateArrivals,
        performanceMeasures,
        distribution,
        setDistribution,
        distributionInput,
        setDistributionInput,
        queueLengthServers,
        setQueueLengthServers,
        waitingInTheQueueServers,
        setWaitingInTheQueueServers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;