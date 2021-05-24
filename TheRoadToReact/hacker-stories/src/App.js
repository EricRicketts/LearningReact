import logo from './logo.svg';
import './App.css';

const words = ['Foo', 'Bar', 'Fizz', 'Buzz']
function getWords(words) {
  return words.map((word, index) => <li key={index}>{word}</li>)
}
function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <ul>
        {getWords(words)}
      </ul>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search"/>
    </div>
  );
}

export default App;