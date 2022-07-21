import React from "react";
import { PRIORITY } from "../../utils/defaultTodos";

import { RadioContainer, RadioWrapper } from "./RadioButtonsStyles";

const RADIO_BUTTONS = [
  PRIORITY.NONE,
  PRIORITY.LOW,
  PRIORITY.MEDIUM,
  PRIORITY.HIGH,
];

const RadioButtons = ({ taskObject, callback }) => {
  const generateRadioButtonsStructure = RADIO_BUTTONS.map((radioButton) => (
    <RadioWrapper
      radioColour={`var(--${radioButton.toLocaleLowerCase()}Priority)`}
      key={`radio__${radioButton}`}
    >
      <label htmlFor={`radio__${radioButton}`}>
        <input
          type="radio"
          id={`radio__${radioButton}`}
          checked={taskObject.radio === radioButton}
          name="radioButtonsSection"
          onChange={() => callback({ ...taskObject, radio: radioButton })}
        />
        <span>Mức độ {radioButton}</span>
        <span />
      </label>
    </RadioWrapper>
  ));

  return <RadioContainer>{generateRadioButtonsStructure}</RadioContainer>;
};

export default RadioButtons;
