export interface Property {
    id: string;
    fieldData: FieldData; // Since it's type: Object in schema
    cmsLocaleId: string;
    lastPublished?: string;
    lastUpdated?: string;
    createdOn?: string;
    isArchived?: boolean;
    isDraft?: boolean;
  }

  interface FieldData {
    save: boolean;
    name: string;
    'user-name': string;
    'user-password': string;
    'user-email': string;
    'card-id-2': string;
    images: Images;
    slug: string;
  }

  interface Images {
    fileId: string;
    url: string;
    alt: string;
  }