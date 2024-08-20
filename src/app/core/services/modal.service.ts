import { ModalBase } from '../../shared/interfaces/modal-base.interface';
import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Inject,
  Injectable,
  Type,
  createComponent,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalContainerComponent } from '../../shared/components/modal-container/modal-container.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalRef!: ComponentRef<ModalContainerComponent>;
  private modalNotifier?: Subject<any>;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public openModal<T extends ModalBase>(
    component: Type<T>,
    options?: { title?: string }
  ): Observable<any> {
    // create the desired component, the content of the modal box
    const newComponent: ComponentRef<T> = createComponent(component, {
      environmentInjector: this.injector,
    });
    // create the modal component and project the instance of the desired component in the ng-content
    this.modalRef = createComponent(ModalContainerComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    newComponent.instance.canceled.subscribe(() =>
      this.modalRef.instance.triggerOutAnimation()
    );
    newComponent.instance.submitted.subscribe((value) =>
      this.submitModal(value)
    );

    this.modalRef.instance.title = options?.title;
    this.modalRef.instance.closed.subscribe(() => this.closeModal());
    this.modalRef.hostView.detectChanges();

    this.document.body.appendChild(this.modalRef.location.nativeElement);

    // Attach views to the changeDetection cycle
    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.modalRef.hostView);

    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  private closeModal(): void {
    this.modalNotifier?.complete();
    this.modalRef.destroy();
  }

  private submitModal(value: any): void {
    this.modalNotifier?.next(value);
    this.closeModal();
  }
}
