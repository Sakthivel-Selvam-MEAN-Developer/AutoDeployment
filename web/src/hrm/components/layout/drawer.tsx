// import IconButton from "@mui/material/IconButton";
import { Dashboard, ChevronRight, ChevronLeft, Article, Badge, ThreeP } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
// import { DrawerHeader } from "./drawerHeader.ts";
import PropTypes from "prop-types";
import DrawerListItem from "./drawerListItem.tsx";

interface MiniDrawerProps {
  handleDrawerClose: () => void;
  drawerState: boolean;
}
const drawerWidth = 240;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const MiniDrawer = ({ handleDrawerClose, drawerState }: MiniDrawerProps) => {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={drawerState} anchor="bottom" >
      {/* <DrawerHeader theme={theme}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader> */}
      <Divider />
      <List>
        <DrawerListItem
          text="Dashboard"
          navigate="/hrm"
          drawerState={drawerState}
          index={0}
          icon={<Dashboard />}
        />
        <DrawerListItem
          text="Employee Form"
          navigate="/hrm/form"
          drawerState={drawerState}
          index={1}
          icon={<Article />}
        />
         <DrawerListItem
          text="Manager Form"
          navigate="/hrm/manager"
          drawerState={drawerState}
          index={2}
          icon={<Badge />}
        />
        <DrawerListItem
          text="Employee Form"
          navigate="/hrm/employee"
          drawerState={drawerState}
          index={3}
          icon={<ThreeP />}
        />
      </List>
    </Drawer>
  );
};

MiniDrawer.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
  drawerState: PropTypes.bool,
};

export default MiniDrawer;
