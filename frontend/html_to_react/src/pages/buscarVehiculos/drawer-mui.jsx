import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuFiltroscheckboxDinamicos from "../../components/filters/menufiltros-checkbox-dinamicos";

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

export default function PersistentDrawerLeft({ params, updateSearchParams , results}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  
  // console.log({params, updateSearchParams, results})  

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


  return (
    // <Box sx={{ display: "flex" }}>
    <Box sx={{ display: "flex" }} style={{ position: "relative", zIndex: 9 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        
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
              display: { /*xs: "none",*/ md: "block" }  // mostrar menu de filtros solo a partir de pantalla mediana
              

            }}        
            variant="persistent" //</Box>"temporary"//"persistent"   //comentar para ver fondo en negro/black, y Drawer por encima de todo
            // anchor="left"
            classes="bg-red-400"
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

        
              {/* results: para actualizar valores de los aggregates, y TODO: de qué valores mostrar en los checkbox dinamicos */}
            {/* <MenuFiltros childrenFiltros={childrenFiltros} checkedLists={checked}  handleChange1={handleChange1} params={params} updateSearchParams={updateSearchParams} results={results}/> */}
            <MenuFiltroscheckboxDinamicos checkedLists={checked}  handleChange1={handleChange1} params={params} updateSearchParams={updateSearchParams} results={results}/> 
            

                {/* Filtrador de Marcas */}
                {/* <BrandSelect results={results} onChange={(e) => HandleCheckboxChangeModoJS(e, setQueryParamsState)}  /> */}
            
            {/* aplicar Menu de filtros sea responsive */}
            <div className="bg-red-400 w-screen md:w-auto ">
            </div>
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
       
      </Main>
    </Box>
  );
}
