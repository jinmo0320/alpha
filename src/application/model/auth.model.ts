import { User } from "./user.model";

export namespace Auth {
  // DTO Response and Request
  export namespace Res {
    export type Success = {
      accessToken: string;
      refreshToken: string;
      user: User.Res.Root;
    };

    export type SendCode = {
      email: string;
      createdAt: Date;
      expiredAt: Date;
    };

    export type Refresh = {
      accessToken: string;
      refreshToken: string;
    };
  }

  export namespace Req {
    export type Sign = {
      email: string;
      password: string;
    };

    export type Verify = {
      email: string;
      code: string;
    };

    export type ResetPassword = {
      email: string;
      newPassword: string;
    };
  }
}
