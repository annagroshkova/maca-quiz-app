import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StrictMode } from 'react'
import './App.css'
import Home from './views/Home'
// import Quiz from './views/Quiz'

export default function   App(): ReactNode {
  return (
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/quiz" element={<Quiz />} /> */}
          </Routes>
        </BrowserRouter>
      </StrictMode>

  )
}

