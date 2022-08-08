import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState({
    isLoading: true,
    hasError: false,
    data: {},
  });

  const [value, setValue] = useState("np");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=18d9bdbeb15b08f7a0a7f8d4d9d4255e`
      )
      .then(function (response) {
        setCity({
          isLoading: false,
          hasError: false,
          data: response.data,
        });
      })
      .catch(function (error) {
        setCity({
          isLoading: false,
          hasError: true,
          data: {},
        });
      });
  }, [value]);


  const getCity = (evt) => {
    if (evt.code === "Enter") {
      setValue(evt.target.value);
      evt.target.value = "";
    }
  };

  return (
    <div className="App">
      <input onKeyUp={getCity} type="text" />
      <ul>
        {city.data && (
          <li>
            <h1>{city.data.name}</h1>
            <p>{city.data?.main?.temp} C</p>
            <p>{city.data?.wind?.speed} m/s</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
