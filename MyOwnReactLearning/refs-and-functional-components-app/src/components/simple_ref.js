import React from 'react';

function SimpleRef(props) {
  const textInput = React.useRef(null);
  const paragraphRef = React.useRef(null);

  function handleBlurClick(event) {
    event.preventDefault();
    textInput.current?.blur();
  }

  function handleFocusClick(event) {
    event.preventDefault();
    textInput.current?.focus();
  }

  function handleLogClick(event) {
    event.preventDefault();
    const textChoices = [
      'Foo Bar', 'Fizz Buzz', 'Who Chi', 'Yit Hat'
    ];
    const randomIndex = Math.floor(Math.random() * textChoices.length);
    paragraphRef.current.textContent = `Random Text: ${textChoices[randomIndex]}`;
  }

  return (
    <div id="customTextInput">
      <p data-testid="randomText"
        ref={paragraphRef}
      >
        Logged value
      </p>
      <label
        htmlFor="textInput"
      >
        Random Text:
      </label>
      <input
        type="text"
        id="textInput"
        className={'textInput'}
        data-testid="textInput"
        ref={textInput}
      />
      <input
        type="button"
        value="Focus The Input Text"
        id="focusButton"
        className={'focusButton'}
        data-testid="focusButton"
        onClick={handleFocusClick}
      />
      <input
        type="button"
        value="Blur The Input Text"
        id="blurButton"
        className={'focusButton buttonClassOne'}
        data-testid="blurButton"
        onClick={handleBlurClick}
      />
      <input
        type="button"
        value="Log To Paragraph"
        id="paragraphButton"
        className={'focusButton buttonClassTwo'}
        data-testid="paragraphButton"
        onClick={handleLogClick}
      />
    </div>
  );
}

export { SimpleRef };
/*

 */