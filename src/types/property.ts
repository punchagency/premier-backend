// src/types/property.ts

interface Image {
  fileId: string;
  url: string;
  alt: string | null;
}

interface FieldData {
  'qr-link': string;
  'property-tag': string;
  'bathrooms-2': string;
  'property-price'?: number;
  'property-price-2'?: number;
  'property-price-3'?: number;
  'property-category': string;
  'max-area': number;
  '01-landmark-time-2': number;
  '02-landmark-time-2': number;
  '03-landmark-time-2': number;
  'bedrooms-5': string;
  'property-long-description': string;
  'qr-code-listing-number': string;
   name: string;
  'property-location-name': string;
  'property-location': string;
  '01-landmark-name': string;
  '02-landmark-name': string;
  '03-landmark-name': string;
  'card-title': string;
  'card-thumnail'?: Image;
  'card-thumbnail'?: Image;
  'qr-image': Image;
  'property-type': string;
  agent: string;
  community: string;
  'amenities-2': string[];
  'furnishing-type-2': string;
  slug: string;
  'city-2': string;
  'property-images': Image[];
}

export interface Property {
  _id: string;
  id: string;
  fieldData: FieldData;
  cmsLocaleId: string;
  lastUpdated: string;
  createdOn: string;
  isArchived: boolean;
  isDraft: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}