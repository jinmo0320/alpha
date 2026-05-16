import { UUID } from "crypto";
import { Project } from "src/application/model/project.model";

export type ProjectService = {
  /**
   * 프로젝트를 생성
   * @param info 사용자 ID, 프로젝트 이름
   * @returns 생성된 프로젝트 정보
   */
  createProject: (info: Project.Req.Create) => Promise<Project.Res.Abstract>;

  /**
   * 사용자의 프로젝트 목록을 조회
   * @param userId 사용자 ID
   * @returns 프로젝트 목록
   */
  getProjectList: (userId: UUID) => Promise<Project.Res.Abstract[]>;

  /**
   * 프로젝트 상세 정보를 조회
   * @param userId 사용자 ID
   * @param projectId 프로젝트 ID
   * @returns 프로젝트 상세 정보 또는 null
   */
  getProject: (userId: UUID, projectId: number) => Promise<Project.Res.Detail>;
};
