/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	parseCommaSeparated,
	generateUUID,
	formatDate,
} from '../../nodes/FusionAuth/utils';

describe('FusionAuth Utils', () => {
	describe('parseCommaSeparated', () => {
		it('should parse comma-separated values', () => {
			const result = parseCommaSeparated('a, b, c');
			expect(result).toEqual(['a', 'b', 'c']);
		});

		it('should handle single value', () => {
			const result = parseCommaSeparated('single');
			expect(result).toEqual(['single']);
		});

		it('should handle empty string', () => {
			const result = parseCommaSeparated('');
			expect(result).toEqual([]);
		});

		it('should trim whitespace', () => {
			const result = parseCommaSeparated('  value1  ,  value2  ');
			expect(result).toEqual(['value1', 'value2']);
		});

		it('should filter empty values', () => {
			const result = parseCommaSeparated('a,,b,');
			expect(result).toEqual(['a', 'b']);
		});
	});

	describe('generateUUID', () => {
		it('should generate valid UUID v4 format', () => {
			const uuid = generateUUID();
			const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
			expect(uuid).toMatch(uuidRegex);
		});

		it('should generate unique UUIDs', () => {
			const uuid1 = generateUUID();
			const uuid2 = generateUUID();
			expect(uuid1).not.toBe(uuid2);
		});
	});

	describe('formatDate', () => {
		it('should format Date object to YYYY-MM-DD', () => {
			const date = new Date('2024-03-15T10:30:00Z');
			const result = formatDate(date);
			expect(result).toBe('2024-03-15');
		});

		it('should format ISO string to YYYY-MM-DD', () => {
			const result = formatDate('2024-03-15T10:30:00Z');
			expect(result).toBe('2024-03-15');
		});

		it('should handle timestamp number', () => {
			const timestamp = new Date('2024-03-15T10:30:00Z').getTime();
			const result = formatDate(timestamp);
			expect(result).toBe('2024-03-15');
		});
	});
});
