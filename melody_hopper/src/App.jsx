import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamePage from "./pages/GamePage/GamePage";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamePage/>}  />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
