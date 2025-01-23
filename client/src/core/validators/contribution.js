import * as yup from "yup";

export const contributionValidationSchema = (goal) =>
  yup.object().shape({
    amount: yup
      .string()
      .matches(
        /^\d+([.,]\d{1,2})?$/,
        "El monto debe ser un número válido, usando coma o punto para separar los decimales."
      )
      .required("El monto es obligatorio.")
      .test("is-positive", "El monto debe ser un número positivo.", (value) => {
        const numericValue = parseFloat(
          value.replace(/[^\d.,]/g, "").replace(",", ".")
        );
        return numericValue > 0;
      })
      .test(
        "is-below-desired-amount",
        `El monto total no puede exceder ${goal.desiredAmount}`,
        (value) => {
          const contributionAmount = parseFloat(
            value.replace(/[^\d.,]/g, "").replace(",", ".")
          );
          const currentTotal = goal.contributions.reduce(
            (sum, contribution) => sum + contribution.amount,
            0
          );
          return contributionAmount + currentTotal <= goal.desiredAmount;
        }
      ),
  });
