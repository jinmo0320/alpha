export namespace Survey {
  export type Question = {
    title: string;
    answers: [string, string, string, string];
  };
}

export type SurveyDto = {
  title: string;
  answers: [string, string, string, string];
};
