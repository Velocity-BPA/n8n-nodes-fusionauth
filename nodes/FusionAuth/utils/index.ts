/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';

/**
 * Helper to simplify returned data structure
 */
export function simplifyResponse(data: IDataObject, resourceType: string): IDataObject {
	// FusionAuth returns data wrapped in resource-specific keys
	const resourceKeys: Record<string, string> = {
		user: 'user',
		application: 'application',
		tenant: 'tenant',
		group: 'group',
		registration: 'registration',
		identityProvider: 'identityProvider',
		consent: 'consent',
		form: 'form',
		formField: 'field',
		lambda: 'lambda',
		webhook: 'webhook',
		auditLog: 'auditLog',
	};

	const key = resourceKeys[resourceType];
	if (key && data[key]) {
		return data[key] as IDataObject;
	}

	return data;
}

/**
 * Helper to convert items to n8n output format
 */
export function prepareOutput(
	this: IExecuteFunctions,
	data: IDataObject | IDataObject[],
	itemIndex: number,
): INodeExecutionData[] {
	const items = Array.isArray(data) ? data : [data];
	return items.map((item) => ({
		json: item,
		pairedItem: { item: itemIndex },
	}));
}

/**
 * Helper to generate UUID (for creating IDs client-side)
 */
export function generateUUID(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/**
 * Helper to parse comma-separated string to array
 */
export function parseCommaSeparated(value: string): string[] {
	if (!value) return [];
	return value.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
}

/**
 * Helper to format date to FusionAuth format (YYYY-MM-DD)
 */
export function formatDate(date: string | Date | number): string {
	if (!date && date !== 0) return '';
	let d: Date;
	if (typeof date === 'number') {
		d = new Date(date);
	} else if (typeof date === 'string') {
		d = new Date(date);
	} else {
		d = date;
	}
	return d.toISOString().split('T')[0];
}

/**
 * Helper to convert timestamp to ISO date string
 */
export function timestampToIso(timestamp: number): string {
	return new Date(timestamp).toISOString();
}

/**
 * Helper to validate UUID format
 */
export function isValidUUID(value: string): boolean {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	return uuidRegex.test(value);
}

/**
 * Helper to extract error message from FusionAuth response
 */
export function extractErrorMessage(response: IDataObject): string {
	if (response.generalErrors) {
		const errors = response.generalErrors as Array<{ message: string }>;
		return errors.map((e) => e.message).join(', ');
	}

	if (response.fieldErrors) {
		const fieldErrors: string[] = [];
		for (const [field, errors] of Object.entries(response.fieldErrors as IDataObject)) {
			const errList = errors as Array<{ message: string }>;
			fieldErrors.push(`${field}: ${errList.map((e) => e.message).join(', ')}`);
		}
		return fieldErrors.join('; ');
	}

	return 'Unknown error';
}

/**
 * Helper to build user data object from parameters
 */
export function buildUserData(params: IDataObject): IDataObject {
	const userData: IDataObject = {};

	const directFields = [
		'email',
		'username',
		'password',
		'firstName',
		'lastName',
		'fullName',
		'middleName',
		'mobilePhone',
		'imageUrl',
		'timezone',
		'birthDate',
	];

	for (const field of directFields) {
		if (params[field] !== undefined && params[field] !== '') {
			userData[field] = params[field];
		}
	}

	// Boolean fields
	if (params.verified !== undefined) {
		userData.verified = params.verified;
	}

	// Array fields
	if (params.preferredLanguages) {
		userData.preferredLanguages = parseCommaSeparated(params.preferredLanguages as string);
	}

	// JSON fields
	if (params.data) {
		userData.data = typeof params.data === 'string' ? JSON.parse(params.data) : params.data;
	}

	if (params.memberships) {
		userData.memberships = typeof params.memberships === 'string'
			? JSON.parse(params.memberships)
			: params.memberships;
	}

	if (params.registrations) {
		userData.registrations = typeof params.registrations === 'string'
			? JSON.parse(params.registrations)
			: params.registrations;
	}

	return userData;
}

/**
 * Helper to build application data object from parameters
 */
export function buildApplicationData(params: IDataObject): IDataObject {
	const appData: IDataObject = {};

	if (params.name !== undefined && params.name !== '') {
		appData.name = params.name;
	}

	if (params.active !== undefined) {
		appData.active = params.active;
	}

	if (params.tenantId !== undefined && params.tenantId !== '') {
		appData.tenantId = params.tenantId;
	}

	// JSON configuration fields
	const jsonFields = [
		'data',
		'oauthConfiguration',
		'jwtConfiguration',
		'loginConfiguration',
		'registrationConfiguration',
		'samlv2Configuration',
		'emailConfiguration',
		'formConfiguration',
		'multiFactorConfiguration',
	];

	for (const field of jsonFields) {
		if (params[field]) {
			appData[field] = typeof params[field] === 'string'
				? JSON.parse(params[field] as string)
				: params[field];
		}
	}

	if (params.roles) {
		appData.roles = typeof params.roles === 'string'
			? JSON.parse(params.roles as string)
			: params.roles;
	}

	return appData;
}

/**
 * Helper to build registration data object from parameters
 */
export function buildRegistrationData(params: IDataObject): IDataObject {
	const regData: IDataObject = {};

	if (params.applicationId) {
		regData.applicationId = params.applicationId;
	}

	if (params.username) {
		regData.username = params.username;
	}

	if (params.verified !== undefined) {
		regData.verified = params.verified;
	}

	if (params.timezone) {
		regData.timezone = params.timezone;
	}

	if (params.preferredLanguages) {
		regData.preferredLanguages = parseCommaSeparated(params.preferredLanguages as string);
	}

	if (params.roles) {
		regData.roles = typeof params.roles === 'string'
			? parseCommaSeparated(params.roles)
			: params.roles;
	}

	if (params.data) {
		regData.data = typeof params.data === 'string'
			? JSON.parse(params.data as string)
			: params.data;
	}

	if (params.tokens) {
		regData.tokens = typeof params.tokens === 'string'
			? JSON.parse(params.tokens as string)
			: params.tokens;
	}

	return regData;
}
