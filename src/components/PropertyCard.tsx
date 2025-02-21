'use client';
import { Property } from '@/types/property';
import Image from 'next/image';


interface PropertyCardProps {
  property: Property;
  onDelete?: (id: string) => void;
}


export default function PropertyCard({ property, onDelete }: PropertyCardProps) {
  console.log(property, "property");
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4">
            {typeof property.fieldData.images?.url === 'string' && (
        <div className="relative w-full h-48">
          <Image
            src={property.fieldData?.images?.url  }
            alt={property.fieldData.images?.alt  || 'Property'}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-md"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold my-4">{property.fieldData.name }</h3>
      <p className="text-gray-600 mb-2">{property.fieldData["user-name"] }</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">{property.fieldData["user-email"] }</span>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(property.fieldData.slug )}
          className="mt-4 text-red-600 hover:text-red-800"
        >
          Remove from saved
        </button>
      )}
    </div>
  );
}