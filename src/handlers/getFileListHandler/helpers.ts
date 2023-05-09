const toPositiveNumber = <T>(num: T): number | null => {
  const numberValue = Number(num);
  const isPositive = Number.isInteger(numberValue) && numberValue > 0;

  return isPositive ? numberValue : null;
};

export { toPositiveNumber };