import { Fragment } from "react";

interface NumberInputProps {
  defaultValue: number;
  text: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const NumberInput: React.FunctionComponent<NumberInputProps> = (props) => {
  return (
    <div className="block">
      <input
        className="w-16"
        type="text"
        id="height"
        defaultValue={props.defaultValue}
        onChange={props.changeHandler}
      />
      <label htmlFor="height">{props.text}</label>
    </div>
  );
};

export default NumberInput;
