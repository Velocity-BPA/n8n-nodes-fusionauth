/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import type { IFusionAuthApiError } from '../types/FusionAuthTypes';

/**
 * Make an authenticated API request to FusionAuth
 */
export async function fusionAuthApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
	tenantId?: string,
): Promise<IDataObject> {
	const credentials = await this.getCredentials('fusionAuthApi');

	const headers: IDataObject = {
		'Content-Type': 'application/json',
	};

	// Add tenant header if specified or use default
	const tenant = tenantId || (credentials.tenantId as string);
	if (tenant) {
		headers['X-FusionAuth-TenantId'] = tenant;
	}

	const options: IHttpRequestOptions = {
		method,
		url: `${credentials.instanceUrl}${endpoint}`,
		headers,
		json: true,
	};

	if (body && Object.keys(body).length > 0 && method !== 'GET') {
		options.body = body;
	}

	if (query && Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'fusionAuthApi',
			options,
		);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: parseErrorMessage(error as IFusionAuthApiError),
		});
	}
}

/**
 * Make a paginated API request to FusionAuth
 */
export async function fusionAuthApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	propertyName: string,
	body?: IDataObject,
	query?: IDataObject,
	tenantId?: string,
): Promise<IDataObject[]> {
	const results: IDataObject[] = [];
	let startRow = 0;
	const numberOfResults = 100;

	do {
		const response = await fusionAuthApiRequest.call(
			this,
			method,
			endpoint,
			body,
			{
				...query,
				startRow,
				numberOfResults,
			},
			tenantId,
		);

		const items = (response[propertyName] as IDataObject[]) || [];
		results.push(...items);

		if (items.length < numberOfResults) {
			break;
		}
		startRow += numberOfResults;
	} while (true);

	return results;
}

/**
 * Parse FusionAuth error response into a readable message
 */
function parseErrorMessage(error: IFusionAuthApiError | IDataObject): string {
	const errorData = error as IFusionAuthApiError;

	if (errorData.generalErrors && errorData.generalErrors.length > 0) {
		return errorData.generalErrors.map((e) => e.message).join(', ');
	}

	if (errorData.fieldErrors) {
		const fieldMessages: string[] = [];
		for (const [field, errors] of Object.entries(errorData.fieldErrors)) {
			const errArray = errors as Array<{ message: string }>;
			fieldMessages.push(`${field}: ${errArray.map((e) => e.message).join(', ')}`);
		}
		return fieldMessages.join('; ');
	}

	if ((error as IDataObject).message) {
		return (error as IDataObject).message as string;
	}

	return 'Unknown error occurred';
}

/**
 * Build request body by filtering out empty values
 */
export function buildRequestBody(params: IDataObject): IDataObject {
	const body: IDataObject = {};

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null && value !== '') {
			if (typeof value === 'object' && !Array.isArray(value)) {
				const nested = buildRequestBody(value as IDataObject);
				if (Object.keys(nested).length > 0) {
					body[key] = nested;
				}
			} else {
				body[key] = value;
			}
		}
	}

	return body;
}

/**
 * Parse JSON string to object safely
 */
export function parseJsonParameter(value: string | IDataObject): IDataObject {
	if (typeof value === 'object') {
		return value;
	}
	if (!value || value.trim() === '') {
		return {};
	}
	try {
		return JSON.parse(value) as IDataObject;
	} catch {
		throw new Error('Invalid JSON format');
	}
}
