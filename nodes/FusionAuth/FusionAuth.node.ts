/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import {
	fusionAuthApiRequest,
	fusionAuthApiRequestAllItems,
	parseJsonParameter,
} from './transport';
import { prepareOutput, parseCommaSeparated, generateUUID } from './utils';
import {
	userOperations,
	userFields,
	applicationOperations,
	applicationFields,
	tenantOperations,
	tenantFields,
	groupOperations,
	groupFields,
	registrationOperations,
	registrationFields,
	identityProviderOperations,
	identityProviderFields,
	consentOperations,
	consentFields,
	formOperations,
	formFields,
	formFieldOperations,
	formFieldFields,
	lambdaOperations,
	lambdaFields,
	webhookOperations,
	webhookFields,
	auditLogOperations,
	auditLogFields,
} from './descriptions';

// Emit licensing notice once on module load
const LICENSING_NOTICE = `[Velocity BPA Licensing Notice]
This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.`;

let licenseNoticeEmitted = false;
function emitLicensingNotice(): void {
	if (!licenseNoticeEmitted) {
		console.warn(LICENSING_NOTICE);
		licenseNoticeEmitted = true;
	}
}

export class FusionAuth implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FusionAuth',
		name: 'fusionAuth',
		icon: 'file:fusionauth.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with FusionAuth API',
		defaults: {
			name: 'FusionAuth',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'fusionAuthApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Application',
						value: 'application',
					},
					{
						name: 'Audit Log',
						value: 'auditLog',
					},
					{
						name: 'Consent',
						value: 'consent',
					},
					{
						name: 'Form',
						value: 'form',
					},
					{
						name: 'Form Field',
						value: 'formField',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Identity Provider',
						value: 'identityProvider',
					},
					{
						name: 'Lambda',
						value: 'lambda',
					},
					{
						name: 'Registration',
						value: 'registration',
					},
					{
						name: 'Tenant',
						value: 'tenant',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'user',
			},
			// User
			...userOperations,
			...userFields,
			// Application
			...applicationOperations,
			...applicationFields,
			// Tenant
			...tenantOperations,
			...tenantFields,
			// Group
			...groupOperations,
			...groupFields,
			// Registration
			...registrationOperations,
			...registrationFields,
			// Identity Provider
			...identityProviderOperations,
			...identityProviderFields,
			// Consent
			...consentOperations,
			...consentFields,
			// Form
			...formOperations,
			...formFields,
			// Form Field
			...formFieldOperations,
			...formFieldFields,
			// Lambda
			...lambdaOperations,
			...lambdaFields,
			// Webhook
			...webhookOperations,
			...webhookFields,
			// Audit Log
			...auditLogOperations,
			...auditLogFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		emitLicensingNotice();

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// ----------------------------------------
				//              User
				// ----------------------------------------
				if (resource === 'user') {
					responseData = await executeUserOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//           Application
				// ----------------------------------------
				else if (resource === 'application') {
					responseData = await executeApplicationOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//              Tenant
				// ----------------------------------------
				else if (resource === 'tenant') {
					responseData = await executeTenantOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//              Group
				// ----------------------------------------
				else if (resource === 'group') {
					responseData = await executeGroupOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//           Registration
				// ----------------------------------------
				else if (resource === 'registration') {
					responseData = await executeRegistrationOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//        Identity Provider
				// ----------------------------------------
				else if (resource === 'identityProvider') {
					responseData = await executeIdentityProviderOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//             Consent
				// ----------------------------------------
				else if (resource === 'consent') {
					responseData = await executeConsentOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//              Form
				// ----------------------------------------
				else if (resource === 'form') {
					responseData = await executeFormOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//           Form Field
				// ----------------------------------------
				else if (resource === 'formField') {
					responseData = await executeFormFieldOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//             Lambda
				// ----------------------------------------
				else if (resource === 'lambda') {
					responseData = await executeLambdaOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//            Webhook
				// ----------------------------------------
				else if (resource === 'webhook') {
					responseData = await executeWebhookOperation.call(this, operation, i);
				}
				// ----------------------------------------
				//           Audit Log
				// ----------------------------------------
				else if (resource === 'auditLog') {
					responseData = await executeAuditLogOperation.call(this, operation, i);
				}

				const executionData = prepareOutput.call(this, responseData, i);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: i });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

// ============================================================================
// User Operations
// ============================================================================
async function executeUserOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const email = this.getNodeParameter('email', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const user: IDataObject = { email };
		if (additionalFields.password) user.password = additionalFields.password;
		if (additionalFields.username) user.username = additionalFields.username;
		if (additionalFields.firstName) user.firstName = additionalFields.firstName;
		if (additionalFields.lastName) user.lastName = additionalFields.lastName;
		if (additionalFields.fullName) user.fullName = additionalFields.fullName;
		if (additionalFields.mobilePhone) user.mobilePhone = additionalFields.mobilePhone;
		if (additionalFields.birthDate) user.birthDate = additionalFields.birthDate;
		if (additionalFields.imageUrl) user.imageUrl = additionalFields.imageUrl;
		if (additionalFields.timezone) user.timezone = additionalFields.timezone;
		if (additionalFields.preferredLanguages) {
			user.preferredLanguages = parseCommaSeparated(additionalFields.preferredLanguages as string);
		}
		if (additionalFields.data) user.data = parseJsonParameter(additionalFields.data as string);
		if (additionalFields.verified !== undefined) user.verified = additionalFields.verified;
		if (additionalFields.active !== undefined) user.active = additionalFields.active;

		const body: IDataObject = { user };
		if (additionalFields.userId) {
			responseData = await fusionAuthApiRequest.call(this, 'POST', `/user/${additionalFields.userId}`, body);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/user', body);
		}
	} else if (operation === 'get') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/user/${userId}`);
	} else if (operation === 'getByEmail') {
		const email = this.getNodeParameter('email', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', '/user', {}, { email });
	} else if (operation === 'getByUsername') {
		const username = this.getNodeParameter('username', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', '/user', {}, { username });
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;

		const searchBody: IDataObject = {
			search: {
				queryString: filters.queryString || '*',
				sortFields: filters.sortBy
					? [{ name: filters.sortBy, order: filters.sortOrder || 'asc' }]
					: undefined,
			},
		};

		if (returnAll) {
			const users = await fusionAuthApiRequestAllItems.call(
				this,
				'POST',
				'/user/search',
				'users',
				searchBody,
				{},
			);
			return users;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			(searchBody.search as IDataObject).numberOfResults = limit;
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/user/search', searchBody);
			return (responseData.users as IDataObject[]) || [];
		}
	} else if (operation === 'update') {
		const userId = this.getNodeParameter('userId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const user: IDataObject = {};
		if (updateFields.email) user.email = updateFields.email;
		if (updateFields.username) user.username = updateFields.username;
		if (updateFields.firstName) user.firstName = updateFields.firstName;
		if (updateFields.lastName) user.lastName = updateFields.lastName;
		if (updateFields.fullName) user.fullName = updateFields.fullName;
		if (updateFields.mobilePhone) user.mobilePhone = updateFields.mobilePhone;
		if (updateFields.birthDate) user.birthDate = updateFields.birthDate;
		if (updateFields.imageUrl) user.imageUrl = updateFields.imageUrl;
		if (updateFields.timezone) user.timezone = updateFields.timezone;
		if (updateFields.preferredLanguages) {
			user.preferredLanguages = parseCommaSeparated(updateFields.preferredLanguages as string);
		}
		if (updateFields.data) user.data = parseJsonParameter(updateFields.data as string);
		if (updateFields.verified !== undefined) user.verified = updateFields.verified;
		if (updateFields.active !== undefined) user.active = updateFields.active;

		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/user/${userId}`, { user });
	} else if (operation === 'patch') {
		const userId = this.getNodeParameter('userId', i) as string;
		const patchData = this.getNodeParameter('patchData', i) as string;
		const body = parseJsonParameter(patchData);
		responseData = await fusionAuthApiRequest.call(this, 'PATCH', `/user/${userId}`, body);
	} else if (operation === 'delete') {
		const userId = this.getNodeParameter('userId', i) as string;
		const hardDelete = this.getNodeParameter('hardDelete', i, true) as boolean;
		responseData = await fusionAuthApiRequest.call(
			this,
			'DELETE',
			`/user/${userId}`,
			{},
			{ hardDelete },
		);
	} else if (operation === 'deactivate') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/user/${userId}`, {}, { hardDelete: false });
	} else if (operation === 'reactivate') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/user/${userId}?reactivate=true`);
	} else if (operation === 'bulkDelete') {
		const userIds = this.getNodeParameter('userIds', i) as string;
		const hardDelete = this.getNodeParameter('hardDelete', i, true) as boolean;
		const ids = parseCommaSeparated(userIds);
		responseData = await fusionAuthApiRequest.call(
			this,
			'DELETE',
			'/user/bulk',
			{ userIds: ids, hardDelete },
		);
	} else if (operation === 'import') {
		const usersJson = this.getNodeParameter('users', i) as string;
		const users = parseJsonParameter(usersJson);
		responseData = await fusionAuthApiRequest.call(this, 'POST', '/user/import', { users });
	} else if (operation === 'changePassword') {
		const userId = this.getNodeParameter('userId', i) as string;
		const currentPassword = this.getNodeParameter('currentPassword', i) as string;
		const newPassword = this.getNodeParameter('newPassword', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'POST', `/user/change-password/${userId}`, {
			currentPassword,
			password: newPassword,
		});
	} else if (operation === 'forgotPassword') {
		const loginId = this.getNodeParameter('loginId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'POST', '/user/forgot-password', { loginId });
	} else if (operation === 'verifyEmail') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/user/verify-email/${userId}`);
	} else if (operation === 'verifyRegistration') {
		const userId = this.getNodeParameter('userId', i) as string;
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		responseData = await fusionAuthApiRequest.call(
			this,
			'PUT',
			`/user/verify-registration/${userId}/${applicationId}`,
		);
	} else if (operation === 'getTwoFactorRecoveryCodes') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/user/two-factor/recovery-code/${userId}`);
	} else if (operation === 'generateTwoFactorRecoveryCodes') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'POST', `/user/two-factor/recovery-code/${userId}`);
	} else if (operation === 'enableTwoFactor') {
		const userId = this.getNodeParameter('userId', i) as string;
		const method = this.getNodeParameter('method', i) as string;
		const code = this.getNodeParameter('code', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const body: IDataObject = { method, code };
		if (additionalFields.mobilePhone) body.mobilePhone = additionalFields.mobilePhone;
		if (additionalFields.email) body.email = additionalFields.email;
		if (additionalFields.secret) body.secret = additionalFields.secret;

		responseData = await fusionAuthApiRequest.call(this, 'POST', `/user/two-factor/${userId}`, body);
	} else if (operation === 'disableTwoFactor') {
		const userId = this.getNodeParameter('userId', i) as string;
		const methodId = this.getNodeParameter('methodId', i) as string;
		const code = this.getNodeParameter('code', i) as string;
		responseData = await fusionAuthApiRequest.call(
			this,
			'DELETE',
			`/user/two-factor/${userId}`,
			{},
			{ methodId, code },
		);
	} else if (operation === 'sendTwoFactorCode') {
		const userId = this.getNodeParameter('userId', i) as string;
		const methodId = this.getNodeParameter('methodId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'POST', `/user/two-factor/send/${methodId}`, { userId });
	} else if (operation === 'getRecentLogins') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', '/user/recent-login', {}, { userId });
	} else if (operation === 'getRegistrations') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/user/registration/${userId}`);
	} else if (operation === 'refreshTokens') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/jwt/refresh/${userId}`);
	} else if (operation === 'revokeRefreshTokens') {
		const userId = this.getNodeParameter('userId', i) as string;
		const applicationId = this.getNodeParameter('applicationId', i, '') as string;
		const qs: IDataObject = { userId };
		if (applicationId) qs.applicationId = applicationId;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', '/jwt/refresh', {}, qs);
	} else if (operation === 'getUserActionsOnUser') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/user/action/${userId}`);
	} else if (operation === 'getUserComments') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/user/comment/${userId}`);
	} else if (operation === 'addUserComment') {
		const userId = this.getNodeParameter('userId', i) as string;
		const comment = this.getNodeParameter('comment', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'POST', `/user/comment/${userId}`, {
			userComment: { comment },
		});
	} else if (operation === 'getConsents') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/user/consent/${userId}`);
	} else if (operation === 'updateConsents') {
		const userId = this.getNodeParameter('userId', i) as string;
		const consentsJson = this.getNodeParameter('consents', i) as string;
		const consents = parseJsonParameter(consentsJson);
		responseData = await fusionAuthApiRequest.call(this, 'POST', `/user/consent/${userId}`, {
			userConsents: consents,
		});
	}

	return responseData;
}

// ============================================================================
// Application Operations
// ============================================================================
async function executeApplicationOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const name = this.getNodeParameter('name', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const application: IDataObject = { name };
		if (additionalFields.tenantId) application.tenantId = additionalFields.tenantId;
		if (additionalFields.active !== undefined) application.active = additionalFields.active;
		if (additionalFields.data) application.data = parseJsonParameter(additionalFields.data as string);
		if (additionalFields.oauthConfiguration) {
			application.oauthConfiguration = parseJsonParameter(additionalFields.oauthConfiguration as string);
		}
		if (additionalFields.jwtConfiguration) {
			application.jwtConfiguration = parseJsonParameter(additionalFields.jwtConfiguration as string);
		}
		if (additionalFields.loginConfiguration) {
			application.loginConfiguration = parseJsonParameter(additionalFields.loginConfiguration as string);
		}
		if (additionalFields.registrationConfiguration) {
			application.registrationConfiguration = parseJsonParameter(
				additionalFields.registrationConfiguration as string,
			);
		}
		if (additionalFields.emailConfiguration) {
			application.emailConfiguration = parseJsonParameter(additionalFields.emailConfiguration as string);
		}
		if (additionalFields.multiFactorConfiguration) {
			application.multiFactorConfiguration = parseJsonParameter(
				additionalFields.multiFactorConfiguration as string,
			);
		}

		const body: IDataObject = { application };
		if (additionalFields.applicationId) {
			responseData = await fusionAuthApiRequest.call(
				this,
				'POST',
				`/application/${additionalFields.applicationId}`,
				body,
			);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/application', body);
		}
	} else if (operation === 'get') {
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/application/${applicationId}`);
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;

		if (returnAll) {
			responseData = await fusionAuthApiRequest.call(this, 'GET', '/application');
			return (responseData.applications as IDataObject[]) || [];
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			responseData = await fusionAuthApiRequest.call(this, 'GET', '/application');
			const apps = (responseData.applications as IDataObject[]) || [];
			return apps.slice(0, limit);
		}
	} else if (operation === 'update') {
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const application: IDataObject = {};
		if (updateFields.name) application.name = updateFields.name;
		if (updateFields.active !== undefined) application.active = updateFields.active;
		if (updateFields.data) application.data = parseJsonParameter(updateFields.data as string);
		if (updateFields.oauthConfiguration) {
			application.oauthConfiguration = parseJsonParameter(updateFields.oauthConfiguration as string);
		}
		if (updateFields.jwtConfiguration) {
			application.jwtConfiguration = parseJsonParameter(updateFields.jwtConfiguration as string);
		}
		if (updateFields.loginConfiguration) {
			application.loginConfiguration = parseJsonParameter(updateFields.loginConfiguration as string);
		}
		if (updateFields.registrationConfiguration) {
			application.registrationConfiguration = parseJsonParameter(
				updateFields.registrationConfiguration as string,
			);
		}
		if (updateFields.emailConfiguration) {
			application.emailConfiguration = parseJsonParameter(updateFields.emailConfiguration as string);
		}
		if (updateFields.multiFactorConfiguration) {
			application.multiFactorConfiguration = parseJsonParameter(
				updateFields.multiFactorConfiguration as string,
			);
		}

		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/application/${applicationId}`, {
			application,
		});
	} else if (operation === 'patch') {
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		const patchData = this.getNodeParameter('patchData', i) as string;
		const body = parseJsonParameter(patchData);
		responseData = await fusionAuthApiRequest.call(this, 'PATCH', `/application/${applicationId}`, body);
	} else if (operation === 'delete') {
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		const hardDelete = this.getNodeParameter('hardDelete', i, true) as boolean;
		responseData = await fusionAuthApiRequest.call(
			this,
			'DELETE',
			`/application/${applicationId}`,
			{},
			{ hardDelete },
		);
	} else if (operation === 'getOAuthConfiguration') {
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/application/${applicationId}`);
		responseData = { oauthConfiguration: (responseData.application as IDataObject)?.oauthConfiguration };
	} else if (operation === 'getRoles') {
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/application/${applicationId}`);
		return ((responseData.application as IDataObject)?.roles as IDataObject[]) || [];
	} else if (operation === 'createRole') {
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		const name = this.getNodeParameter('roleName', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const role: IDataObject = { name };
		if (additionalFields.description) role.description = additionalFields.description;
		if (additionalFields.isDefault !== undefined) role.isDefault = additionalFields.isDefault;
		if (additionalFields.isSuperRole !== undefined) role.isSuperRole = additionalFields.isSuperRole;

		responseData = await fusionAuthApiRequest.call(this, 'POST', `/application/${applicationId}/role`, {
			role,
		});
	} else if (operation === 'updateRole') {
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		const roleId = this.getNodeParameter('roleId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const role: IDataObject = {};
		if (updateFields.name) role.name = updateFields.name;
		if (updateFields.description) role.description = updateFields.description;
		if (updateFields.isDefault !== undefined) role.isDefault = updateFields.isDefault;
		if (updateFields.isSuperRole !== undefined) role.isSuperRole = updateFields.isSuperRole;

		responseData = await fusionAuthApiRequest.call(
			this,
			'PUT',
			`/application/${applicationId}/role/${roleId}`,
			{ role },
		);
	} else if (operation === 'deleteRole') {
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		const roleId = this.getNodeParameter('roleId', i) as string;
		responseData = await fusionAuthApiRequest.call(
			this,
			'DELETE',
			`/application/${applicationId}/role/${roleId}`,
		);
	}

	return responseData;
}

// ============================================================================
// Tenant Operations
// ============================================================================
async function executeTenantOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const name = this.getNodeParameter('name', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const tenant: IDataObject = { name };
		if (additionalFields.issuer) tenant.issuer = additionalFields.issuer;
		if (additionalFields.emailConfiguration) {
			tenant.emailConfiguration = parseJsonParameter(additionalFields.emailConfiguration as string);
		}
		if (additionalFields.jwtConfiguration) {
			tenant.jwtConfiguration = parseJsonParameter(additionalFields.jwtConfiguration as string);
		}
		if (additionalFields.passwordValidationRules) {
			tenant.passwordValidationRules = parseJsonParameter(
				additionalFields.passwordValidationRules as string,
			);
		}
		if (additionalFields.multiFactorConfiguration) {
			tenant.multiFactorConfiguration = parseJsonParameter(
				additionalFields.multiFactorConfiguration as string,
			);
		}
		if (additionalFields.data) tenant.data = parseJsonParameter(additionalFields.data as string);

		const body: IDataObject = { tenant };
		if (additionalFields.tenantId) {
			responseData = await fusionAuthApiRequest.call(
				this,
				'POST',
				`/tenant/${additionalFields.tenantId}`,
				body,
			);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/tenant', body);
		}
	} else if (operation === 'get') {
		const tenantId = this.getNodeParameter('tenantId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/tenant/${tenantId}`);
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;

		responseData = await fusionAuthApiRequest.call(this, 'GET', '/tenant');
		const tenants = (responseData.tenants as IDataObject[]) || [];

		if (returnAll) {
			return tenants;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			return tenants.slice(0, limit);
		}
	} else if (operation === 'update') {
		const tenantId = this.getNodeParameter('tenantId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const tenant: IDataObject = {};
		if (updateFields.name) tenant.name = updateFields.name;
		if (updateFields.issuer) tenant.issuer = updateFields.issuer;
		if (updateFields.emailConfiguration) {
			tenant.emailConfiguration = parseJsonParameter(updateFields.emailConfiguration as string);
		}
		if (updateFields.jwtConfiguration) {
			tenant.jwtConfiguration = parseJsonParameter(updateFields.jwtConfiguration as string);
		}
		if (updateFields.passwordValidationRules) {
			tenant.passwordValidationRules = parseJsonParameter(updateFields.passwordValidationRules as string);
		}
		if (updateFields.multiFactorConfiguration) {
			tenant.multiFactorConfiguration = parseJsonParameter(
				updateFields.multiFactorConfiguration as string,
			);
		}
		if (updateFields.data) tenant.data = parseJsonParameter(updateFields.data as string);

		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/tenant/${tenantId}`, { tenant });
	} else if (operation === 'patch') {
		const tenantId = this.getNodeParameter('tenantId', i) as string;
		const patchData = this.getNodeParameter('patchData', i) as string;
		const body = parseJsonParameter(patchData);
		responseData = await fusionAuthApiRequest.call(this, 'PATCH', `/tenant/${tenantId}`, body);
	} else if (operation === 'delete') {
		const tenantId = this.getNodeParameter('tenantId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/tenant/${tenantId}`);
	}

	return responseData;
}

// ============================================================================
// Group Operations
// ============================================================================
async function executeGroupOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const name = this.getNodeParameter('name', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const group: IDataObject = { name };
		if (additionalFields.tenantId) group.tenantId = additionalFields.tenantId;
		if (additionalFields.data) group.data = parseJsonParameter(additionalFields.data as string);
		if (additionalFields.roles) group.roles = parseJsonParameter(additionalFields.roles as string);

		const body: IDataObject = { group };
		if (additionalFields.groupId) {
			responseData = await fusionAuthApiRequest.call(
				this,
				'POST',
				`/group/${additionalFields.groupId}`,
				body,
			);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/group', body);
		}
	} else if (operation === 'get') {
		const groupId = this.getNodeParameter('groupId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/group/${groupId}`);
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;

		const qs: IDataObject = {};
		if (filters.tenantId) qs.tenantId = filters.tenantId;

		responseData = await fusionAuthApiRequest.call(this, 'GET', '/group', {}, qs);
		const groups = (responseData.groups as IDataObject[]) || [];

		if (returnAll) {
			return groups;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			return groups.slice(0, limit);
		}
	} else if (operation === 'update') {
		const groupId = this.getNodeParameter('groupId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const group: IDataObject = {};
		if (updateFields.name) group.name = updateFields.name;
		if (updateFields.data) group.data = parseJsonParameter(updateFields.data as string);
		if (updateFields.roles) group.roles = parseJsonParameter(updateFields.roles as string);

		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/group/${groupId}`, { group });
	} else if (operation === 'delete') {
		const groupId = this.getNodeParameter('groupId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/group/${groupId}`);
	} else if (operation === 'addMembers') {
		const groupId = this.getNodeParameter('groupId', i) as string;
		const memberIds = this.getNodeParameter('memberIds', i) as string;
		const ids = parseCommaSeparated(memberIds);
		const members = ids.map((userId) => ({ userId }));
		responseData = await fusionAuthApiRequest.call(this, 'POST', `/group/${groupId}/member`, {
			members,
		});
	} else if (operation === 'removeMembers') {
		const groupId = this.getNodeParameter('groupId', i) as string;
		const memberIds = this.getNodeParameter('memberIds', i) as string;
		const ids = parseCommaSeparated(memberIds);
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/group/${groupId}/member`, {
			memberIds: ids,
		});
	} else if (operation === 'getMembers') {
		const groupId = this.getNodeParameter('groupId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/group/${groupId}`);
		return ((responseData.group as IDataObject)?.members as IDataObject[]) || [];
	}

	return responseData;
}

// ============================================================================
// Registration Operations
// ============================================================================
async function executeRegistrationOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const userId = this.getNodeParameter('userId', i) as string;
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const registration: IDataObject = { applicationId };
		if (additionalFields.roles) {
			registration.roles = parseCommaSeparated(additionalFields.roles as string);
		}
		if (additionalFields.username) registration.username = additionalFields.username;
		if (additionalFields.data) registration.data = parseJsonParameter(additionalFields.data as string);
		if (additionalFields.verified !== undefined) registration.verified = additionalFields.verified;
		if (additionalFields.timezone) registration.timezone = additionalFields.timezone;
		if (additionalFields.preferredLanguages) {
			registration.preferredLanguages = parseCommaSeparated(additionalFields.preferredLanguages as string);
		}

		responseData = await fusionAuthApiRequest.call(this, 'POST', `/user/registration/${userId}`, {
			registration,
		});
	} else if (operation === 'get') {
		const userId = this.getNodeParameter('userId', i) as string;
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		responseData = await fusionAuthApiRequest.call(
			this,
			'GET',
			`/user/registration/${userId}/${applicationId}`,
		);
	} else if (operation === 'update') {
		const userId = this.getNodeParameter('userId', i) as string;
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const registration: IDataObject = { applicationId };
		if (updateFields.roles) {
			registration.roles = parseCommaSeparated(updateFields.roles as string);
		}
		if (updateFields.username) registration.username = updateFields.username;
		if (updateFields.data) registration.data = parseJsonParameter(updateFields.data as string);
		if (updateFields.verified !== undefined) registration.verified = updateFields.verified;
		if (updateFields.timezone) registration.timezone = updateFields.timezone;
		if (updateFields.preferredLanguages) {
			registration.preferredLanguages = parseCommaSeparated(updateFields.preferredLanguages as string);
		}

		responseData = await fusionAuthApiRequest.call(
			this,
			'PUT',
			`/user/registration/${userId}/${applicationId}`,
			{ registration },
		);
	} else if (operation === 'patch') {
		const userId = this.getNodeParameter('userId', i) as string;
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		const patchData = this.getNodeParameter('patchData', i) as string;
		const body = parseJsonParameter(patchData);
		responseData = await fusionAuthApiRequest.call(
			this,
			'PATCH',
			`/user/registration/${userId}/${applicationId}`,
			body,
		);
	} else if (operation === 'delete') {
		const userId = this.getNodeParameter('userId', i) as string;
		const applicationId = this.getNodeParameter('applicationId', i) as string;
		responseData = await fusionAuthApiRequest.call(
			this,
			'DELETE',
			`/user/registration/${userId}/${applicationId}`,
		);
	} else if (operation === 'verify') {
		const verificationId = this.getNodeParameter('verificationId', i) as string;
		responseData = await fusionAuthApiRequest.call(
			this,
			'POST',
			`/user/verify-registration/${verificationId}`,
		);
	}

	return responseData;
}

// ============================================================================
// Identity Provider Operations
// ============================================================================
async function executeIdentityProviderOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const type = this.getNodeParameter('type', i) as string;
		const name = this.getNodeParameter('name', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const identityProvider: IDataObject = { type, name };
		if (additionalFields.enabled !== undefined) identityProvider.enabled = additionalFields.enabled;
		if (additionalFields.applicationConfiguration) {
			identityProvider.applicationConfiguration = parseJsonParameter(
				additionalFields.applicationConfiguration as string,
			);
		}
		if (additionalFields.oauth2) {
			identityProvider.oauth2 = parseJsonParameter(additionalFields.oauth2 as string);
		}
		if (additionalFields.domains) {
			identityProvider.domains = parseCommaSeparated(additionalFields.domains as string);
		}
		if (additionalFields.linkingStrategy) identityProvider.linkingStrategy = additionalFields.linkingStrategy;
		if (additionalFields.tenantConfiguration) {
			identityProvider.tenantConfiguration = parseJsonParameter(
				additionalFields.tenantConfiguration as string,
			);
		}
		if (additionalFields.data) identityProvider.data = parseJsonParameter(additionalFields.data as string);

		const body: IDataObject = { identityProvider };
		if (additionalFields.identityProviderId) {
			responseData = await fusionAuthApiRequest.call(
				this,
				'POST',
				`/identity-provider/${additionalFields.identityProviderId}`,
				body,
			);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/identity-provider', body);
		}
	} else if (operation === 'get') {
		const identityProviderId = this.getNodeParameter('identityProviderId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/identity-provider/${identityProviderId}`);
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;

		responseData = await fusionAuthApiRequest.call(this, 'GET', '/identity-provider');
		const providers = (responseData.identityProviders as IDataObject[]) || [];

		if (returnAll) {
			return providers;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			return providers.slice(0, limit);
		}
	} else if (operation === 'update') {
		const identityProviderId = this.getNodeParameter('identityProviderId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const identityProvider: IDataObject = {};
		if (updateFields.name) identityProvider.name = updateFields.name;
		if (updateFields.enabled !== undefined) identityProvider.enabled = updateFields.enabled;
		if (updateFields.applicationConfiguration) {
			identityProvider.applicationConfiguration = parseJsonParameter(
				updateFields.applicationConfiguration as string,
			);
		}
		if (updateFields.oauth2) {
			identityProvider.oauth2 = parseJsonParameter(updateFields.oauth2 as string);
		}
		if (updateFields.domains) {
			identityProvider.domains = parseCommaSeparated(updateFields.domains as string);
		}
		if (updateFields.linkingStrategy) identityProvider.linkingStrategy = updateFields.linkingStrategy;
		if (updateFields.tenantConfiguration) {
			identityProvider.tenantConfiguration = parseJsonParameter(
				updateFields.tenantConfiguration as string,
			);
		}
		if (updateFields.data) identityProvider.data = parseJsonParameter(updateFields.data as string);

		responseData = await fusionAuthApiRequest.call(
			this,
			'PUT',
			`/identity-provider/${identityProviderId}`,
			{ identityProvider },
		);
	} else if (operation === 'delete') {
		const identityProviderId = this.getNodeParameter('identityProviderId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/identity-provider/${identityProviderId}`);
	} else if (operation === 'lookup') {
		const domain = this.getNodeParameter('domain', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', '/identity-provider/lookup', {}, { domain });
	} else if (operation === 'link') {
		const identityProviderId = this.getNodeParameter('identityProviderId', i) as string;
		const userId = this.getNodeParameter('userId', i) as string;
		const identityProviderUserId = this.getNodeParameter('identityProviderUserId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'POST', '/identity-provider/link', {
			identityProviderLink: {
				identityProviderId,
				userId,
				identityProviderUserId,
			},
		});
	} else if (operation === 'unlink') {
		const identityProviderId = this.getNodeParameter('identityProviderId', i) as string;
		const userId = this.getNodeParameter('userId', i) as string;
		const identityProviderUserId = this.getNodeParameter('identityProviderUserId', i) as string;
		responseData = await fusionAuthApiRequest.call(
			this,
			'DELETE',
			`/identity-provider/link`,
			{},
			{ identityProviderId, userId, identityProviderUserId },
		);
	}

	return responseData;
}

// ============================================================================
// Consent Operations
// ============================================================================
async function executeConsentOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const name = this.getNodeParameter('name', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const consent: IDataObject = { name };
		if (additionalFields.consentEmailTemplateId) {
			consent.consentEmailTemplateId = additionalFields.consentEmailTemplateId;
		}
		if (additionalFields.countryMinimumAgeForSelfConsent) {
			consent.countryMinimumAgeForSelfConsent = parseJsonParameter(
				additionalFields.countryMinimumAgeForSelfConsent as string,
			);
		}
		if (additionalFields.defaultMinimumAgeForSelfConsent !== undefined) {
			consent.defaultMinimumAgeForSelfConsent = additionalFields.defaultMinimumAgeForSelfConsent;
		}
		if (additionalFields.emailPlus) {
			consent.emailPlus = parseJsonParameter(additionalFields.emailPlus as string);
		}
		if (additionalFields.multipleValuesAllowed !== undefined) {
			consent.multipleValuesAllowed = additionalFields.multipleValuesAllowed;
		}
		if (additionalFields.values) {
			consent.values = parseCommaSeparated(additionalFields.values as string);
		}
		if (additionalFields.data) consent.data = parseJsonParameter(additionalFields.data as string);

		const body: IDataObject = { consent };
		if (additionalFields.consentId) {
			responseData = await fusionAuthApiRequest.call(
				this,
				'POST',
				`/consent/${additionalFields.consentId}`,
				body,
			);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/consent', body);
		}
	} else if (operation === 'get') {
		const consentId = this.getNodeParameter('consentId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/consent/${consentId}`);
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;

		responseData = await fusionAuthApiRequest.call(this, 'GET', '/consent');
		const consents = (responseData.consents as IDataObject[]) || [];

		if (returnAll) {
			return consents;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			return consents.slice(0, limit);
		}
	} else if (operation === 'update') {
		const consentId = this.getNodeParameter('consentId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const consent: IDataObject = {};
		if (updateFields.name) consent.name = updateFields.name;
		if (updateFields.consentEmailTemplateId) {
			consent.consentEmailTemplateId = updateFields.consentEmailTemplateId;
		}
		if (updateFields.countryMinimumAgeForSelfConsent) {
			consent.countryMinimumAgeForSelfConsent = parseJsonParameter(
				updateFields.countryMinimumAgeForSelfConsent as string,
			);
		}
		if (updateFields.defaultMinimumAgeForSelfConsent !== undefined) {
			consent.defaultMinimumAgeForSelfConsent = updateFields.defaultMinimumAgeForSelfConsent;
		}
		if (updateFields.emailPlus) {
			consent.emailPlus = parseJsonParameter(updateFields.emailPlus as string);
		}
		if (updateFields.multipleValuesAllowed !== undefined) {
			consent.multipleValuesAllowed = updateFields.multipleValuesAllowed;
		}
		if (updateFields.values) {
			consent.values = parseCommaSeparated(updateFields.values as string);
		}
		if (updateFields.data) consent.data = parseJsonParameter(updateFields.data as string);

		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/consent/${consentId}`, { consent });
	} else if (operation === 'delete') {
		const consentId = this.getNodeParameter('consentId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/consent/${consentId}`);
	} else if (operation === 'getUserConsents') {
		const userId = this.getNodeParameter('userId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/user/consent/${userId}`);
		return (responseData.userConsents as IDataObject[]) || [];
	} else if (operation === 'grantUserConsent') {
		const userId = this.getNodeParameter('userId', i) as string;
		const consentId = this.getNodeParameter('consentId', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const userConsent: IDataObject = { consentId, userId };
		if (additionalFields.values) {
			userConsent.values = parseCommaSeparated(additionalFields.values as string);
		}
		if (additionalFields.giverUserId) userConsent.giverUserId = additionalFields.giverUserId;
		if (additionalFields.data) userConsent.data = parseJsonParameter(additionalFields.data as string);

		responseData = await fusionAuthApiRequest.call(this, 'POST', `/user/consent/${userId}`, {
			userConsent,
		});
	} else if (operation === 'revokeUserConsent') {
		const userConsentId = this.getNodeParameter('userConsentId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/user/consent/${userConsentId}`);
	}

	return responseData;
}

// ============================================================================
// Form Operations
// ============================================================================
async function executeFormOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const name = this.getNodeParameter('name', i) as string;
		const type = this.getNodeParameter('type', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const form: IDataObject = { name, type };
		if (additionalFields.steps) {
			form.steps = parseJsonParameter(additionalFields.steps as string);
		}
		if (additionalFields.data) form.data = parseJsonParameter(additionalFields.data as string);

		const body: IDataObject = { form };
		if (additionalFields.formId) {
			responseData = await fusionAuthApiRequest.call(
				this,
				'POST',
				`/form/${additionalFields.formId}`,
				body,
			);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/form', body);
		}
	} else if (operation === 'get') {
		const formId = this.getNodeParameter('formId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/form/${formId}`);
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;

		responseData = await fusionAuthApiRequest.call(this, 'GET', '/form');
		const forms = (responseData.forms as IDataObject[]) || [];

		if (returnAll) {
			return forms;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			return forms.slice(0, limit);
		}
	} else if (operation === 'update') {
		const formId = this.getNodeParameter('formId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const form: IDataObject = {};
		if (updateFields.name) form.name = updateFields.name;
		if (updateFields.steps) {
			form.steps = parseJsonParameter(updateFields.steps as string);
		}
		if (updateFields.data) form.data = parseJsonParameter(updateFields.data as string);

		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/form/${formId}`, { form });
	} else if (operation === 'delete') {
		const formId = this.getNodeParameter('formId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/form/${formId}`);
	}

	return responseData;
}

// ============================================================================
// Form Field Operations
// ============================================================================
async function executeFormFieldOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const name = this.getNodeParameter('name', i) as string;
		const key = this.getNodeParameter('key', i) as string;
		const control = this.getNodeParameter('control', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const field: IDataObject = { name, key, control };
		if (additionalFields.type) field.type = additionalFields.type;
		if (additionalFields.description) field.description = additionalFields.description;
		if (additionalFields.required !== undefined) field.required = additionalFields.required;
		if (additionalFields.options) {
			field.options = parseCommaSeparated(additionalFields.options as string);
		}
		if (additionalFields.validator) {
			field.validator = parseJsonParameter(additionalFields.validator as string);
		}
		if (additionalFields.data) field.data = parseJsonParameter(additionalFields.data as string);

		const body: IDataObject = { field };
		if (additionalFields.fieldId) {
			responseData = await fusionAuthApiRequest.call(
				this,
				'POST',
				`/form/field/${additionalFields.fieldId}`,
				body,
			);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/form/field', body);
		}
	} else if (operation === 'get') {
		const fieldId = this.getNodeParameter('fieldId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/form/field/${fieldId}`);
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;

		responseData = await fusionAuthApiRequest.call(this, 'GET', '/form/field');
		const fields = (responseData.fields as IDataObject[]) || [];

		if (returnAll) {
			return fields;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			return fields.slice(0, limit);
		}
	} else if (operation === 'update') {
		const fieldId = this.getNodeParameter('fieldId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const field: IDataObject = {};
		if (updateFields.name) field.name = updateFields.name;
		if (updateFields.key) field.key = updateFields.key;
		if (updateFields.control) field.control = updateFields.control;
		if (updateFields.type) field.type = updateFields.type;
		if (updateFields.description) field.description = updateFields.description;
		if (updateFields.required !== undefined) field.required = updateFields.required;
		if (updateFields.options) {
			field.options = parseCommaSeparated(updateFields.options as string);
		}
		if (updateFields.validator) {
			field.validator = parseJsonParameter(updateFields.validator as string);
		}
		if (updateFields.data) field.data = parseJsonParameter(updateFields.data as string);

		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/form/field/${fieldId}`, { field });
	} else if (operation === 'delete') {
		const fieldId = this.getNodeParameter('fieldId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/form/field/${fieldId}`);
	}

	return responseData;
}

// ============================================================================
// Lambda Operations
// ============================================================================
async function executeLambdaOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const name = this.getNodeParameter('name', i) as string;
		const type = this.getNodeParameter('type', i) as string;
		const body_content = this.getNodeParameter('body', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		const lambda: IDataObject = { name, type, body: body_content };
		if (additionalFields.debug !== undefined) lambda.debug = additionalFields.debug;
		if (additionalFields.engineType) lambda.engineType = additionalFields.engineType;

		const body: IDataObject = { lambda };
		if (additionalFields.lambdaId) {
			responseData = await fusionAuthApiRequest.call(
				this,
				'POST',
				`/lambda/${additionalFields.lambdaId}`,
				body,
			);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/lambda', body);
		}
	} else if (operation === 'get') {
		const lambdaId = this.getNodeParameter('lambdaId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/lambda/${lambdaId}`);
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;

		const qs: IDataObject = {};
		if (filters.type) qs.type = filters.type;

		responseData = await fusionAuthApiRequest.call(this, 'GET', '/lambda', {}, qs);
		const lambdas = (responseData.lambdas as IDataObject[]) || [];

		if (returnAll) {
			return lambdas;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			return lambdas.slice(0, limit);
		}
	} else if (operation === 'update') {
		const lambdaId = this.getNodeParameter('lambdaId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const lambda: IDataObject = {};
		if (updateFields.name) lambda.name = updateFields.name;
		if (updateFields.body) lambda.body = updateFields.body;
		if (updateFields.debug !== undefined) lambda.debug = updateFields.debug;
		if (updateFields.engineType) lambda.engineType = updateFields.engineType;

		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/lambda/${lambdaId}`, { lambda });
	} else if (operation === 'delete') {
		const lambdaId = this.getNodeParameter('lambdaId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/lambda/${lambdaId}`);
	}

	return responseData;
}

// ============================================================================
// Webhook Operations
// ============================================================================
async function executeWebhookOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'create') {
		const url = this.getNodeParameter('url', i) as string;
		const eventsEnabled = this.getNodeParameter('eventsEnabled', i) as string[];
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

		// Build events object
		const events: IDataObject = {};
		for (const event of eventsEnabled) {
			events[event] = { enabled: true };
		}

		const webhook: IDataObject = { url, eventsEnabled: events };
		if (additionalFields.connectTimeout) webhook.connectTimeout = additionalFields.connectTimeout;
		if (additionalFields.readTimeout) webhook.readTimeout = additionalFields.readTimeout;
		if (additionalFields.description) webhook.description = additionalFields.description;
		if (additionalFields.global !== undefined) webhook.global = additionalFields.global;
		if (additionalFields.headers) {
			webhook.headers = parseJsonParameter(additionalFields.headers as string);
		}
		if (additionalFields.httpAuthenticationUsername) {
			webhook.httpAuthenticationUsername = additionalFields.httpAuthenticationUsername;
		}
		if (additionalFields.httpAuthenticationPassword) {
			webhook.httpAuthenticationPassword = additionalFields.httpAuthenticationPassword;
		}
		if (additionalFields.sslCertificate) webhook.sslCertificate = additionalFields.sslCertificate;
		if (additionalFields.tenantIds) {
			webhook.tenantIds = parseCommaSeparated(additionalFields.tenantIds as string);
		}
		if (additionalFields.signingKeySecret) {
			webhook.signatureConfiguration = {
				enabled: true,
				signingKeyId: additionalFields.signingKeySecret,
			};
		}

		const body: IDataObject = { webhook };
		if (additionalFields.webhookId) {
			responseData = await fusionAuthApiRequest.call(
				this,
				'POST',
				`/webhook/${additionalFields.webhookId}`,
				body,
			);
		} else {
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/webhook', body);
		}
	} else if (operation === 'get') {
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/webhook/${webhookId}`);
	} else if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;

		responseData = await fusionAuthApiRequest.call(this, 'GET', '/webhook');
		const webhooks = (responseData.webhooks as IDataObject[]) || [];

		if (returnAll) {
			return webhooks;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			return webhooks.slice(0, limit);
		}
	} else if (operation === 'update') {
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

		const webhook: IDataObject = {};
		if (updateFields.url) webhook.url = updateFields.url;
		if (updateFields.eventsEnabled) {
			const events: IDataObject = {};
			for (const event of updateFields.eventsEnabled as string[]) {
				events[event] = { enabled: true };
			}
			webhook.eventsEnabled = events;
		}
		if (updateFields.connectTimeout) webhook.connectTimeout = updateFields.connectTimeout;
		if (updateFields.readTimeout) webhook.readTimeout = updateFields.readTimeout;
		if (updateFields.description) webhook.description = updateFields.description;
		if (updateFields.global !== undefined) webhook.global = updateFields.global;
		if (updateFields.headers) {
			webhook.headers = parseJsonParameter(updateFields.headers as string);
		}
		if (updateFields.httpAuthenticationUsername) {
			webhook.httpAuthenticationUsername = updateFields.httpAuthenticationUsername;
		}
		if (updateFields.httpAuthenticationPassword) {
			webhook.httpAuthenticationPassword = updateFields.httpAuthenticationPassword;
		}
		if (updateFields.sslCertificate) webhook.sslCertificate = updateFields.sslCertificate;
		if (updateFields.tenantIds) {
			webhook.tenantIds = parseCommaSeparated(updateFields.tenantIds as string);
		}
		if (updateFields.signingKeySecret) {
			webhook.signatureConfiguration = {
				enabled: true,
				signingKeyId: updateFields.signingKeySecret,
			};
		}

		responseData = await fusionAuthApiRequest.call(this, 'PUT', `/webhook/${webhookId}`, { webhook });
	} else if (operation === 'delete') {
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'DELETE', `/webhook/${webhookId}`);
	} else if (operation === 'test') {
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		const eventType = this.getNodeParameter('eventType', i) as string;
		responseData = await fusionAuthApiRequest.call(this, 'POST', `/webhook/${webhookId}/test`, {
			event: { type: eventType },
		});
	}

	return responseData;
}

// ============================================================================
// Audit Log Operations
// ============================================================================
async function executeAuditLogOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let responseData: IDataObject = {};

	if (operation === 'get') {
		const auditLogId = this.getNodeParameter('auditLogId', i) as number;
		responseData = await fusionAuthApiRequest.call(this, 'GET', `/system/audit-log/${auditLogId}`);
	} else if (operation === 'search') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;

		const searchBody: IDataObject = {
			search: {},
		};

		if (filters.start) (searchBody.search as IDataObject).start = new Date(filters.start as string).getTime();
		if (filters.end) (searchBody.search as IDataObject).end = new Date(filters.end as string).getTime();
		if (filters.user) (searchBody.search as IDataObject).user = filters.user;
		if (filters.message) (searchBody.search as IDataObject).message = filters.message;
		if (filters.reason) (searchBody.search as IDataObject).reason = filters.reason;
		if (filters.orderBy) (searchBody.search as IDataObject).orderBy = filters.orderBy;
		if (filters.sortOrder) {
			(searchBody.search as IDataObject).sortOrder = filters.sortOrder;
		}

		if (returnAll) {
			const auditLogs = await fusionAuthApiRequestAllItems.call(
				this,
				'POST',
				'/system/audit-log/search',
				'auditLogs',
				searchBody,
				{},
			);
			return auditLogs;
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			(searchBody.search as IDataObject).numberOfResults = limit;
			responseData = await fusionAuthApiRequest.call(this, 'POST', '/system/audit-log/search', searchBody);
			return (responseData.auditLogs as IDataObject[]) || [];
		}
	} else if (operation === 'export') {
		const format = this.getNodeParameter('format', i) as string;
		const exportOptions = this.getNodeParameter('exportOptions', i) as IDataObject;

		const criteria: IDataObject = {};
		if (exportOptions.start) criteria.start = new Date(exportOptions.start as string).getTime();
		if (exportOptions.end) criteria.end = new Date(exportOptions.end as string).getTime();
		if (exportOptions.user) criteria.user = exportOptions.user;
		if (exportOptions.message) criteria.message = exportOptions.message;
		if (exportOptions.reason) criteria.reason = exportOptions.reason;

		responseData = await fusionAuthApiRequest.call(this, 'POST', '/system/audit-log/export', {
			criteria,
			zoneId: 'UTC',
		});
	}

	return responseData;
}
