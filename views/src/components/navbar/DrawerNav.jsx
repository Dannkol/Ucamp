import React, {useState} from "react";
import Drawer from "@mui/material/Drawer";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import {IconButton} from "@mui/material";
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';


import { Link } from "react-router-dom";

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
         <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/"> <Typography>Home</Typography> </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon style={ { backgroundColor : 'white' } } />
      </IconButton>
    </>
  );
}
export default DrawerComponent;






