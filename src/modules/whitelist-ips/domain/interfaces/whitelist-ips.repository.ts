import { WhitelistIps } from "../entities/whitelist-ips.entity";
import { WhitelistIpsResponseDTO } from "../dto/whitelist-ipsResponse.dto";

export interface WhitelistIpsRepository {
  createOrUpdate(item: WhitelistIps): Promise<WhitelistIpsResponseDTO>;
  findByOrgID(orgID: string): Promise<WhitelistIpsResponseDTO | null>;
}
