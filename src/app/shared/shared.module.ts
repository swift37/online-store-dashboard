import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { SvgIconService } from './services/svg-icon.service';
import { InputComponent } from './components/input/input.component';
import { ControlErrorsComponent } from './components/control-errors/control-errors.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { PasswordInputErrorsComponent } from './components/password-input-errors/password-input-errors.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ButtonComponent } from './components/button/button.component';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SelectComponent } from './components/select/select.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabComponent } from './components/tab/tab.component';
import { MiniButtonComponent } from './components/mini-button/mini-button.component';
import { StatusLabelComponent } from './components/status-label/status-label.component';
import { MiniSelectComponent } from './components/mini-select/mini-select.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { OrderLineComponent } from './components/order-line/order-line.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ShrinkNumberZerosPipe } from './pipes/shrink-number-zeros.pipe';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { FiltersPopupComponent } from './components/filters-popup/filters-popup.component';
import { DateFiltersPopupComponent } from './components/date-filters-popup/date-filters-popup.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { DateTimeService } from './services/date-time.service';
import { BulkActionsPopupComponent } from './components/bulk-actions-popup/bulk-actions-popup.component';
import { DataGridPaginationComponent } from './components/data-grid-pagination/data-grid-pagination.component';
import { DataGridControlsComponent } from './components/data-grid-controls/data-grid-controls.component';
import { CurrencyToNumberPipe } from './pipes/currency-to-number.pipe';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { OrderLineControlComponent } from './components/order-line-control/order-line-control.component';
import { SelectButtonComponent } from './components/select-button/select-button.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  imports: [CommonModule, ScrollingModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    SvgIconComponent,
    ShrinkNumberZerosPipe,
    CurrencyToNumberPipe,
    InputComponent,
    TextAreaComponent,
    PasswordInputComponent,
    SearchInputComponent,
    ButtonComponent,
    MiniButtonComponent,
    ToggleSwitchComponent,
    CheckboxComponent,
    RadioButtonComponent,
    SelectComponent,
    MiniSelectComponent,
    TabComponent,
    TabGroupComponent,
    StatusLabelComponent,
    SummaryCardComponent,
    InfoCardComponent,
    OrderLineComponent,
    OrderLineControlComponent,
    EmptyStateComponent,
    DataGridComponent,
    AddressFormComponent,
    ModalContainerComponent,
    SelectButtonComponent,
    LoadingSpinnerComponent,
  ],
  declarations: [
    SvgIconComponent,
    ControlErrorsComponent,
    PasswordInputErrorsComponent,
    ShrinkNumberZerosPipe,
    CurrencyToNumberPipe,
    InputComponent,
    TextAreaComponent,
    PasswordInputComponent,
    SearchInputComponent,
    ButtonComponent,
    MiniButtonComponent,
    ToggleSwitchComponent,
    CheckboxComponent,
    RadioButtonComponent,
    SelectComponent,
    MiniSelectComponent,
    TabComponent,
    TabGroupComponent,
    StatusLabelComponent,
    SummaryCardComponent,
    InfoCardComponent,
    OrderLineComponent,
    OrderLineControlComponent,
    EmptyStateComponent,
    FiltersPopupComponent,
    DateFiltersPopupComponent,
    BulkActionsPopupComponent,
    DataGridPaginationComponent,
    DataGridControlsComponent,
    DataGridComponent,
    AddressFormComponent,
    ModalContainerComponent,
    SelectButtonComponent,
    LoadingSpinnerComponent,
  ],
  providers: [DateTimeService, SvgIconService],
})
export class SharedModule {}
