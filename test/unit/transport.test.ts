/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { parseJsonParameter, buildRequestBody } from '../../nodes/FusionAuth/transport';

describe('FusionAuth Transport', () => {
	describe('parseJsonParameter', () => {
		it('should parse valid JSON string', () => {
			const result = parseJsonParameter('{"key": "value"}');
			expect(result).toEqual({ key: 'value' });
		});

		it('should return object as-is', () => {
			const obj = { key: 'value' };
			const result = parseJsonParameter(obj);
			expect(result).toEqual(obj);
		});

		it('should return empty object for empty string', () => {
			const result = parseJsonParameter('');
			expect(result).toEqual({});
		});

		it('should throw for invalid JSON', () => {
			expect(() => parseJsonParameter('invalid json')).toThrow();
		});
	});

	describe('buildRequestBody', () => {
		it('should build request body with provided data', () => {
			const data = { user: { email: 'test@example.com' } };
			const result = buildRequestBody(data);
			expect(result).toEqual(data);
		});

		it('should handle nested objects', () => {
			const data = {
				user: {
					email: 'test@example.com',
					data: {
						customField: 'value',
					},
				},
			};
			const result = buildRequestBody(data);
			expect(result).toEqual(data);
		});

		it('should filter out undefined values', () => {
			const data = { key1: 'value1', key2: undefined };
			const result = buildRequestBody(data);
			expect(result).toEqual({ key1: 'value1' });
		});
	});
});
