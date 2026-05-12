import { model, Schema } from "mongoose";
import { AuthAdmin } from "../../domain/entities/auth-admin.entity";

const authAdminSchema = new Schema<AuthAdmin>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const AuthAdminModel = model<AuthAdmin>(
  "AuthAdmin",
  authAdminSchema
);

export default AuthAdminModel;