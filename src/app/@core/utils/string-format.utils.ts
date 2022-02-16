export function stringFormat(str: string, ...params: any[]) {
	for (let i = 0; i < params.length; i++) {
		const regexp = new RegExp('\\{' + i + '\\}', 'gi');
		str = str.replace(regexp, params[i]);
	}
	return str;
}