import { Box, Button, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GridViewIcon from "@mui/icons-material/GridView";
import React from "react";

const Heading = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
    >
      <Button variant="contained" startIcon={<AddIcon />}>
        Generate InVoice
      </Button>
      <Button variant="contained" startIcon={<GridViewIcon />}>
        View Generate
      </Button>
    </Box>
  );
};

export default Heading;
