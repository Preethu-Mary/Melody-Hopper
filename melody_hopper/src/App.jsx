import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Exercise from './pages/Exercise/Exercise';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}  />
          <Route path="/exercise/:id" element={<Exercise/>}  />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
