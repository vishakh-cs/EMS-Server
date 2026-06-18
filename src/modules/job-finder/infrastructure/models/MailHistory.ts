import { model, Schema, Document } from "mongoose";

export interface IMailHistory extends Document {
  to: string;
  subject: string;
  mail_content: string;
  status: "Success" | "Failed";
  errorLog?: string;
  employeeId?: string;
  hasAttachment: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MailHistorySchema = new Schema<IMailHistory>(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    mail_content: { type: String, required: true },
    status: { type: String, enum: ["Success", "Failed"], default: "Success" },
    errorLog: { type: String },
    employeeId: { type: String },
    hasAttachment: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MailHistoryModel = model<IMailHistory>("MailHistory", MailHistorySchema);

export default MailHistoryModel;
