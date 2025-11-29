import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './lib/pages/home_page'
import Layout from './lib/pages/layout_page'
import SearchResults from './lib/pages/results_page'
import ShowDetails from './lib/pages/details_page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="search" element={<SearchResults/>}/>
        <Route path="show/:id" element={<ShowDetails/>}/>
      </Route>
    </Routes>
  )
}

export default App
