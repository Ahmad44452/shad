import { useEffect, useState } from "react";
import InfoModal from "./InfoModal";
import axios from "axios";
import "./App.scss";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [age, setAge] = useState(null);
  const [salary, setSalary] = useState(null);
  const [result, setResult] = useState("");
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.get(`http://localhost:3001/${age}/${salary}`).then((res) => {
      if (res.data.substring(1, 2) === "1") {
        setResult("Ads are likely to make you profit");
      } else if (res.data.substring(1, 2) === "0") {
        setResult("Ads will probably not make much difference on your sales");
      } else {
        setResult("An error occured. Please try again later");
      }
      setLoading(false);
    });
  };

  return (
    <div className="main">
      {isLoading && (
        <div className="loading-screen">
          <span className="loader"></span>
        </div>
      )}

      {isInfoModalVisible && (
        <InfoModal setInfoModalVisible={setInfoModalVisible} />
      )}

      <nav className="navbar">
        <div></div>
        <div className="navbar__main">
          <h1 className="navbar__logo">Shad</h1>
          <span className="navbar__divider"></span>
          <p className="navbar__description">Should you Ad?</p>
        </div>
        <span
          className="navbar__info"
          onClick={() => setInfoModalVisible(true)}
        >
          i
        </span>
      </nav>
      <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <input
              className="form__group--input"
              placeholder="Enter age"
              type="number"
              required
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form__group">
            <input
              className="form__group--input"
              placeholder="Enter estimated salary"
              type="number"
              required
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <input className="form__submit" type="submit" value={"shad"} />
          <p className="result">{result}</p>
        </form>
      </div>
    </div>
  );
}

export default App;
