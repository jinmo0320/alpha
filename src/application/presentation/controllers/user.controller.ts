import { Request, Response } from "express";
import { UserService } from "../../service/user/user.service";

export const userController = (userService: UserService) => ({
  /* ================= 내 정보 조회 ================= */
  me: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const user = await userService.me(userId);
    res.status(200).json({
      success: true,
      message: "User information search successful",
      data: { user },
    });
  },

  /* ================= 비밀번호 변경 (로그인 상태) ================= */
  changePassword: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { oldPassword, newPassword } = req.body;
    await userService.changePassword({ userId, oldPassword, newPassword });
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  },

  /* ================= 투자 성향 평가 ================= */
  assessInvestmentRisk: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { score } = req.body;
    const riskType = await userService.setRiskType(userId, score);
    res.status(200).json({
      success: true,
      message: "Updated risk type.",
      data: { riskType },
    });
  },

  /* ================= 투자 성향 초기화 ================= */
  clearInvestmentRisk: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await userService.setRiskType(userId, null);
    res.status(200).json({ success: true, message: "Cleared risk type." });
  },
});
