import BluebirdPromise = require("bluebird");
import { TOTPSecretDocument } from "./TOTPSecretDocument";
import { U2FRegistrationDocument } from "./U2FRegistrationDocument";
import { U2FRegistration } from "../../../types/U2FRegistration";
import { TOTPSecret } from "../../../types/TOTPSecret";
import { AuthenticationTraceDocument } from "./AuthenticationTraceDocument";
import { IdentityValidationDocument } from "./IdentityValidationDocument";

export interface IUserDataStore {
    saveU2FRegistration(userId: string, appId: string, registration: U2FRegistration): BluebirdPromise<void>;
    retrieveU2FRegistration(userId: string, appId: string): BluebirdPromise<U2FRegistrationDocument>;

    saveAuthenticationTrace(userId: string, isAuthenticationSuccessful: boolean): BluebirdPromise<void>;
    retrieveLatestAuthenticationTraces(userId: string, isAuthenticationSuccessful: boolean, count: number): BluebirdPromise<AuthenticationTraceDocument[]>;

    produceIdentityValidationToken(userId: string, token: string, challenge: string, maxAge: number): BluebirdPromise<any>;
    consumeIdentityValidationToken(token: string, challenge: string): BluebirdPromise<IdentityValidationDocument>;

    saveTOTPSecret(userId: string, secret: TOTPSecret): BluebirdPromise<void>;
    retrieveTOTPSecret(userId: string): BluebirdPromise<TOTPSecretDocument>;
}