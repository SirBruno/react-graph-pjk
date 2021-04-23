import { useState } from 'react';
import './App.css';

// the chart lib i'm using
import { Line } from "react-chartjs-2";

function App() {

  // setting some default values so the app won't crash
  const [values, setValues] = useState([{a: 2, b: 7, borderColor: "red"}, {a: 0, b: 1, borderColor: "blue"}, {a: 16.5, b: 17, borderColor: "green"}, {a: 17.5, b: 15, borderColor: "purple"}])

  // not sure if this is really necessary, but anyway...
  const myName = 'Bruno'

  // this is turning the plain text from the textarea into JSON and returning it
  const userInputData = () => {

    // the regex is placing double quotes on the keys, otherwise i can't json.parse it
    const str = document.getElementById("userInput").value.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g, '$1"$3":');

    // turning the stringified text into JSON
    return JSON.parse('[' + str.replace(/}\s*{/g, '},{') + ']');
  };

  return (
    <div className="App">
      <div className="myName">{myName}'s challenge</div>
      <textarea defaultValue={`{a: 2, b: 7, borderColor: "red"}\n{a: 0, b: 1, borderColor: "blue"}\n{a: 16.5, b: 17, borderColor: "green"}\n{a: 17.5, b: 15, borderColor: "purple"}`} id="userInput"></textarea>
      <button className="btn" onClick={() => setValues(userInputData())}>Generate graph</button>
      <div className="canvasContainer">
        <Line data={{
          // this is like, the starting and ending point of the graph
          labels: ["Jan", "Feb"],

          // these are the values, i'm mapping it because i didn't want to hardcode the number of values
          // in a real scenario i'd probably react to each event line separately, i believe, but anyway, this is just an example
          datasets: values.map((x, index) => {
            return {
              label: index,
              // these are the starting and ending points of a single line on the graph
              data: [x.a, x.b],
              fill: false,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: x.borderColor
            }
          })
        }} responsive={true} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default App;
