/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Add Comment',
				value: 'addUserComment',
				description: 'Add a comment to a user',
				action: 'Add comment to user',
			},
			{
				name: 'Bulk Delete',
				value: 'bulkDelete',
				description: 'Delete multiple users',
				action: 'Bulk delete users',
			},
			{
				name: 'Change Password',
				value: 'changePassword',
				description: 'Change user password',
				action: 'Change user password',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new user',
				action: 'Create user',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Soft delete/deactivate a user',
				action: 'Deactivate user',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Hard delete a user',
				action: 'Delete user',
			},
			{
				name: 'Disable Two-Factor',
				value: 'disableTwoFactor',
				description: 'Disable two-factor authentication for user',
				action: 'Disable 2FA for user',
			},
			{
				name: 'Enable Two-Factor',
				value: 'enableTwoFactor',
				description: 'Enable two-factor authentication for user',
				action: 'Enable 2FA for user',
			},
			{
				name: 'Forgot Password',
				value: 'forgotPassword',
				description: 'Start forgot password flow',
				action: 'Start forgot password flow',
			},
			{
				name: 'Generate 2FA Recovery Codes',
				value: 'generateTwoFactorRecoveryCodes',
				description: 'Generate new two-factor recovery codes',
				action: 'Generate 2FA recovery codes',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a user by ID',
				action: 'Get user',
			},
			{
				name: 'Get 2FA Recovery Codes',
				value: 'getTwoFactorRecoveryCodes',
				description: 'Get two-factor recovery codes',
				action: 'Get 2FA recovery codes',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Search and list users',
				action: 'Get all users',
			},
			{
				name: 'Get by Email',
				value: 'getByEmail',
				description: 'Get a user by email address',
				action: 'Get user by email',
			},
			{
				name: 'Get by Username',
				value: 'getByUsername',
				description: 'Get a user by username',
				action: 'Get user by username',
			},
			{
				name: 'Get Comments',
				value: 'getUserComments',
				description: 'Get comments on a user',
				action: 'Get user comments',
			},
			{
				name: 'Get Consents',
				value: 'getConsents',
				description: 'Get user consent status',
				action: 'Get user consents',
			},
			{
				name: 'Get Recent Logins',
				value: 'getRecentLogins',
				description: 'Get recent logins for user',
				action: 'Get recent logins',
			},
			{
				name: 'Get Registrations',
				value: 'getRegistrations',
				description: 'Get user application registrations',
				action: 'Get user registrations',
			},
			{
				name: 'Get User Actions',
				value: 'getUserActionsOnUser',
				description: 'Get actions applied to a user',
				action: 'Get user actions',
			},
			{
				name: 'Import',
				value: 'import',
				description: 'Bulk import users',
				action: 'Import users',
			},
			{
				name: 'List Refresh Tokens',
				value: 'refreshTokens',
				description: 'List refresh tokens for user',
				action: 'List refresh tokens',
			},
			{
				name: 'Patch',
				value: 'patch',
				description: 'Partial update of user properties',
				action: 'Patch user',
			},
			{
				name: 'Reactivate',
				value: 'reactivate',
				description: 'Reactivate a deactivated user',
				action: 'Reactivate user',
			},
			{
				name: 'Revoke Refresh Tokens',
				value: 'revokeRefreshTokens',
				description: 'Revoke refresh tokens for user',
				action: 'Revoke refresh tokens',
			},
			{
				name: 'Send 2FA Code',
				value: 'sendTwoFactorCode',
				description: 'Send two-factor authentication code',
				action: 'Send 2FA code',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update user properties',
				action: 'Update user',
			},
			{
				name: 'Update Consents',
				value: 'updateConsents',
				description: 'Update user consent status',
				action: 'Update user consents',
			},
			{
				name: 'Verify Email',
				value: 'verifyEmail',
				description: 'Send email verification',
				action: 'Send email verification',
			},
			{
				name: 'Verify Registration',
				value: 'verifyRegistration',
				description: 'Verify user registration',
				action: 'Verify registration',
			},
		],
		default: 'get',
	},
];

export const userFields: INodeProperties[] = [
	// ----------------------------------
	//         user:create
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'Email address of the user',
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'Password for the user. If not provided, user will need to set password via forgot password flow.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Birth Date',
				name: 'birthDate',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'User birth date in YYYY-MM-DD format',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom user data as JSON object',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'First name of the user',
			},
			{
				displayName: 'Full Name',
				name: 'fullName',
				type: 'string',
				default: '',
				description: 'Full name of the user',
			},
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				default: '',
				description: 'URL to profile image',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name of the user',
			},
			{
				displayName: 'Memberships (JSON)',
				name: 'memberships',
				type: 'json',
				default: '[]',
				description: 'Group memberships as JSON array',
			},
			{
				displayName: 'Middle Name',
				name: 'middleName',
				type: 'string',
				default: '',
				description: 'Middle name of the user',
			},
			{
				displayName: 'Mobile Phone',
				name: 'mobilePhone',
				type: 'string',
				default: '',
				description: 'Mobile phone number',
			},
			{
				displayName: 'Password Change Required',
				name: 'passwordChangeRequired',
				type: 'boolean',
				default: false,
				description: 'Whether user must change password on next login',
			},
			{
				displayName: 'Preferred Languages',
				name: 'preferredLanguages',
				type: 'string',
				default: '',
				placeholder: 'en,es,fr',
				description: 'Comma-separated list of preferred languages',
			},
			{
				displayName: 'Registrations (JSON)',
				name: 'registrations',
				type: 'json',
				default: '[]',
				description: 'Application registrations as JSON array',
			},
			{
				displayName: 'Send Setup Email',
				name: 'sendSetPasswordEmail',
				type: 'boolean',
				default: false,
				description: 'Whether to send setup password email',
			},
			{
				displayName: 'Skip Email Verification',
				name: 'skipVerification',
				type: 'boolean',
				default: false,
				description: 'Whether to skip email verification',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'string',
				default: '',
				description: 'Tenant ID for this user',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				placeholder: 'America/New_York',
				description: 'User timezone',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'Specify a UUID for the user (optional)',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'Username for the user',
			},
			{
				displayName: 'Verified',
				name: 'verified',
				type: 'boolean',
				default: false,
				description: 'Whether email is verified',
			},
		],
	},

	// ----------------------------------
	//         user:get
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'update', 'patch', 'delete', 'deactivate', 'reactivate', 'getRecentLogins', 'getRegistrations', 'refreshTokens', 'revokeRefreshTokens', 'getUserActionsOnUser', 'getUserComments', 'addUserComment', 'getConsents', 'updateConsents', 'getTwoFactorRecoveryCodes', 'generateTwoFactorRecoveryCodes', 'disableTwoFactor'],
			},
		},
		description: 'Unique identifier of the user',
	},

	// ----------------------------------
	//         user:getByEmail
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getByEmail'],
			},
		},
		description: 'Email address to look up',
	},

	// ----------------------------------
	//         user:getByUsername
	// ----------------------------------
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getByUsername'],
			},
		},
		description: 'Username to look up',
	},

	// ----------------------------------
	//         user:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 10000,
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Filter by email (partial match)',
			},
			{
				displayName: 'Query String',
				name: 'queryString',
				type: 'string',
				default: '',
				description: 'Elasticsearch query string for advanced search',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'string',
				default: '',
				description: 'Filter by tenant ID',
			},
		],
	},

	// ----------------------------------
	//         user:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether user is active',
			},
			{
				displayName: 'Birth Date',
				name: 'birthDate',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'User birth date',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom user data',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email address',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'First name',
			},
			{
				displayName: 'Full Name',
				name: 'fullName',
				type: 'string',
				default: '',
				description: 'Full name',
			},
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				default: '',
				description: 'Profile image URL',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name',
			},
			{
				displayName: 'Middle Name',
				name: 'middleName',
				type: 'string',
				default: '',
				description: 'Middle name',
			},
			{
				displayName: 'Mobile Phone',
				name: 'mobilePhone',
				type: 'string',
				default: '',
				description: 'Mobile phone number',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'New password',
			},
			{
				displayName: 'Preferred Languages',
				name: 'preferredLanguages',
				type: 'string',
				default: '',
				description: 'Comma-separated list of preferred languages',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'User timezone',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'Username',
			},
			{
				displayName: 'Verified',
				name: 'verified',
				type: 'boolean',
				default: false,
				description: 'Whether email is verified',
			},
		],
	},

	// ----------------------------------
	//         user:bulkDelete
	// ----------------------------------
	{
		displayName: 'User IDs',
		name: 'userIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['bulkDelete'],
			},
		},
		description: 'Comma-separated list of user IDs to delete',
	},
	{
		displayName: 'Hard Delete',
		name: 'hardDelete',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['bulkDelete'],
			},
		},
		description: 'Whether to permanently delete users (true) or soft delete (false)',
	},

	// ----------------------------------
	//         user:import
	// ----------------------------------
	{
		displayName: 'Users (JSON)',
		name: 'users',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['import'],
			},
		},
		description: 'JSON array of user objects to import',
	},
	{
		displayName: 'Validate DB Constraints',
		name: 'validateDbConstraints',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['import'],
			},
		},
		description: 'Whether to validate database constraints during import',
	},

	// ----------------------------------
	//         user:changePassword
	// ----------------------------------
	{
		displayName: 'Login ID',
		name: 'loginId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['changePassword'],
			},
		},
		description: 'User email or username',
	},
	{
		displayName: 'Current Password',
		name: 'currentPassword',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['changePassword'],
			},
		},
		description: 'Current password',
	},
	{
		displayName: 'New Password',
		name: 'newPassword',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['changePassword'],
			},
		},
		description: 'New password',
	},

	// ----------------------------------
	//         user:forgotPassword
	// ----------------------------------
	{
		displayName: 'Login ID',
		name: 'loginId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['forgotPassword'],
			},
		},
		description: 'User email or username to send forgot password to',
	},
	{
		displayName: 'Application ID',
		name: 'applicationId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['forgotPassword'],
			},
		},
		description: 'Application ID for context in the forgot password email',
	},

	// ----------------------------------
	//         user:verifyEmail
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['verifyEmail'],
			},
		},
		description: 'Email address to send verification to',
	},

	// ----------------------------------
	//         user:verifyRegistration
	// ----------------------------------
	{
		displayName: 'Verification ID',
		name: 'verificationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['verifyRegistration'],
			},
		},
		description: 'Verification ID from the verification email',
	},

	// ----------------------------------
	//         user:enableTwoFactor
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['enableTwoFactor'],
			},
		},
		description: 'User ID to enable 2FA for',
	},
	{
		displayName: 'Method',
		name: 'method',
		type: 'options',
		default: 'authenticator',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['enableTwoFactor'],
			},
		},
		options: [
			{ name: 'Authenticator', value: 'authenticator' },
			{ name: 'Email', value: 'email' },
			{ name: 'SMS', value: 'sms' },
		],
		description: 'Two-factor authentication method',
	},
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['enableTwoFactor'],
			},
		},
		description: 'Verification code from authenticator app or sent via email/SMS',
	},
	{
		displayName: 'Secret',
		name: 'secret',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['enableTwoFactor'],
				method: ['authenticator'],
			},
		},
		description: 'Base32 encoded secret for authenticator method',
	},
	{
		displayName: 'Mobile Phone',
		name: 'mobilePhone',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['enableTwoFactor'],
				method: ['sms'],
			},
		},
		description: 'Mobile phone number for SMS method',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['enableTwoFactor'],
				method: ['email'],
			},
		},
		description: 'Email address for email method',
	},

	// ----------------------------------
	//         user:disableTwoFactor
	// ----------------------------------
	{
		displayName: 'Method ID',
		name: 'methodId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['disableTwoFactor'],
			},
		},
		description: 'Two-factor method ID to disable',
	},
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['disableTwoFactor'],
			},
		},
		description: 'Current two-factor verification code',
	},

	// ----------------------------------
	//         user:sendTwoFactorCode
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['sendTwoFactorCode'],
			},
		},
		description: 'User ID to send code to',
	},
	{
		displayName: 'Method ID',
		name: 'methodId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['sendTwoFactorCode'],
			},
		},
		description: 'Two-factor method ID',
	},

	// ----------------------------------
	//         user:addUserComment
	// ----------------------------------
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['addUserComment'],
			},
		},
		description: 'Comment text to add',
	},
	{
		displayName: 'Commenter ID',
		name: 'commenterId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['addUserComment'],
			},
		},
		description: 'ID of user making the comment (defaults to API key owner)',
	},

	// ----------------------------------
	//         user:updateConsents
	// ----------------------------------
	{
		displayName: 'Consent ID',
		name: 'consentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateConsents'],
			},
		},
		description: 'Consent definition ID',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 'Active',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateConsents'],
			},
		},
		options: [
			{ name: 'Active', value: 'Active' },
			{ name: 'Revoked', value: 'Revoked' },
		],
		description: 'Consent status',
	},
	{
		displayName: 'Values',
		name: 'values',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateConsents'],
			},
		},
		description: 'Comma-separated consent values (if multiple values allowed)',
	},

	// ----------------------------------
	//         user:delete options
	// ----------------------------------
	{
		displayName: 'Hard Delete',
		name: 'hardDelete',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['delete'],
			},
		},
		description: 'Whether to permanently delete the user',
	},

	// ----------------------------------
	//         user:revokeRefreshTokens options
	// ----------------------------------
	{
		displayName: 'Application ID',
		name: 'applicationId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['revokeRefreshTokens'],
			},
		},
		description: 'Optionally limit revocation to specific application',
	},

	// ----------------------------------
	//         Tenant ID option (common)
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'string',
				default: '',
				description: 'Tenant ID override for this operation',
			},
		],
	},
];
