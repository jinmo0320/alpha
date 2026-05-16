import { UUID } from "crypto";
import { Project } from "src/application/model/project.model";

export type ProjectRepository = {
  /**
   * 프로젝트를 생성
   * @param req 프로젝트 생성 정보
   * @returns 생성된 프로젝트 정보
   */
  create: (req: Project.Req.Create) => Promise<Project.Entity>;

  /**
   * 사용자의 프로젝트 목록을 조회
   * @param userId 사용자 ID
   * @returns 프로젝트 목록
   */
  getAll: (userId: UUID) => Promise<Project.Entity[]>;

  /**
   * 프로젝트를 조회
   * @param projectId 프로젝트 ID
   * @returns 프로젝트 정보 또는 null
   */
  get: (projectId: number) => Promise<Project.Entity | null>;

  /**
   * 사용자가 해당 프로젝트를 가지고 있는지 확인
   * @param userId 사용자 ID
   * @param projectId 프로젝트 ID
   * @returns 프로젝트 소유 여부
   */
  hasProject: (userId: UUID, projectId: number) => Promise<boolean>;
};
