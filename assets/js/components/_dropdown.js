const dropdownList = document.querySelectorAll('.dropdown')

if (dropdownList.length) {
	dropdownList.forEach((dropdown) => {
		dropdown.addEventListener('click', (evt) => {
			evt.stopPropagation()
			dropdown.classList.toggle('dropdown--active')
			dropdownList.forEach((el) => {
				if (el !== dropdown) {
					el.classList.remove('dropdown--active')
				}
			})
		})
		const input = dropdown.querySelector('.dropdown__value')
		const optionsList = dropdown.querySelectorAll('.dropdown__option')
		optionsList.forEach((option) => {
			option.addEventListener('click', (e) => {
				e.preventDefault()

				if (dropdown.classList.contains('dropdown--navigate')) {
					window.location.href = option.dataset.value
				} else {
					input.value = option.dataset.value
					dropdown.querySelector('.dropdown__option--selected').classList.remove('dropdown__option--selected')
					option.classList.add('dropdown__option--selected')

					if (dropdown.classList.contains('dropdown--with-flag')) {
						const currentFlag = dropdown.querySelector('.dropdown__value-box .dropdown__flag')
						const nextFlag = option.querySelector('.dropdown__flag')
						currentFlag.src = nextFlag.src
					}
				}
			})
		})
	})
}

document.addEventListener('click', closeAllSelects)

function closeAllSelects() {
	dropdownList.forEach((dropdown) => {
		dropdown.classList.remove('dropdown--active')
	})
}
