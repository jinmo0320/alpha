export namespace Item {
  export type Entity = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    minReturn: number;
    maxReturn: number;
  };

  export namespace Res {
    export type Root = Entity;
  }

  export namespace Req {
    export type Available = {
      portfolioId: number;
      categoryId: number;
    };

    export type Create = {
      userId: string;
      categoryId: number;
      name: string;
      description?: string;
      minReturn: number;
      maxReturn: number;
    };

    export type Update = {
      itemId: number;
      categoryId?: number;
      name?: string;
      description?: string;
      minReturn?: number;
      maxReturn?: number;
    };
  }
}
