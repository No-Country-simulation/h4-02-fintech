import * as yup from "yup";

export const goalValidationSchema = yup.object().shape({
  goalName: yup
    .string()
    .required("El nombre del objetivo es obligatorio.")
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(50, "El nombre no puede exceder los 50 caracteres."),

  category: yup
    .string()
    .required("La categoría es obligatoria.")
    .oneOf(
      ["vacaciones", "retiro", "bienes", "proyecto", "otros"],
      "Seleccione una categoría válida."
    ),

  desiredAmount: yup
    .number()
    .typeError("El monto deseado debe ser un número.")
    .required("El monto deseado es obligatorio.")
    .positive("El monto debe ser un número positivo.")
    .min(1, "El monto debe ser al menos 1."),

  deadline: yup.date().required("La fecha límite es obligatoria."),
});
