import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createTheme, ThemeProvider } from '@mui/material'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import axios from "axios";
//Mettre le Toaster ici, de facon a ce qu'un toast soit present sur toute l'application.
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL = "http://localhost:5000/api/v1"
axios.defaults.withCredentials = true

// Definir nos standard du theme ici. On peut meme definir la taille des ecran md, xs etc...
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    allVariants: {color: 'white'}
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-right'/> 
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>

  </React.StrictMode>,
)
