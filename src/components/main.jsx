import React, { useEffect, useState } from "react";
import axios from "axios";
const Main = () => {
  const [location, setLocation] = useState("tehran");
  const [data, setDAta] = useState();
  const [input, setInput] = useState();
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=1663ee1d1959336bbdabe3967c1cef98`;

  useEffect(() => {
    axios.get(URL).then((res) => {
      console.log(res);
      setDAta(res.data);
    });
  } , [URL]);

  const handle = (e) => {
    e.preventDefault();
    setLocation(input);
    setInput("")
  };

  let emoji = null;
  
  if(data){
     if(data.weather[0].main === "Clouds"){
        emoji = "fa-cloud"
     }else if(data.weather[0].main === "Rain"){
        emoji = "fa-cloud-shower-heavy"
     }else if(data.weather[0].main === "Thunderstorm"){
        emoji = "fa-bolt"
     }else if(data.weather[0].main === "Snow"){
        emoji = "fa-snow-flake"
     }else if(data.weather[0].main === "Drizzle"){
        emoji = "fa-cloud-rain"
     }else if(data.weather[0].main === "Clear"){
        emoji = "fa-sun"
     }
     else{
        emoji = "LOADING...."
     }
  }

  let date = new Date()
  let getDate = date.getDate()
  let year = date.getFullYear()
  let month = date.toLocaleString("default" , {month:"long"})
  let day = date.toLocaleString("default" , {weekday:"long"})
  

  let time = date.toLocaleString([] ,{
    hour : "2-digit" ,
    minute : "2-digit" 
  })
let img =data?data.weather[0].main : "weather"

  return (
    <div className="bg-dark" style={{height:"100vh"}}>
      <div className=" container  p-0 ">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5 text-center">
            <div className="card text-white border-0 ">
              <img
                src={`https://source.unsplash.com/600x900/?${img}`}
                style={{ height: "500px" }}
                className="card-img img-fluid"
                alt="..."
              />
              <div className="card-img-overlay">
                <form>
                  <div className="input-group mb-3 p-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="form-control"
                      placeholder="Enter location"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      
                    />
                    <button
                      onClick={handle}
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 h-75 p-1">
                  <h3 className="card-title">{data ? data.name : null}</h3>
                  <p>{day} , {month}{getDate} , {year}</p>
                  <p>{time}</p>
                  <hr/>
                  <p className="card-text">
                    <i className={`fa ${emoji} fa-4x`}></i>
                    <br/>
                   
                    {data ? data.weather[0].description:null} 

                  
                  </p>
                  <p className="card-text">
                    {data ? ((data.main.temp -  32)*5/9).toFixed(): null}&deg;<span>C</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
