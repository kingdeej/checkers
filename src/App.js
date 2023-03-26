import './App.css';
import Board from './components/Board'
import Main from './components/Main'
import {Routes, BrowserRouter, Route} from 'react-router-dom'


function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/board' element={<Board />} />
    </Routes>
  </BrowserRouter>
  )
}
export default App;
