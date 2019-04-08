const roll = (cfg) => {
  const breakdown = [];
  let total = 0;
  for (const item of cfg) {
    if (item.die !== undefined) {
      // We can't do a negative for loop, so, invert the quantity
      let sign = 1;
      if (item.quantity < 0) {
        item.quantity *= - 1;
        sign = -1;
      }

      for (let i = 0; i < item.quantity; i++) {
        const value = sign * (Math.floor(Math.random() * item.die) + 1);
        total += value;
        breakdown.push(value);
      }
    } else {
      total += item.constant;
      breakdown.push(item.constant);
    }
  }
  return { result: total, breakdown };
};

export default roll;
