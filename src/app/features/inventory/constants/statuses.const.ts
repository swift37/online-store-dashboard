import { StatusDesign } from '../../../shared/enums/status-label-design.enum';
import { StatusOption } from '../../../shared/interfaces/status-option.interface';

export const INVENTORY_STATUSES: StatusOption[] = [
  {
    label: 'Published',
    currentState: 'published',
    design: StatusDesign.primary,
  },
  {
    label: 'Unpublished',
    currentState: 'unpublished',
    design: StatusDesign.secondary,
  },
  {
    label: 'Archived',
    currentState: 'archived',
    design: StatusDesign.secondary,
  },
];
