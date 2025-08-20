import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ServicesGrid from './pages/Services'
import { HorizonSeparator } from './components/WaterSeparator'
import HowItWorks from './components/HowItWorks'
import StatsSection from './components/Stats'


function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar stays outside Routes so it appears on all pages */}
      <Routes>
        <Route path="/" element={
     <div>
      <Hero/>
      <StatsSection/>
  <ServicesGrid/>

     </div>
        } />
        {/* Add more routes as needed */}
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App