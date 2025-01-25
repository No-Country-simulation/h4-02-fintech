export const validateAndTransformOnboardingData = (onboarding) => {
  if (!onboarding) return {};

  const {
    knowledgeLevel,
    goals,
    riskPreference,
    monthlyIncome,
    monthlyExpenses,
    savingsPercentage,
  } = onboarding;

  const transformedData = {};

  // Transformar y validar cada campo
  if (knowledgeLevel) {
    transformedData.knowledgeLevel = knowledgeLevel.toLowerCase();
  }

  if (goals && Array.isArray(goals)) {
    transformedData.goals = goals.map((goal) => goal.name).filter(Boolean);
  }

  if (riskPreference) {
    transformedData.riskPreference = riskPreference.toLowerCase();
  }

  if (monthlyIncome) {
    transformedData.monthlyIncome = monthlyIncome;
  }

  if (monthlyExpenses) {
    transformedData.monthlyExpenses = monthlyExpenses;
  }

  if (savingsPercentage !== null && savingsPercentage !== undefined) {
    transformedData.savingsPercentage = `${savingsPercentage}`;
  }

  return transformedData;
};
