import React from 'react';
import logo from './logo.svg';
import './App.css';

const List = ({ list }) => list.map(item => <Item key={item.objectID} item={item} />);

const Item = ({ item }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.number_of_comments}</span>
    <span>{item.points}</span>
  </div>
);
const Search = ({ search, onSearch }) => (
    <>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={search}
        onChange={onSearch}
      />
    </>
  );
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue];
}
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
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }
  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr/>

      <List list={searchedStories} />
    </div>
  );
}

export default App;