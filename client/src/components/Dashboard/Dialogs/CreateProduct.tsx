import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { postProductBO, getArticulosBO } from "../../../actions";
import { postImage } from "../../../services/api/postImage";
import { ReduxState } from "../../../reducer/index";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ArticuloBO } from "../../../actions";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import FolderIcon from "@mui/icons-material/Folder";
import FormHelperText from "@mui/material/FormHelperText";

export interface CardProductProps {
  articulo: ArticuloBO;
  stateC: any;
}

export default function FormDialog({
  articulo = {
    id: 0,
    name: null,
    brand: null,
    stock: 0,
    price: 0,
    priceSpecial: 0,
    img: null,
    state: null,
    categoryId: 0,
    category: { id: 0, name: null },
    totalCount: 0,
  },
  stateC,
}: CardProductProps) {
  const dispatch = useDispatch<any>();
  const [input, setInput] = useState({
    id: articulo.id || 0,
    name: articulo.name || "",
    brand: articulo.brand || "",
    img: articulo.img || "",
    state: articulo.state || "",
    price: articulo.price || 0,
    priceSpecial: articulo.priceSpecial || 0,
    stock: articulo.stock || 0,
    categoryId: articulo.category.id || 0,
    errors: null,
  });

  const token = useSelector((state: ReduxState) => state.token);
  let categories = useSelector((state: ReduxState) => state.categorias);

  function validation(e) {
    let errors = {};
    if (e) {
      if (e.target.name === "name" && e.target.value === "") {
        errors["name"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "price" && e.target.value <= 0) {
        errors["price"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "stock" && e.target.value <= 0) {
        errors["stock"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "brand" && e.target.value === "") {
        errors["brand"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "categoryId" && e.target.value <= 0) {
        errors["categoryId"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "state" && e.target.value === "") {
        errors["state"] = { action: { error: true }, message: "required" };
      }
    } else {
      if (input.name === "") {
        errors["name"] = { action: { error: true }, message: "required" };
      }
      if (input.price <= 0) {
        errors["price"] = { action: { error: true }, message: "required" };
      }
      if (input.stock <= 0) {
        errors["stock"] = { action: { error: true }, message: "required" };
      }
      if (input.brand === "") {
        errors["brand"] = { action: { error: true }, message: "required" };
      }
      if (input.categoryId === 0) {
        errors["categoryId"] = { action: { error: true }, message: "required" };
      }
      if (input.state === "") {
        errors["state"] = { action: { error: true }, message: "required" };
      }
      if (input.img === "") {
        errors["img"] = { action: { error: true }, message: "" };
      }
    }

    return errors;
  }

  function handlechange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      errors: validation(e),
    });
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    handlePostImage(e.target.files[0]);
  }

  async function handlePostImage(images: File) {
    const url = await postImage(images);
    setInput({
      ...input,
      img: url,
    });
  }

  async function handelSubmit(e) {
    e.preventDefault();
    const errors = validation(null);
    setInput({
      ...input,
      errors: errors,
    });
    if (Object.getOwnPropertyNames(errors).length === 0) {
      await dispatch(postProductBO(token, input));
      await dispatch(
        getArticulosBO({
          page: 1,
          pageSize: 12,
          name: stateC.name,
          order: "id",
          direction: "desc",
          categoryId: stateC.categoryId,
          filter: stateC.filter,
        })
      );
      if (input.id <= 0) {
        setInput({
          id: 0,
          name: "",
          brand: "",
          img: "",
          state: "",
          price: 0,
          priceSpecial: 0,
          stock: 0,
          categoryId: 0,
          errors: null,
        });
      }
      handleClose();
    }
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="info"
        variant="contained"
        fullWidth
        onClick={handleClickOpen}
      >
        {articulo.id ? "Actualizar" : "Crear"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{articulo.id ? "Actualizar Categoria" : "Nueva Categoria"}</DialogTitle>
        <IconButton
          color={input.img !== "" ? "primary" : "error"}
          component="label"
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <AddPhotoAlternateIcon fontSize="medium" />
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="Remy Sharp"
              src={input.img}
              sx={{ width: 56, height: 56 }}
            >
              <FolderIcon />
            </Avatar>
          </Stack>
        </IconButton>

        <DialogContent>
          <TextField
            {...input.errors?.name?.action}
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            value={input.name}
            variant="standard"
            onChange={handlechange}
            helperText={input.errors?.name?.message}
          />

          <TextField
            {...input.errors?.price?.action}
            autoFocus
            margin="dense"
            id="price"
            name="price"
            label="Precio"
            type="number"
            value={input.price}
            fullWidth
            variant="standard"
            onChange={handlechange}
            helperText={input.errors?.price?.message}
          />
          <TextField
            {...input.errors?.priceSpecial?.action}
            autoFocus
            margin="dense"
            id="priceSpecial"
            name="priceSpecial"
            label="Precio Especial"
            type="number"
            value={input.priceSpecial}
            fullWidth
            variant="standard"
            onChange={handlechange}
            helperText={input.errors?.priceSpecial?.message}
          />
          <TextField
            {...input.errors?.stock?.action}
            autoFocus
            margin="dense"
            id="stock"
            name="stock"
            label="Cantidad"
            type="number"
            value={input.stock}
            fullWidth
            variant="standard"
            onChange={handlechange}
            helperText={input.errors?.stock?.message}
          />

          <TextField
            {...input.errors?.brand?.action}
            autoFocus
            margin="dense"
            id="brand"
            name="brand"
            label="Marca"
            value={input.brand}
            type="text"
            fullWidth
            variant="standard"
            onChange={handlechange}
            helperText={input.errors?.brand?.message}
          />

          <FormControl
            sx={{ m: 1, width: "100%" }}
            size="small"
            {...input.errors?.categoryId?.action}
          >
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="categoryId"
              name="categoryId"
              label="ID Categoria"
              value={input.categoryId}
              onChange={handlechange}
            >
              <MenuItem value={0} selected>
                <em>None</em>
              </MenuItem>
              {categories?.map((r, i) => (
                <MenuItem value={r.id}>{r.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{input.errors?.categoryId?.message}</FormHelperText>
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "100%" }}
            size="small"
            {...input.errors?.state?.action}
          >
            <InputLabel id="state">State</InputLabel>
            <Select
              labelId="state"
              id="state"
              name="state"
              value={input.state}
              label="Estado"
              onChange={handlechange}
            >
              <MenuItem value="" selected>
                <em>Seleccione...</em>
              </MenuItem>
              <MenuItem value="Active">Activo</MenuItem>
              <MenuItem value="Inactive">Inactivo</MenuItem>
            </Select>
            <FormHelperText>{input.errors?.state?.message}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handelSubmit}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
