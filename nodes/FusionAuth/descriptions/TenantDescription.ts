/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const tenantOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tenant'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new tenant',
				action: 'Create tenant',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a tenant',
				action: 'Delete tenant',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a tenant by ID',
				action: 'Get tenant',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all tenants',
				action: 'Get all tenants',
			},
			{
				name: 'Patch',
				value: 'patch',
				description: 'Partial update of a tenant',
				action: 'Patch tenant',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a tenant',
				action: 'Update tenant',
			},
		],
		default: 'get',
	},
];

export const tenantFields: INodeProperties[] = [
	// ----------------------------------
	//         tenant:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['tenant'],
				operation: ['create'],
			},
		},
		description: 'Name of the tenant',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['tenant'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom tenant data',
			},
			{
				displayName: 'Email Configuration (JSON)',
				name: 'emailConfiguration',
				type: 'json',
				default: '{}',
				description: 'Email/SMTP configuration settings',
			},
			{
				displayName: 'Event Configuration (JSON)',
				name: 'eventConfiguration',
				type: 'json',
				default: '{}',
				description: 'Event/webhook configuration',
			},
			{
				displayName: 'External Identifier Configuration (JSON)',
				name: 'externalIdentifierConfiguration',
				type: 'json',
				default: '{}',
				description: 'Token TTL settings',
			},
			{
				displayName: 'Failed Authentication Configuration (JSON)',
				name: 'failedAuthenticationConfiguration',
				type: 'json',
				default: '{}',
				description: 'Account lockout settings',
			},
			{
				displayName: 'Family Configuration (JSON)',
				name: 'familyConfiguration',
				type: 'json',
				default: '{}',
				description: 'Family management settings',
			},
			{
				displayName: 'Form Configuration (JSON)',
				name: 'formConfiguration',
				type: 'json',
				default: '{}',
				description: 'Form configuration settings',
			},
			{
				displayName: 'HTTP Session Max Inactive Interval',
				name: 'httpSessionMaxInactiveInterval',
				type: 'number',
				default: 3600,
				description: 'Session timeout in seconds',
			},
			{
				displayName: 'Issuer',
				name: 'issuer',
				type: 'string',
				default: '',
				description: 'JWT issuer',
			},
			{
				displayName: 'JWT Configuration (JSON)',
				name: 'jwtConfiguration',
				type: 'json',
				default: '{}',
				description: 'JWT configuration settings',
			},
			{
				displayName: 'Login Configuration (JSON)',
				name: 'loginConfiguration',
				type: 'json',
				default: '{}',
				description: 'Login configuration settings',
			},
			{
				displayName: 'Maximum Password Age (JSON)',
				name: 'maximumPasswordAge',
				type: 'json',
				default: '{}',
				description: 'Password age settings',
			},
			{
				displayName: 'Minimum Password Age (JSON)',
				name: 'minimumPasswordAge',
				type: 'json',
				default: '{}',
				description: 'Password change cooldown',
			},
			{
				displayName: 'Multi-Factor Configuration (JSON)',
				name: 'multiFactorConfiguration',
				type: 'json',
				default: '{}',
				description: 'MFA settings',
			},
			{
				displayName: 'Password Encryption Configuration (JSON)',
				name: 'passwordEncryptionConfiguration',
				type: 'json',
				default: '{}',
				description: 'Password hashing settings',
			},
			{
				displayName: 'Password Validation Rules (JSON)',
				name: 'passwordValidationRules',
				type: 'json',
				default: '{}',
				description: 'Password requirements',
			},
			{
				displayName: 'Rate Limit Configuration (JSON)',
				name: 'rateLimitConfiguration',
				type: 'json',
				default: '{}',
				description: 'Rate limiting settings',
			},
			{
				displayName: 'Registration Configuration (JSON)',
				name: 'registrationConfiguration',
				type: 'json',
				default: '{}',
				description: 'Registration settings',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'string',
				default: '',
				description: 'Specify a UUID for the tenant (optional)',
			},
			{
				displayName: 'User Delete Policy (JSON)',
				name: 'userDeletePolicy',
				type: 'json',
				default: '{}',
				description: 'User deletion policy settings',
			},
		],
	},

	// ----------------------------------
	//         tenant:get
	// ----------------------------------
	{
		displayName: 'Tenant ID',
		name: 'tenantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['tenant'],
				operation: ['get', 'update', 'patch', 'delete'],
			},
		},
		description: 'Unique identifier of the tenant',
	},

	// ----------------------------------
	//         tenant:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['tenant'],
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
		},
		displayOptions: {
			show: {
				resource: ['tenant'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         tenant:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['tenant'],
				operation: ['update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom tenant data',
			},
			{
				displayName: 'Email Configuration (JSON)',
				name: 'emailConfiguration',
				type: 'json',
				default: '{}',
				description: 'Email/SMTP configuration',
			},
			{
				displayName: 'Event Configuration (JSON)',
				name: 'eventConfiguration',
				type: 'json',
				default: '{}',
				description: 'Event/webhook configuration',
			},
			{
				displayName: 'External Identifier Configuration (JSON)',
				name: 'externalIdentifierConfiguration',
				type: 'json',
				default: '{}',
				description: 'Token TTL settings',
			},
			{
				displayName: 'Failed Authentication Configuration (JSON)',
				name: 'failedAuthenticationConfiguration',
				type: 'json',
				default: '{}',
				description: 'Account lockout settings',
			},
			{
				displayName: 'Family Configuration (JSON)',
				name: 'familyConfiguration',
				type: 'json',
				default: '{}',
				description: 'Family management settings',
			},
			{
				displayName: 'Form Configuration (JSON)',
				name: 'formConfiguration',
				type: 'json',
				default: '{}',
				description: 'Form configuration settings',
			},
			{
				displayName: 'HTTP Session Max Inactive Interval',
				name: 'httpSessionMaxInactiveInterval',
				type: 'number',
				default: 3600,
				description: 'Session timeout in seconds',
			},
			{
				displayName: 'Issuer',
				name: 'issuer',
				type: 'string',
				default: '',
				description: 'JWT issuer',
			},
			{
				displayName: 'JWT Configuration (JSON)',
				name: 'jwtConfiguration',
				type: 'json',
				default: '{}',
				description: 'JWT configuration settings',
			},
			{
				displayName: 'Login Configuration (JSON)',
				name: 'loginConfiguration',
				type: 'json',
				default: '{}',
				description: 'Login configuration settings',
			},
			{
				displayName: 'Maximum Password Age (JSON)',
				name: 'maximumPasswordAge',
				type: 'json',
				default: '{}',
				description: 'Password age settings',
			},
			{
				displayName: 'Minimum Password Age (JSON)',
				name: 'minimumPasswordAge',
				type: 'json',
				default: '{}',
				description: 'Password change cooldown',
			},
			{
				displayName: 'Multi-Factor Configuration (JSON)',
				name: 'multiFactorConfiguration',
				type: 'json',
				default: '{}',
				description: 'MFA settings',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Tenant name',
			},
			{
				displayName: 'Password Encryption Configuration (JSON)',
				name: 'passwordEncryptionConfiguration',
				type: 'json',
				default: '{}',
				description: 'Password hashing settings',
			},
			{
				displayName: 'Password Validation Rules (JSON)',
				name: 'passwordValidationRules',
				type: 'json',
				default: '{}',
				description: 'Password requirements',
			},
			{
				displayName: 'Rate Limit Configuration (JSON)',
				name: 'rateLimitConfiguration',
				type: 'json',
				default: '{}',
				description: 'Rate limiting settings',
			},
			{
				displayName: 'Registration Configuration (JSON)',
				name: 'registrationConfiguration',
				type: 'json',
				default: '{}',
				description: 'Registration settings',
			},
			{
				displayName: 'User Delete Policy (JSON)',
				name: 'userDeletePolicy',
				type: 'json',
				default: '{}',
				description: 'User deletion policy settings',
			},
		],
	},
];
