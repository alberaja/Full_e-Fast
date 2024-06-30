const fuelTypes = [
    {
      value: "BEV",
      valueHuman: "100% Eléctrico"
    },
    {
      value: "PHEV",
      valueHuman: "Híbrido Enchufable"
    },
    {
      value: "SHEV",
      valueHuman: "Híbrido Puro"
    },
    {
      value: "HEV",
      valueHuman: "Híbrido No Enchufable"
    },
    {
      value: "MHEV",
      valueHuman: "Híbrido Ligero"
    }
  ];
  
  const carTypes = [
    {
      value: "Coche"
    },
    {
      value: "Moto"
    },
    {
      value:"Elefante"
    }, 
    
  ];
  const uniqueCities = ["Zaragoza", "Barcelona", "Madrid", "Valencia"]


  const brandTypes = [
    {
      value: "BMW", 
      quantity:1
    },
    {
      value: "Tesla", 
      quantity:2
    },
    {
        value: "Toyota", 
        quantity:3
      }
    ,
    {
        value: "Mazda", 
        quantity:4
      },
      {
        value: "Nissan", 
        quantity:5
      }
  ];
  
  const data = {
    FuelTypes: fuelTypes,
    CarTypes: carTypes, 
    brandTypes: brandTypes,
    uniqueCities: uniqueCities
  };

 

  export default data