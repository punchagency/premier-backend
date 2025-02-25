export function validateEmail(email: string): { isValid: boolean; message: string } {
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }

  // Extract domain from email
  const [, domain] = email.split('@');
  
  // List of invalid/disposable email domains
  const invalidDomains = [
    'tempmail.com',
    'throwaway.com',
    'dev',
    'test',
    'example.com',
    // Add more invalid domains as needed
  ];

  // Check for invalid domains
  if (invalidDomains.some(invalid => domain.includes(invalid))) {
    return { 
      isValid: false, 
      message: 'Please use a valid email domain' 
    };
  }

  return { isValid: true, message: '' };
}