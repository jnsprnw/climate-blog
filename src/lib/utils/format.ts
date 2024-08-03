const formatterDate = new Intl.DateTimeFormat('en-GB', {
	dateStyle: 'long'
}).format;

export function formatDate(date: Date, isShort: boolean = false) {
	const str = formatterDate(date);
	return isShort ? str.replace(/\d{2}(\d{2})$/, `’$1`) : str;
}

export const formatDateFull = new Intl.DateTimeFormat('en-GB', {
	dateStyle: 'full',
	timeStyle: 'long'
}).format;
