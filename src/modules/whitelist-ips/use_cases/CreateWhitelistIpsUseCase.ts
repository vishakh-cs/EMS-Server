import { WhitelistIpsCreateDTO } from "../domain/dto/whitelist-ipsCreate.dto";
import { WhitelistIpsResponseDTO } from "../domain/dto/whitelist-ipsResponse.dto";
import { WhitelistIpsRepository } from "../domain/interfaces/whitelist-ips.repository";

export class CreateWhitelistIpsUseCase {
  constructor(private readonly repository: WhitelistIpsRepository) {}

  async execute(dto: WhitelistIpsCreateDTO): Promise<WhitelistIpsResponseDTO> {
    return this.repository.createOrUpdate(dto);
  }
}
