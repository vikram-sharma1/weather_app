import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Debounce from './components/Debounce'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Debounce/>
    </>
  )
}

export default App
