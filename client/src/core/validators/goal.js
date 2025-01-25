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
    .string()
    .matches(
      /^\d+([.,]\d{1,2})?$/,
      "El monto debe ser un número válido, usando coma o punto para separar los decimales."
    )
    .required("El monto deseado es obligatorio.")
    .test("is-positive", "El monto debe ser un número positivo.", (value) => {
      const numericValue = parseFloat(
        value.replace(/[^\d.,]/g, "").replace(",", ".")
      );
      return numericValue > 0;
    }),

  deadline: yup
    .date()
    .typeError("La fecha no es válida.")
    .required("La fecha es obligatoria.")
    .min(
      new Date().toISOString().split("T")[0],
      "La fecha debe ser hoy o en el futuro."
    ),
});
