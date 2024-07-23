export const formatDate = new Intl.DateTimeFormat('en-GB', {
	dateStyle: 'long'
}).format;

export const formatDateFull = new Intl.DateTimeFormat('en-GB', {
	dateStyle: 'full',
	timeStyle: 'long'
}).format;
