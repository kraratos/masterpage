import {PersonaResponse} from "./persona-response";

export interface UserSettingsResponse {
  sso: string;
  timeZone: string;
  displayAssetName: string;
  retiredAssets: string;
  uom: string;
  status: string;
  personas: PersonaResponse[];
}
