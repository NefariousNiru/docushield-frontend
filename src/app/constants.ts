export class URIs {
  static BASE_URL: string = "http://localhost:8000";
  static AUTH: string = "/v1/auth";
  static SIGN_IN: string = "/signin";
  static SIGN_UP = "/signup";
  static ME_V1 = "/v1/me"
  static GET_PUBLIC_KEY = "/pubkey"
}

export class Constants {
  static PASSWORD_PATTERN: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
}
