function toDate(date: Date | string): Date {
	return typeof date === 'string' ? new Date(date) : date;
}

export function checkValidDate(date: Date | string): boolean {
	return !isNaN(toDate(date).getTime());
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
	if (!checkValidDate(date1) || !checkValidDate(date2)) {
		return false;
	}
	const d1 = toDate(date1);
	const d2 = toDate(date2);
	return (
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
	);
}
