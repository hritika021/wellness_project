import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ServicesGrid from './pages/Services'
import { HorizonSeparator } from './components/WaterSeparator'
import HowItWorks from './components/HowItWorks'
import StatsSection from './components/Stats'
import ServiceProviders from './pages/ServiceProvider'
import CategoryServices from './pages/CategoryServices'
import Login from './pages/Login'
import Signup from './pages/Signup'


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
      <Route path='/services' element={<ServicesGrid/>}/>
      <Route path='/services/:id' element={<ServiceProviders/>}/>
      <Route path="/services/category/:category" element={<CategoryServices />} />
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App