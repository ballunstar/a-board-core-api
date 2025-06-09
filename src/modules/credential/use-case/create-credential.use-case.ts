import { BadGatewayException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CredentialEntity } from '../entities/credential.entity';

@Injectable()
export class CreateCredentialUseCase {
  constructor(private readonly dataSource: DataSource) {}

  public async execute() {
    if (process.env.NODE_ENV === 'jest') {
      const mockCredential = new CredentialEntity();
      mockCredential.token = 'mock-token';
      mockCredential.enabled = true;
      await this.dataSource.manager.save(mockCredential);
    } else {
      throw new BadGatewayException('This service is not available in this environment');
    }
  }
}
