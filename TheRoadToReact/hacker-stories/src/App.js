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
    <div>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={search}
        onChange={onSearch}
      />
    </div>
  );
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
  /*
    It is very important to understand how state is being managed so far in this application.  We initialize the
    searchTerm and the updating function, setSearchTerm, by use of React.useState().  We defined a function,
    handleSearch at the App level which will actually update the searchTerm.  This is critical to understand, since
    searchTerm is at the App level, it can be passed to any component by way of props.

    This is the case with the filtering function searchedStories, it takes the searchTerm and uses that as the basis
    for searching among the stories.

    So how does the Search component actually set the updated value for searchTerm?  Note the Search component is
    instantiated with a "onSearch" attribute, in the definition of the Search component, "onSearch" becomes a prop
    which is passed the "handleSearch" function.  So where does the "handleSearch" function get access to the event
    object?  From the onChange attribute in the input element defined within the Search component.  So once onChange
    triggers an event object, props.onSearch is called which calls the handleSearch function, new the searchTerm
    variable is updated at the App level.

    The problem we had with the prior code is that if we changed the initial state the new initial value did not show
    up as the value for the input element.  Furthermore, the filter would run and the updated state would be reflected
    in the UI.  So for instance with 'React' as the new default value, only the React data would be shown but the
    string 'React' would not be in the input field of the input element.  To fix this we add another prop to the
    Search component which captures the searchTerm variable and through props passes the searchTerm variable to
    the value attribute of the input element.
  */
  const [searchTerm, setSearchTerm] = React.useState('React');

  const handleSearch = event => {
    setSearchTerm(event.target.value)
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