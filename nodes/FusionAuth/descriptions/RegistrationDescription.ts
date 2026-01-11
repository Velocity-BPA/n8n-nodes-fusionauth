/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const registrationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['registration'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Register a user to an application',
				action: 'Create registration',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Remove a registration',
				action: 'Delete registration',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a registration by user and application ID',
				action: 'Get registration',
			},
			{
				name: 'Patch',
				value: 'patch',
				description: 'Partial update of a registration',
				action: 'Patch registration',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a registration',
				action: 'Update registration',
			},
			{
				name: 'Verify',
				value: 'verify',
				description: 'Verify a registration',
				action: 'Verify registration',
			},
		],
		default: 'get',
	},
];

export const registrationFields: INodeProperties[] = [
	// ----------------------------------
	//         registration:create
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['registration'],
				operation: ['create', 'get', 'update', 'patch', 'delete'],
			},
		},
		description: 'User ID for the registration',
	},
	{
		displayName: 'Application ID',
		name: 'applicationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['registration'],
				operation: ['create', 'get', 'update', 'patch', 'delete'],
			},
		},
		description: 'Application ID for the registration',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['registration'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom registration data',
			},
			{
				displayName: 'Generate Authentication Token',
				name: 'generateAuthenticationToken',
				type: 'boolean',
				default: false,
				description: 'Whether to generate an authentication token',
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
				displayName: 'Roles',
				name: 'roles',
				type: 'string',
				default: '',
				placeholder: 'admin,user',
				description: 'Comma-separated list of application roles',
			},
			{
				displayName: 'Skip Registration Verification',
				name: 'skipRegistrationVerification',
				type: 'boolean',
				default: false,
				description: 'Whether to skip registration verification',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				placeholder: 'America/New_York',
				description: 'Registration timezone',
			},
			{
				displayName: 'Tokens (JSON)',
				name: 'tokens',
				type: 'json',
				default: '{}',
				description: 'Custom tokens as JSON object',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'Application-specific username',
			},
			{
				displayName: 'Verified',
				name: 'verified',
				type: 'boolean',
				default: false,
				description: 'Whether registration is verified',
			},
		],
	},

	// ----------------------------------
	//         registration:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['registration'],
				operation: ['update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom registration data',
			},
			{
				displayName: 'Preferred Languages',
				name: 'preferredLanguages',
				type: 'string',
				default: '',
				description: 'Comma-separated list of preferred languages',
			},
			{
				displayName: 'Roles',
				name: 'roles',
				type: 'string',
				default: '',
				description: 'Comma-separated list of application roles',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'Registration timezone',
			},
			{
				displayName: 'Tokens (JSON)',
				name: 'tokens',
				type: 'json',
				default: '{}',
				description: 'Custom tokens as JSON object',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'Application-specific username',
			},
			{
				displayName: 'Verified',
				name: 'verified',
				type: 'boolean',
				default: false,
				description: 'Whether registration is verified',
			},
		],
	},

	// ----------------------------------
	//         registration:verify
	// ----------------------------------
	{
		displayName: 'Verification ID',
		name: 'verificationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['registration'],
				operation: ['verify'],
			},
		},
		description: 'Verification ID from the verification email',
	},

	// ----------------------------------
	//         Options (common)
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['registration'],
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
