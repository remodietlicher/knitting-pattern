import { prependOnceListener } from "process";

const SubmitButton: React.FC = (props) => {
  return (
    <button
      className="bg-orange-400 hover:bg-transparent border border-orange-400 text-white hover:text-orange-400 rounded py-2 px-4 block"
      type="submit"
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
