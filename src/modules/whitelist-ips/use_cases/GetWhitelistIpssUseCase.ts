import { WhitelistIpsResponseDTO } from "../domain/dto/whitelist-ipsResponse.dto";
import { WhitelistIpsRepository } from "../domain/interfaces/whitelist-ips.repository";

export class GetWhitelistIpsUseCase {
  constructor(private readonly repository: WhitelistIpsRepository) {}

  async execute(orgID: string): Promise<WhitelistIpsResponseDTO | null> {
    return this.repository.findByOrgID(orgID);
  }
}
