import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GamePage from "./pages/GamePage/GamePage";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}  />
          <Route path="/game/:id" element={<GamePage/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
