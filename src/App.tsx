import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import DetailsPage from './pages/DetailsPage'
import BookingPage from './pages/BookingPage'
import MyBookingPage from './pages/MyBookingPage'
import MyCartPage from './pages/MyCartPage'
import PaymentPage from './pages/PaymentPage'
import SuccessBookingPage from './pages/SuccessBookingPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* halaman details category membutuhkan slug */}
          <Route path='/category/:slug' element={<CategoryPage />} />
          {/* halaman details service membutuhkan slug */}
          <Route path='/service/:slug' element={<DetailsPage />} />
          <Route path='/myCart' element={<MyCartPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/booking' element={<BookingPage />} />
          <Route path='/myBooking' element={<MyBookingPage />} />
          <Route path='/successBooking' element={<SuccessBookingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
