/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { IDENTITY_PROVIDER_TYPES, LINKING_STRATEGIES } from '../constants';

export const identityProviderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an identity provider',
				action: 'Create identity provider',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an identity provider',
				action: 'Delete identity provider',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an identity provider by ID',
				action: 'Get identity provider',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all identity providers',
				action: 'Get all identity providers',
			},
			{
				name: 'Link',
				value: 'link',
				description: 'Link a user to an identity provider',
				action: 'Link user to IdP',
			},
			{
				name: 'Lookup',
				value: 'lookup',
				description: 'Lookup user by identity provider link',
				action: 'Lookup user by IdP',
			},
			{
				name: 'Unlink',
				value: 'unlink',
				description: 'Unlink a user from an identity provider',
				action: 'Unlink user from IdP',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an identity provider',
				action: 'Update identity provider',
			},
		],
		default: 'get',
	},
];

export const identityProviderFields: INodeProperties[] = [
	// ----------------------------------
	//         identityProvider:create
	// ----------------------------------
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: IDENTITY_PROVIDER_TYPES,
		default: 'OpenIDConnect',
		required: true,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['create'],
			},
		},
		description: 'Type of identity provider',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['create'],
			},
		},
		description: 'Name of the identity provider',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Application Configuration (JSON)',
				name: 'applicationConfiguration',
				type: 'json',
				default: '{}',
				description: 'Per-application settings',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom identity provider data',
			},
			{
				displayName: 'Debug',
				name: 'debug',
				type: 'boolean',
				default: false,
				description: 'Whether to enable debug mode',
			},
			{
				displayName: 'Domains',
				name: 'domains',
				type: 'string',
				default: '',
				placeholder: 'example.com,company.org',
				description: 'Comma-separated email domains for IdP discovery',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether identity provider is enabled',
			},
			{
				displayName: 'Identity Provider ID',
				name: 'identityProviderId',
				type: 'string',
				default: '',
				description: 'Specify a UUID for the IdP (optional)',
			},
			{
				displayName: 'Lambda Configuration (JSON)',
				name: 'lambdaConfiguration',
				type: 'json',
				default: '{}',
				description: 'Lambda function configuration',
			},
			{
				displayName: 'Linking Strategy',
				name: 'linkingStrategy',
				type: 'options',
				options: LINKING_STRATEGIES,
				default: 'LinkByEmail',
				description: 'User linking strategy',
			},
			{
				displayName: 'OAuth2 Configuration (JSON)',
				name: 'oauth2',
				type: 'json',
				default: '{}',
				description: 'OAuth2 settings for OAuth-based IdPs',
			},
			{
				displayName: 'Tenant Configuration (JSON)',
				name: 'tenantConfiguration',
				type: 'json',
				default: '{}',
				description: 'Per-tenant settings',
			},
		],
	},

	// ----------------------------------
	//         identityProvider:get
	// ----------------------------------
	{
		displayName: 'Identity Provider ID',
		name: 'identityProviderId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'Unique identifier of the identity provider',
	},

	// ----------------------------------
	//         identityProvider:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
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
				resource: ['identityProvider'],
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
				resource: ['identityProvider'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Application ID',
				name: 'applicationId',
				type: 'string',
				default: '',
				description: 'Filter by application ID',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: IDENTITY_PROVIDER_TYPES,
				default: '',
				description: 'Filter by IdP type',
			},
		],
	},

	// ----------------------------------
	//         identityProvider:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Application Configuration (JSON)',
				name: 'applicationConfiguration',
				type: 'json',
				default: '{}',
				description: 'Per-application settings',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom identity provider data',
			},
			{
				displayName: 'Debug',
				name: 'debug',
				type: 'boolean',
				default: false,
				description: 'Whether to enable debug mode',
			},
			{
				displayName: 'Domains',
				name: 'domains',
				type: 'string',
				default: '',
				description: 'Comma-separated email domains for IdP discovery',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether identity provider is enabled',
			},
			{
				displayName: 'Lambda Configuration (JSON)',
				name: 'lambdaConfiguration',
				type: 'json',
				default: '{}',
				description: 'Lambda function configuration',
			},
			{
				displayName: 'Linking Strategy',
				name: 'linkingStrategy',
				type: 'options',
				options: LINKING_STRATEGIES,
				default: 'LinkByEmail',
				description: 'User linking strategy',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Identity provider name',
			},
			{
				displayName: 'OAuth2 Configuration (JSON)',
				name: 'oauth2',
				type: 'json',
				default: '{}',
				description: 'OAuth2 settings for OAuth-based IdPs',
			},
			{
				displayName: 'Tenant Configuration (JSON)',
				name: 'tenantConfiguration',
				type: 'json',
				default: '{}',
				description: 'Per-tenant settings',
			},
		],
	},

	// ----------------------------------
	//         identityProvider:lookup
	// ----------------------------------
	{
		displayName: 'Identity Provider ID',
		name: 'identityProviderId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['lookup', 'link', 'unlink'],
			},
		},
		description: 'Identity provider ID',
	},
	{
		displayName: 'Identity Provider User ID',
		name: 'identityProviderUserId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['lookup'],
			},
		},
		description: 'User ID from the identity provider',
	},

	// ----------------------------------
	//         identityProvider:link
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['link', 'unlink'],
			},
		},
		description: 'FusionAuth user ID',
	},
	{
		displayName: 'Identity Provider User ID',
		name: 'identityProviderUserId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['link'],
			},
		},
		description: 'User ID from the identity provider',
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
				resource: ['identityProvider'],
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
