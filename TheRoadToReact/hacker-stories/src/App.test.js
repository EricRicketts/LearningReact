import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
// import App from './App';
import App, {
  storiesReducer,
  Item,
  List,
  SearchForm,
  InputWithLabel
} from './App';
import axios from 'axios';
jest.mock('axios');
/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 */
describe('Top Level describe', function () {
  let storyOne, storyTwo, stories;
  beforeEach(() => {
    storyOne = {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_of_comments: 3,
      points: 4,
      objectID: 0,
    };
    storyTwo = {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_of_comments: 2,
      points: 5,
      objectID: 1,
    };
    stories = [storyOne, storyTwo];
  });

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

  describe('Item', function () {
    let handleRemoveItem;
    beforeEach(() => {
      handleRemoveItem = jest.fn();
      render(<Item item={storyOne} onRemoveItem={handleRemoveItem}/>)
    });

    test('renders the author name', () => {
      expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    });

    test('renders the url of the react library', () => {
      expect(screen.getByText('React')).toHaveAttribute('href', 'https://reactjs.org/');
    });

    test('each item has a clickable dismiss button', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('clicking the item dismiss button invokes the callback handler', () => {
      fireEvent.click(screen.getByRole('button'));

      expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('List', function () {
    let onRemoveItemHandler;
    beforeEach(() => {
      onRemoveItemHandler = jest.fn();
      render(<List list={stories} onRemoveItem={onRemoveItemHandler}/>)
    });

    test('renders two items', () => {
      expect(document.getElementsByClassName('item')).toHaveLength(2);
    });

    test('rendered titles of both stories', () => {
      const testData = [['React', ['href', 'https://reactjs.org/']], ['Redux', ['href', 'https://redux.js.org/']]];
      testData.forEach(([library, [attribute, url]]) => {
        expect(screen.getByText(library)).toHaveAttribute(attribute, url);
      });
    });
  });

  describe('SearchForm', function () {
    let searchFormProps;
    beforeEach(() => {
      searchFormProps = {
        searchTerm: 'React',
        onSearchInput: jest.fn(),
        onSearchSubmit: jest.fn()
      }
      render(<SearchForm {...searchFormProps}/>)
    });

    test('renders the input field with its value', () => {
      expect(screen.getByDisplayValue('React')).toBeInTheDocument();
    });

    test('renders the correct label', () => {
      expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
    });

    test('calls onSearchInput on input field change', () => {
      fireEvent.change(screen.getByDisplayValue('React'),  { target: {value: 'Redux'} });

      expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
    });

    test('calls onSearchSubmit on button submit click', () => {
      fireEvent.submit(screen.getByRole('button'));

      expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('InputWithLabel', function () {
    let inputWithLabelProps, onInputChangeHandler;
    beforeEach(() => {
      onInputChangeHandler = jest.fn();
      inputWithLabelProps = {
        id: 'testId',
        value: 'Foo',
        onInputChange: onInputChangeHandler,
        isFocused: true,
        children: 'FizzBuzz'
      }
      render(<InputWithLabel {...inputWithLabelProps} />)
    });

    test('renders label element', () => {
      expect(document.getElementsByTagName('label').length).toBe(1);
    });

    test('renders an input element', () => {
      [['id', 'testId'], ['value', 'Foo']].forEach(([attribute, value]) => {
        expect(screen.getByLabelText(/FizzBuzz/)).toHaveAttribute(attribute, value);
      });
    });
  });

  describe('App', function () {
    test('succeeds in fetching data', async () => {
      const promise = Promise.resolve({ data: { hits: stories } });
      axios.get.mockImplementationOnce(() => promise);
      render(<App />)
      expect(screen.queryByText(/Loading/)).toBeInTheDocument();
      await act(() => promise);
      expect(screen.queryByText(/Loading/)).toBeNull();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Redux')).toBeInTheDocument();
      expect(document.getElementsByTagName('svg').length).toBe(2);
    });

    test('fails fetching data', async () => {
      const promise = Promise.reject();
      axios.get.mockImplementationOnce(() => promise);
      render(<App />)
      expect(screen.queryByText(/Loading/)).toBeInTheDocument();
      try {
        await act(() => promise);
      } catch (error) {
        expect(screen.queryByText(/Loading/)).toBeNull();
        expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
      }
    });

    test('removes a story', async () => {
      const promise = Promise.resolve({ data: { hits: stories } });
      axios.get.mockImplementationOnce(() => promise);
      render(<App />)
      await act(() => promise);
      expect(document.getElementsByTagName('svg').length).toBe(2);
      expect(screen.getByText('Jordan Walke')).toBeInTheDocument();

      fireEvent.click(document.getElementsByTagName('svg')[0]);
      expect(document.getElementsByTagName('svg').length).toBe(1);
      expect(screen.queryByText('Jordan Walke')).toBeNull();
    });

    test('searches for specific stories', async () => {
      const reactPromise = Promise.resolve({ data: { hits: stories, }, });
      const anotherStory = {
        title: 'JavaScript',
        url: 'https://en.wikipedia.org/wiki/JavaScript',
        author: 'Brendan Eich',
        num_comments: 15,
        points: 10,
        objectID: 3,
      };
      const javascriptPromise = Promise.resolve({ data: { hits: [anotherStory], }, });

      axios.get.mockImplementation((url) => {
        if (url.includes('React')) {
          return reactPromise;
        }
        if (url.includes('JavaScript')) {
          return javascriptPromise;
        }
        throw Error();
      });

      render(<App />);
      await act(() => reactPromise);
      expect(screen.queryByDisplayValue('React')).toBeInTheDocument();
      expect(screen.queryByDisplayValue('JavaScript')).toBeNull();

      expect(screen.queryByText('Jordan Walke')).toBeInTheDocument();
      expect(screen.queryByText('Dan Abramov, Andrew Clark')).toBeInTheDocument();
      expect(screen.queryByText('Brendan Eich')).toBeNull();

      fireEvent.change(screen.queryByDisplayValue('React'), { target: { value: 'JavaScript', }, });
      expect(screen.queryByDisplayValue('React')).toBeNull();
      expect(screen.queryByDisplayValue('JavaScript')).toBeInTheDocument();

      fireEvent.submit(screen.queryByText('Submit'));
      await act(() => javascriptPromise);
      expect(screen.queryByText('Jordan Walke')).toBeNull();
      expect(screen.queryByText('Dan Abramov, Andrew Clark')).toBeNull();
      expect(screen.queryByText('Brendan Eich')).toBeInTheDocument();
    });
  });
});
