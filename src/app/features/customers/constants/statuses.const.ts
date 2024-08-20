import { StatusDesign } from '../../../shared/enums/status-label-design.enum';
import { StatusOption } from '../../../shared/interfaces/status-option.interface';

export const CUSTOMER_STATUSES: StatusOption[] = [
  {
    label: 'Active',
    currentState: 'active',
    design: StatusDesign.green,
  },
  {
    label: 'In-Active',
    currentState: 'inActive',
    design: StatusDesign.secondary,
  },
];
