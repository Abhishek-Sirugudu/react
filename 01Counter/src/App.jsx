import './App.css'

function App() {
  let Counter = 0;
  const addValue = () =>{
    console.log("Clicked "+Counter);
    Counter++;
  }

  return (
    <>
      <h1>Counter Effect</h1>

      <h2>Counter value: {Counter}</h2>
      <button onClick={addValue}>Add Value</button>
      <br />
      <button>Remove Value</button>
    </>
  )
}

export default App
