import { UUID } from "crypto";
import { Item } from "src/application/model/item.model";

export type ItemRepository = {
  /**
   * 사용자가 소유한 모든 아이템을 반환
   * @param userId 사용자 ID
   * @return 아이템 리스트
   */
  getAll: (userId: UUID) => Promise<Item.Entity[]>;

  /**
   * 새로운 아이템을 생성
   * @param req 아이템 생성에 필요한 정보 (사용자 ID, 카테고리 ID, 이름, 설명, 기대 수익률 범위)
   * @return 생성된 아이템 정보
   */
  create: (req: Item.Req.Create) => Promise<Item.Entity>;

  /**
   * 기존 아이템을 업데이트
   * @param req 업데이트할 아이템 정보 (아이템 ID, 이름, 설명, 기대 수익률 범위, 카테고리 ID)
   * @return 업데이트된 아이템 정보
   */
  update: (req: Item.Req.Update) => Promise<Item.Entity>;

  /**
   * 아이템을 삭제
   * @param itemId 삭제할 아이템 ID
   */
  delete: (itemId: number) => Promise<void>;
};
