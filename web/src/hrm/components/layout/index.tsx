import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerHeader } from "./drawerHeader.ts";
import MiniDrawer from "./drawer.tsx";
import { Outlet } from "react-router-dom";
import { IconButton, SwipeableDrawer } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"
import MuiAppBar from "@mui/material/AppBar";


type Anchor = 'left';

const AppBar = styled(MuiAppBar,
  {
    shouldForwardProp: (prop) => prop !== "open",
  },
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

export default function HrmLayout() {
  const theme = useTheme();
  const [state, setState] = React.useState({ left: false })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
      }
  const handleMenuIconClick = () => {
    setState((prevState) => ({ ...prevState, left: !prevState.left }));
  }

  return (
    <Box sx={{ flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMenuIconClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hr management
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <SwipeableDrawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          <Box
            role="presentation"
            onClick={toggleDrawer('left', false)}
          >
            <MiniDrawer />
          </Box>
        </SwipeableDrawer>
        <DrawerHeader theme={theme} />
        <Outlet />
      </Box>
    </Box>
  );
}
