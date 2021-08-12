import React from 'react';

function CallbackRefDynamicChild() {
  const firstTextInput = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  function callBackRef(node) {
    console.log(`Attached node: ${node}`);
    if (node) {
      node.value = 'I have come into existence.';
      node.focus();
    }
  }

  function onBlurClickHandler(event) {
    event.preventDefault();
    firstTextInput.current.blur();
  }

  function onClickHideInputHandler(event) {
    event.preventDefault();
    setVisible(false);
  }

  function onClickShowInputHandler(event) {
    event.preventDefault();
    setVisible(true);
  }

  function onFocusClickHandler(event) {
    event.preventDefault();
    firstTextInput.current.focus();
  }

  return (
    <div id="containerDynamic">
      <label
        htmlFor="firstInputText"
      >
        Input Random Text:
      </label>
      <input
        id="firstInputText"
        data-testid="firstInputText"
        type="text"
        ref={firstTextInput}
      />
      <button
        id="buttonShowNextInput"
        data-testid="buttonShowNextInput"
        className={"focusButton buttonClassOne"}
        onClick={onClickShowInputHandler}
      >
        Show Next Input
      </button>
      <button
        id="buttonHideNextInput"
        data-testid="buttonHideNextInput"
        className={"focusButton buttonClassTwo"}
        onClick={onClickHideInputHandler}
      >
        Hide Next Input
      </button>
      {visible && (
        <>
          <label
            htmlFor="secondInputText"
          >
            Input Random Text:
          </label>
          <input
            id="secondInputText"
            data-testid="secondInputText"
            type="text"
            ref={callBackRef}
          />
          <button
            id="firstInputFocusButton"
            className={"focusButton buttonClassThree"}
            data-testid="firstInputFocusButton"
            onClick={onFocusClickHandler}
          >
            Focus First Input
          </button>
          <button
            id="firstInputBlurButton"
            className={"focusButton buttonClassFour"}
            data-testid="firstInputBlurButton"
            onClick={onBlurClickHandler}
          >
            Blur First Input
          </button>
        </>
      )}
    </div>
  );
}

export { CallbackRefDynamicChild };