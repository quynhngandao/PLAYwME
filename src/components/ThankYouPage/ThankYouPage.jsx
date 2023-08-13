import "./ThankYouPage.css";
import { Button, Stack } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// direct to user or review page 
const CustomComponent = () => {
  // useHistory
  const history = useHistory();
  const handleClick = () => {
    history.push("/user");
  };
  const handleClickAnother = () => {
    history.push("/review");
  };
/***** RENDER *****/
  return (
    <div className="thankyou-page">
  
        <div className="yellow-box"></div>
        <div className="blue-box"></div>
        <img
          className="image"
          src="images/thankyou.png"
          style={{
            maxWidth: "80%", 
            height: "auto",
            position: "absolute",
            left: "70%",
            transform: "translateX(-50%)",
            top: "40px",
          }}
        />
        <div className="text-container">
          <div className="title">Thank You</div>
          <div className="message">
            We Appreciate You! You Will Be Contacted Shortly!
          </div>
      <Stack spacing={2} direction="row">
          <div className="button-container">
            <Button onClick={handleClick} className="button">
              Go Back Home
            </Button>
          </div>
          <div className="button-container">
            <Button onClick={handleClickAnother} className="button">
              Make Another Request
            </Button>
          </div>  </Stack>
        </div>
      
    </div>
  );
};

export default CustomComponent;
