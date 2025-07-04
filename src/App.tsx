import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/login/login'
import { PrivateRoute } from './components/PrivateRoutes/Private'
import { Main } from './Pages/Main'
import { Peliculas } from './components/PeliculaComponents/pelicula'
import { VideoPlayer } from './components/VideoPlayerComponents/Video'
import { PageProgresoPeliculas } from './Pages/ProgresoPeliculas'
import { Register } from './components/Register/register'
import { PeliculaCategoria } from './Pages/PeliculaCategoria'
import { PagePeliculasFavoritas } from './Pages/PeliculasFavoritas'



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/peliculas_watch/:id_pelicula" element={<PrivateRoute><Peliculas/></PrivateRoute>}/>
        <Route path="/video/:id_pelicula/" element={<PrivateRoute><VideoPlayer/></PrivateRoute>}/>
        <Route path='/main' element={<PrivateRoute><Main/></PrivateRoute> }/>
        <Route path='/Progress-peliculas-user' element={<PrivateRoute><PageProgresoPeliculas/></PrivateRoute> }/>
        <Route path="/peliculas/filter/categoria/:id_categoria" element={<PrivateRoute><PeliculaCategoria/></PrivateRoute>}/>
        <Route path="/peliculas/favoritas/" element={<PrivateRoute><PagePeliculasFavoritas/></PrivateRoute>}/>
        <Route path='/Registrar-cuenta' element={<Register/>}/>
      </Routes> 
      </BrowserRouter>
          
    </>
  )
}

export default App
