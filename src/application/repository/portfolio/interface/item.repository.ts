import { UUID } from "crypto";
import { Item } from "src/application/model/item.model";

export type ItemRepository = {
  /**
   * 사용자의 아이템 목록을 조회
   * @param userId 사용자 ID
   * @returns 아이템 목록
   */
  getAll: (userId: UUID) => Promise<Item.Entity[]>;

  /**
   * 아이템을 생성
   * @param req 아이템 생성 정보
   * @returns 생성된 아이템 정보
   */
  create: (req: Item.Req.Create) => Promise<Item.Entity>;

  /**
   * 아이템을 업데이트
   * @param req 아이템 업데이트 정보
   * @returns 업데이트된 아이템 정보
   */
  update: (req: Item.Req.Update) => Promise<Item.Entity>;

  /**
   * 아이템을 삭제
   * @param itemId 삭제할 아이템 ID
   * @returns 없음
   */
  delete: (itemId: number) => Promise<void>;
};
