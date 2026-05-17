import { Portfolio } from "src/application/model/portfolio.model";

const PORTION_TOTAL = 1;
const PORTION_TOLERANCE = 1e-5;

export const evaluatePortfolio = (
  portfolio: Portfolio.Res.Root,
): Portfolio.Res.Status => {
  const totalPortion = portfolio.categories.reduce(
    (categorySum, category) =>
      categorySum +
      category.items.reduce((itemSum, item) => itemSum + item.portion, 0),
    0,
  );

  if (Math.abs(totalPortion - PORTION_TOTAL) < PORTION_TOLERANCE) {
    return "STABLE";
  }

  if (totalPortion > PORTION_TOTAL) {
    return "OVER_ALLOCATED";
  }

  return "PENDING";
};
