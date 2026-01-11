/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { LAMBDA_TYPES } from '../constants';

export const lambdaOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lambda'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new lambda function',
				action: 'Create a lambda',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a lambda function',
				action: 'Delete a lambda',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a lambda function by ID',
				action: 'Get a lambda',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many lambda functions',
				action: 'Get many lambdas',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a lambda function',
				action: 'Update a lambda',
			},
		],
		default: 'getAll',
	},
];

export const lambdaFields: INodeProperties[] = [
	// ----------------------------------
	//         lambda: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'The name of the lambda function',
		displayOptions: {
			show: {
				resource: ['lambda'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		default: 'JWTPopulate',
		options: LAMBDA_TYPES,
		description: 'The type of lambda function',
		displayOptions: {
			show: {
				resource: ['lambda'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		required: true,
		default: 'function populate(jwt, user, registration) {\n  // Add custom claims to JWT\n}',
		description: 'The JavaScript code for the lambda function',
		displayOptions: {
			show: {
				resource: ['lambda'],
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
				resource: ['lambda'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Debug',
				name: 'debug',
				type: 'boolean',
				default: false,
				description: 'Whether debug mode is enabled for this lambda',
			},
			{
				displayName: 'Engine Type',
				name: 'engineType',
				type: 'options',
				options: [
					{
						name: 'GraalJS',
						value: 'GraalJS',
					},
					{
						name: 'Nashorn',
						value: 'Nashorn',
					},
				],
				default: 'GraalJS',
				description: 'The JavaScript engine to use for this lambda',
			},
			{
				displayName: 'Lambda ID',
				name: 'lambdaId',
				type: 'string',
				default: '',
				description: 'Custom UUID for the lambda (auto-generated if not provided)',
			},
		],
	},

	// ----------------------------------
	//         lambda: delete
	// ----------------------------------
	{
		displayName: 'Lambda ID',
		name: 'lambdaId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID of the lambda to delete',
		displayOptions: {
			show: {
				resource: ['lambda'],
				operation: ['delete'],
			},
		},
	},

	// ----------------------------------
	//         lambda: get
	// ----------------------------------
	{
		displayName: 'Lambda ID',
		name: 'lambdaId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID of the lambda to retrieve',
		displayOptions: {
			show: {
				resource: ['lambda'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------
	//         lambda: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['lambda'],
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
				resource: ['lambda'],
				operation: ['getAll'],
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
				resource: ['lambda'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: LAMBDA_TYPES,
				default: '',
				description: 'Filter by lambda type',
			},
		],
	},

	// ----------------------------------
	//         lambda: update
	// ----------------------------------
	{
		displayName: 'Lambda ID',
		name: 'lambdaId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID of the lambda to update',
		displayOptions: {
			show: {
				resource: ['lambda'],
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
				resource: ['lambda'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: '',
				description: 'The JavaScript code for the lambda function',
			},
			{
				displayName: 'Debug',
				name: 'debug',
				type: 'boolean',
				default: false,
				description: 'Whether debug mode is enabled for this lambda',
			},
			{
				displayName: 'Engine Type',
				name: 'engineType',
				type: 'options',
				options: [
					{
						name: 'GraalJS',
						value: 'GraalJS',
					},
					{
						name: 'Nashorn',
						value: 'Nashorn',
					},
				],
				default: 'GraalJS',
				description: 'The JavaScript engine to use for this lambda',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the lambda function',
			},
		],
	},
];
