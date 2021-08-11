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
    
### Handling Events
Two things to remember about events in React:
1.  Just like attributes in JSX, event attributes are camel cased.
2.  In React, unlike the DOM, event handler values are function references, not strings.
3.  _preventDefault_ must be called explicitly in the event handler body, you cannot do this in the attribute call.

Here is a simple example of an event handler in React.
```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true }
    // assignment is necessary to ensure the proper execution context
    // in the callback
    this.handleClick = this.handleClick.bind(this); // see below we can optionally handle binding in callback invocation
  }
 
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn 
    }));
  }
 
  render() {
    return (
      <button onClick={this.handleClick}>
        {/* <button onClick={this.handleClick.bind(this}>  option to handle binding here and not in constructor*/}
        {this.state.isToggleOn ? 'ON' : 'OFF'} 
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
)
```
In the React documentation, the recommendation is to bind event handlers.  Arrow functions mean a different
callback is each time for the callback invocation.  If used as a prop, then the child components could needlessly
re-render.

Passing extra arguments to event handlers:
```jsx
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

### Conditional Rendering
It is common in React to create distinct components which render upon a given condition.  Additionally, these elements
can be stored in variables which can be rendered. 
```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

// we start with two different button components, it is important to note that even though the LoginButton and
// LogoutButton are stateless the element still needs the onClick attribute to allow the state to control the
// rerendering.  If the onClick handler is not included in the element the button will only render once with no
// ability to update.
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    // bind the handlers and set the initial state
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    // store the results of the conditional in an element variable, 'button' then render the element variable
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    // if the user is logged in then show the logout button, else the user is logged out so show the login button
    // note the onClick handler in each case below calls the setState method which causes a rerender as the state
    // updates.
    
    // it is important to note that the only propose of the onClick handlers for both LogoutButton and LoginButton
    // is to update the state in the LoginControl component.  Though LogoutButton and LoginButton have props
    // the props in both cases are undefined as there is no return value from handleLoginClick or
    // handleLogoutClick.  These buttons are conditionally rendered depending on the state within the LoginControl
    // component.
   
   // Likewise <Greeting /> is also stateless as it receives as a prop the isLoggedIn state of LoginControl 
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

### Lists and Keys in React
Keys are very important in React, they are a special string attribute which help React identify which components or
elements in a list have changed, been added or removed.

Concepts:
1.  Keys must be unique among siblings, not globally unique.
2.  React defaults to assigning indexes as keys.  The best practice is to make keys unique.
3.  Assigning keys should be done in the context of the array you are iterating over. 
4.  Keys serve as a hint to React, they do not pass to your component like other props.  You cannot do _props.key_. 

```jsx
class ListItem extends React.Component {
  constructor (props) {
    super (props);
  }  
  // this is good practice do not assign keys out of context of the array, ie, do not <li key={value.toString()}>
  render() {
    const text = `This is item number ${this.props.value}.`;
    return (
      <li>{text}</li> 
    )
  }
}

class List extends React.Component {
  constructor (props) {
    super(props);
  }  
  
  render() {
    const numbers = this.props.numbers;
    const listItems = numbers.map(number => {
      // good practice specify keys inside the array not at the component definition
      return (<ListItem key={number.toString()} value={number} />); 
    });
    return (
      <ul>
        {listItems}
      </ul>
    )
  }
}

ReactDOM.render(
  <List numbers={[0, 1, 2, 3]} />,
  document.getElementById('root')
)
```

Below is another example of using lists and keys in React, in this case we can guarantee the uniqueness of the ids.
In such a case we can use them in the list items and the divs.  We are still using them in the context of list mapping.
```jsx
class Sidebar extends React.Component {
  constructor (props) {
    super(props);
  }  
  render () {
    const titles = this.props.posts.map(post => {
    return (<li key={post.id}>{post.title}</li>);
    });
    return (
      <ul>
        {titles}
      </ul>
    )
  }
}

class Content extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    const allContent =  this.props.posts.map(post => {
      return (
        <div key={post.id}>
          <h3>{post.title}</h3> 
          <p>{post.content}</p>
        </div>
      )
    }); 
    return (allContent); // here we cannot use ({allContent}) because it turns the array into an object
  }
}

class Blog extends React.Component {
   constructor (props) {
     super(props);
   } 
  render () {
    const posts = this.props.posts
    return (
      <>
        <Sidebar posts={posts} />
        <Content posts={posts} />
      </>
    )
  } 
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
)
```

### Forms and Controlled Components
This is a very important concept, it mainly applies to HTML form elements.  HTML form elements are in control of their
own state.  You can have a situation where the element's own internal state is different from the state of the
enveloping React component.  We call this an uncontrolled element or component.  Note when you type characters in the
input field of an input element, no extra Javascript code needs to be written.  The HTML _<input />_ element controls its
state.

A controlled component creates one state for all of its underlying elements and/or components.  We do this by using
only React props and state to produce state.

Below we have an example of an uncontrolled component:
```jsx
class SimpleForm extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSubmit.bind(this);
    this.state = { value: 'Hello, React!' }
  }  

  handleChange(event) {
    this.setState({ value: event.target.value });   
  }
  
  handleSubmit(event) {
    alert('The form was submitted with name: ', this.state.value);    
    event.preventDefault();
  }
  
  render () {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="my_form">Name: </label> 
            <input type="text" id="my_form" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="my_form_2">Name: </label> 
            <input type="text" id="my_form_1" value={this.state.value} onChange={this.handleChange} />
          </div>
            <input type="submit" value="Submit" />
        </form>
        <p>Entered value: {this.state.value}</p>
      </>
    );
  }
}

ReactDOM.render(
  <SimpleForm />,
  document.getElementById('root')
)
```

The first div demonstrates an uncontrolled element.  The initial UI render has the paragraph content as 'Hello, React',
the input field is empty.  The HTML input element manages its own state apart from ```<SimpleForm />```.  When one starts
to type they appear to synchronize, but there are still two separate sources of state. 

The second div is a controlled element, ```<SimpleForm />``` now controls both its state and HTML input element state.
The value attribute of the second HTML input element takes its input from the state of the React component.  The
method _handleChange_ runs on every keystroke and updates the component state with every keystroke.  This updated state
is the value of the value attribute for the HTML input element.

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const numberOfGuests = this.state.numberOfGuests;
    const isGoing = this.state.isGoing;
    console.log(
      `Form submitted: is going: ${isGoing}, number of guests: ${numberOfGuests}.`
    );
    event.preventDefault();
  }

  render() {
    return (
      <form action="#" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="isGoing">Is Going: </label>
          <input
            id="isGoing"
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="numberOfGuests">Is Going: </label>
          <input
            id="numberOfGuests"
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(<Reservation />, document.getElementById("root"));
```
In the code above we write a React component that handles multiple inputs.  Note it is a controlled component.  Note
if either checkbox or numeric input change the state updates.  The syntax ```[name]: value``` is the same as
```this.state[name]: value```.

### Lifting State
```jsx
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
};

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: "", scale: "c" };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
```
Explanation of code in view of React Component Life Cycle:
1.  When ```<Calculator />``` is passed to ```ReactDOM.render()```

