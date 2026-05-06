export type ProjectDto = {
  id: number;
  name: string;
  status: "STABLE" | "PENDING" | "DISABLED";
  portfolioId: number;
  planId: number;
};
