import { InjectionToken } from '@angular/core';
import { StatusOption } from '../interfaces/status-option.interface';

export const STATUSES_CONFIG = new InjectionToken<StatusOption[]>(
  'Configuration of statuses'
);
