export const ErrorsMap = {
  firstName: {
    required: "El nombre no puede estar vacio",
    maxLength: "Nombre hasta 40 carácteres",
    pattern: "Caracteres alfabéticos sólo",
  },
  lastName: {
    required: "Introduce tus apellidos",
    pattern: "Deben ser dos apellidos"
  },
  dni: {
    pattern: "Completa el DNI y no pongas - "
  },
  telephone: {
    pattern: "Debe de haber 9 dígitos"
  },
  email: {
    pattern: "Completa el email"
  }
}