import React, { useState } from "react";
import {
  CardMedia,
  CardContent,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { CheckCircleOutlineSharp } from "@mui/icons-material";

// Expand text for image card
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ExpandItem(props) {
  // State
  const [expanded, setExpanded] = useState(false);

  // handle click for expand
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardContent maxHeight="500px">
        <IconButton>
          <ImageIcon />
        </IconButton>

        {/* expand */}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        {/* collapse */}
        <Collapse
          onClick={handleExpandClick}
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
         
          <Typography
            sx={{
              textTransform: "capitalize",
              letterSpacing: 2,
              variant: "body1",
              color: "#0F66D0",
              fontWeight: "bold",
            }}
          > Note:
          </Typography>
        </Collapse>
      </CardContent>
    </>
  );
}

export default ExpandItem;
