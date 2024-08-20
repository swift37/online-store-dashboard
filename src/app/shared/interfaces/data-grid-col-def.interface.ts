import { SelectSettings } from './select-settings.interface';
import { StatusOption } from './status-option.interface';

export interface DataGridColumnDef {
  displayName: string;
  field: string;
  copied?: boolean;
  isStatusCol?: boolean;
  isImageCol?: boolean;
  statusColSettings?: {
    statuses: StatusOption[];
    editable: boolean;
  };
  filteredByOptions?: {
    options: any[];
    settings: SelectSettings;
  };
  filteredByRange?: boolean;
  filteredByDate?: boolean;
}
