import React, { useState, useEffect } from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../reducer";
import { setDashboardMenu } from "../../actions";

export default function TypographyMenu() {
  const dispatch = useDispatch<any>();
  const [status, setStatus] = useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedIndexClient, setSelectedIndexClient] = React.useState(3);

  const rol = useSelector((state: ReduxState) => state.user.role);
  function handleChange(e: React.MouseEvent<HTMLElement>, index: number,itemMenu:string) {
      setSelectedIndex(index);
      setSelectedIndexClient(index);
      dispatch(setDashboardMenu(itemMenu));
  }

  useEffect(() => {
    dispatch(setDashboardMenu(rol === "ADMIN" ? "products" : "users"));
  }, [
    dispatch
  ]);

  return rol === "ADMIN" ? (
    <Paper sx={{ width: 230 }}>
      <MenuList>
        <MenuItem selected={1 === selectedIndex} onClick={(e) => handleChange(e, 1,"products")}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Productos</Typography>
        </MenuItem>
        <MenuItem selected={2 === selectedIndex}onClick={(e) => handleChange(e, 2, "categories")}>
          <ListItemIcon>
            <PriorityHighIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Categorias</Typography>
        </MenuItem>
        <MenuItem selected={3 === selectedIndex} onClick={(e) => handleChange(e, 3, "users")}>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Usuarios
          </Typography>
        </MenuItem>
        <MenuItem selected={4 === selectedIndex} onClick={(e) => handleChange(e, 4, "orders")}>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Ordenes
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  ) : (
      <Paper sx={{ width: 230 }}>
        <MenuItem selected={3 === selectedIndexClient} onClick={(e) => handleChange(e, 3, "users")}>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Usuarios
          </Typography>
        </MenuItem>
      <MenuList>
        <MenuItem selected={1 === selectedIndexClient} onClick={(e) => handleChange(e, 1, "orders")}>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Orders
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
