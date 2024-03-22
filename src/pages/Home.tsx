import Forecast from "@/component/ForecastWeather";
import TodayWeather from "@/component/TodayWeather";
import "@/styles/home.less";
function Home() {
  return (
    <div className="main-container">
      <div className="content-wrapper">
        <TodayWeather />
        <Forecast />
      </div>
    </div>
  );
}

export default Home;
