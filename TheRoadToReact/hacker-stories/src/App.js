import logo from './logo.svg';
import './App.css';

const List = props =>
  props.list.map(item => (
    <div key={item.objectID}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.number_of_comments}</span>
      <span>{item.points}</span>
    </div>
  ));
const App = () => {
  const stories = [
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

  const handleChange = event => {
    console.log(event);
  }
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={handleChange} />

      <hr/>

      <List list={stories} />
    </div>
  );
}

export default App;