import { Schema, model } from "mongoose";
import { Organization } from "../../domain/entities/organization.entity";

const organizationSchema = new Schema<Organization>(
  {
    orgUID: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    registrationNumber: {
      type: String,
      trim: true,
    },
    establishedDate: {
      type: String,
    },
    industry: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrganizationModel = model<Organization>("Organization", organizationSchema);

export default OrganizationModel;
