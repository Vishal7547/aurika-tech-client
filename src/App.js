import React, { useState } from "react";
import { Card, Container } from "@mui/material";
import Heading from "./components/Heading";
import Invoice from "./components/Invoice";
import ViewInVoive from "./components/ViewInVoive";

const App = () => {
  const [isView, setIsView] = useState(true);
  return (
    <Container style={{ marginTop: "20px" }}>
      <Card>
        <Heading setIsView={setIsView} />
      </Card>
      {isView && (
        <Card style={{ marginTop: "20px" }}>
          <Invoice />
        </Card>
      )}
      {!isView && (
        <Card style={{ marginTop: "20px" }}>
          <ViewInVoive />
        </Card>
      )}
    </Container>
  );
};

export default App;
