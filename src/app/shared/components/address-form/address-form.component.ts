import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { City, Country, State } from 'country-state-city';
import { SelectSettings } from '../../interfaces/select-settings.interface';
import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { AddressesForm } from '../../interfaces/addresses-form.interface';
import { FormsService } from '../../../core/services/forms-service.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
  animations: [
    trigger('form', [
      transition('void => *', [
        style({
          height: 0,
          overflow: 'hidden',
        }),
        group([
          animate(150, style({ height: '*' })),
          animate(300, style({ overflow: 'visible' })),
        ]),
      ]),
      transition('* => void', [
        style({
          overflow: 'hidden',
        }),
        animate(
          150,
          style({
            height: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  public addressForm!: FormGroup<AddressesForm>;
  public sameBillingAddressCheckSub?: Subscription;

  public countries: any[] = [];
  public states: any[] = [];
  public cities: any[] = [];
  public billingCountries: any[] = [];
  public billingStates: any[] = [];
  public billingCities: any[] = [];

  constructor(
    private controlContainer: ControlContainer,
    private formsService: FormsService
  ) {}

  public selectSettings: SelectSettings = {
    idPropKey: 'isoCode',
    displayPropKey: 'name',
  };

  public citySelectSettings: SelectSettings = {
    idPropKey: 'name',
    displayPropKey: 'name',
  };

  public onCountryChange(billing: boolean): void {
    const form =
      this.addressForm.controls[billing ? 'billingAddress' : 'shippingAddress'];
    if (!form) return;

    const selectedCountry = form.controls.country.value;
    const states = State.getStatesOfCountry(selectedCountry);

    form.patchValue({ state: '', city: '' });
    states.length
      ? form.controls.state.enable()
      : form.controls.state.disable();
    form.controls.city.disable();

    billing ? (this.billingStates = states) : (this.states = states);
  }

  public onStateChange(billing: boolean): void {
    const form =
      this.addressForm.controls[billing ? 'billingAddress' : 'shippingAddress'];
    if (!form) return;

    const selectedSate = form.controls.state.value!;
    const selectedCountry = form.controls.country.value;
    const cities = City.getCitiesOfState(selectedCountry, selectedSate);

    form.controls.city.patchValue('');
    cities.length && form.controls.city.enable();

    billing ? (this.billingCities = cities) : (this.cities = cities);
  }

  //---------- Lifecycle methods start ----------

  ngOnInit(): void {
    this.countries = this.billingCountries = Country.getAllCountries();
    this.addressForm = this.controlContainer
      .control as FormGroup<AddressesForm>;

    this.sameBillingAddressCheckSub =
      this.addressForm.controls.sameBillingAddress.valueChanges.subscribe(
        (value) =>
          !value
            ? this.addressForm.addControl(
                'billingAddress',
                this.formsService.createAddressForm()
              )
            : this.addressForm.removeControl('billingAddress')
      );
  }

  ngOnDestroy(): void {
    this.sameBillingAddressCheckSub?.unsubscribe();
  }

  //---------- Lifecycle methods end ----------
}
