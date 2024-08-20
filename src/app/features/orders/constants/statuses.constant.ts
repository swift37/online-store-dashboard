import { StatusDesign } from '../../../shared/enums/status-label-design.enum';
import { StatusOption } from '../../../shared/interfaces/status-option.interface';

export const ORDER_STATUSES: StatusOption[] = [
  {
    label: 'Completed',
    currentState: 'completed',
    design: StatusDesign.green,
  },
  {
    label: 'Pending',
    currentState: 'pending',
    design: StatusDesign.secondary,
  },
  {
    label: 'In-Progress',
    currentState: 'inProgress',
    design: StatusDesign.primary,
  },
  {
    label: 'Canceled',
    currentState: 'canceled',
    design: StatusDesign.danger,
  },
  {
    label: 'Returned',
    currentState: 'returned',
    design: StatusDesign.danger,
  },
  {
    label: 'Damaged',
    currentState: 'damaged',
    design: StatusDesign.danger,
  },
];
