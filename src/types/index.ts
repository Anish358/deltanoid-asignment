// Interface for User
export interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

// Interface User Dashboard intial state using in userSlice
export interface UserState {
  userData: User[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  count: number;
}

// Interface of Analytics data that will be returned from the JSON File
export interface AnalyticsData {
  regionData: { region: string; users: number }[];
  trendData: { month: string; registrations: number[] }[];
}

// Interface for Analytics initial state used in analyticsSlice
export interface AnalyticsState {
  data: AnalyticsData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Interface to current user login
export interface LoginState {
  user: {
    email: string;
    password: string;
  };
}
