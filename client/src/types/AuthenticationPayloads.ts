export interface SignupPostPayload {
  email: string;
  full_name: string;
  password: string;
}

export interface LoginPostPayLoad {
  email: string;
  password: string;
}

export interface LoginResponsePayLoad {
  data?: {
    created_at: string;
    email: string;
    full_name: string;
    id: string;
    profile_image: string | null;
    updated_at: string;
  };
  error?: {
    message: string;
    code: number;
  };
}

export interface LogoutResponsePayLoad {
  data?: {
    message: string
  },
  error?: {
    message: string
  }
}
