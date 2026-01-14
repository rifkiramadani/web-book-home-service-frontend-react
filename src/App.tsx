import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import CategoryPage from './components/CategoryPage'
import DetailsPage from './components/DetailsPage'
import BookingPage from './components/BookingPage'
import MyBookingPage from './components/MyBookingPage'
import MyCartPage from './components/MyCartPage'
import PaymentPage from './components/PaymentPage'
import SuccessBookingPage from './components/SuccessBookingPage'

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
