export interface AuthorizationUser {
  username: string;
  password: string;
  scope: string;
  client_id: string;
  grant_type: string;
}
