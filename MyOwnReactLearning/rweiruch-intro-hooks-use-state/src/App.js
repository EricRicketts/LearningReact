import React from 'react';
import './App.css';
const INITIAL_LIST = [
  {
    id: '0',
    title: 'React with RxJS for State Management Tutorial',
    url:
      'https://www.robinwieruch.de/react-rxjs-state-management-tutorial/',
  },
  {
    id: '1',
    title: 'React with Apollo and GraphQL Tutorial',
    url: 'https://www.robinwieruch.de/react-graphql-apollo-tutorial',
  },
  {
    id: '2',
    title: 'React Hooks Tutorial',
    url: 'https://www.robinwieruch.de/react-hooks'
  },
  {
    id: '3',
    title: 'How to useState in React',
    url: 'https://www.robinwieruch.de/react-usestate-hook'
  },
  {
    id: '4',
    title: 'How to useEffect in React',
    url: 'https://www.robinwieruch.de/react-useeffect-hook'
  },
];
function App() {
  const [list, setList] = React.useState(INITIAL_LIST);

  function onRemoveItem(event) {
    event.preventDefault();
  }

  return (
    <div id="container">
      <ul className="tutorial-list">
        {list.map(item => (
          <li key={item.id}>
            <a className="url-link" href={item.url}>{item.title}</a>
            <button className="remove-button" type="button" onClick={onRemoveItem}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
