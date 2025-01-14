import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  dni: yup
    .string()
    .required("El DNI es obligatorio")
    .matches(/^[0-9]{7,8}$/, "El DNI debe ser un número de 7 u 8 dígitos"),
  name: yup.string().required("El nombre es obligatorio"),
  surname: yup.string().required("El apellido es obligatorio"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[0-9]/, "La contraseña debe tener al menos un número")
    .matches(/[a-zA-Z]/, "La contraseña debe tener al menos una letra")
    .matches(/[\W_]/, "La contraseña debe tener al menos un símbolo especial"),
  confirmPassword: yup
    .string()
    .required("Confirmar la contraseña es obligatorio")
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
});