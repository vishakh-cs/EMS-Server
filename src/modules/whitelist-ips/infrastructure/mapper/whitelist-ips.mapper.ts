import { WhitelistIpsResponseDTO } from "../../domain/dto/whitelist-ipsResponse.dto";
import { WhitelistIps } from "../../domain/entities/whitelist-ips.entity";

export const toDomain = (data: any): WhitelistIpsResponseDTO => {
  return {
    id: data._id?.toString() || data.id,
    organizationUID: data.organizationUID,
    whitelist_ips: data.whitelist_ips,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
};
