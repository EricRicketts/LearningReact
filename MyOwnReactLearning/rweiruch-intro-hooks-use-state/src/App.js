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
    title: 'How to useState in React',
    url: 'https://www.robinwieruch.de/react-usestate-hook',
  },
  {
    id: '3',
    title: "How to useEffect in React",
    url: 'https://www.robinwieruch.de/react-useeffect-hook',
  },
];
function App() {
  const [list, setList] = React.useState(INITIAL_LIST);
  const [showForm, setShowForm] = React.useState(false);

  function onAddForm() {
    setShowForm(true);
  }

  function onRemoveItem(id) {
    let newList = list.filter(item => item.id !== id);
    setList(newList);
  }
  return (
    <>
      <ul data-testid="list">
        {list.map(item => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
            <button type="button" onClick={() => onRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div id="conditional-form" data-testid="conditionalForm">
        <button type="button" data-testid="addArticleButton" onClick={() => onAddForm()}>
          Add Article
        </button>
        {showForm &&
          (<form action="" data-testid="addArticleForm">
          <div>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" name="title"/>
          </div>
          <div>
            <label htmlFor="url">URL: </label>
            <input type="text" id="url" name="url"/>
          </div>
          <input type="submit" data-testid="submitAddArticleForm"/>
        </form>)
        }
      </div>
    </>
  );
}

export default App;
