export function isSameDay(date1: Date | string, date2: Date | string) {
	if (checkValidDate(date2) && checkValidDate(date2)) {
		date1 = typeof date1 === 'string' ? new Date(date1) : date1;
		date2 = typeof date2 === 'string' ? new Date(date2) : date2;

		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	}
	return false;
}

export function checkValidDate(date: Date | string) {
	date = typeof date === 'string' ? new Date(date) : date;

	return !isNaN(date.getTime());
}
