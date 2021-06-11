## Life Cycle Notes Part 1  

There are four phases in a React Component Life Cycle:
  1.  Initialization
  2.  Mounting
  3.  Update
  4.  Unmounting

  ### INITIALIZATION:

  Let's start with Initialization, below we have the ContraMusicPlayer component.  In the Initialization
  phase the starting states and default props (if any) are established.

  The component sets up initial state in the _constructor_, the _defaultProps_ is a property of the
  component which defines all default values for any props.

  So if we were to render ```<ContraMusicPlayer/>``` then the component would start with volume at 70%, status
  at **pause** and **dark** theme.

  However, if we were to render ```<ContraMusicPlayer theme="light"/>``` it would start with volume at 70%, status
  at **pause** and **light** theme.

```javascript
class ContraMusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 70,
      status: 'pause'
    }
  }
}

ContraMusicPlayer.defaultProps = {
    theme: 'dark'
};
```

  ### MOUNT:

  After preparing the component with its basic needs, its initial state and props, a component mount takes
  place.  In this phase the virtual components convert to actual DOM elements and are placed in the
  DOM by React.

  There is a method that can be called right before the mounting phase, _componentWillMount_ can be used
  to perform any actions you want before the component mounted.  It was used to perform all actions before
  mounting but this has been superseded by the _constructor_ and _defaultProps_.  Now deprecated, it was only
  executed once in the component lifecycle, before the first render.

  _render_ mounts the component onto the browser.

  Immediately after mounting, _componentDidMount_ is called once the component life cycle immediately after
  the first render.  It is here you can load data to be available for the component, via AJAX calls.  A
  note from one of the articles said that API calls should always be made in the _componentDidMount_ method.

```javascript
class Exmaple extends React.Component {
    componentDidMount() {
    fetch(url).then(result => {/* do something with the results */})
  }  
}
```
  ### UPDATE:

  In this phase, the component can mutate by receiving new updates in the form of state changes and/or
  new props.  So what is the difference between the two, how is that props cause an update and how is that
  new state causes an update?
  
  When new props arrive, _componentWillReceiveProps_ will be executed.
  
```javascript
class Example extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.status !== nextProps.status) {
      this.setState({ status: nextProps.status }) 
    }
  }
}
```

  In the above code, new props evaluate to see if they changed.  If the props have changed, state updates and
  component **does not** re-render.  Note this is how one can keep the state and props synchronized.  

  The component will conditionally rerender by use of _shouldComponentUpdate_, this method always returns a boolean
  default of **true**.  The body of the method checks the parameters _nextProps_ and _nextState_ to see if they
  have changed.  If either one changes, return **true** so the component re-renders.  The best way to code is for
  the boolean condition to return **false** if met.

```javascript
class Example extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.engagement !== nextProps.engagement ||
      nextState.input !== this.state.input; 
  }
}
```

  In the above example, if the props **and** state do not change the component does not rerender.  If either one changes
  then the component re-renders.

  ### UNMOUNTING

  _componentWillUnmount_ is the last hook of the life cycle.  It is used for component cleanup.  A component will get
  unmounted if it is no longer in the DOM tree.

```javascript
class Example extends React.Component {
  componentWillUnmount() {
    this.chart.destroy();
    this.resetLocalStorage();
    this.clearSession();
  }
}
```


  