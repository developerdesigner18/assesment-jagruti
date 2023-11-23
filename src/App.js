import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Books from './page/Book';
import LandingPage from './page/LandingPage';

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
