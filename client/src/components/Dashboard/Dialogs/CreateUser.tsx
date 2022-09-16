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

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { postProduct } from "../../../actions";
import { postImage } from "../../../services/api/postImage";
import { ReduxState } from "../../../reducer/index";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { User, postUserBO, getUsersBO } from "../../../actions";

import FormHelperText from "@mui/material/FormHelperText";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


export interface CardUserProps {
  user: User;
  stateC: any;
}


export default function FormDialog({
  user = {
    id: null,
    name: '',
    surname: '',
    email: '',
    password: '',
    state: '',
    role: '',
  },
  stateC,
}: CardUserProps) {
  const dispatch = useDispatch<any>();
  const [input, setInput] = useState({
    id: user.id || 0,
    name: user.name || "",
    surname: user.surname || "",
    email: user.email || "",
    password: "",
    state: user.state || "",
    role: user.role || "",
    errors: null,
    showPassword:false,
  });

  const token = useSelector((state: ReduxState) => state.token);
  const userprop = useSelector((state: ReduxState) => state.user);

  function handlechange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function validation(e) {
    let errors = {};
    if (e) {
      if (e.target.name === "name" && e.target.value === "") {
        errors["name"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "surname" && e.target.value === "") {
        errors["surname"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "email" && e.target.value === "") {
        errors["email"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "password" && e.target.value === "") {
        errors["password"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "state" && e.target.value === "") {
        errors["state"] = { action: { error: true }, message: "required" };
      }
      if (e.target.name === "role" && e.target.value === "") {
        errors["role"] = { action: { error: true }, message: "required" };
      }
    } else {
      if (input.name === "") {
        errors["name"] = { action: { error: true }, message: "required" };
      }
      if (input.surname === "") {
        errors["surname"] = { action: { error: true }, message: "required" };
      }
      if (input.email === "") {
        errors["email"] = { action: { error: true }, message: "required" };
      }
      if (input.password === "" && !user.id) {
        errors["password"] = { action: { error: true }, message: "required" };
      }
      if (input.state === '') {
        errors["state"] = { action: { error: true }, message: "required" };
      }
      if (input.role === "") {
        errors["role"] = { action: { error: true }, message: "required" };
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
      await dispatch(postUserBO(token, input));
      await dispatch(
        getUsersBO({
          page: 1,
          pageSize: 12,
          name: "",
          order: "id",
          direction: "desc",
          filter: null,
          userId: userprop.role ==='CLIENT'? userprop.id : null,
        })
      );
      if (input.id<=0) {
        setInput({
          id: 0,
          name: "",
          surname: "",
          email: "",
          password: "",
          state: "",
          role: "",
          errors: null,
          showPassword: false,
        });
      }
      
      handleClose();
    }
  }

  

  const handleClickShowPassword = () => {
    setInput({
      ...input,
      showPassword: !input.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  /* const [state, setStatus] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  }; */

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
        {user.id ? "Actualizar" : "Crear"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {user.id ? "Actualizar Usuario" : "Nuevo Usuario"}
        </DialogTitle>
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
            onChange={(e) => handlechange(e)}
            helperText={input.errors?.name?.message}
          />

          {/* <Button onClick={(e) => handlePostImage(e)}>Subir Imagen</Button> */}
          <TextField
            {...input.errors?.surname?.action}
            autoFocus
            margin="dense"
            id="surname"
            name="surname"
            label="Nombre de usuario"
            type="text"
            value={input.surname}
            fullWidth
            variant="standard"
            onChange={(e) => handlechange(e)}
            helperText={input.errors?.surname?.message}
          />
          <TextField
            {...input.errors?.email?.action}
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Correo"
            type="text"
            value={input.email}
            fullWidth
            variant="standard"
            onChange={(e) => handlechange(e)}
            helperText={input.errors?.email?.message}
          />

          {/* <TextField
            {...input.errors?.password?.action}
            type={input.showPassword ? "text" : "password"}
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Contraseña"
            value={input.password}
            fullWidth
            variant="standard"
            onChange={(e) => handlechange(e)}
            helperText={input.errors?.password?.message}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {input.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          /> */}
          <FormControl fullWidth sx={{ m: 1 }}>
            <OutlinedInput
              id="filled-adornment-password"
              type={input.showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={(e) => handlechange(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {input.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "100%" }}
            size="small"
            {...input.errors?.state?.action}
          >
            <InputLabel id="state">Estado</InputLabel>
            <Select
              {...(userprop.role === "CLIENT" ? { disabled: true } : null)}
              labelId="state"
              id="state"
              name="state"
              value={input.state}
              label="Estado"
              onChange={handlechange}
            >
              <MenuItem value="">
                <em>Seleccionar....</em>
              </MenuItem>
              <MenuItem value="ACTIVE">Activo</MenuItem>
              <MenuItem value="BLOCKED">Bloqueado</MenuItem>
              <MenuItem value="NOTCONFIRMED">No confirmado</MenuItem>
            </Select>
            <FormHelperText>{input.errors?.categoryId?.message}</FormHelperText>
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "100%" }}
            size="small"
            {...input.errors?.role?.action}
          >
            <InputLabel id="state">Rol</InputLabel>
            <Select
              {...(userprop.role === "CLIENT" ? { disabled: true } : null)}
              labelId="role"
              id="role"
              name="role"
              value={input.role}
              label="Rol"
              onChange={handlechange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="ADMIN">Administrador</MenuItem>
              <MenuItem value="CLIENT">Cliente</MenuItem>
            </Select>
            <FormHelperText>{input.errors?.role?.message}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
