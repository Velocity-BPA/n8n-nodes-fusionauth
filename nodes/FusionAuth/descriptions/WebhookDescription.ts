/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { FUSIONAUTH_EVENTS } from '../constants';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new webhook',
				action: 'Create a webhook',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a webhook',
				action: 'Delete a webhook',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a webhook by ID',
				action: 'Get a webhook',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many webhooks',
				action: 'Get many webhooks',
			},
			{
				name: 'Test',
				value: 'test',
				description: 'Test a webhook delivery',
				action: 'Test a webhook',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a webhook',
				action: 'Update a webhook',
			},
		],
		default: 'getAll',
	},
];

export const webhookFields: INodeProperties[] = [
	// ----------------------------------
	//         webhook: create
	// ----------------------------------
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'https://example.com/webhook',
		description: 'The webhook endpoint URL',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Events',
		name: 'eventsEnabled',
		type: 'multiOptions',
		required: true,
		default: [],
		options: Object.entries(FUSIONAUTH_EVENTS).map(([value, name]) => ({
			name: name as string,
			value,
		})),
		description: 'The events that will trigger this webhook',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Connect Timeout',
				name: 'connectTimeout',
				type: 'number',
				default: 1000,
				description: 'Connection timeout in milliseconds',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for this webhook',
			},
			{
				displayName: 'Global',
				name: 'global',
				type: 'boolean',
				default: true,
				description: 'Whether this webhook applies to all tenants',
			},
			{
				displayName: 'Headers (JSON)',
				name: 'headers',
				type: 'json',
				default: '{}',
				description: 'Custom HTTP headers to send with the webhook request',
			},
			{
				displayName: 'HTTP Auth Password',
				name: 'httpAuthenticationPassword',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Basic authentication password',
			},
			{
				displayName: 'HTTP Auth Username',
				name: 'httpAuthenticationUsername',
				type: 'string',
				default: '',
				description: 'Basic authentication username',
			},
			{
				displayName: 'Read Timeout',
				name: 'readTimeout',
				type: 'number',
				default: 2000,
				description: 'Read timeout in milliseconds',
			},
			{
				displayName: 'Signing Key Secret',
				name: 'signingKeySecret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Secret key for HMAC signature verification',
			},
			{
				displayName: 'SSL Certificate',
				name: 'sslCertificate',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Custom SSL certificate (PEM format)',
			},
			{
				displayName: 'Tenant IDs',
				name: 'tenantIds',
				type: 'string',
				default: '',
				description: 'Comma-separated tenant IDs (if not global)',
			},
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'string',
				default: '',
				description: 'Custom UUID for the webhook (auto-generated if not provided)',
			},
		],
	},

	// ----------------------------------
	//         webhook: delete
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID of the webhook to delete',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['delete'],
			},
		},
	},

	// ----------------------------------
	//         webhook: get
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID of the webhook to retrieve',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------
	//         webhook: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getAll'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
	},

	// ----------------------------------
	//         webhook: test
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID of the webhook to test',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['test'],
			},
		},
	},
	{
		displayName: 'Event Type',
		name: 'eventType',
		type: 'options',
		required: true,
		default: 'user.create',
		options: Object.entries(FUSIONAUTH_EVENTS).map(([value, name]) => ({
			name: name as string,
			value,
		})),
		description: 'The event type to use for the test',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['test'],
			},
		},
	},

	// ----------------------------------
	//         webhook: update
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID of the webhook to update',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Connect Timeout',
				name: 'connectTimeout',
				type: 'number',
				default: 1000,
				description: 'Connection timeout in milliseconds',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for this webhook',
			},
			{
				displayName: 'Events',
				name: 'eventsEnabled',
				type: 'multiOptions',
				default: [],
				options: Object.entries(FUSIONAUTH_EVENTS).map(([value, name]) => ({
					name: name as string,
					value,
				})),
				description: 'The events that will trigger this webhook',
			},
			{
				displayName: 'Global',
				name: 'global',
				type: 'boolean',
				default: true,
				description: 'Whether this webhook applies to all tenants',
			},
			{
				displayName: 'Headers (JSON)',
				name: 'headers',
				type: 'json',
				default: '{}',
				description: 'Custom HTTP headers to send with the webhook request',
			},
			{
				displayName: 'HTTP Auth Password',
				name: 'httpAuthenticationPassword',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Basic authentication password',
			},
			{
				displayName: 'HTTP Auth Username',
				name: 'httpAuthenticationUsername',
				type: 'string',
				default: '',
				description: 'Basic authentication username',
			},
			{
				displayName: 'Read Timeout',
				name: 'readTimeout',
				type: 'number',
				default: 2000,
				description: 'Read timeout in milliseconds',
			},
			{
				displayName: 'Signing Key Secret',
				name: 'signingKeySecret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Secret key for HMAC signature verification',
			},
			{
				displayName: 'SSL Certificate',
				name: 'sslCertificate',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Custom SSL certificate (PEM format)',
			},
			{
				displayName: 'Tenant IDs',
				name: 'tenantIds',
				type: 'string',
				default: '',
				description: 'Comma-separated tenant IDs (if not global)',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'The webhook endpoint URL',
			},
		],
	},
];
