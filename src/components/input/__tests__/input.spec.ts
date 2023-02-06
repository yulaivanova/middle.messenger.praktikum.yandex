import {Input} from "../input";
import {renderBlock} from "tests/renderUtils";
import {getByRole, prettyDOM} from "@testing-library/dom";

function renderInput({onClick}: any) {
  renderBlock({
    Block: Input,
    props: {inputName: 'testInput', type: 'text', onClick},
  });

  return getByRole(document.body, 'textbox');
}

describe('components/Input', () => {
  // ЮНИТ-тест на UI компонент
  it('should render Input', () => {
    const input = renderInput({onClick: () => {}});

    expect(input).toBeInTheDocument();
  });

  // ЮНИТ-тест на UI компонент с событием
  it('should call onClick when user press Input', () => {
    // 1 Arrange
    const mock = jest.fn();

    renderBlock({
      Block: Input,
      props: {inputName: 'testInput', type: 'text', onClick: mock},
    });

    // 2 Act
    getByRole(document.body, 'textbox').click();

    // 3 Assert
    expect(mock).toBeCalled();
  });

  it('should call onFocus when user press Input', () => {
    // 1 Arrange
    const mock = jest.fn();

    renderBlock({
      Block: Input,
      props: {inputName: 'testInput', type: 'text', onFocus: mock},
    });

    // 2 Act
    getByRole(document.body, 'textbox').focus();

    // 3 Assert
    expect(mock).toBeCalled();
  });
});
