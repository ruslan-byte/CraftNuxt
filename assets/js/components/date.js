import flatpickr from "flatpickr"
import { Russian } from "flatpickr/dist/l10n/ru.js"

export function dateInit() 
{
	if(process.browser)
	{
		const dateInputList = document.querySelectorAll('._date')
	
		if (dateInputList.length) {
			dateInputList.forEach((dateInput) => {
				flatpickr(dateInput, {
					"locale": Russian,
					dateFormat: "d.m.Y",
				});
			})
		}
	}
}