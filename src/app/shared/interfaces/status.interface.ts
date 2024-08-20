import { StatusDesign } from '../enums/status-label-design.enum';

export interface Status {
  currentState: string;
  design: StatusDesign;
}
