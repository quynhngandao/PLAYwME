import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../App/App.css";
import { Button } from "../GetStartedButton/GetStartedButton";
import "./HeroSection.css";

function HeroSection() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/animal");
  };

  return (
    <div className="hero-container">
      <img className="animal-img" alt="animal" />
      <h1>Find Your New Best Friend</h1>
      <p>Browse animals from local shelters and rescues</p>
      <div className="hero-btns">
        <Button
          type="button"
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={() => handleClick()}
        >
          <span>
            GET STARTED <i className="fa-solid fa-paw" />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
