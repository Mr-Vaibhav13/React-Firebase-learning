import React from 'react'
import "./App.css"
import  Auth  from './components/Auth'
import DB from './components/DB'
import Storage from './components/Storage'

const App = () => {
  return (
    <div className='App'>

      <Auth />
      <DB />
      <Storage />

    </div>
  )
}

export default App