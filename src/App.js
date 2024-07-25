import React from "react";
import { Card, Container } from "@mui/material";
import Heading from "./components/Heading";
import Invoice from "./components/Invoice";

const App = () => {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Card>
        <Heading />
      </Card>

      <Card style={{ marginTop: "20px" }}>
        <Invoice />
      </Card>
    </Container>
  );
};

export default App;
