import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import Swal from "sweetalert2";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";

import { styled, alpha } from '@mui/material/styles';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export interface SearchBarProps {
  onSearch: Function;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [state, setState] = useState("");

  function handlechange(e) {
    setState(e.target.value);
  }

  function handleclick() {
    if (state === "") {
      // alert("Enter a product to search...")
      Swal.fire({
        title: "Error!",
        text: "Introduce un producto para buscar...",
        icon: "error",
        confirmButtonText: "Volver",
        confirmButtonColor: "#335d90",
      });
    }
    onSearch(state);
    setState("");
  }
  return (
    <> <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar...."
              inputProps={{ "aria-label": "search" }}
              onChange={handlechange}
              value={state}
            />
          </Search>
          <IconButton
            onClick={handleclick}
            size="large"
            aria-label="search"
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
  </>              
  );
}



// const DivRight = styled.div`
