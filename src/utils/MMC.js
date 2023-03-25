function factorialize(num) {
  var result = num;
  if (num === 0 || num === 1) return 1;
  while (num > 1) {
    num--;
    result *= num;
  }
  return result;
}

function calc_P0(p, c) {
  let summation_value = 0;
  for (let m = 0; m < c; m++) {
    summation_value += (c * p) ** m / factorialize(m);
  }

  let p0 = 1 / (summation_value + (c * p) ** c / (factorialize(c) * (1 - p)));

  return p0;
}

function lq_mmc(rho, lambda, meu, p0, c) {
  let lq = (p0 * (lambda / meu) ** c * rho) / (factorialize(c) * (1 - rho) ** 2);
  //return lq;
  return Math.abs(lq);
}

function calc_Wq(lq, lambda) {
  let wq = lq / lambda;
  //return wq;
  return Math.abs(wq);
}

function calc_W(wq, meu) {
  let w = wq + 1 / meu;
  //return w;
  return Math.abs(w);
}

function calc_L(w, lambda) {
  let l = lambda * w;
  //return l;
  return Math.abs(l);
}

function calc_idle(rho) {
  let idle = 1 - rho;
  //return idle;
  return Math.abs(idle);
}

export function mmc_calculation(lambda, meu, c) {
  let p = lambda / (c * meu);
  let p0 = calc_P0(p, c);
  let lq = lq_mmc(p, lambda, meu, p0, c);
  let wq = calc_Wq(lq, lambda);
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
}

export function mmc_calculation_lq(p, lambda, meu, c) {
  let p0 = calc_P0(p, c);
  let lq = lq_mmc(p, lambda, meu, p0, c);
  let wq = calc_Wq(lq, lambda);

  return {
    lq,
    wq,
  };
}
