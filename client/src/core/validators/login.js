import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Debe ser un correo válido")
    .required("El correo es obligatorio"),
});

export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[0-9]/, "La contraseña debe tener al menos un número")
    .matches(
      /[a-zA-ZñÑáéíóúÁÉÍÓÚ]/,
      "La contraseña debe tener al menos una letra"
    )
    .matches(
      /[^\wÑñáéíóúÁÉÍÓÚ\s]/,
      "La contraseña debe tener al menos un símbolo especial"
    ),
  confirmPassword: Yup.string()
    .required("Confirmar la contraseña es obligatorio")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
});

export const passwordValidations = [
  {
    key: "minLength",
    message: "Debe tener al menos 8 caracteres",
    regex: /.{8,}/,
  },
  { key: "number", message: "Debe incluir al menos un número", regex: /[0-9]/ },
  {
    key: "letter",
    message: "Debe incluir al menos una letra",
    regex: /[a-zA-ZñÑáéíóúÁÉÍÓÚ]/,
  },
  {
    key: "specialChar",
    message: "Debe incluir al menos un símbolo especial",
    regex: /[^\wÑñáéíóúÁÉÍÓÚ\s]/,
  },
];
