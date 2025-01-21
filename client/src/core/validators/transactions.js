import * as yup from "yup";

export const transactionValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("El título es obligatorio.")
    .max(50, "El título no puede tener más de 50 caracteres."),

  amount: yup
    .number()
    .typeError("El importe debe ser un número válido.")
    .positive("El importe debe ser mayor a cero.")
    .required("El importe es obligatorio."),

  date: yup
    .date()
    .typeError("La fecha no es válida.")
    .required("La fecha es obligatoria.")
    .min(
      new Date().toISOString().split("T")[0],
      "La fecha debe ser hoy o en el futuro."
    ),
});
