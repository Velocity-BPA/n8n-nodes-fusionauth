/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Add Members',
				value: 'addMembers',
				description: 'Add users to a group',
				action: 'Add members to group',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new group',
				action: 'Create group',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a group',
				action: 'Delete group',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a group by ID',
				action: 'Get group',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all groups',
				action: 'Get all groups',
			},
			{
				name: 'Get Members',
				value: 'getMembers',
				description: 'Get members of a group',
				action: 'Get group members',
			},
			{
				name: 'Remove Members',
				value: 'removeMembers',
				description: 'Remove users from a group',
				action: 'Remove members from group',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a group',
				action: 'Update group',
			},
		],
		default: 'get',
	},
];

export const groupFields: INodeProperties[] = [
	// ----------------------------------
	//         group:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		description: 'Name of the group',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom group data',
			},
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'string',
				default: '',
				description: 'Specify a UUID for the group (optional)',
			},
			{
				displayName: 'Role IDs (JSON)',
				name: 'roleIds',
				type: 'json',
				default: '[]',
				description: 'Application role IDs to assign to group members',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'string',
				default: '',
				description: 'Tenant ID for this group',
			},
		],
	},

	// ----------------------------------
	//         group:get
	// ----------------------------------
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['get', 'update', 'delete', 'addMembers', 'removeMembers', 'getMembers'],
			},
		},
		description: 'Unique identifier of the group',
	},

	// ----------------------------------
	//         group:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['group'],
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
				resource: ['group'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         group:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Custom Data (JSON)',
				name: 'data',
				type: 'json',
				default: '{}',
				description: 'Custom group data',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Group name',
			},
			{
				displayName: 'Role IDs (JSON)',
				name: 'roleIds',
				type: 'json',
				default: '[]',
				description: 'Application role IDs to assign to group members',
			},
		],
	},

	// ----------------------------------
	//         group:addMembers
	// ----------------------------------
	{
		displayName: 'Member IDs',
		name: 'memberIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['addMembers', 'removeMembers'],
			},
		},
		description: 'Comma-separated list of user IDs to add/remove',
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
				resource: ['group'],
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
