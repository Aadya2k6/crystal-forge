// Firestore Security Rules for Production
// Copy these rules to Firebase Console > Firestore > Rules when ready

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow reading and writing to hackathon_registrations collection
    match /hackathon_registrations/{document} {
      // Allow anyone to create new registrations
      allow create: if isValidRegistration(resource.data);
      
      // Allow reading own registration (if you implement user auth later)
      allow read: if true; // You can restrict this later
      
      // Prevent updates/deletes for data integrity
      allow update, delete: if false;
    }
    
    // Helper function to validate registration data
    function isValidRegistration(data) {
      return data.keys().hasAll(['teamName', 'teamSize', 'members', 'projectIdea', 'agreeToRules', 'createdAt'])
        && data.teamName is string
        && data.teamSize is number
        && data.teamSize > 0 && data.teamSize <= 10
        && data.members is list
        && data.agreeToRules == true;
    }
  }
}