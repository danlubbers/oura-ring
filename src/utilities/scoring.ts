export const scoring = (score: number) => {
  if (score <= 100 && score >= 85) {
    return "Optimal";
  } else if (score < 85 && score >= 70) {
    return "Good";
  } else return "Pay Attention";
};
