import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1>Project: Counter Implementation</h1>
      <div className="card">
        <button onClick={() => {if(count<10){ setCount((count) => count + 1)} else if(count==10){alert("Max limit reached!!!")}}}>
          count++
        </button>
        
        <button onClick = {() => {if(count>0){ setCount((count) => count - 1)} else if(count == 0){ alert("Min limit reached!!!")}}}>
          count --
        </button>

        <p>
          Current count is {count}
        </p>
        <button onClick = {() =>  setCount((count)=> count = 0) }> 
          Reset
        </button>
      </div>
    </>
  )
}

export default App
