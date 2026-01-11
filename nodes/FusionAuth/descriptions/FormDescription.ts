/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { FORM_TYPES } from '../constants';

export const formOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['form'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new form',
				action: 'Create form',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a form',
				action: 'Delete form',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a form by ID',
				action: 'Get form',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all forms',
				action: 'Get all forms',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a form',
				action: 'Update form',
			},
		],
		default: 'get',
	},
];

export const formFields: INodeProperties[] = [
	// ----------------------------------
	//         form:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['create'],
			},
		},
		description: 'Name of the form',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: FORM_TYPES,
		default: 'registration',
		required: true,
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['create'],
			},
		},
		description: 'Type of form',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom form data',
			},
			{
				displayName: 'Form ID',
				name: 'formId',
				type: 'string',
				default: '',
				description: 'Specify a UUID for the form (optional)',
			},
			{
				displayName: 'Steps (JSON)',
				name: 'steps',
				type: 'json',
				default: '[]',
				description: 'Form steps as JSON array',
			},
		],
	},

	// ----------------------------------
	//         form:get
	// ----------------------------------
	{
		displayName: 'Form ID',
		name: 'formId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'Unique identifier of the form',
	},

	// ----------------------------------
	//         form:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['form'],
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
				resource: ['form'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         form:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom form data',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Form name',
			},
			{
				displayName: 'Steps (JSON)',
				name: 'steps',
				type: 'json',
				default: '[]',
				description: 'Form steps as JSON array',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: FORM_TYPES,
				default: 'registration',
				description: 'Form type',
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
				resource: ['form'],
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
