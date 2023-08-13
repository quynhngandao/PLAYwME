import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
/***** FUNCTION ******/
function LogOutButton(props) {
  // useDispatch
  const dispatch = useDispatch();
  // useHistory
  const history = useHistory();

  // handleClick to log out and go to home page
  const handleClick = () => {
    dispatch({ type: "LOGOUT" })
    history.push("/home");
  };
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={handleClick}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
