/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const consentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['consent'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a consent definition',
				action: 'Create consent',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a consent definition',
				action: 'Delete consent',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a consent by ID',
				action: 'Get consent',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all consents',
				action: 'Get all consents',
			},
			{
				name: 'Get User Consents',
				value: 'getUserConsents',
				description: 'Get consent status for a user',
				action: 'Get user consents',
			},
			{
				name: 'Grant User Consent',
				value: 'grantUserConsent',
				description: 'Grant consent for a user',
				action: 'Grant user consent',
			},
			{
				name: 'Revoke User Consent',
				value: 'revokeUserConsent',
				description: 'Revoke consent for a user',
				action: 'Revoke user consent',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a consent definition',
				action: 'Update consent',
			},
		],
		default: 'get',
	},
];

export const consentFields: INodeProperties[] = [
	// ----------------------------------
	//         consent:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['consent'],
				operation: ['create'],
			},
		},
		description: 'Name of the consent',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['consent'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Consent Email Template ID',
				name: 'consentEmailTemplateId',
				type: 'string',
				default: '',
				description: 'Email template ID for consent requests',
			},
			{
				displayName: 'Consent ID',
				name: 'consentId',
				type: 'string',
				default: '',
				description: 'Specify a UUID for the consent (optional)',
			},
			{
				displayName: 'Country Minimum Age for Self Consent (JSON)',
				name: 'countryMinimumAgeForSelfConsent',
				type: 'json',
				default: '{}',
				description: 'Age thresholds by country code',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom consent data',
			},
			{
				displayName: 'Default Minimum Age for Self Consent',
				name: 'defaultMinimumAgeForSelfConsent',
				type: 'number',
				default: 13,
				description: 'Default age threshold for self-consent',
			},
			{
				displayName: 'Email Plus Configuration (JSON)',
				name: 'emailPlus',
				type: 'json',
				default: '{}',
				description: 'Email Plus consent configuration',
			},
			{
				displayName: 'Multiple Values Allowed',
				name: 'multipleValuesAllowed',
				type: 'boolean',
				default: false,
				description: 'Whether multiple consent values are allowed',
			},
			{
				displayName: 'Values',
				name: 'values',
				type: 'string',
				default: '',
				placeholder: 'marketing,analytics,thirdparty',
				description: 'Comma-separated allowed consent values',
			},
		],
	},

	// ----------------------------------
	//         consent:get
	// ----------------------------------
	{
		displayName: 'Consent ID',
		name: 'consentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['consent'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'Unique identifier of the consent',
	},

	// ----------------------------------
	//         consent:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['consent'],
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
				resource: ['consent'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         consent:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['consent'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Consent Email Template ID',
				name: 'consentEmailTemplateId',
				type: 'string',
				default: '',
				description: 'Email template ID for consent requests',
			},
			{
				displayName: 'Country Minimum Age for Self Consent (JSON)',
				name: 'countryMinimumAgeForSelfConsent',
				type: 'json',
				default: '{}',
				description: 'Age thresholds by country code',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom consent data',
			},
			{
				displayName: 'Default Minimum Age for Self Consent',
				name: 'defaultMinimumAgeForSelfConsent',
				type: 'number',
				default: 13,
				description: 'Default age threshold for self-consent',
			},
			{
				displayName: 'Email Plus Configuration (JSON)',
				name: 'emailPlus',
				type: 'json',
				default: '{}',
				description: 'Email Plus consent configuration',
			},
			{
				displayName: 'Multiple Values Allowed',
				name: 'multipleValuesAllowed',
				type: 'boolean',
				default: false,
				description: 'Whether multiple consent values are allowed',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Consent name',
			},
			{
				displayName: 'Values',
				name: 'values',
				type: 'string',
				default: '',
				description: 'Comma-separated allowed consent values',
			},
		],
	},

	// ----------------------------------
	//         consent:getUserConsents
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['consent'],
				operation: ['getUserConsents', 'grantUserConsent', 'revokeUserConsent'],
			},
		},
		description: 'User ID to get/grant/revoke consents for',
	},

	// ----------------------------------
	//         consent:grantUserConsent
	// ----------------------------------
	{
		displayName: 'Consent ID',
		name: 'consentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['consent'],
				operation: ['grantUserConsent', 'revokeUserConsent'],
			},
		},
		description: 'Consent definition ID',
	},
	{
		displayName: 'Consent Options',
		name: 'consentOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['consent'],
				operation: ['grantUserConsent'],
			},
		},
		options: [
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom consent data',
			},
			{
				displayName: 'Giver User ID',
				name: 'giverUserId',
				type: 'string',
				default: '',
				description: 'ID of user giving consent (for parental consent)',
			},
			{
				displayName: 'Values',
				name: 'values',
				type: 'string',
				default: '',
				description: 'Comma-separated consent values',
			},
		],
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
				resource: ['consent'],
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
