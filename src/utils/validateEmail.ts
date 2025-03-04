export function validateEmail(email: string): { isValid: boolean; message: string } {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }

  const [, domain] = email.split('@');
  
  const invalidDomains = [
    'tempmail.com',
    'throwaway.com',
    'dev',
    'test',
    'example.com',
  ];

  if (invalidDomains.some(invalid => domain.includes(invalid))) {
    return { 
      isValid: false,   
      message: 'Please use a valid email domain' 
    };
  }

  return { isValid: true, message: '' };
}