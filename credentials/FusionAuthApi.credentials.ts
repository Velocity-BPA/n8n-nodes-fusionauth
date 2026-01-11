/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FusionAuthApi implements ICredentialType {
	name = 'fusionAuthApi';
	displayName = 'FusionAuth API';
	documentationUrl = 'https://fusionauth.io/docs/apis/';
	properties: INodeProperties[] = [
		{
			displayName: 'Instance URL',
			name: 'instanceUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-instance.fusionauth.io',
			required: true,
			description: 'The URL of your FusionAuth instance',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API key for authentication. Create one in FusionAuth Admin UI under Settings > API Keys.',
		},
		{
			displayName: 'Default Tenant ID',
			name: 'tenantId',
			type: 'string',
			default: '',
			description: 'Optional default tenant ID for multi-tenant setups. Can be overridden per operation.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.instanceUrl}}',
			url: '/api/status',
			method: 'GET',
		},
	};
}
