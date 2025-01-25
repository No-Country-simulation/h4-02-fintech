import * as yup from "yup";

export const transactionValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede tener más de 100 caracteres"),

  amount: yup
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

  date: yup
    .date()
    .typeError("La fecha no es válida.")
    .required("La fecha es obligatoria.")
    .min(
      new Date().toISOString().split("T")[0],
      "La fecha debe ser hoy o en el futuro."
    ),
});
