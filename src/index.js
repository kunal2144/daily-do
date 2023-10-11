import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/inter'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Helmet>
        <meta charSet='utf-8' />
        <meta
          name='description'
          content='Want to manage your task effectively? Visit Daily Do and get your things done right away!'
        />
        <title>Daily Do</title>
      </Helmet>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
