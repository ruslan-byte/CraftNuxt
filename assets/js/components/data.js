import flatpickr from "flatpickr"
import { Russian } from "flatpickr/dist/l10n/ru.js"

export function dateInit() 
{
	if(process.browser)
	{
		const dateInputList = document.querySelectorAll('.form-group__input--date')
	
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