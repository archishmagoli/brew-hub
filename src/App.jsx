import { useState } from 'react';
import List from './List';
import Cards from './Cards';
import './App.css'

function App() {

  return (
    <div className='content'>
      <h1>Brew Hub 🍻</h1>
      <h3>Embark on a Refreshing Journey Today and 
        Let Your Palate Explore a World of Flavorful Brews!</h3>
      <Cards />
      <List />
    </div>
  )
}

export default App
