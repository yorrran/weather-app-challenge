import "./App.less";
import { history, HistoryRouter } from "./routes/history";
import RenderRouter from "./routes";

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <RenderRouter />
      </HistoryRouter>
    </div>
  );
}

export default App;
