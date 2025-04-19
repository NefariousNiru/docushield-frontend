export class URIs {
  static BASE_URL: string = "http://localhost:8000";
  static AUTH: string = "/v1/auth";
  static SIGN_IN: string = this.AUTH + "/signin";
  static SIGN_UP = this.AUTH + "/signup";
  static ME_V1 = "/v1/me";
  static GET_PUBLIC_KEY = this.ME_V1 + "/pubkey";
  static GET_DOCUMENTS = this.ME_V1 + "/document";
  static DOWNLOAD_DOCUMENT = this.GET_DOCUMENTS + "/download"
  static GET_DOCUMENT_HASH = this.GET_DOCUMENTS + "/hash";
  static GET_DOCUMENT_UPLOADS = this.GET_DOCUMENTS + "/upload";
  static GET_ACCESS_HISTORY = this.ME_V1 + "/access-history";
}

export class Constants {
  static PASSWORD_PATTERN: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
}
