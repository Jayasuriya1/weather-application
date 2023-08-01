import { useEffect, useState } from 'react';
import 'boxicons'
import './App.css';

function App() {
  const [input,setInput] = useState("chennai")
  const [data,setData] = useState(null)
  const [imgInput,setImgInput] = useState("chennai")
  const imgUrl= `https://source.unsplash.com/1600x900/?${imgInput}&quot`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=76d6c232e921ecd072a8114debe22075&units=metric`
  
  const getWeatherData = ()=>{
    const getData = async()=>{
      const responce = await fetch(url)
      const data = await responce.json()
      if(data.cod == 200){
        setImgInput(input)
        setData(data)
      }else{
        alert("No weather found")
      }
    }
    getData()
  }
  useEffect(()=>{
    const getData = async()=>{
      const responce = await fetch(url)
      const data = await responce.json()
      setData(data)
    }
    getData()
  },[])
  
  return (
    <div className='fluid-container body-container' style={{backgroundImage:`url(${imgUrl})`}}>
      <div className='main-container row justify-content-center align-items-center'>
        <div className='col-10 col-sm-5 content-container'>
          <div className='search-container mt-5'>
            <input type="text" name="search" onChange={(e)=>(setInput(e.target.value))}></input>
            <div>
              <i class='bx bx-search bx-sm' onClick={()=>getWeatherData()} ></i>
            </div>
          </div>
          {data != null ? 
          <div className='weather-data'>
            <h3 className='mt-4'>Weather in { data.name}</h3>
            <h1 className='mt-3'>{data.main.temp}&deg;C</h1>
            <div className='d-flex align-items-center'>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}></img>
              <h4 className='h-100 pt-1 '>{data.weather[0].description}</h4>
            </div>
            
            <h5>Humidity: {data.main.humidity}%</h5>
            <h5>Wind speed: {data.wind.speed} km/h</h5>

            <div className='d-flex justify-content-end pt-4 pb-5'>
              <h4 className='pl-2'>Project Done By: <span style={{color:"#00ffff"}}>Jayasuriya</span></h4>
            </div>
          </div> : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
