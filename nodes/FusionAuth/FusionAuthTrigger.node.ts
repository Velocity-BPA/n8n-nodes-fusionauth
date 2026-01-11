/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IDataObject,
} from 'n8n-workflow';
import { createHmac } from 'crypto';

import { FUSIONAUTH_EVENTS } from './constants';

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

export class FusionAuthTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FusionAuth Trigger',
		name: 'fusionAuthTrigger',
		icon: 'file:fusionauth.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Handle FusionAuth webhook events',
		defaults: {
			name: 'FusionAuth Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'fusionAuthApi',
				required: false,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: Object.entries(FUSIONAUTH_EVENTS).map(([value, name]) => ({
					name: name as string,
					value,
				})),
				description: 'The events to listen for',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Signature Secret',
						name: 'signatureSecret',
						type: 'string',
						typeOptions: {
							password: true,
						},
						default: '',
						description: 'Secret key for HMAC signature verification (optional)',
					},
					{
						displayName: 'Include All Events',
						name: 'includeAllEvents',
						type: 'boolean',
						default: false,
						description: 'Whether to trigger on all events regardless of selection',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// FusionAuth webhooks are configured externally
				// Just return true to allow the webhook to work
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				emitLicensingNotice();
				// FusionAuth webhooks are configured externally in FusionAuth Admin UI
				// This hook just validates the setup
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// FusionAuth webhooks are configured externally
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		emitLicensingNotice();

		const req = this.getRequestObject();
		const body = this.getBodyData() as IDataObject;
		const events = this.getNodeParameter('events') as string[];
		const options = this.getNodeParameter('options') as IDataObject;

		// Verify signature if secret is provided
		if (options.signatureSecret) {
			const signature = req.headers['x-fusionauth-signature'] as string;
			if (signature) {
				const rawBody = JSON.stringify(body);
				const expectedSignature = createHmac('sha256', options.signatureSecret as string)
					.update(rawBody)
					.digest('base64');

				if (signature !== expectedSignature) {
					return {
						webhookResponse: {
							status: 401,
							body: 'Invalid signature',
						},
					};
				}
			}
		}

		// Get event type from payload
		const event = body.event as IDataObject | undefined;
		const eventType = event?.type as string;

		if (!eventType) {
			return {
				webhookResponse: {
					status: 400,
					body: 'Missing event type',
				},
			};
		}

		// Check if event should be processed
		const includeAllEvents = options.includeAllEvents as boolean;
		if (!includeAllEvents && !events.includes(eventType)) {
			// Event not in selected events, ignore
			return {
				webhookResponse: {
					status: 200,
					body: 'Event ignored',
				},
			};
		}

		// Extract relevant data from webhook payload
		const webhookData: IDataObject = {
			eventType,
			eventId: event?.id as string,
			eventTime: event?.createInstant as number,
			tenantId: event?.tenantId as string,
			...body,
		};

		return {
			workflowData: [this.helpers.returnJsonArray([webhookData])],
		};
	}
}
