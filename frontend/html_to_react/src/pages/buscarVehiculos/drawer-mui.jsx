import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
// iconos
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EvStationTwoToneIcon from "@mui/icons-material/EvStationTwoTone";
import Buscador1 from "./cars-resultados";
import MenuFiltros from "../../components/filters";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = React.useState([true, false]);
  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };
  const childrenFiltros = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        // label="Child 1"
        // label="BEV"
        label={
          <>
            BEV
            <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"105px"}>
              (1)
            </Typography>
          </>
        }
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        // label="Child 2" 
        // label="PHEV"
        label={
          <>
            PHEV
            <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"95px"}>
              (2)
            </Typography>
          </>
        }
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        // label="SHEV"
        label={
          <>
            SHEV
            <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"95px"}>
              (1)
            </Typography>
          </>
        }
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        // label="HEV"
        label={
          <>
            HEV
            <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"105px"}>
              (0)
            </Typography>
          </>
        }
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        // label="MHEV"
        label={
          <>
            MHEV
            <Typography variant="body3" /*component="span" /*color="textSecondary"*/ marginLeft={"90px"}>
              (0)
            </Typography>
          </>
        }
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  // checkboxs de MUI
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

 

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        {/* <Toolbar> */}
            {/* style={{ backgroundColor: "red" }}       aja:  color azul por defecto */}
          {/* <Button
            color="success" //"inherit"
            style={{ backgroundColor: "red" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            {/* <MenuIcon /> 
            Todos los filtros
          </Button> */}

          {/* <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography> */}
        {/* </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          // "& .MuiDrawer-paper": {
          //   width: drawerWidth,
          //   boxSizing: "border-box",
          // },          
          position: "sticky",
          mt: "3",
          display: { xs: "none", md: "block" }  // mostrar menu de filtros solo a partir de pantalla mediana
        }}        
        variant="persistent"   //comentar para ver fondo en negro/black, y Drawer por encima de todo
        // anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{marginTop: "40%"}} >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider /> */}
        {/* <div>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />

                  <div>
                    <input
                      type="checkbox"
                      checked={checkedItems[text]}
                      onChange={() => handleCheckboxChange(text)}
                    />
                    <input
                      type="checkbox"
                      checked={!checkedItems[text]}
                      onChange={() => handleCheckboxChange(text)}
                    />
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </div> */}

      {/* width: min-content; */}
        <MenuFiltros childrenFiltros={childrenFiltros} checkedLists={checked}  handleChange1={handleChange1}/>
        {/* <List /*style={{ background: "red" }}     */   /*>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      {/* aja: style del boton */}
      <Main open={open} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
      <Button
            color="success" //"inherit"
            className="boton__contáctanos" 
            style={{backgroundColor: "greenyellow"}}      //style={{ backgroundColor: "red" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" /*, backgroundColor: "red"*/  }) }}
          >
            {/* <MenuIcon /> */}
            Todos los filtros
          </Button>
        <DrawerHeader />       
       {/* Este codigo si se desplaza a la derecha al expandir el Drawer */}
        {/* <Typography paragraph>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus.  
           <Buscador1></Buscador1> 
        </Typography>  */}
        {/*<Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Main>
    </Box>
  );
}
