import { expect, test } from 'bun:test';
import { formatDate } from './format';

test('formatDate with short years', () => {
	const date = new Date(2024, 0, 1); // 1. Januar 2024
	const result = formatDate(date, true);
	expect(result).toBe('1 January ’24');
});

test('formatDate with long years', () => {
	const date = new Date(2024, 0, 1); // 1. Januar 2024
	const result = formatDate(date, false);
	expect(result).toBe('1 January 2024');
});

test('formatDate with short years for a date in 1999', () => {
	const date = new Date(1999, 11, 31); // 31. Dezember 1999
	const result = formatDate(date, true);
	expect(result).toBe('31 December ’99');
});

test('formatDate with long years for a date in 1999', () => {
	const date = new Date(1999, 11, 31); // 31. Dezember 1999
	const result = formatDate(date, false);
	expect(result).toBe('31 December 1999');
});

test('formatDate with short years for a date in 2000', () => {
	const date = new Date(2000, 6, 14); // 14. Juli 2000
	const result = formatDate(date, true);
	expect(result).toBe('14 July ’00');
});

test('formatDate with long years for a date in 2000', () => {
	const date = new Date(2000, 6, 14); // 14. Juli 2000
	const result = formatDate(date, false);
	expect(result).toBe('14 July 2000');
});
