export type Bike = {
  chassis_number: string;
  custom: boolean;
  engine_size: number;
  id: string;
  make: string;
  model: string;
  other_make?: string;
  user_id: string;
  year: number;
};

interface MxRiderForm {
  address_city: string;
  address_country: "GB" | "FR" | "DE" | "ES" | "US";
  address_line_1: string;
  address_line_2: string;
  address_postcode: string;
  address_region: string;
  date_of_birth: string;
  email?: string;
  emc_name: string;
  emc_phone: string;
  emc_phone_country: string;
  emc_phone_country_code: string;
  emc_phone_national: string;
  emc_phone_type: string;
  emc_relation: string;
  first_name: string;
  last_name: string;
  phone: string;
  phone_country: string;
  phone_country_code: string;
  phone_national: string;
  phone_type: string;
  rider_number: number;
}

type VerificationStatus = "not-verified" | "verified" | "rejected";

interface MxRiderLicence {
  affiliation_id: string;
  affiliation_name: string;
  code: string;
  expiry: string;
  rider_number: number;
  verification_status: VerificationStatus;
}

export interface CreateMxRider extends MxRiderForm {
  licences: MxRiderLicence[];
  user_id: string;
}

export interface MxRider extends CreateMxRider {
  id: string;
}
