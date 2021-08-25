import React from 'react';
import './App.css';

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
}

/*
  I got confused by how createContext works, so the argument is a default which will be supplied to the consuming
  component if the provider does not supply a value.
*/
const ThemeContext = React.createContext(themes.light);

function ThemedButton() {
  /*
    the argument for useContext is a context object created by React.createContext
    It is important to understand that the current context value in this component is determined by the value prop
    of the nearest context provider.  In this case, the nearest context provider is in the App component.  It
    context value is themes.dark.
  */
  const theme = React.useContext(ThemeContext);
  return (
    <button data-testid="themedButton" style={{ background: theme.background, color: theme.foreground}}>
      I am styled by theme context!
    </button>
  );
}

function ToolBar(props) {
  return (
    <div>
     <ThemedButton />
    </div>
);
}
function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <ToolBar />
    </ThemeContext.Provider>
  );
}

export default App;
