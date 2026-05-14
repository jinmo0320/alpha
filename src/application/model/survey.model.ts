export namespace Survey {
  // DB Entity
  export type Entity = {
    title: string;
    answers: [string, string, string, string];
  };

  // DTO Response
  export namespace Res {
    export type Root = Entity;
  }
}
