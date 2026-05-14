import { WhitelistIps } from "../../domain/entities/whitelist-ips.entity";
import { WhitelistIpsRepository } from "../../domain/interfaces/whitelist-ips.repository";
import { WhitelistIpsResponseDTO } from "../../domain/dto/whitelist-ipsResponse.dto";
import { toDomain } from "../mapper/whitelist-ips.mapper";
import model from "../models/WhitelistIps";
export class MongoWhitelistIpsRepository implements WhitelistIpsRepository {
  async createOrUpdate(item: WhitelistIps): Promise<WhitelistIpsResponseDTO> {
    const { organizationUID, whitelist_ips } = item;

    let whitelist = await model.findOne({ organizationUID });

    if (!whitelist) {
      whitelist = new model({ organizationUID, whitelist_ips });
    } else {
      whitelist.whitelist_ips = [...new Set([...whitelist.whitelist_ips, ...whitelist_ips])];
    }

    await whitelist.save();
    return toDomain(whitelist);
  }

  async findByOrgID(orgID: string): Promise<WhitelistIpsResponseDTO | null> {
    const whitelist = await model.findOne({ organizationUID: orgID });
    if (!whitelist) {
      return null
    }
    return toDomain(whitelist);
  }
}
