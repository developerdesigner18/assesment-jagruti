import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './component/LandingPage';
import Books from './categoryBook/Book';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/book/:id' element={<Books />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
