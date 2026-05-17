import { UUID } from "crypto";
import { Category } from "src/application/model/category.model";

export type CategoryRepository = {
  /**
   * 사용자의 카테고리 목록을 조회
   * @param userId 사용자 ID
   * @returns 카테고리 목록
   */
  getAll: (userId: UUID) => Promise<Category.Entity[]>;

  /**
   * 카테고리를 조회
   * @param categoryId 카테고리 ID
   * @returns 카테고리 정보 또는 null
   */
  get: (categoryId: number) => Promise<Category.Entity | null>;

  /**
   * 카테고리를 생성
   * @param req 카테고리 생성 정보
   * @returns 생성된 카테고리 정보
   */
  create: (req: Category.Req.Create) => Promise<Category.Entity>;

  /**
   * 카테고리를 업데이트
   * @param req 카테고리 업데이트 정보
   * @returns 업데이트된 카테고리 정보
   */
  update: (req: Category.Req.Update) => Promise<Category.Entity>;

  /**
   * 카테고리를 삭제
   * @param categoryId 삭제할 카테고리 ID
   * @returns 없음
   */
  delete: (categoryId: number) => Promise<void>;
};
