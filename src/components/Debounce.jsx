import React, { useRef } from 'react'
import '../styles/Debounce.css'
import logo from '../images/location.png'
import axios from 'axios'
import { useState } from 'react'
import cloud from '../images/clouds.png'
import Modal from 'react-modal';
import PopupBox from './PopupBox'
import Loader1 from './Loader1'
import Map from './Map'
import Chart from "react-apexcharts";
import { useEffect } from 'react'


  const Debounce = () => {


    let id;

    const [cities, setCities] = useState([])
    const [weather, setWeather] = useState([])
    const [display, setDisplay] = useState(true)

    const [modalIsOpen, setIsOpen] = useState(false);
    const [loader1, setLoader1] = useState(false)
    const [mapDisplay, setMapDisplay] = useState(true)
    const arr = useRef([])


    const location = () => {
      axios
      .get(" https://ipinfo.io/json?token=52ed0181817dc8")
      // .get("http://ip-api.com/json")
      .then((response) => {
        console.log(response.data.city)
        WeatherFetch(response.data.city)
        localStorage.setItem('cityName', JSON.stringify(response.data.city))
    })
  }

    useEffect(()=>{
      location()
    },[])




    const WeatherFetch = (name) => {
      setLoader1(true)
      let lon; 
      let lat;

      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&cnt=7&appid=5c6004fc3786d57b9d23c346916d72e5&units=metric`).then((res)=>{
        lon = res.data.city.coord.lon
        lat = res.data.city.coord.lat
       
      }).catch((error)=>{
        console.log('error 34:', error)
      })


    
      setTimeout(()=>{
        sevenDayas(lat, lon)
        setLoader1(true)
        setMapDisplay(false)
      },1000)
      



    }
   
    const sevenDayas = (lat, lon) => {



      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=44d2f0f421a5b483b38e2ea12704107e&units=metric`).then((res)=>{
        setWeather(res.data.daily)
      
        let x = res.data.daily[0].feels_like
        // console.log('x:',)

      arr.current =  Object.values(x)

        setLoader1(false)

      }).catch((error)=>{
      console.log('error 42:', error)

      })
    }


    const citiesFetch = (e) => {
      const {value} = e.target

      if(value.length != 0){
        setDisplay(false)
        
        axios.get(`https://list-of-cities.herokuapp.com/cities`).then(({data})=>{
          
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
          setDisplay(true)
          WeatherFetch(ele.city)
          localStorage.setItem('cityName', JSON.stringify(ele.city))
    }
    // let x;
    const openPopup = (data) => {
      // console.log('data:', data)
      
    

      let day = Object.values(data.feels_like)
      // console.log('day:', day)

      arr.current = day
      
      // console.log("136",arr.current)
      
      setIsOpen(true)
      localStorage.setItem('singleCity', JSON.stringify(data))

     
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
            
      {(loader1) ? <Loader1/> : 
     
      
      <div className='outWeatherBox'>
          {weather.map((data, i)=>{
            // console.log(data)
            return(
              <div key={i} className='singleweather' onClick={()=>{
                openPopup(data)
              }}>
                  <h3  style={{margin:'0px'}}>{new Date(`${data.dt}` * 1000).toLocaleDateString("en", {weekday: "short",})}</h3>
                  <p style={{margin:'0px'}}>{data.weather[0].main}</p>
                  <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="" className='cloudImg' />
                  
                  <p className='temp'>{data.temp.min} °</p>
                   <h4 className='temp'>{data.temp.max} °</h4>
              </div>
            )
          })}
      </div>
  }

      {/* ---------------------------------------------------------------------------------------------- */}
          
    
    <div className="App">
      <Modal className='modalBox' isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}>
          <PopupBox/>
        <button class="button-38" onClick={() => setIsOpen(false)}>Close Modal</button>
      </Modal>
    </div>

    {/* ------------------------------------------------------------------------------------------ */}

    {(loader1) ? <Loader1/> : <div style={{display:(mapDisplay)?'none' : 'block'}}><Map /></div>
     }

     {/* ------------------------------------------------------------------------------------------- */}
     <div>
      
     </div>
     <Chart id='chartData'
          type="area"
          series={[
            {
              name: "Temperature",
              data: [...arr.current],
              // data: [10,20,25,3,61]
            },
          ]}
          options={{
            dataLabels: {
              formatter: (val) => {
                // return `${val}℃`;
              },
            },
            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${Math.ceil(25)}℃`;
                },
              },
            },
            xaxis: {
              categories: ["12:00am", "6:00am", "12:00pm", "6:00pm"],
            },
          }}
        />

      {/* <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={chart.options}
              series={chart.series}
              type="area"
              width="500"
            />
          </div>
        </div>
      </div>       */}


    </>


              
  )
}

export default Debounce