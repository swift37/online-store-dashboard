import { EventEmitter } from '@angular/core';

export interface ModalBase {
  canceled: EventEmitter<any>;
  submitted: EventEmitter<any>;
}
