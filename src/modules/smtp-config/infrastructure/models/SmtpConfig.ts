import { model, Schema } from "mongoose";
import { SmtpConfig } from "../../domain/entities/smtp-config.entity";

const smtoConfigSchema = new Schema<SmtpConfig>({
service_provider: { type: String, required: true },
smtp_host: { type: String, required: true },
smtp_port: { type: String, required: true },
is_secure_ssl: { type: Boolean, required: true },
smtp_username: { type: String, required: true },
smtp_password: { type: String, required: true },

}, { timestamps: true });

const SmtpConfigModel = model<SmtpConfig>("SmtpConfig", smtoConfigSchema);

export default SmtpConfigModel;