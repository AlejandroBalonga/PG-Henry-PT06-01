import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Category } from "../../../actions";
import { postCategoryBO, getCategoriasBO } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../reducer/index";

export interface CardCategoryProps {
  category: Category;
  stateC: any;
}

export default function FormDialog({
  category = { id: 0, name: null },
  stateC,
}: CardCategoryProps) {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState({
    id: category.id||0,
    name: category.name||'',
    errors: null,
  });

  const token = useSelector((state: ReduxState) => state.token);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function validation(e: any) {
    let errors = {};
    if (e) {
      if (e.target.name === "name" && e.target.value === "") {
        errors["name"] = { action: { error: true }, message: "required" };
      }
    } else {
      if (input.name === "") {
        errors["name"] = { action: { error: true }, message: "required" };
      }
    }
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validation(null);
    setInput({
      ...input,
      errors: errors,
    });
    if (Object.getOwnPropertyNames(errors).length === 0) {
      await dispatch(postCategoryBO(token, input));
      await dispatch(
        getCategoriasBO({
          page: 1,
          pageSize: 12,
          name: stateC.name,
          order: "id",
          direction: "desc",
          filter: stateC.filter,
        })
      );
      if (input.id <= 0) {
        setInput({
          id: 0,
          name: '',
          errors: null,
        });
      }
      handleClose();
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  function handlechange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      errors: validation(e),
    });
  }

  return (
    <div>
      <Button color="info" variant="contained" fullWidth onClick={handleClickOpen}>
        {category.id ? "Actualizar" : "Crear"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{category.id ? "Actualizar Categoria" : "Nueva Categoria"}</DialogTitle>
        <DialogContent>
          <TextField
            {...input.errors?.name?.action}
            autoFocus
            margin="dense"
            id="name"
            label="Category"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            value={input.name}
            onChange={(e) => handlechange(e)}
            helperText={input.errors?.name?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
