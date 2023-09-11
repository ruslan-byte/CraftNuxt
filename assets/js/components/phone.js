import IMask from 'imask'

export function maskInit()
{
const phoneInputList = document.querySelectorAll('input[type="tel"]')

	if (phoneInputList.length) {
		phoneInputList.forEach((phoneInput) => {
			IMask(phoneInput, {
				mask: '+{7} 000 000 00 00'
			})
		})
	}
}