import { environment } from "../environments/environment";

export class URIs {
  static readonly BASE_URL: string = environment.apiBaseUrl;
  static AUTH: string = "/v1/auth";
  static SIGN_IN: string = this.AUTH + "/signin";
  static SIGN_UP = this.AUTH + "/signup";
  static LOGOUT_V1 = this.AUTH + "/logout";
  static ME_V1 = "/v1/me";
  static GET_PUBLIC_KEY = this.ME_V1 + "/pubkey";
  static GET_DOCUMENTS = this.ME_V1 + "/document";
  static DOWNLOAD_DOCUMENT = this.GET_DOCUMENTS + "/download"
  static GET_DOCUMENT_UPLOADS = this.GET_DOCUMENTS + "/upload";
  static GET_ACCESS_HISTORY = this.ME_V1 + "/access-history";
  static REQUEST_ACCESS = this.ME_V1 + "/request-access";
  static GRANT_ACCESS = this.ME_V1 + "/grant";
  static REQUEST_STATUS = this.ME_V1 + "/request-status";
  static DOWNLOAD = this.ME_V1 + "/download";
}

export class Constants {
  static PASSWORD_PATTERN: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
}
