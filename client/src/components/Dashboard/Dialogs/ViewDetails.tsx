import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { OrderDetailsBO } from "../../../actions";
import { postCategoryBO, getCategorias } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../reducer/index";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export interface CardOrderProps {
  viewdetails: OrderDetailsBO[];
  stateC: any;
}

export default function FormDialog({ viewdetails, stateC }: CardOrderProps) {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState({});

  const token = useSelector((state: ReduxState) => state.token);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" fullWidth onClick={handleClickOpen}>
        View
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detalles de Orden # {viewdetails[0].orderId}</DialogTitle>
        <DialogContent>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 440, maxWidth: 1100 }}
            >
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Img</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Marca</TableCell>
                    <TableCell align="right">Categoria</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {viewdetails.map((row) => {
                    return (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">
                          <Stack direction="row" spacing={2}>
                            <Avatar
                              alt="Remy Sharp"
                              src={row.product.img}
                              sx={{ width: 56, height: 56 }}
                            ></Avatar>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">{row.product.name}</TableCell>
                        <TableCell align="right">{row.product.brand}</TableCell>
                        <TableCell align="right">
                          {row.product?.category?.name}
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
