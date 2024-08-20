import { SelectSettings } from './select-settings.interface';

export interface BulkActionDef {
  label: string;
  field: string;
  selectParams?: {
    options: any[];
    settings: SelectSettings;
  };
}
