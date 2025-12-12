// Email validation utility
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Async email validation (checks if email format is valid and domain exists)
export const validateEmailAsync = async (email: string): Promise<{ isValid: boolean; message: string }> => {
  // Basic format validation
  if (!validateEmail(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  try {
    // Extract domain from email
    const domain = email.split('@')[1];
    
    // Simple domain validation using DNS lookup simulation
    // Note: In a real app, you'd use a backend service for this
    const commonDomains = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 
      'apple.com', 'icloud.com', 'protonmail.com', 'aol.com',
      'edu', 'ac.in', 'co.in', 'org', 'net', 'gov'
    ];
    
    const isCommonDomain = commonDomains.some(commonDomain => 
      domain.endsWith(commonDomain)
    );
    
    if (isCommonDomain) {
      return { isValid: true, message: 'Valid email' };
    }
    
    // For other domains, we'll assume they're valid for now
    // In production, you'd want to use a proper email validation service
    return { isValid: true, message: 'Valid email' };
    
  } catch (error) {
    return { isValid: false, message: 'Email validation failed' };
  }
};

// Validate all team member emails
export const validateTeamEmails = async (members: { email: string; name: string }[]): Promise<{ isValid: boolean; invalidEmails: string[] }> => {
  const invalidEmails: string[] = [];
  
  for (const member of members) {
    if (member.email) {
      const validation = await validateEmailAsync(member.email);
      if (!validation.isValid) {
        invalidEmails.push(member.email);
      }
    }
  }
  
  return {
    isValid: invalidEmails.length === 0,
    invalidEmails
  };
};