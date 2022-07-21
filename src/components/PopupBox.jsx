import React from 'react'
import '../styles/PopupBox.css'

const PopupBox = () => {
  let x = JSON.parse(localStorage.getItem('singleCity'))
  let y = JSON.parse(localStorage.getItem('cityName'))
  // console.log('y:', y)
  return (
    <>
      <div className='mainBoxpopUp'>
        <h1>{y}</h1>
        <p className='temp'>Min Temp : {x.temp.day}</p>
        {/* <p  className='temp'>Day :   </p> */}
        <p  className='temp'>{new Date(`${x.dt}` * 1000).toLocaleDateString()} , {new Date(`${x.dt}` * 1000).toLocaleDateString("en", {weekday: "short",})} </p>
        <br />
        <table>
          <thead></thead>
          <tbody>
              <tr>
                 <td>Morning temp : {x.feels_like.morn}</td>
                 <td className='col'>Day Temp : {x.feels_like.day}</td>
              </tr>
              <tr>
                 <td>Evening Temp : {x.feels_like.eve}</td>
                 <td className='col'>Night Temp : {x.feels_like.night}</td>
              </tr>
          </tbody>
        </table>
        <br />
        <p className='temp'>Sunrise : {x.sunrise} || Sunset : {x.sunset}</p>
        <p className='temp'>Moonrise : {x.moonrise} || Moonset : {x.moonset} </p>
      </div>
    </>
  )
}

export default PopupBox