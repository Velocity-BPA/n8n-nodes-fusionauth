/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const applicationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['application'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new application',
				action: 'Create application',
			},
			{
				name: 'Create Role',
				value: 'createRole',
				description: 'Create a role for an application',
				action: 'Create application role',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an application',
				action: 'Delete application',
			},
			{
				name: 'Delete Role',
				value: 'deleteRole',
				description: 'Delete a role from an application',
				action: 'Delete application role',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an application by ID',
				action: 'Get application',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all applications',
				action: 'Get all applications',
			},
			{
				name: 'Get OAuth Configuration',
				value: 'getOAuthConfiguration',
				description: 'Get OAuth configuration for an application',
				action: 'Get OAuth configuration',
			},
			{
				name: 'Get Roles',
				value: 'getRoles',
				description: 'Get roles for an application',
				action: 'Get application roles',
			},
			{
				name: 'Patch',
				value: 'patch',
				description: 'Partial update of an application',
				action: 'Patch application',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an application',
				action: 'Update application',
			},
			{
				name: 'Update Role',
				value: 'updateRole',
				description: 'Update a role in an application',
				action: 'Update application role',
			},
		],
		default: 'get',
	},
];

export const applicationFields: INodeProperties[] = [
	// ----------------------------------
	//         application:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['create'],
			},
		},
		description: 'Name of the application',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether application is active',
			},
			{
				displayName: 'Application ID',
				name: 'applicationId',
				type: 'string',
				default: '',
				description: 'Specify a UUID for the application (optional)',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom application data',
			},
			{
				displayName: 'Email Configuration (JSON)',
				name: 'emailConfiguration',
				type: 'json',
				default: '{}',
				description: 'Email configuration settings',
			},
			{
				displayName: 'Form Configuration (JSON)',
				name: 'formConfiguration',
				type: 'json',
				default: '{}',
				description: 'Form configuration settings',
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
				displayName: 'Multi-Factor Configuration (JSON)',
				name: 'multiFactorConfiguration',
				type: 'json',
				default: '{}',
				description: 'MFA configuration settings',
			},
			{
				displayName: 'OAuth Configuration (JSON)',
				name: 'oauthConfiguration',
				type: 'json',
				default: '{}',
				description: 'OAuth configuration settings',
			},
			{
				displayName: 'Registration Configuration (JSON)',
				name: 'registrationConfiguration',
				type: 'json',
				default: '{}',
				description: 'Registration configuration settings',
			},
			{
				displayName: 'Roles (JSON)',
				name: 'roles',
				type: 'json',
				default: '[]',
				description: 'Application roles as JSON array',
			},
			{
				displayName: 'SAMLv2 Configuration (JSON)',
				name: 'samlv2Configuration',
				type: 'json',
				default: '{}',
				description: 'SAML configuration settings',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'string',
				default: '',
				description: 'Tenant ID for this application',
			},
		],
	},

	// ----------------------------------
	//         application:get
	// ----------------------------------
	{
		displayName: 'Application ID',
		name: 'applicationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['get', 'update', 'patch', 'delete', 'getOAuthConfiguration', 'getRoles', 'createRole'],
			},
		},
		description: 'Unique identifier of the application',
	},

	// ----------------------------------
	//         application:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['application'],
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
				resource: ['application'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         application:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether application is active',
			},
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom application data',
			},
			{
				displayName: 'Email Configuration (JSON)',
				name: 'emailConfiguration',
				type: 'json',
				default: '{}',
				description: 'Email configuration settings',
			},
			{
				displayName: 'Form Configuration (JSON)',
				name: 'formConfiguration',
				type: 'json',
				default: '{}',
				description: 'Form configuration settings',
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
				displayName: 'Multi-Factor Configuration (JSON)',
				name: 'multiFactorConfiguration',
				type: 'json',
				default: '{}',
				description: 'MFA configuration settings',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Application name',
			},
			{
				displayName: 'OAuth Configuration (JSON)',
				name: 'oauthConfiguration',
				type: 'json',
				default: '{}',
				description: 'OAuth configuration settings',
			},
			{
				displayName: 'Registration Configuration (JSON)',
				name: 'registrationConfiguration',
				type: 'json',
				default: '{}',
				description: 'Registration configuration settings',
			},
			{
				displayName: 'SAMLv2 Configuration (JSON)',
				name: 'samlv2Configuration',
				type: 'json',
				default: '{}',
				description: 'SAML configuration settings',
			},
		],
	},

	// ----------------------------------
	//         application:createRole
	// ----------------------------------
	{
		displayName: 'Role Name',
		name: 'roleName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['createRole'],
			},
		},
		description: 'Name of the role',
	},
	{
		displayName: 'Role Options',
		name: 'roleOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['createRole'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Role description',
			},
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				description: 'Whether this role is assigned by default',
			},
			{
				displayName: 'Is Super Role',
				name: 'isSuperRole',
				type: 'boolean',
				default: false,
				description: 'Whether this is a super role',
			},
			{
				displayName: 'Role ID',
				name: 'roleId',
				type: 'string',
				default: '',
				description: 'Specify a UUID for the role (optional)',
			},
		],
	},

	// ----------------------------------
	//         application:updateRole / deleteRole
	// ----------------------------------
	{
		displayName: 'Application ID',
		name: 'applicationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['updateRole', 'deleteRole'],
			},
		},
		description: 'Application ID containing the role',
	},
	{
		displayName: 'Role ID',
		name: 'roleId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['updateRole', 'deleteRole'],
			},
		},
		description: 'Role ID',
	},
	{
		displayName: 'Update Role Fields',
		name: 'updateRoleFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['updateRole'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Role description',
			},
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				description: 'Whether this role is assigned by default',
			},
			{
				displayName: 'Is Super Role',
				name: 'isSuperRole',
				type: 'boolean',
				default: false,
				description: 'Whether this is a super role',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Role name',
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
				resource: ['application'],
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
