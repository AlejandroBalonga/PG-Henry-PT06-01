import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Paginado from "../../components/Paginado/Paginado";


import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../reducer";
import { Category } from "../../actions";

import CreateCategory from "../Dashboard/Dialogs/CreateCategory";

import ButtonMUI from "@mui/material/Button";

import { getCategorias,getCategoriasBO, deleteCategoryBO } from "../../actions";



function createData(
  id: number,
  name: String,
) {
  return { id, name };
}


export default function DenseTable() {
  const [state, setState] = useState({
    page: 1,
    pageSize: 12,
    name: undefined,
    order: undefined,
    direction: undefined,
    categoryId: undefined,
    filter: null,
  });
  const dispatch = useDispatch<any>();
  const allCategories = useSelector((state: ReduxState) => state.categorias).map(
    (item) => {
      return createData(
        item.id,
        item.name
      );
    }
  );
  const totalCategorias = useSelector((state1: ReduxState) => state1.totalCategorias);

  useEffect(() => {
    dispatch(
      getCategoriasBO({
        page: state.page,
        pageSize: state.pageSize,
        name: state.name,
        order: state.order,
        direction: state.direction,
        filter: null,
      })
    );
  }, [
    dispatch,
    state.page,
    state.pageSize,
    state.name,
    state.order,
    state.direction,
    state.filter,
  ]);

  async function clickDelete(id) {
    await dispatch(deleteCategoryBO(id));
    await dispatch(
      getCategoriasBO({
        page: state.page,
        pageSize: 12,
        name: state.name,
        order: "id",
        direction: "desc",
        filter: state.filter,
      })
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCategories.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                  <CreateCategory category={row} stateC={state} />
                </TableCell>
                <TableCell align="right">
                  <ButtonMUI
                    variant="outlined"
                    onClick={() => clickDelete(row.id)}
                  >
                    Delete
                  </ButtonMUI>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginado
        onPageChange={(page) => setState({ ...state, page })}
        totalCount={totalCategorias}
        pageSize={state.pageSize}
      />
    </Paper>
  );
}

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
