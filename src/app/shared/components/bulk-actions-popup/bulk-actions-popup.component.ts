import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BulkActionDef } from '../../interfaces/bulk-action-def.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bulk-actions-popup',
  templateUrl: './bulk-actions-popup.component.html',
  styleUrl: './bulk-actions-popup.component.scss',
})
export class BulkActionsPopupComponent {
  @Input({ required: true })
  public actionDefs: BulkActionDef[] = [];

  public actionsForm!: FormGroup;

  @Output() actionsApplied = new EventEmitter<any>();

  public onApply(): void {
    const formValue = this.actionsForm.value;
    for (const [key, value] of Object.entries(formValue)) {
      if (Array.isArray(value)) {
        formValue[key] = value.toString();
      }
    }

    this.actionsApplied.emit(this.actionsForm.value);
  }

  private initForm() {
    const controls: any = {};
    this.actionDefs.forEach(
      (def) => (controls[def.field] = new FormControl(null))
    );
    this.actionsForm = new FormGroup(controls);
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.initForm();
  }

  //---------- Lifecycle methods end ----------
}
