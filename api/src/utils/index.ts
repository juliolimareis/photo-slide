//###################### Utils #############################

// remove arquivo do servidor
export async function removeFile(path: string): Promise<boolean> {
	const fs = require('fs');
	if (fs.existsSync(path)) {
		await fs.unlinkSync(path);
		return true;
	} return false;
}

// Verifica se string esta vazia
export function isEmpty(value: string) { // retorna TRUE se o objeto estiver vazio
	if (!value) {
		return true;
	}
	return !Object.keys(value).length;
}

// export function isEmpty(value: string | null): boolean {
// 	if (value) {
// 		return (value.length === 0 || !value.trim);
// 	} return true
// }

// Converte string data pt-BR em string data en-US
export function convertDateUsa(strPtBr: string): string {	
	const day = strPtBr.split("/")[0]
	const month = strPtBr.split("/")[1]
	const year = strPtBr.split("/")[2]
	const convert = year + '-' +("0" + month).slice(-2) + '-' + ("0" + day).slice(-2) 
	return convert
}

// Converte string data en-US em string data pt-BR 
export function	convertDataPtBr(strEnUs: string): string {
	if(!isEmpty(strEnUs)){
		const year = strEnUs.split("-")[0]
		const month = strEnUs.split("-")[1]
		const day = strEnUs.split("-")[2]
		const convert = ("0" + day).slice(-2) + '/' + ("0" + month).slice(-2) + '/' + year
		return convert
	}
	return strEnUs
}

//pega o ano de uma string datetime
export function	getYearDatetimePtBr(strPtBr: string): string {
	if(!isEmpty(strPtBr)){
		return strPtBr.split(" ")[0].split("/")[2]
	}
	return strPtBr
}

// Converte string data en-US em string data pt-BR 
export function	convertDatetimePtBr(strEnUs: string): string {
	
	if(!isEmpty(strEnUs)){
		const datatime = strEnUs.split(" ")		
		const arrayDate = datatime[0].split("-")
		const time = datatime[1]

		const year = arrayDate[0]
		const month = arrayDate[1]
		const day = arrayDate[2]
		const date = ("0" + day).slice(-2) + '/' + ("0" + month).slice(-2) + '/' + year
		return `${date} ${time}`
	}
	return ""
}

/* Converte string data pt-BR para objeto Date*/ 
export function parseStrPtBrDate(strPtBr: string): Date | boolean {
	return new Date(`${convertDateUsa(strPtBr)}T00:00:00`)
}

/* Converte string data en-US para objeto Date*/ 
export function parseStrEnUsDate(strEnUs: string): Date | boolean {
	return new Date(`${strEnUs}T00:00:00`)
}

// Converte objeto Date() para string en-us
export function parseDateEnUs(date: Date): string {		
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
	const month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
	const year = date.getFullYear();
	return `${year}-${month}-${day}`
}

// Converte objeto Date() para string pt-br
export function parseDatePtBR(date: Date): string {
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
	const month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
	const year = date.getFullYear();
	return `${day}/${month}/${year}`
}

// Verifica se é email válido
export function isEmail(value: string): boolean {
	return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(value)
}

// Verifica se é numérico
export function isNumber(value: string): boolean {
	return !isNaN(parseInt(value))
}

//converte objeto em parametro query
export function convertToParameterQuery(obj: any): string {
	let query = "?"
	Object.keys(obj).map((key: string) => {
		if(!isEmpty(obj[key])){
			let value = obj[key]
			if(key != "numYear" && key != "num" && key != "year" && key != "status" && key != "dateTimeOpened"){
				value = `%${value}%`
			}
			query += `${key}=${value}&`
		}
	})
	return query.replace(/&\s*$/, "");
}

//########## Interfaces ##############
export interface Datetime {
	date: string;
	time: string;
}