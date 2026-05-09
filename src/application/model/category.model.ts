export namespace Category {
  export type Entity = {
    id: number;
    code: string;
    name: string;
    description: string;
  };

  export namespace Res {
    export type Root = Entity;
  }

  export namespace Req {
    export type Create = {
      userId: string;
      name: string;
      description?: string;
    };

    export type Update = {
      categoryId: number;
      name?: string;
      description?: string;
    };
  }
}
