/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

export const FUSIONAUTH_EVENTS = {
	// User Events
	'user.create': 'User Create',
	'user.create.complete': 'User Create Complete',
	'user.update': 'User Update',
	'user.update.complete': 'User Update Complete',
	'user.deactivate': 'User Deactivate',
	'user.reactivate': 'User Reactivate',
	'user.delete': 'User Delete',
	'user.delete.complete': 'User Delete Complete',
	'user.bulk.create': 'User Bulk Create',
	'user.action': 'User Action',
	'user.email.update': 'User Email Update',
	'user.email.verified': 'User Email Verified',
	'user.identity-provider.link': 'User IdP Link',
	'user.identity-provider.unlink': 'User IdP Unlink',
	'user.login.success': 'User Login Success',
	'user.login.failed': 'User Login Failed',
	'user.login.new-device': 'User Login New Device',
	'user.login.suspicious': 'User Login Suspicious',
	'user.password.breach': 'User Password Breach',
	'user.password.reset.send': 'User Password Reset Send',
	'user.password.reset.start': 'User Password Reset Start',
	'user.password.reset.success': 'User Password Reset Success',
	'user.password.update': 'User Password Update',
	'user.registration.create': 'User Registration Create',
	'user.registration.create.complete': 'User Registration Create Complete',
	'user.registration.update': 'User Registration Update',
	'user.registration.update.complete': 'User Registration Update Complete',
	'user.registration.delete': 'User Registration Delete',
	'user.registration.delete.complete': 'User Registration Delete Complete',
	'user.registration.verified': 'User Registration Verified',
	'user.two-factor.method.add': 'User 2FA Method Add',
	'user.two-factor.method.remove': 'User 2FA Method Remove',

	// JWT Events
	'jwt.public-key.update': 'JWT Public Key Update',
	'jwt.refresh': 'JWT Refresh',
	'jwt.refresh-token.revoke': 'JWT Refresh Token Revoke',

	// Kickstart Events
	'kickstart.success': 'Kickstart Success',

	// Audit Events
	'audit-log.create': 'Audit Log Create',

	// Group Events
	'group.create': 'Group Create',
	'group.create.complete': 'Group Create Complete',
	'group.delete': 'Group Delete',
	'group.delete.complete': 'Group Delete Complete',
	'group.member.add': 'Group Member Add',
	'group.member.add.complete': 'Group Member Add Complete',
	'group.member.remove': 'Group Member Remove',
	'group.member.remove.complete': 'Group Member Remove Complete',
	'group.member.update': 'Group Member Update',
	'group.member.update.complete': 'Group Member Update Complete',
	'group.update': 'Group Update',
	'group.update.complete': 'Group Update Complete',
};

export const IDENTITY_PROVIDER_TYPES = [
	{ name: 'Apple', value: 'Apple' },
	{ name: 'Epic Games', value: 'EpicGames' },
	{ name: 'External JWT', value: 'ExternalJWT' },
	{ name: 'Facebook', value: 'Facebook' },
	{ name: 'Google', value: 'Google' },
	{ name: 'HYPR', value: 'HYPR' },
	{ name: 'LinkedIn', value: 'LinkedIn' },
	{ name: 'Nintendo', value: 'Nintendo' },
	{ name: 'OpenID Connect', value: 'OpenIDConnect' },
	{ name: 'SAMLv2', value: 'SAMLv2' },
	{ name: 'SAMLv2 IdP Initiated', value: 'SAMLv2IdPInitiated' },
	{ name: 'Sony', value: 'Sony' },
	{ name: 'Steam', value: 'Steam' },
	{ name: 'Twitch', value: 'Twitch' },
	{ name: 'Twitter', value: 'Twitter' },
	{ name: 'Xbox', value: 'Xbox' },
];

export const LAMBDA_TYPES = [
	{ name: 'JWT Populate', value: 'JWTPopulate' },
	{ name: 'OpenID Reconcile', value: 'OpenIDReconcile' },
	{ name: 'SAMLv2 Reconcile', value: 'SAMLv2Reconcile' },
	{ name: 'SAMLv2 Populate', value: 'SAMLv2Populate' },
	{ name: 'Apple Reconcile', value: 'AppleReconcile' },
	{ name: 'Facebook Reconcile', value: 'FacebookReconcile' },
	{ name: 'Google Reconcile', value: 'GoogleReconcile' },
	{ name: 'Twitter Reconcile', value: 'TwitterReconcile' },
	{ name: 'External JWT Reconcile', value: 'ExternalJWTReconcile' },
	{ name: 'LDAP Connector Reconcile', value: 'LDAPConnectorReconcile' },
	{ name: 'SCIM Server Group Request Converter', value: 'SCIMServerGroupRequestConverter' },
	{ name: 'SCIM Server Group Response Converter', value: 'SCIMServerGroupResponseConverter' },
	{ name: 'SCIM Server User Request Converter', value: 'SCIMServerUserRequestConverter' },
	{ name: 'SCIM Server User Response Converter', value: 'SCIMServerUserResponseConverter' },
	{ name: 'Self Service Registration Validation', value: 'SelfServiceRegistrationValidation' },
	{ name: 'Client Credentials JWT Populate', value: 'ClientCredentialsJWTPopulate' },
];

export const FORM_TYPES = [
	{ name: 'Registration', value: 'registration' },
	{ name: 'Admin Registration', value: 'adminRegistration' },
	{ name: 'Admin User', value: 'adminUser' },
	{ name: 'Self Service User', value: 'selfServiceUser' },
];

export const FORM_FIELD_CONTROLS = [
	{ name: 'Checkbox', value: 'checkbox' },
	{ name: 'Number', value: 'number' },
	{ name: 'Password', value: 'password' },
	{ name: 'Radio', value: 'radio' },
	{ name: 'Select', value: 'select' },
	{ name: 'Text', value: 'text' },
	{ name: 'Textarea', value: 'textarea' },
];

export const FORM_FIELD_TYPES = [
	{ name: 'Boolean', value: 'bool' },
	{ name: 'Consent', value: 'consent' },
	{ name: 'Date', value: 'date' },
	{ name: 'Email', value: 'email' },
	{ name: 'Number', value: 'number' },
	{ name: 'String', value: 'string' },
];

export const LINKING_STRATEGIES = [
	{ name: 'Anonymous', value: 'Anonymous' },
	{ name: 'Create Pending Link', value: 'CreatePendingLink' },
	{ name: 'Disabled', value: 'Disabled' },
	{ name: 'Link Anonymously', value: 'LinkAnonymously' },
	{ name: 'Link By Email', value: 'LinkByEmail' },
	{ name: 'Link By Username', value: 'LinkByUsername' },
];

export const TWO_FACTOR_METHODS = [
	{ name: 'Authenticator', value: 'authenticator' },
	{ name: 'Email', value: 'email' },
	{ name: 'SMS', value: 'sms' },
];
