import React from 'react';

const Box = React.forwardRef(function({size, color, testid}, ref) {
  const divRef = React.useRef(null);
  React.useImperativeHandle(ref, function() {
    return {
      getYLocation: function() {
        return divRef.current?.getBoundingClientRect().top
      },
      current: divRef.current
    }
  });
/*
  when useImperativeHandle is invoked, then we define what is returned to the calling parent when using refs
  to access child elements.  Note because of this, the ref only returns what is returned by the functional
  argument, in order to access the div element itself, I had to also return the 'current' property which referenced
  divRef.current.  This explains to the parent call via "boxTop" I had to include the current property, so
  refs[position] returns the ref, however what is returned by the ref is now under control of what is defined by
  useImperativeHandle, so I have to call the current property to invoke the getYLocation method.  Otherwise I will
  not be able to access the actual ref.
*/
  return (
    <div style={{
      height: size,
      width: size,
      backgroundColor: color,
      margin: '0 auto'
    }}
    ref={divRef} data-testid={testid}></div>
  )
});

const ImperativeHandleExample = function() {
  const refs = [React.useRef(null), React.useRef(null), React.useRef(null)];

  const goToBox = function(position) {
    const boxTop = refs[position].current?.getYLocation();
    window.scrollTo({ top: boxTop, behavior: 'smooth'});
  }

  return (
    <>
      <div>
        <button data-testid="buttonOne" onClick={() => goToBox(0)}>Go to 1st box</button>
        <button data-testid="buttonTwo" onClick={() => goToBox(1)}>Go to 2nd box</button>
        <button data-testid="buttonThree" onClick={() => goToBox(2)}>Go to 3rd box</button>
      </div>
      <Box testid="boxOne" size='500px' color='red' ref={refs[0]} />
      <Box testid="boxTwo" size='500px' color='blue' ref={refs[1]} />
      <Box testid="boxThree" size='500px' color='green' ref={refs[2]} />
    </>
  )
}

export { ImperativeHandleExample };