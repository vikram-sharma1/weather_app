import React from 'react'
import '../styles/PopupBox.css'

const PopupBox = () => {
  let x = JSON.parse(localStorage.getItem('singleCity'))
  return (
    <>
      <div className='mainBoxpopUp'>
        <h1>Name of the city</h1>
        <p className='temp'>Min Temp : {x.temp.day}</p>
        {/* <p>Date : {new Date(x.dt)} </p> */}
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
        <p className='temp'>Sunrise : {x.sunrise}|| Sunset : {x.sunset}</p>
        <p className='temp'>Moonrise : {x.moonrise} || Moonset : {x.moonset} </p>
      </div>
    </>
  )
}

export default PopupBox