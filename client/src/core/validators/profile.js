import * as yup from "yup";

export const profileValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .matches(
      /^[a-zA-ZñÑáéíóúÁÉÍÓÚ¨\-. ]+$/,
      "El nombre solo puede contener letras, acentos, espacios y los símbolos, - y ."
    ),
  dni: yup
    .string()
    .required("El DNI es obligatorio")
    .matches(/^[0-9]{7,8}$/, "El DNI debe ser un número de 7 u 8 dígitos."),
  phone: yup
    .string()
    .required("El teléfono es obligatorio.")
    .matches(
      /^\+?[0-9]{7,15}$/,
      "El teléfono debe contener entre 7 y 15 dígitos y puede incluir un prefijo opcional con '+'."
    ),
  email: yup
    .string()
    .required("El correo electrónico es obligatorio.")
    .email("Debes ingresar un correo válido."),
  address: yup
    .string()
    .required("La dirección es obligatoria.")
    .min(5, "La dirección debe tener al menos 5 caracteres."),
});
