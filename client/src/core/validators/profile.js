import * as yup from "yup";

export const profileValidationSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio."),
  dni: yup
    .string()
    .required("El DNI es obligatorio")
    .matches(/^[0-9]{7,8}$/, "El DNI debe ser un número de 7 u 8 dígitos"),
  phone: yup
    .string()
    .required("El teléfono es obligatorio.")
    .matches(
      /^\+\d{1,3}\s\d{4}\s\d{4}$/,
      "El teléfono debe tener el formato +99 9999 9999."
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
