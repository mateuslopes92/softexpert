import React from "react";
import { BrowserRouter } from "react-router-dom";

import GobalStyle from "./styles/global";
import Routes from "./routes";

// import { Container } from './styles';

export default function App() {
  return (
    <BrowserRouter>
      <GobalStyle />
      <Routes />
    </BrowserRouter>
  );
}
