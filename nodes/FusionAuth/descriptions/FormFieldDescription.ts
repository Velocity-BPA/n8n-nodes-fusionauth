/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { FORM_FIELD_CONTROLS, FORM_FIELD_TYPES } from '../constants';

export const formFieldOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['formField'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new form field',
				action: 'Create form field',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a form field',
				action: 'Delete form field',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a form field by ID',
				action: 'Get form field',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all form fields',
				action: 'Get all form fields',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a form field',
				action: 'Update form field',
			},
		],
		default: 'get',
	},
];

export const formFieldFields: INodeProperties[] = [
	// ----------------------------------
	//         formField:create
	// ----------------------------------
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'user.data.customField',
		displayOptions: {
			show: {
				resource: ['formField'],
				operation: ['create'],
			},
		},
		description: 'Field key path (e.g., user.data.xxx or registration.data.xxx)',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['formField'],
				operation: ['create'],
			},
		},
		description: 'Display name of the field',
	},
	{
		displayName: 'Control',
		name: 'control',
		type: 'options',
		options: FORM_FIELD_CONTROLS,
		default: 'text',
		required: true,
		displayOptions: {
			show: {
				resource: ['formField'],
				operation: ['create'],
			},
		},
		description: 'Field control type',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: FORM_FIELD_TYPES,
		default: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['formField'],
				operation: ['create'],
			},
		},
		description: 'Field data type',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['formField'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Confirm',
				name: 'confirm',
				type: 'boolean',
				default: false,
				description: 'Whether field requires confirmation (e.g., password)',
			},
			{
				displayName: 'Consent ID',
				name: 'consentId',
				type: 'string',
				default: '',
				description: 'Associated consent ID (for consent fields)',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom field data',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Field description',
			},
			{
				displayName: 'Field ID',
				name: 'fieldId',
				type: 'string',
				default: '',
				description: 'Specify a UUID for the field (optional)',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'string',
				default: '',
				placeholder: 'option1,option2,option3',
				description: 'Comma-separated options for select/radio fields',
			},
			{
				displayName: 'Required',
				name: 'required',
				type: 'boolean',
				default: false,
				description: 'Whether field is required',
			},
			{
				displayName: 'Validator (JSON)',
				name: 'validator',
				type: 'json',
				default: '{}',
				description: 'Validation settings as JSON',
			},
		],
	},

	// ----------------------------------
	//         formField:get
	// ----------------------------------
	{
		displayName: 'Field ID',
		name: 'fieldId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['formField'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'Unique identifier of the form field',
	},

	// ----------------------------------
	//         formField:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['formField'],
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
				resource: ['formField'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         formField:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['formField'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Confirm',
				name: 'confirm',
				type: 'boolean',
				default: false,
				description: 'Whether field requires confirmation',
			},
			{
				displayName: 'Consent ID',
				name: 'consentId',
				type: 'string',
				default: '',
				description: 'Associated consent ID',
			},
			{
				displayName: 'Control',
				name: 'control',
				type: 'options',
				options: FORM_FIELD_CONTROLS,
				default: 'text',
				description: 'Field control type',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom field data',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Field description',
			},
			{
				displayName: 'Key',
				name: 'key',
				type: 'string',
				default: '',
				description: 'Field key path',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Field display name',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'string',
				default: '',
				description: 'Comma-separated options for select/radio fields',
			},
			{
				displayName: 'Required',
				name: 'required',
				type: 'boolean',
				default: false,
				description: 'Whether field is required',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: FORM_FIELD_TYPES,
				default: 'string',
				description: 'Field data type',
			},
			{
				displayName: 'Validator (JSON)',
				name: 'validator',
				type: 'json',
				default: '{}',
				description: 'Validation settings as JSON',
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
				resource: ['formField'],
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
