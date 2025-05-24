import container from ".";
import ValidatorService from "@/infrastructure/services/ValidatorService";
import TokenService from "@/infrastructure/services/TokenService";
import MailService from "@/infrastructure/services/MailService";
import HashService from "@/infrastructure/services/HashService";

export enum Services {
  TokenService = "TokenService",
  ValidatorService = "ValidatorService",
  MailService = "MailService",
  HashService = "HashService",
}

container.bind<ValidatorService>(Services.ValidatorService).to(ValidatorService).inSingletonScope();
container.bind<TokenService>(Services.TokenService).to(TokenService).inSingletonScope();
container.bind<MailService>(Services.MailService).to(MailService).inSingletonScope();
container.bind<HashService>(Services.HashService).to(HashService).inSingletonScope();
