import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CssBaseline } from "@mui/material";
// import { Route, Routes, useLocation } from "react-router-dom";
import DataProduct from "./DataProduct";
import DataCategories from "./DataCategories";
import DataUser from "./DataUser";
import DataOrder from "./DataOrder";

import Menu from "./Menu";

import Grid from "@mui/material/Grid";

import styled from "styled-components";
import NavBar from "../NavBar/NavBar";

import { useSelector } from "react-redux";
import { ReduxState } from "../../reducer";

import CreateProduct from "../Dashboard/Dialogs/CreateProduct";
import CreateCategory from "../Dashboard/Dialogs/CreateCategory";
import CreateUser from "../Dashboard/Dialogs/CreateUser";
/* import CreateOrder from "../Dashboard/Dialogs/CreateOrder"; */
import SearchBar from "../../components/SearchBar/SearchBarBO";
import Paper from "@mui/material/Paper";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { getArticulosBO, getArticulos, getCategorias, Articulo, getCategoriasBO, getUsersBO, getOrdersBO } from "../../actions";


function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    page: 1,
    pageSize: 12,
    name: undefined,
    order: undefined,
    direction: undefined,
    categoryId: undefined,
    filter:null,
    articuloInit: {
      id: 0,
      name: null,
      brand: null,
      stock: 0,
      price: 0,
      img: null,
      state: null,
      categoryId: 0,
      category: { id: 0, name: null },
      totalCount: 0,
    },
    categoryInit: {
      id: 0,
      name: null,
    },
    userInit: {
      id: 0,
      name: null,
    },
    orderInit: {
      id: 0,
      name: null,
    },
  });

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (dashboardmenu === "products") {
      dispatch(getCategorias());
      dispatch(
        getArticulosBO({
          page: state.page,
          pageSize: state.pageSize,
          name: state.name,
          order: state.order,
          direction: state.direction,
          categoryId: state.categoryId,
          filter: state.filter,
        })
      );
    }
    if (dashboardmenu === "categories") {
      dispatch(
        getCategoriasBO({
          page: state.page,
          pageSize: state.pageSize,
          name: state.name,
          order: state.order,
          direction: state.direction,
          filter: state.filter,
        })
      );
    }
    if (dashboardmenu === "users") {
      dispatch(
        getUsersBO({
          page: state.page,
          pageSize: state.pageSize,
          name: state.name,
          order: state.order,
          direction: state.direction,
          filter: state.filter,
        })
      );
      if (dashboardmenu === "orders") {
        dispatch(
          getOrdersBO({
            page: state.page,
            pageSize: state.pageSize,
            name: state.name,
            order: state.order,
            direction: state.direction,
            userId:0,
            filter: state.filter,
          })
        );
      }
    }
  }, [
    dispatch,
    state.page,
    state.pageSize,
    state.name,
    state.order,
    state.direction,
    state.categoryId,
    state.filter,
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dashboardmenu = useSelector((state: ReduxState) => state.dashboardmenu);

  const getComponentRouter = (root: String, props: any) => {
    switch (root) {
      case "products":
        return <CreateProduct articulo={props.articuloInit} stateC={state} />;
      case "categories":
        return <CreateCategory category={props.categoryInit} stateC={state} />;
      case "users":
        return <CreateUser user={props.userInit} stateC={ state} />;
      /* case "orders":
        return <CreateOrder order={props.orderInit} stateC={state} />; */
    }
  }

  const getDataComponentRouter = (root: String) => {
    switch (root) {
      case "products":
        return <DataProduct />;
      case "categories":
        return <DataCategories />;
      case "users":
        return <DataUser />;
      case "orders":
        return <DataOrder />;
    }
  };

  return (
    <>
      <NavBar />
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              sx={{
                height: 100,
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color="default">
                      <Toolbar>
                        {getComponentRouter(dashboardmenu, state)}
                        <SearchBar
                          onSearch={(search) => setState({ ...state, page: 1, name: search })}
                        />                        
                      </Toolbar>
                    </AppBar>
                  </Box>
                </Grid>
                {/* <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                  {getComponentRouter(dashboardmenu, state)}
                </Grid> */}
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
                  {getDataComponentRouter(dashboardmenu)}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
`;

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
