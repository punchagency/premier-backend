export function validateEmail(email: string): { isValid: boolean; message: string } {
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Invalid email format' };
    }
  
    // Extract domain from email
    const [, domain] = email.split('@');
    
    // List of valid TLDs (Top Level Domains)
    const validTLDs = [
      'com', 'net', 'org', 'edu', 'gov', 'mil',
      'co.uk', 'ac.uk', 'com.au', 'co.jp',
      // Add more valid TLDs as needed
    ];
  
    // List of valid email service domains
    const validEmailDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com',
      'proton.me',
      'protonmail.com',
      // Add more valid domains as needed
    ];
  
    // List of invalid/disposable email domains
    const invalidDomains = [
      'tempmail.com',
      'throwaway.com',
      'dev',
      'test',
      'example.com',
      // Add more invalid domains
    ];
  
    // Check for invalid domains
    if (invalidDomains.some(invalid => domain.includes(invalid))) {
      return { 
        isValid: false, 
        message: 'Please use a valid email domain' 
      };
    }
  
    // Check domain TLD
    const tld = domain.split('.').slice(1).join('.');
    const isValidTLD = validTLDs.some(valid => tld === valid);
    const isValidDomain = validEmailDomains.some(valid => domain === valid);
  
    if (!isValidTLD && !isValidDomain) {
      return { 
        isValid: false, 
        message: 'Please use a valid email domain with a proper TLD' 
      };
    }
  
    return { isValid: true, message: '' };
  }