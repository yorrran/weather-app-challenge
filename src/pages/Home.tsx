import Forecast from "@/Components/ForecastWeather";
import TodayWeather from "@/Components/TodayWeather";
import "@/styles/home.less";
function Home() {

  return (
      <div className="main-container">
        <div className="content-wrapper">
        <TodayWeather/>
        <Forecast/>
        </div>
      </div>
  );
}

export default Home;