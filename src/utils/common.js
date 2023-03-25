// import { Customer, InterArrivals as InterArrivalsType, ServiceTimes as ServiceTimesType } from "../interfaces/record";

// This gives value for p
// => p
export function calculateUtilizationOfServers(lambda, meu, numberOfServers) {
	return lambda / (numberOfServers * meu);
}

// => W
export function calcMeanWaitingTimeInSystem(wq, meu) {
	return wq + 1 / meu;
}

// => Wq
export function calculateMeanWaitingTimeInQueue(lq, lambda) {
	return lq / lambda;
}

// => L
export function caluMeanNumberOfCustomersInSystem(lambda, w) {
	return lambda * w;
}

// =>Lq
export function calcMeanNumberOfCustomersInQueue(p, p0, lambda, meu, numberOfCustomers) {
	return (p0 * (lambda / meu) ** numberOfCustomers * p) / (factorial(numberOfCustomers) * (1 - p) ** 2);
}

// =>P0
export function calculateProbabilityOfZeroCustomersInSystem(p, numberOfServers) {
	const calcPart1 = () => {
		let sum = 0;
		for (let i = 0; i < numberOfServers; i++) {
			sum += (numberOfServers * p) ** i / factorial(i);
		}
		return sum;
	};

	const calcPart2 = () => {
		return (numberOfServers * p) ** numberOfServers / (factorial(numberOfServers) * (1 - p));
	};

	return 1 / (calcPart1() + calcPart2());
}

export function factorial(n) {
	if (n === 0) {
		return 1;
	}
	return n * factorial(n - 1);
}

export function calcProbabilityPoisson(lambda, x) {
	let sum = 0;
	for (let i = 0; i <= x; i++) {
		sum += (Math.E ** -lambda * lambda ** i) / factorial(i);
	}
	return sum;
}

export function generateRandomExponential(u) {
	return Math.floor(u * Math.log(Math.random()) * -1);
}

//this function will always gives an array whose average ranges from 4.7 to 6.2
export function generateServiceTimes(customerLength = 20) {
	const serviceTimes = [];
	for (let i = 0; i < customerLength; i++) {
		serviceTimes.push(Math.floor(Math.random() * 10) + 1);
	}
	return serviceTimes;
}


//thse are the service times in minutes
//export const serviceTimes = [4, 4, 6, 4, 2, 9, 4, 3, 5, 9, 9, 2, 4, 8, 7, 6, 8, 4, 3, 7];

export const serviceTimes = [];


//this is unix timestamp of arrival times
//it's inter has to be calculated, then the average.
export const arrivalTimes = [
	// 1673060710, 1673060890, 1673061130, 1673061610, 1673061910, 1673061970, 1673062090, 1673062330, 1673062750, 1673063110, 1673063350,
	// 1673063530, 1673064010, 1673064070, 1673064430, 1673064730, 1673064970, 1673065330, 1673065630, 1673066410,

	//4, 1, 2, 5, 0, 3, 1, 2, 0, 1, 1, 3, 2, 3, 2, 1, 2, 3, 0, 2,



];

export const calculateInterArrivalTimes = (arrivals) => {
	const arrivalTimeDifferences= [];
	for (let i = 0; i < arrivals.length; i++) {
		if (i === 0) {
			arrivalTimeDifferences.push(0);
		} else {
			arrivalTimeDifferences.push((arrivals[i] - arrivals[i - 1])/60);
		}
	}
	return arrivalTimeDifferences;
};

export function calculateAverage(values){
	return values.reduce((a, b) => a + b, 0) / values.length;
}

export const calculateStandardDeviation = (values, mean) => {
	const avg = mean ? mean : calculateAverage(values);
	const squareDiffs = values.map((value) => {
		const diff = value - avg;
		const sqrDiff = diff * diff;
		return sqrDiff;
	});
	const avgSquareDiff = calculateAverage(squareDiffs);
	const stdDev = Math.sqrt(avgSquareDiff);
	return stdDev;
};

//all calculation is done in seconds
export function transformInterArrivalsToExactMean(arrivals, newMean){
	const interArrivals = calculateInterArrivalTimes(arrivalTimes);
	const oldMean = calculateAverage(interArrivals); //returned in seconds
	const oldStdDev = calculateStandardDeviation(arrivals);
	const newStdDev = calculateStandardDeviation(interArrivals, newMean);

	const newInterArrivals = interArrivals.map((interArrival) => {
		return (newStdDev * (interArrival - oldMean)) / oldStdDev + newMean;
	});
	return {
		newInterArrivals,
		oldMean,
		newStdDev,
	};
}

export function transformServiceTimeToExactMean(services, newMean){
	const oldMean = calculateAverage(services); //returned in seconds
	const oldStdDev = calculateStandardDeviation(services);
	const newStdDev = calculateStandardDeviation(services, newMean);

	const newServiceTimes = services.map((service) => {
		return (newStdDev * (service - oldMean)) / oldStdDev + newMean;
	});
	return {
		newServiceTimes,
		oldMean,
		newStdDev,
		newServiceTimesInMinutes: newServiceTimes.map((service) => service / 60),
	};
}


export const calculateArrivalsFromInterArrivals = (interArrivals)=>{
	const arrivals= [];
	for (let i = 0; i < interArrivals.length; i++) {
		if (i === 0) {
			arrivals.push(interArrivals[i]);
		} else {
			arrivals.push(arrivals[i - 1] + interArrivals[i]);
		}
	}
	return arrivals;
}

export const separateCustomerServerWise = (customerRecords) => {
	let servers= [];
	let maxServerNumber = 0;

	//get max server number
	customerRecords.forEach((c) => (maxServerNumber = c.server > maxServerNumber ? c.server : maxServerNumber));

	//array of array. each index contains customers for that server
	for (let i = 0; i < customerRecords.length; i++) {
		let server = customerRecords[i].server;
		if (server) {
			if (!servers[server]) {
				servers[server] = [];
			}
			servers[server].push(customerRecords[i]);
		}
	}
	//remove empty arrays and return
	return servers.filter((item) => item !== undefined || item !== null || item !== "");
};