# Key React Concepts

## React Components Composed of React Elements
1.  React Elements are just plain Javascript objects and are cheap to create.
2.  React Elements can be explicitly created by ```React.createElement``` though this is rarely done.
3.  React Elements can have any number of child elements.
4.  React Elements are immutable, once created you cannot change its attributes or children.
5.  Understand what an element represents, it represents the UI at a certain point in time, it is like a single
frame in a movie.
    
## React Components and Props
The main advantage of components is that they let you partition the UI into separate reusable pieces.

One can think of a component much like a Javascript function, it takes inputs called _props_ and ultimately returns a
React element.

Very important concept, all React Components must act like pure functions with respect to their _props_.  A component
must never modify its own props.  A component must always return the same elements for a given set of _props_.

## State and Lifecycle
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  // this is a lifecycle method, it is called immediately after the React component
  // is mounted to the DOM.  In this case it is a good place to initalize the timer.
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // this is a lifecycle method, it is called after the componet has been removed
  // from the DOM.  This is a good place to remove the timer.
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // this method is important, this is what is called every time the interval
  // advances.  Note when the component is mounted, then the timerID property
  // is set on the component and this property ends up calling the setInterval
  // function, with the tick method as an argument.  Each time the tick method
  // is called a new Date() object is instantiated, the component then rerenders
  // with a new time stamp.
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
### Detailed Explanation of the code above
1.  When ```<Clock />``` is passed to ```ReactDOM.render()```, React calls the constructor of the ```Clock```
component.  Since ```Clock``` needs to display the current time, it initializes ```this.state``` with an object
containing the current time.  This state will be updated later in the lifecycle of the component, however, since
clock needs an initial time to display when it first shows the time the ```Date``` object initializes in the
constructor.  Note a ```Date``` object while initialized does not call the ```toLocaleTimeString``` method in the
constructor.    
2.  After calling the ```<Clock />``` constructor, React then calls the component ```render``` method.  This initial
render is how React learns what should be displayed on the screen.  In this first time render React updates the DOM
to match the ```<Clock />``` render method.  Not when calling this render method for the first time the ```<h2>```    
component calls the ```toLocaleTimeString``` method, since the ```Date``` object has been initialized in the
constructor, the application can show the date string.
3.  Now that the ```<Clock />``` component inserted into the DOM, React calls the ```componentDidMount``` lifecycle
method, which then initializes and calls the browser based ```setInterval``` function.  ```setInterval``` calls the
components ```tick``` method once every second.    
4.  Once the timer is set in motion, the browser will call ```setInterval``` every second.  However, ```setInterval```    
calls the component ```tick``` method every second which in turn calls ```this.setState({ date: new Date() });```.
So every second the state of the ```<Clock />``` component updates with a new ```Date``` object.  When ```setState``` is    
called, React knows the component state has changed and issues another render, thus updating the UI.  Note the render
makes another call to ```<h2>It is {this.state.date.toLocaleTimeString()}.</h2>``` it is this action which actually
updates the UI.
5.  If the ```<Clock />``` component removed from the DOM, the ```componentWillUnmount``` is called removing the
timer.
    
### Important Concepts About State
1.  Do not modify state directly, it will not issue a re-render.  Use ```setState``` to update the state.
2.  The only place where you can assign ```this.state``` is in the constructor.
3.  State updates may be asynchronous.  This is because React will batch multiple ```setState``` calls into a single
update for performance issues.  If state is a function of previous state and _props_ use the functional form of
```setState```.  Example ```this.setState((state, props) => ({ conter: state.counter + props.increment));```    
4.  React merges state updates.  When calling ```setState``` React merges the current state with the provided object.    
5.  Data flows down.  State management is the responsibility of the component entrusted with it.  Any child components
can receive as _props_ the state or partial state of a parent component.
