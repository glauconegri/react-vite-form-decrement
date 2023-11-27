import {useEffect, useState} from 'react';
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState(1);
  const [arrayValues, setArrayValues] = useState([[1, 2, 3], [1], [2]]);

  useEffect(() => {
    const setInterval = setTimeout(() => {
      setArrayValues((prevLines) => 
        prevLines.map((line) => 
          [line[0] - 1, ...line.slice(1)] // add -1 and remove first item 
            .filter(lineFilter => lineFilter > 0) // remove 0
        )
      )
    }, 2000);

    return () => {
      clearTimeout(setInterval);
    }
  }, [arrayValues]);

  const setItemsToState =  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let linesToValidate = 1e9; // 1 billion
    let lineToPush: number[] | undefined;

    for(const line of arrayValues){
      const countArrayPosition = line.reduce((a, b) => a + b, 0); // sum of array

      if (countArrayPosition < linesToValidate) {
        linesToValidate = countArrayPosition;
        lineToPush = line;
      }
    }

    if(!lineToPush) return;
    
    setArrayValues(prevLines => 
      prevLines.map(line => 
        line === lineToPush ? [...line, inputValue] : line // add new item to line
      )
    );
  }

  return (
    <main className="app">
      <form onSubmit={(e) => setItemsToState(e)}>
        <input required 
          value={inputValue > 0 ? inputValue : 1}
          type="number" 
          name="input-tst" 
          id="input-tst"
          onChange={(e) => setInputValue(e.target.valueAsNumber)} />
        <button type='submit'>Test</button>
      </form>
      <div className="lines">
      {arrayValues.map((array, index) => (
        <div key={`lines-${index}`} className="line">
          {array.map((lineInsed, index) => 
          <div key={`line-inside-${index}`} className="line-inside">{lineInsed}</div>)}
        </div>
      ))}
      </div>
      </main>
  )
}

export default App
