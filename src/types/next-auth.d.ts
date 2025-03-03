import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      token?: string;
      role: string;
      preferences: {
        newsUpdates: boolean;
        emailNotifications: boolean;
        propertyAlerts: boolean;
      };
      phone: string;
    }
  }
  
  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    token?: string;
    role: string;
    preferences: {
      newsUpdates: boolean;
      emailNotifications: boolean;
      propertyAlerts: boolean;
    };
    phone: string;
  }
}