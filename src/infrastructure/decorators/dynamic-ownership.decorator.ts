import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { get } from 'lodash';

export function CheckOwnership(
  serviceName: string, // The name of the service property in the controller
  itemServiceMethod: string,
  entityUrlParamIdParameterIndex: number,
  entityOwnerUrlParamIdParameterIndex: number,
  entityOwnerFieldId: string,
): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const entityId = args[entityUrlParamIdParameterIndex] || 0;
      const ownerId = args[entityOwnerUrlParamIdParameterIndex] || 0;

      if (!entityId || !ownerId) throw new BadRequestException(`entityId = ${entityId} or ownerId = ${ownerId} is invalid.`);

      const itemService = this[serviceName];

      if (!itemService) throw new BadRequestException(`No service name '${serviceName}' inside a provided controller.`);

      // Retrieve the service methods dynamically
      const findItemMethod = itemService[itemServiceMethod];
      if (typeof findItemMethod !== 'function') {
        throw new Error(`Provided service method "${String(itemServiceMethod)}" is not a function.`);
      }

      // Fetch the item
      const item = await findItemMethod.call(itemService, entityId);
      if (!item) {
        throw new ForbiddenException(`entity id = ${entityId} not found.`);
      }

      // Validate ownership
      if (String(get(item, entityOwnerFieldId)) !== String(ownerId)) {
        throw new ForbiddenException(`entity id = ${entityId} does not belong to owner id = ${ownerId}.`);
      }

      // Proceed with the original method
      return originalMethod.apply(this, args);
    };
  };
}
