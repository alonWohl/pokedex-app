import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store'
import { RootCmp } from './RootCmp'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './assets/styles/main.css'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        <RootCmp />
      </QueryClientProvider>
    </Router>
  </Provider>
)
