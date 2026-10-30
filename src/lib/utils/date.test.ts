import { describe, expect, test } from 'bun:test';
import { checkValidDate, isSameDay } from '#utils/date';

describe('checkValidDate', () => {
	test('accepts dates and parseable strings', () => {
		expect(checkValidDate(new Date())).toBe(true);
		expect(checkValidDate('2024-01-02 10:00:00.000Z')).toBe(true);
	});

	test('rejects empty and invalid values', () => {
		expect(checkValidDate('')).toBe(false);
		expect(checkValidDate('not a date')).toBe(false);
		expect(checkValidDate(new Date(NaN))).toBe(false);
	});
});

describe('isSameDay', () => {
	test('compares the calendar day', () => {
		expect(isSameDay(new Date(2024, 0, 1, 8), new Date(2024, 0, 1, 20))).toBe(true);
		expect(isSameDay(new Date(2024, 0, 1), new Date(2024, 0, 2))).toBe(false);
		expect(isSameDay(new Date(2024, 0, 1), new Date(2025, 0, 1))).toBe(false);
	});

	test('accepts strings', () => {
		expect(isSameDay('2024-01-01T08:00:00', new Date(2024, 0, 1, 12))).toBe(true);
	});

	test('is false when either date is invalid', () => {
		expect(isSameDay('', new Date())).toBe(false);
		expect(isSameDay(new Date(), '')).toBe(false);
	});
});
