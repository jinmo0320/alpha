export type EmailSender = {
  sendMail: (email: string, code: string) => Promise<void>;
};
