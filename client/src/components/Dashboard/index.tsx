import { CssBaseline } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import DataProduct from "./DataProduct";
import DataCategories from "./DataCategories";
import Menu from "./Menu";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import styled from "styled-components";
import NavBar from "../NavBar/NavBar";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { ReduxState } from "../../reducer";

import CreateProduct from "../Dashboard/Dialogs/CreateProduct";
import CreateCategory from "../Dashboard/Dialogs/CreateCategory";

function Dashboard() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dashboardmenu = useSelector((state: ReduxState) => state.dashboardmenu);
  
  return (
    <>
      <Body>
        <NavBar />
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={10}></Grid>
                  <Grid item xs={2}>
                    {dashboardmenu === "products" ? (
                      <CreateProduct />
                    ) : (
                      <CreateCategory />
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={2}>
                    <Menu />
                  </Grid>
                  <Grid item xs>
                    {dashboardmenu === "products" ? (
                      <DataProduct />
                    ) : (
                      <DataCategories />
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Body>
    </>
  );
}

export default Dashboard;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  /* background: #335d90;
  background: linear-gradient(#335d90, 80%, #11e95b); */
  /* font-family: "Roboto", sans-serif; */
  margin: 0;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  max-width: 25%;
  width: 25%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border-radius: 10px;
  color: #fff;
`;

const Title = styled.h1`
  position: absoluta;
  font-size: 18px;
  /* margin-bottom: 15px;
  padding-bottom: 7px; */
  margin: auto;
  padding: auto;
  color: #335d90;

  text-transform: uppercase;
  justify-content: center;
  align-items: center;
`;

const Input3 = styled.input`
  display: block;
  width: 95%;
  height: 40px;
  padding: 5px 6px;
  /* margin-bottom: 15px; */
  margin: 20px auto;
  border: 3px solid #335d90;
  outline: none;
  border-radius: 1px;

  &:hover:focus {
    box-shadow: 0 0 8px 0 #335d90 inset, 0 0 8px 4px #335d90;
    transform: scale(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
const Input4 = styled.input`
  display: block;
  width: 95%;
  height: 40px;
  padding: 5px 6px;
  /* margin-bottom: 15px; */
  margin: 20px auto;
  border: 3px solid #335d90;
  outline: none;
  border-radius: 1px;

  &:hover:focus {
    box-shadow: 0 0 8px 0 #335d90 inset, 0 0 8px 4px #335d90;
    transform: scale(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

const Acuerdo = styled.p`
  text-align: center;
  margin-bottom: 15px;
  font-size: 15px;
`;

const Button = styled.button`
  display: block;
  margin: 20px auto;
  width: 100%;
  height: 40px;
  background-color: #335d90;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  color: #fff;

  &:hover {
    box-shadow: 0 0 8px 0 #335d90 inset, 0 0 8px 4px #335d90;
    transform: scale(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

const p = styled.link`
  text-align: center;
  margin-top: 15px;
  font-weight: bolder;
`;
