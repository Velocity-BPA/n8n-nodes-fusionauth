/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	FUSIONAUTH_EVENTS,
	IDENTITY_PROVIDER_TYPES,
	LAMBDA_TYPES,
	FORM_TYPES,
	FORM_FIELD_CONTROLS,
	FORM_FIELD_TYPES,
	LINKING_STRATEGIES,
	TWO_FACTOR_METHODS,
} from '../../nodes/FusionAuth/constants';

describe('FusionAuth Constants', () => {
	describe('FUSIONAUTH_EVENTS', () => {
		it('should contain user events', () => {
			expect(FUSIONAUTH_EVENTS['user.create']).toBeDefined();
			expect(FUSIONAUTH_EVENTS['user.update']).toBeDefined();
			expect(FUSIONAUTH_EVENTS['user.delete']).toBeDefined();
			expect(FUSIONAUTH_EVENTS['user.login.success']).toBeDefined();
			expect(FUSIONAUTH_EVENTS['user.login.failed']).toBeDefined();
		});

		it('should contain jwt events', () => {
			expect(FUSIONAUTH_EVENTS['jwt.refresh']).toBeDefined();
			expect(FUSIONAUTH_EVENTS['jwt.refresh-token.revoke']).toBeDefined();
		});

		it('should contain group events', () => {
			expect(FUSIONAUTH_EVENTS['group.create']).toBeDefined();
			expect(FUSIONAUTH_EVENTS['group.update']).toBeDefined();
			expect(FUSIONAUTH_EVENTS['group.delete']).toBeDefined();
		});

		it('should have more than 40 events', () => {
			expect(Object.keys(FUSIONAUTH_EVENTS).length).toBeGreaterThan(40);
		});
	});

	describe('IDENTITY_PROVIDER_TYPES', () => {
		it('should contain common IdP types', () => {
			const values = IDENTITY_PROVIDER_TYPES.map((item) => item.value);
			expect(values).toContain('Apple');
			expect(values).toContain('Facebook');
			expect(values).toContain('Google');
			expect(values).toContain('OpenIDConnect');
			expect(values).toContain('SAMLv2');
		});

		it('should have at least 10 IdP types', () => {
			expect(IDENTITY_PROVIDER_TYPES.length).toBeGreaterThanOrEqual(10);
		});
	});

	describe('LAMBDA_TYPES', () => {
		it('should contain common lambda types', () => {
			const values = LAMBDA_TYPES.map((item) => item.value);
			expect(values).toContain('JWTPopulate');
			expect(values).toContain('OpenIDReconcile');
			expect(values).toContain('SAMLv2Reconcile');
		});

		it('should have at least 10 lambda types', () => {
			expect(LAMBDA_TYPES.length).toBeGreaterThanOrEqual(10);
		});
	});

	describe('FORM_TYPES', () => {
		it('should contain form types', () => {
			const values = FORM_TYPES.map((item) => item.value);
			expect(values).toContain('registration');
			expect(values).toContain('adminRegistration');
			expect(values).toContain('adminUser');
			expect(values).toContain('selfServiceUser');
		});
	});

	describe('FORM_FIELD_CONTROLS', () => {
		it('should contain common field controls', () => {
			const values = FORM_FIELD_CONTROLS.map((item) => item.value);
			expect(values).toContain('checkbox');
			expect(values).toContain('text');
			expect(values).toContain('select');
			expect(values).toContain('textarea');
		});
	});

	describe('FORM_FIELD_TYPES', () => {
		it('should contain common field types', () => {
			const values = FORM_FIELD_TYPES.map((item) => item.value);
			expect(values).toContain('string');
			expect(values).toContain('number');
			expect(values).toContain('bool');
			expect(values).toContain('email');
		});
	});

	describe('LINKING_STRATEGIES', () => {
		it('should contain linking strategies', () => {
			const values = LINKING_STRATEGIES.map((item) => item.value);
			expect(values).toContain('CreatePendingLink');
			expect(values).toContain('LinkAnonymously');
			expect(values).toContain('LinkByEmail');
		});
	});

	describe('TWO_FACTOR_METHODS', () => {
		it('should contain 2FA methods', () => {
			const values = TWO_FACTOR_METHODS.map((item) => item.value);
			expect(values).toContain('authenticator');
			expect(values).toContain('email');
			expect(values).toContain('sms');
		});
	});
});
