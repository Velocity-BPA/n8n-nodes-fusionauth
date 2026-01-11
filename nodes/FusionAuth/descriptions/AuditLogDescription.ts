/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const auditLogOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['auditLog'],
			},
		},
		options: [
			{
				name: 'Export',
				value: 'export',
				description: 'Export audit logs',
				action: 'Export audit logs',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an audit log entry by ID',
				action: 'Get an audit log',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search audit logs',
				action: 'Search audit logs',
			},
		],
		default: 'search',
	},
];

export const auditLogFields: INodeProperties[] = [
	// ----------------------------------
	//         auditLog: get
	// ----------------------------------
	{
		displayName: 'Audit Log ID',
		name: 'auditLogId',
		type: 'number',
		required: true,
		default: 0,
		description: 'The ID of the audit log entry to retrieve',
		displayOptions: {
			show: {
				resource: ['auditLog'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------
	//         auditLog: search
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['auditLog'],
				operation: ['search'],
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
				resource: ['auditLog'],
				operation: ['search'],
				returnAll: [false],
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['auditLog'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'end',
				type: 'dateTime',
				default: '',
				description: 'End date for the search range (ISO 8601 format)',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'Filter by message content (partial match)',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{
						name: 'Insert Instant',
						value: 'insertInstant',
					},
					{
						name: 'Insert User',
						value: 'insertUser',
					},
					{
						name: 'Message',
						value: 'message',
					},
				],
				default: 'insertInstant',
				description: 'Field to sort by',
			},
			{
				displayName: 'Reason',
				name: 'reason',
				type: 'string',
				default: '',
				description: 'Filter by reason',
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{
						name: 'Ascending',
						value: 'ASC',
					},
					{
						name: 'Descending',
						value: 'DESC',
					},
				],
				default: 'DESC',
				description: 'Sort order for results',
			},
			{
				displayName: 'Start Date',
				name: 'start',
				type: 'dateTime',
				default: '',
				description: 'Start date for the search range (ISO 8601 format)',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				description: 'Filter by user email or username',
			},
		],
	},

	// ----------------------------------
	//         auditLog: export
	// ----------------------------------
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		required: true,
		default: 'zip',
		options: [
			{
				name: 'ZIP',
				value: 'zip',
			},
		],
		description: 'Export format',
		displayOptions: {
			show: {
				resource: ['auditLog'],
				operation: ['export'],
			},
		},
	},
	{
		displayName: 'Export Options',
		name: 'exportOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['auditLog'],
				operation: ['export'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'end',
				type: 'dateTime',
				default: '',
				description: 'End date for the export range (ISO 8601 format)',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'Filter by message content',
			},
			{
				displayName: 'Reason',
				name: 'reason',
				type: 'string',
				default: '',
				description: 'Filter by reason',
			},
			{
				displayName: 'Start Date',
				name: 'start',
				type: 'dateTime',
				default: '',
				description: 'Start date for the export range (ISO 8601 format)',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				description: 'Filter by user email or username',
			},
		],
	},
];
