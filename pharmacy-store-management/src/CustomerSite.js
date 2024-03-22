import {Nav} from "./components/customerSite/Nav";
import {Auth0Provider} from "@auth0/auth0-react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import styled from "styled-components";
import {Home} from "./components/customerSite/Home";

const Css = styled.body`
  body {
    overflow-x: hidden;
    padding: 0;
  }

  /* Or if you want to target specific containers */
  .container {
    overflow-x: hidden;
  }
`
export const CustomerSite = () =>{
    return(
        <>
                <Css>
                    <Nav></Nav>
                    <Home/>
                </Css>
        </>
    )
}