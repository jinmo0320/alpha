import { UUID } from "crypto";
import { Category } from "src/application/model/category.model";

export type CategoryRepository = {
  /**
   * 사용자가 소유한 모든 카테고리를 반환
   * @param userId 사용자 ID
   */
  getAll: (userId: UUID) => Promise<Category.Entity[]>;

  /**
   * 새로운 카테고리를 생성
   * @param req 카테고리 생성에 필요한 정보 (사용자 ID, 이름, 설명)
   */
  create: (req: Category.Req.Create) => Promise<Category.Entity>;

  /**
   * 기존 카테고리를 업데이트
   * @param req 업데이트할 카테고리 정보 (카테고리 ID, 이름, 설명)
   */
  update: (req: Category.Req.Update) => Promise<Category.Entity>;

  /**
   * 카테고리를 삭제
   * @param categoryId 삭제할 카테고리 ID
   */
  delete: (categoryId: number) => Promise<void>;
};
