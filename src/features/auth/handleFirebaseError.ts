export const handleFirebaseError = (message: string): string => {
  switch (message) {
    case "Firebase: Error (auth/email-already-in-use).":
      return "Email is already in use";
    case "Firebase: Error (auth/invalid-email).":
      return "Invalid email address";
    case "Firebase: Error (auth/user-not-found).":
      return "User not found";
    case "Firebase: Error (auth/wrong-password).":
      return "Wrong password";
    case "Firebase: Error (auth/too-many-requests).":
      return "Too many attempts, try again later";
    case "Firebase: Error (auth/weak-password).":
      return "Password is too weak";
    case "Firebase: Error (auth/invalid-credential).":
      return "Invalid credentials";
    case "Firebase: Error (auth/network-request-failed).":
      return "Network error, check your connection";
    case "Firebase: Error (auth/popup-closed-by-user).":
      return "Login popup was closed";
    case "Firebase: Error (auth/user-disabled).":
      return "This account has been disabled";

    default:
      return message ?? "Something went wrong";
  }
};
