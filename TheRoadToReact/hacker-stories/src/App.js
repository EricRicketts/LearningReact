import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    number_of_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    number_of_comments: 2,
    points: 5,
    objectID: 1
  }
];
function List() {
  return list.map((item, index) => {
    return (
      <ul key={item.objectID}><span><a href={item.url}>{item.title}</a></span>
        <ul key="0">Author(s): {item.title}</ul>
        <ul key="1">Number of Comments: {item.number_of_comments}</ul>
        <ul key="2">Points: {item.points}</ul>
      </ul>
    )
  })
}

function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input type="text" id="search"/>

      <hr/>

      <List />
    </div>
  );
}

export default App;