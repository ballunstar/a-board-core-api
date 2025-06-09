import { Injectable } from '@nestjs/common';
import { CredentialRepository } from 'src/modules/credential/repositories/credential.repository';

@Injectable()
export class VerifyCredentialUseCase {
  constructor(private readonly credentialRepository: CredentialRepository) {}

  async execute(token: string): Promise<boolean> {
    if (!token) {
      return false;
    }
    const credential = await this.credentialRepository.findOne({
      where: { token },
    });

    if (!credential) {
      return false;
    }
    // Verify the username and password
    return true;
  }
}
