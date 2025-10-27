import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import App from '@/App'
import { queryClient } from '@/shared/config/query-client'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

// Remove o loading inicial quando o React está pronto
const removeInitialLoading = () => {
  const loading = document.getElementById('initial-loading')
  if (loading) {
    loading.classList.add('hidden')
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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
        enableMultiContainer={false}
      />
    </QueryClientProvider>
  </React.StrictMode>
)

// Remove loading após renderização
setTimeout(removeInitialLoading, 100)
