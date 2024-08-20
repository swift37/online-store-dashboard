import { Address } from './address.interface';

export interface Addresses {
  shippingAddress: Address;
  billingAddress?: Address;
  sameBillingAddress: boolean;
}
