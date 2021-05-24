import logo from './logo.svg';
import './App.css';

function getTitle(title) {
  return title;
}
function App() {
  return (
    <div>
      <h1>Hello {getTitle('React')}</h1>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search"/>
    </div>
  );
}

export default App;