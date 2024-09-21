import { useState } from "react"
import "./App.css"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")

  const searchLocation = function (event) {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data)
        })
        .catch(() => {
          toast("City Not Found", {
            position: toast.POSITION.TOP_CENTER,
            className: "toast-message",
          })
        })
      setLocation("")
    }
  }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=cb9f7b90beede86239fefa4700ba599d`
  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
        />
      </div>
      <ToastContainer />
      <div className="container">
        <div className="top">
          <div className="location">{data.name}</div>
          <div className="temp">
            {data.main ? (
              <h1>{(((data.main.temp - 32) * 5) / 9).toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {(((data.main.feels_like - 32) * 5) / 9).toFixed()}°C
                </p>
              ) : null}

              <p>Feels Like Temp</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
