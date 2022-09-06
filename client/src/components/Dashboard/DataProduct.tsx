import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../reducer";
import { getArticulos, getCategorias } from "../../actions";
import Paginado from "../../components/Paginado/Paginado";
import ButtonMUI from "@mui/material/Button";

import UpdateProduct from "../Dashboard/Dialogs/UpdateProduct";


function createData(
  id: number,
  name: string,
  brand: String,
  category: String,
  stock: number,
  price: number,
  state: String
) {
  return { id, name, brand, category, stock, price, state };
}

export default function DenseTable() {
  const [state, setState] = useState({
    page: 1,
    pageSize: 12,
    name: undefined,
    order: undefined,
    direction: undefined,
    categoryId: undefined,
  });
  const allProducts = useSelector((state: ReduxState) => state.articulos);
  console.log(allProducts);

  const totalCount = useSelector((state1: ReduxState) => state1.totalCount);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(
      getArticulos({
        page: state.page,
        pageSize: state.pageSize,
        name: state.name,
        order: state.order,
        direction: state.direction,
        categoryId: state.categoryId,
      })
    );
  }, [
    dispatch,
    state.page,
    state.pageSize,
    state.name,
    state.order,
    state.direction,
    state.categoryId,
  ]);


  function clickUpdate(){
    
  }
  return (
    <>
      <Paginado
        onPageChange={(page) => setState({ ...state, page })}
        totalCount={totalCount}
        pageSize={state.pageSize}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.category.name}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.state}</TableCell>
                <TableCell align="right">
                  <UpdateProduct/>
                </TableCell>
                <TableCell align="right">
                  <ButtonMUI variant="outlined">Delete</ButtonMUI>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
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
