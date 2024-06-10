import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router.jsx'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      </AuthProvider>
    <ToastContainer position="top-center" />
    </HelmetProvider>
  </React.StrictMode>,
)
