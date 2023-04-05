import './App.css';
import Board from './components/Board'
import Main from './components/Main'
import Login from './components/Login'
import {Routes, BrowserRouter, Route} from 'react-router-dom'


function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/board' element={<Board />} />
      <Route path='/login' element={<Login />} />
      <Route path='/online' element={<Board />} />
    </Routes>
  </BrowserRouter>
  )
}
export default App;
