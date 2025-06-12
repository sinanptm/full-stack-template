import container from ".";
import ValidatorService from "@/infrastructure/services/ValidatorService";
import TokenService from "@/infrastructure/services/TokenService";
import MailService from "@/infrastructure/services/MailService";
import HashService from "@/infrastructure/services/HashService";
import OAuthService from "@/infrastructure/services/OAuthService";

export enum Services {
  TokenService = "TokenService",
  ValidatorService = "ValidatorService",
  MailService = "MailService",
  HashService = "HashService",
  OAuthService = "OAuthService",
}

container.bind(Services.ValidatorService).to(ValidatorService).inSingletonScope();
container.bind(Services.TokenService).to(TokenService).inSingletonScope();
container.bind(Services.MailService).to(MailService).inSingletonScope();
container.bind(Services.HashService).to(HashService).inSingletonScope();
container.bind(Services.OAuthService).to(OAuthService).inSingletonScope();
