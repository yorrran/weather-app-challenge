import { ICurrentWeather, IForecast } from "@/interfaces/weather";
import dayjs from "dayjs";

const tempConverter = (temperature: number) => {
  const convertedRes: number = temperature / 10;
  const fixDecimalTemperature = convertedRes.toFixed(1);
  return fixDecimalTemperature;
};

const visibilityConverter = (visibility: number) => {
  const visibilityRes = `${visibility / 1000} km`;
  return visibilityRes;
};

export type DayKey = "day1" | "day2" | "day3" | "day4" | "day5";
type DayMap = {
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
};
const convertToDays = (forecastData: Array<ICurrentWeather>) => {
  const forecastList = forecastData;
  const dayMap = {
    day1: dayjs().format("DD MMMM"),
    day2: dayjs().add(1, "day").format("DD MMMM"),
    day3: dayjs().add(2, "day").format("DD MMMM"),
    day4: dayjs().add(3, "day").format("DD MMMM"),
    day5: dayjs().add(4, "day").format("DD MMMM")
  };
  const res:any = {
    day1: { title: "Today", data: [] },
    day2: { title: dayMap.day2, data: [] },
    day3: { title: dayMap.day3, data: [] },
    day4: { title: dayMap.day4, data: [] },
    day5: { title: dayMap.day5, data: [] }
  };

  for (let i = 0; i < forecastList.length; i++) {
    const currData: ICurrentWeather = forecastList[i];
    const day: DayKey | null = findDayForTimestamp(dayMap, currData.dt_txt);
    if (day) {
      res[day].data.push(currData);
    }
  }
  return res;
};

const findDayForTimestamp = (
  dayMap: { [key in DayKey]: string },
  date: string
): DayKey | null => {
  for (const [key, value] of Object.entries(dayMap)) {
    const formattedDate = dayjs(date).format("DD MMMM");
    if (value === formattedDate) {
      return key as DayKey;
    }
  }
  return null;
};

const convertToHour=(dateTime:string)=>{
  const hour = dayjs(dateTime).format("HH:mm")
  return hour
}

export { tempConverter, visibilityConverter, convertToDays, convertToHour };
