import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import { useDispatch } from "react-redux";
import { setDashboardMenu } from "../../actions";

export default function TypographyMenu() {
  const dispatch = useDispatch<any>();

  function handleChange(e: String) {
    dispatch(setDashboardMenu(e));
  }

  return (
    <Paper sx={{ width: 230 }}>
      <MenuList>
        <MenuItem onClick={() => handleChange("products")}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Products</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleChange("categories")}>
          <ListItemIcon>
            <PriorityHighIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Categories</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleChange("users")}>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Users
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleChange("orders")}>
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
