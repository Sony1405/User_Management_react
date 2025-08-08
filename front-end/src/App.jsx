import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './Home'
import {ToastContainer} from 'react-toastify'
import Create from './Create'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer></ToastContainer>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
    </>
  )
}

export default App
