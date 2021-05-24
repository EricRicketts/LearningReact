import logo from './logo.svg';
import './App.css';

const heading = {
  greeting: 'Hello',
  title: 'React'
}
function getHeading(heading) {
  return `${heading.greeting} ${heading.title}`;
}
function App() {
  return (
    <div>
      <h1>{getHeading(heading)}</h1>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search"/>
    </div>
  );
}

export default App;