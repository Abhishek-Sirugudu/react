import './App.css'
import { useState } from 'react';
function App() {

  const [Counter, setCounter] = useState(15);


  const addValue = () => {
    if(Counter < 20){
       setCounter(Counter + 1);
    }
   
  }

  const removeValue = () => {
    if(Counter > 0){
      setCounter(Counter - 1);
    }
  }





  return (
    <>
      <h1>Counter Effect</h1>

      <h2>Counter value: {Counter}</h2>
      <button onClick={addValue}>Add Value {Counter}</button>
      <br />
      <button onClick={removeValue}>Remove Value {Counter}</button>
    </>
  )
}

export default App
