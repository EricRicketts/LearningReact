import './App.css';
import { ImperativeHandleExample } from "./components/imperative_handle_example";

function App() {
  return (
    <>
      <ImperativeHandleExample />
      <div style={{ height: '500px', width: '500px', backgroundColor: 'yellow', margin: '0 auto'}}></div>
    </>
  );
}

export default App;
