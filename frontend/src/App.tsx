import { BrowserRouter,Routes,Route,Link } from "react-router-dom"
import { AuthProvider,  } from "./context/AuthContext"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Events from "./pages/Events"
import MyBookings from "./pages/MyBookings"
import Admin from "./pages/Admin"
import { useAuth } from "./hooks/useApi"
import Home from "./pages/Home"
import EventDetails from "./pages/EventDetails"
import BookingFlow from "./components/BookingFlow"
import LandingPage from "./pages/LandingPage"
import About from "./pages/About"
import Navbar from "./components/Navbar"



export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/events" element={<Home/>}/>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/event_details/:id" element={<EventDetails/>}/>
           <Route path="/booking" element={<BookingFlow />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/bookings" element={<MyBookings/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
