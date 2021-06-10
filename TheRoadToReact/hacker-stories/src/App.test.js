import { render, screen } from '@testing-library/react';
import * as React from 'react';
// import App from './App';
import App, {
  storiesReducer,
  Item,
  List,
  SearchForm,
  InputWithLabel
} from './App';
/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 */
const storyOne = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
};
const storyTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];
describe('storiesReducer', function () {
  let action, state, newState, expectedState;
  test('initializes the stories', () => {
    action = { type: 'STORIES_FETCH_INIT' }
    state = { data: [], isLoading: false, isError: true };
    newState = storiesReducer(state, action);
    expectedState = { data: [], isLoading: true, isError: false };

    expect(newState).toStrictEqual(expectedState);
  });

  test('returns fetched stories', () => {
    action = { type: 'STORIES_FETCH_SUCCESS', payload: stories }
    state = { data: [], isLoading: true, isError: true };
    newState = storiesReducer(state, action);
    expectedState = { data: stories, isLoading: false, isError: false }

    expect(newState).toStrictEqual(expectedState);
  });

  test('identifies a failed stories fetch', () => {
    action = { type: 'STORIES_FETCH_FAILURE' };
    state = { data: [], isLoading: true, isError: false };
    newState = storiesReducer(state, action);
    expectedState = { data: [], isLoading: false, isError: true }

    expect(newState).toStrictEqual(expectedState);
  });

  test('removes a story from all stories', () => {
    action = { type: 'REMOVE_STORY', payload: storyOne };
    state = { data: stories, isLoading: false, isError: false };
    newState = storiesReducer(state, action);
    expectedState = { data: [storyTwo], isLoading: false, isError: false };

    expect(newState).toStrictEqual(expectedState);
  });
});
