import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CheckRoleIsUsedUseCase {
  constructor(private readonly dataSource: DataSource) {}

  public async execute(roleId: number): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      // Check if the roleId is used in ProjectRoleEntity
      const isUsedInProjectRole = await queryRunner.query(`SELECT COUNT(*) AS count FROM project_roles WHERE role_id = ?`, [roleId]);

      // Check if the roleId is used in RoleUserProjectEntity
      const isUsedInRoleUserProject = await queryRunner.query(`SELECT COUNT(*) AS count FROM role_user_project WHERE role_id = ?`, [roleId]);

      // Check if the roleId is used in ProjectChecklistItemInspectionEntity
      const isUsedInChecklistItemInspection = await queryRunner.query(`SELECT COUNT(*) AS count FROM project_checklist_item_inspections WHERE role_id = ?`, [
        roleId,
      ]);

      // Determine if the role is used
      return Number(isUsedInProjectRole[0].count) > 0 || Number(isUsedInRoleUserProject[0].count) > 0 || Number(isUsedInChecklistItemInspection[0].count) > 0;
    } catch (error) {
      console.error('Error checking if role is used:', error);
      throw new Error('Failed to check role usage');
    } finally {
      await queryRunner.release();
    }
  }
}
