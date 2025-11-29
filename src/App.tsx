import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeScreen from './lib/pages/home_page'

function App() {
  return (
    <Routes>
      <Route path="/" index element={<HomeScreen/>}/>
    </Routes>
  )
}

export default App
