import { StatusDesign } from '../../../shared/enums/status-label-design.enum';
import { StatusOption } from '../../../shared/interfaces/status-option.interface';

export const INVENTORY_STATES: StatusOption[] = [
  {
    label: 'Preview',
    currentState: 'preview',
    design: StatusDesign.primary,
  },
  {
    label: 'Available',
    currentState: 'Available',
    design: StatusDesign.green,
  },
  {
    label: 'Unavailable',
    currentState: 'unavailable',
    design: StatusDesign.danger,
  },
];
