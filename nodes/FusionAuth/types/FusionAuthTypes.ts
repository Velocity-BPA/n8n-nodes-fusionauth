/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

export interface IFusionAuthUser {
	id?: string;
	active?: boolean;
	birthDate?: string;
	data?: IDataObject;
	email?: string;
	expiry?: number;
	firstName?: string;
	fullName?: string;
	imageUrl?: string;
	insertInstant?: number;
	lastLoginInstant?: number;
	lastName?: string;
	middleName?: string;
	mobilePhone?: string;
	password?: string;
	passwordChangeRequired?: boolean;
	preferredLanguages?: string[];
	timezone?: string;
	twoFactor?: IDataObject;
	username?: string;
	usernameStatus?: string;
	verified?: boolean;
	memberships?: IFusionAuthGroupMembership[];
	registrations?: IFusionAuthRegistration[];
}

export interface IFusionAuthApplication {
	id?: string;
	active?: boolean;
	data?: IDataObject;
	name?: string;
	tenantId?: string;
	roles?: IFusionAuthRole[];
	oauthConfiguration?: IDataObject;
	jwtConfiguration?: IDataObject;
	loginConfiguration?: IDataObject;
	registrationConfiguration?: IDataObject;
	samlv2Configuration?: IDataObject;
	emailConfiguration?: IDataObject;
	formConfiguration?: IDataObject;
	multiFactorConfiguration?: IDataObject;
}

export interface IFusionAuthTenant {
	id?: string;
	name?: string;
	issuer?: string;
	data?: IDataObject;
	emailConfiguration?: IDataObject;
	eventConfiguration?: IDataObject;
	externalIdentifierConfiguration?: IDataObject;
	failedAuthenticationConfiguration?: IDataObject;
	familyConfiguration?: IDataObject;
	formConfiguration?: IDataObject;
	httpSessionMaxInactiveInterval?: number;
	jwtConfiguration?: IDataObject;
	loginConfiguration?: IDataObject;
	maximumPasswordAge?: IDataObject;
	minimumPasswordAge?: IDataObject;
	multiFactorConfiguration?: IDataObject;
	passwordEncryptionConfiguration?: IDataObject;
	passwordValidationRules?: IDataObject;
	rateLimitConfiguration?: IDataObject;
	registrationConfiguration?: IDataObject;
	userDeletePolicy?: IDataObject;
}

export interface IFusionAuthGroup {
	id?: string;
	data?: IDataObject;
	name?: string;
	tenantId?: string;
	roles?: IDataObject;
}

export interface IFusionAuthGroupMembership {
	groupId?: string;
	data?: IDataObject;
	id?: string;
	insertInstant?: number;
	userId?: string;
}

export interface IFusionAuthRegistration {
	id?: string;
	applicationId?: string;
	authenticationToken?: string;
	cleanSpeakId?: string;
	data?: IDataObject;
	insertInstant?: number;
	lastLoginInstant?: number;
	preferredLanguages?: string[];
	roles?: string[];
	timezone?: string;
	tokens?: IDataObject;
	username?: string;
	usernameStatus?: string;
	verified?: boolean;
}

export interface IFusionAuthRole {
	id?: string;
	description?: string;
	isDefault?: boolean;
	isSuperRole?: boolean;
	name?: string;
}

export interface IFusionAuthIdentityProvider {
	id?: string;
	applicationConfiguration?: IDataObject;
	data?: IDataObject;
	debug?: boolean;
	domains?: string[];
	enabled?: boolean;
	lambdaConfiguration?: IDataObject;
	linkingStrategy?: string;
	name?: string;
	oauth2?: IDataObject;
	tenantConfiguration?: IDataObject;
	type?: string;
}

export interface IFusionAuthConsent {
	id?: string;
	consentEmailTemplateId?: string;
	countryMinimumAgeForSelfConsent?: IDataObject;
	data?: IDataObject;
	defaultMinimumAgeForSelfConsent?: number;
	emailPlus?: IDataObject;
	multipleValuesAllowed?: boolean;
	name?: string;
	values?: string[];
}

export interface IFusionAuthForm {
	id?: string;
	data?: IDataObject;
	name?: string;
	steps?: IDataObject[];
	type?: string;
}

export interface IFusionAuthFormField {
	id?: string;
	confirm?: boolean;
	consentId?: string;
	control?: string;
	data?: IDataObject;
	description?: string;
	key?: string;
	name?: string;
	options?: string[];
	required?: boolean;
	type?: string;
	validator?: IDataObject;
}

export interface IFusionAuthLambda {
	id?: string;
	body?: string;
	debug?: boolean;
	engineType?: string;
	insertInstant?: number;
	lastUpdateInstant?: number;
	name?: string;
	type?: string;
}

export interface IFusionAuthWebhook {
	id?: string;
	connectTimeout?: number;
	description?: string;
	eventsEnabled?: IDataObject;
	global?: boolean;
	headers?: IDataObject;
	httpAuthenticationPassword?: string;
	httpAuthenticationUsername?: string;
	readTimeout?: number;
	signatureConfiguration?: IDataObject;
	sslCertificate?: string;
	tenantIds?: string[];
	url?: string;
}

export interface IFusionAuthAuditLog {
	id?: number;
	data?: IDataObject;
	insertInstant?: number;
	insertUser?: string;
	message?: string;
	newValue?: string;
	oldValue?: string;
	reason?: string;
}

export interface IFusionAuthApiError {
	fieldErrors?: IDataObject;
	generalErrors?: Array<{
		code: string;
		message: string;
	}>;
}

export interface IFusionAuthPaginatedResponse<T> {
	total?: number;
	nextResults?: string;
	[key: string]: T[] | number | string | undefined;
}

export type FusionAuthResource =
	| 'user'
	| 'application'
	| 'tenant'
	| 'group'
	| 'registration'
	| 'identityProvider'
	| 'consent'
	| 'form'
	| 'formField'
	| 'lambda'
	| 'webhook'
	| 'auditLog';

export type FusionAuthUserOperation =
	| 'create'
	| 'get'
	| 'getByEmail'
	| 'getByUsername'
	| 'getAll'
	| 'update'
	| 'patch'
	| 'delete'
	| 'deactivate'
	| 'reactivate'
	| 'bulkDelete'
	| 'import'
	| 'changePassword'
	| 'forgotPassword'
	| 'verifyEmail'
	| 'verifyRegistration'
	| 'getTwoFactorRecoveryCodes'
	| 'generateTwoFactorRecoveryCodes'
	| 'enableTwoFactor'
	| 'disableTwoFactor'
	| 'sendTwoFactorCode'
	| 'getRecentLogins'
	| 'getRegistrations'
	| 'refreshTokens'
	| 'revokeRefreshTokens'
	| 'getUserActionsOnUser'
	| 'getUserComments'
	| 'addUserComment'
	| 'getConsents'
	| 'updateConsents';

export type FusionAuthApplicationOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'patch'
	| 'delete'
	| 'getOAuthConfiguration'
	| 'getRoles'
	| 'createRole'
	| 'updateRole'
	| 'deleteRole';

export type FusionAuthTenantOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'patch'
	| 'delete';

export type FusionAuthGroupOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'addMembers'
	| 'removeMembers'
	| 'getMembers';

export type FusionAuthRegistrationOperation =
	| 'create'
	| 'get'
	| 'update'
	| 'patch'
	| 'delete'
	| 'verify';

export type FusionAuthIdentityProviderOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'lookup'
	| 'link'
	| 'unlink';

export type FusionAuthConsentOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'getUserConsents'
	| 'grantUserConsent'
	| 'revokeUserConsent';

export type FusionAuthFormOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete';

export type FusionAuthFormFieldOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete';

export type FusionAuthLambdaOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete';

export type FusionAuthWebhookOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'test';

export type FusionAuthAuditLogOperation =
	| 'get'
	| 'getAll'
	| 'export';
