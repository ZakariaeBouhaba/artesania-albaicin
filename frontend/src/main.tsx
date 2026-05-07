import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 1000 * 60 * 5 },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1d1a14', color: '#faf5ea', fontFamily: '"Inter Tight", sans-serif', borderRadius: 0 },
          success: { iconTheme: { primary: '#b18a3a', secondary: '#1d1a14' } },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>
)
