import { Inject, Injectable } from '@angular/core';
import { StatusDesign } from '../../shared/enums/status-label-design.enum';
import { StatusOption } from '../../shared/interfaces/status-option.interface';
import { STATUSES_CONFIG } from '../../shared/constants/statuses-config.constant';

@Injectable()
export class StatusesService {
  constructor(
    @Inject(STATUSES_CONFIG) private readonly config: StatusOption[]
  ) {}

  public getStatusLabel(status: string): string {
    const statusLabel = this.config?.find(
      (s) => s.currentState.toLowerCase() == status.toLowerCase()
    )?.label;

    if (statusLabel == undefined) {
      console.error(
        `[Statuses Service] The '${status}' status has not been found in the status list. Please check the status column definition.`
      );
    }

    return statusLabel || status;
  }

  public getStatusDesign(status: string): StatusDesign {
    const statusDesign = this.config.find(
      (s) => s.currentState.toLowerCase() == status.toLowerCase()
    )?.design;

    if (statusDesign == undefined) {
      console.error(
        `[Statuses Service] The '${status}' has not been found in the status list. Please check the status column definition.`
      );
      return StatusDesign.primary;
    }

    return statusDesign;
  }
}
