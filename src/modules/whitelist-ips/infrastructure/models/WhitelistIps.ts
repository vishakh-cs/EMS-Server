import mongoose, { model } from "mongoose";
import { WhitelistIps } from "../../domain/entities/whitelist-ips.entity";


const WhitelistIpsSchema = new mongoose.Schema<WhitelistIps>(
  {
    organizationUID: {
      type: String,
      required: true,
      unique: true,
    },
    whitelist_ips: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const whitelistIpsModel = model<WhitelistIps>("WhitelistIps", WhitelistIpsSchema);
export default whitelistIpsModel;