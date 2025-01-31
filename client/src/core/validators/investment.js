import * as Yup from "yup";

export const investmentSchema = Yup.object().shape({
  quantity: Yup.number()
    .typeError("La cantidad debe ser un número válido")
    .integer("La cantidad debe ser un número entero")
    .positive("La cantidad debe ser mayor a 0")
    .required("La cantidad es obligatoria"),
});
