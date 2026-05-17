import { UUID } from "crypto";

declare global {
  namespace Express {
    interface Request {
      userId?: UUID;
      projectId?: number;
    }
  }
}
