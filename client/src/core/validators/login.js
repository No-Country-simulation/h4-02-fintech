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
    .required("La nueva contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[0-9]/, "La contraseña debe tener al menos un número")
    .matches(/[a-zA-Z]/, "La contraseña debe tener al menos una letra")
    .matches(/[\W_]/, "La contraseña debe tener al menos un símbolo especial"),
  confirmPassword: Yup.string()
    .required("Confirmar la contraseña es obligatorio")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
});
