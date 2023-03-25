import { mmc_calculation_lq } from "./MMC";

const lq_wq_ggc = (
  p,
  lambda,
  meu,
  c,
  interArrivalType,
  variance_S,
  variance_A
) => {
  const { lq: mmc_lq, wq: mmc_wq } = mmc_calculation_lq(p, lambda, meu, c);
  if (interArrivalType === "M") {
    let coeff_A = 1;
    let coeff_S = variance_S / (1 / meu) ** 2;

    let wq = mmc_wq * ((coeff_A + coeff_S) / 2);
    let lq = wq * lambda;

    return {
      lq,
      wq,
    };
  } else {
    let coeff_A = variance_A / (1 / lambda) ** 2;
    let coeff_S = variance_S / (1 / meu) ** 2;

    let wq = mmc_wq * ((coeff_A + coeff_S) / 2);
    let lq = wq * lambda;

    return {
     lq,
     wq,
    };
  }
};

const calc_W = (wq, meu) => {
  let w = wq + 1 / meu;
  //return w;
  return Math.abs(w);
};

const calc_L = (w, lambda) => {
  let l = lambda * w;
  //return l;
  return Math.abs(l);
};

const calc_idle = (rho) => {
  let idle = 1 - rho;
  //return idle;
  return Math.abs(idle);
};

export const ggc_calculation = (
  lambda,
  meu,
  c,
  /**
   * interArrivalType: "M" for MGC, any else for GGC
   */
  interArrivalType,
  variance_S,
  variance_A
) => {
  let p = lambda / meu;
  let { lq, wq } = lq_wq_ggc(p, lambda, meu, c, interArrivalType, variance_S, variance_A);
  let w = calc_W(wq, meu);
  let l = calc_L(w, lambda);
  let idle = calc_idle(p);

  let obj = {
    lq,
    wq,
    w,
    l,
    p,
    idle,
  };
  for (let key in obj) {
    obj[key] = obj[key].toFixed(3);
  }

  return obj;
};
export default {
  
}
