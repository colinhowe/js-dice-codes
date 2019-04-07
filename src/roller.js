const roll = (cfg) => {
  const breakdown = [];
  let total = 0;
  for (const item of cfg) {
    if (item.die !== undefined) {
      for (let i = 0; i < item.quantity; i++) {
        const value = Math.floor(Math.random() * item.die) + 1;
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
