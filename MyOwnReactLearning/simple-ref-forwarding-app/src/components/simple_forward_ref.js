import React from 'react';

const ForwardedInput = React.forwardRef(function({placeholder}, ref) {
  return (
    <input type="text" data-testid="forwarded_input" ref={ref} placeholder={placeholder}/>
  );
});

const SimpleForwardRef = function() {
  const inputRef = React.useRef(null);

  function selectText(event) {
    event.preventDefault();
    inputRef.current?.select();
  }
  return (
    <div>
      <ForwardedInput ref={inputRef} placeholder="Type here"/>
      <button data-testid="select_button" type="button" onClick={selectText}>Select Text</button>
    </div>
  )
}

export { SimpleForwardRef };