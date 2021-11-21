import "./App.css";
import SearchCarContainer from "./components/SearchCarContainer/SearchCarContainer";
import CarState from "./context/CarState";

function App() {
  return (
    <div className="App">
      <div>
        <CarState>
          <SearchCarContainer />
        </CarState>
      </div>
    </div>
  );
}

export default App;
