import React from 'react'
import '../styles/Debounce.css'
import logo from '../images/location.png'
import axios from 'axios'
import { useState } from 'react'
import cloud from '../images/clouds.png'

  const Debounce = () => {



   

    let id;

    // const [name, setName] = useState('')
    const [cities, setCities] = useState([])
    const [weather, setWeather] = useState([])
    const [display, setDisplay] = useState(true)

    const WeatherFetch = (name) => {
      // console.log(name)

      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&cnt=7&appid=5c6004fc3786d57b9d23c346916d72e5&units=metric`).then((res)=>{
          setWeather(res.data.list)
           console.log(res.data.list)
      


      }).catch((error)=>{
        console.log('error:', error)
      })



    }

    const citiesFetch = (e) => {
      const {value} = e.target

      if(value.length != 0){
        setDisplay(false)
        
        axios.get(`http://localhost:8080/cities`).then(({data})=>{
          
          let arr = data.filter((post) =>
          post.city.toLowerCase().includes(value)
            );
  
            setCities([...arr])
          }).catch((error)=>{
            console.log('error:', error)
          })
        }
        else{
        
            setDisplay(true)
          }
        }
        
        const fetchWeather = (ele) => {
          // console.log(ele.city)
          
          // setName(ele.city)
          setDisplay(true)
          WeatherFetch(ele.city)
    }

   
  return (
    <>
      <div className='mainBox'>
          <div className='logoinp'>
            <img src={logo} alt=""  className='logo'/>
            <input type="text" className='inpSearchBox' onChange={citiesFetch} />
          </div>
          <div className='outputBox' style={{display: display ? "none" : 'block' }}>
            {cities.map((ele,i) => {
              return(
                <div key={i} className='cityBoxSingle'  onClick={()=>{fetchWeather(ele)}} >
                  <span className='city'>{ele.city}</span>, <span className='state'>{ele.state}</span>
                </div>
              )
            })}
          </div>
      </div>
      {/* ------------------------------------------------------------------------------------------- */}
      <div className='outWeatherBox'>
          {weather.map((data, i)=>{
            return(
              <div key={i} className='singleweather'>
                  <h4>Clouds</h4>
                  <img src={cloud} alt="" className='cloudImg' />
                  <p className='temp'>{data.main.temp_min} °</p>
                   <h4 className='temp'>{data.main.temp_max} °</h4>
              </div>
            )
          })}
      </div>

    </>


              
  )
}

export default Debounce