'use client';
import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const router = useRouter();

  const loadProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      console.log(data);
      setProperties(Array.isArray(data) ? data : []);
    } catch (error: unknown) { // Change err to error and add type
        setError('Failed to load properties');
        console.error('Error:', error);
      } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId: string) => {
    if (window.confirm('Are you sure you want to remove this property?')) {
      try {
        const response = await fetch(`/api/properties/${propertyId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProperties(prev => prev.filter(p => p.id !== propertyId));
        }
      } catch (error: unknown) { // Change err to error and add type
        setError('Failed to delete property');
        console.error('Error:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        credentials: 'include'
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Add this button to your dashboard JSX
 

  useEffect(() => {
    loadProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">My Saved Properties</h1>
        <button 
    onClick={handleLogout}
    className="text-red-600 hover:text-red-800"
  >
    Logout
  </button>
    
          </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}