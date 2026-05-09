import { UUID } from "crypto";
import { Project } from "src/application/model/project.model";

export type ProjectRepository = {
  /**
   * 프로젝트 생성
   * @param req 프로젝트 생성 요청 객체(유저 ID, 프로젝트 이름)
   * @returns 프로젝트
   */
  createProject: (req: Project.Req.Create) => Promise<Project.Entity>;

  /**
   * 유저가 가진 프로젝트 목록 조회
   * @param userId 유저 ID
   * @returns 프로젝트 목록
   */
  getProjectList: (userId: UUID) => Promise<Project.Entity[]>;

  /**
   * 프로젝트 조회
   * @param projectId 프로젝트 ID
   * @returns 프로젝트 또는 null(프로젝트가 존재하지 않는 경우)
   */
  getProject: (projectId: number) => Promise<Project.Entity | null>;
};
