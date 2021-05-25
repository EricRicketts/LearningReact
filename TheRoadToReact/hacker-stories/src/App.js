import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];
function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input type="text" id="search"/>

      <hr/>

      {
        list.map(item => {
          return (
            <ul key={item.objectID}><span><a href={item.url}>{item.title}</a></span>
              <li key="0">Author(s): {item.author}</li>
              <li key="1">Number of Comments: {item.num_comments}</li>
              <li key="2">Points: {item.points}</li>
            </ul>
          )
        })
      }
    </div>
  );
}

export default App;