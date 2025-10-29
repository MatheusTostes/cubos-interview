import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import App from '@/App'
import { queryClient } from '@/shared/config/query-client'
import { InitialLoading } from '@/shared/components/initial-loading'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const AppWithLoading = () => {
  const [showInitialLoading, setShowInitialLoading] = useState(true)

  useEffect(() => {
    // Remove o loading inicial após um pequeno delay para garantir que o React está pronto
    const timer = setTimeout(() => {
      setShowInitialLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <InitialLoading isVisible={showInitialLoading} />
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </QueryClientProvider>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithLoading />
  </React.StrictMode>
)
