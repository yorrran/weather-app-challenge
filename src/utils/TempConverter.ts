const tempConverter = (temperature: number) => {
  const convertedRes: number = temperature / 10;
  const fixDecimalTemperature = convertedRes.toFixed(1);
  return fixDecimalTemperature;
};

const visibilityConverter = (visibility: number) => {
  const visibilityRes = `${visibility / 1000} km`;
  return visibilityRes;
};

export { tempConverter, visibilityConverter };
