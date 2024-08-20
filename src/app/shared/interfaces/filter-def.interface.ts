import { NumbersRange } from './numbers-range.interface';
import { SelectSettings } from './select-settings.interface';

export interface FilterDef {
  label: string;
  formControlName: string;
  type: 'select' | 'range';
  selectParams?: {
    options: any[];
    settings: SelectSettings;
    selectedValue?: any;
  };
  initRange?: NumbersRange;
}
