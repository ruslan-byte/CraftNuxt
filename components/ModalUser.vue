<template>
	<div class="modal modal--user" id="user">
		<div class="modal__body">
			<div class="modal__content">
				<div class="modal__content-box">
					<div class="modal__title-box">
						<div class="modal__wrap">
							<h2 class="modal__title">Мои данные</h2>
							<p class="modal__subtitle">Пожалуйста, введите свои реальные данные, иначе могут быть проблемы при получении призов.</p>
						</div>
						<button class="modal__close" @click="closeModal">
							<svg class="modal__close-icon">
								<use xlink:href="#close"></use>
							</svg>
						</button>
					</div>
					<form @submit.prevent="submitData">
						<div class="modal__wrap">
							<div class="form-group">
								<label class="form-group__label">Имя</label>
								<input
									class="form-group__input"
									type="text"
									name="first-name"
									placeholder="Введите имя"
									v-model="data.firstName"
								>
							</div>
							<div class="form-group">
								<label class="form-group__label">Фамилия</label>
								<input
									class="form-group__input"
									type="text"
									name="first-name"
									placeholder="Введите фамилию"
									v-model="data.lastName"
								>
							</div>
							<div class="form-group">
								<p class="form-group__label">Пол</p>
								<div class="form-group__option-row">
									<label class="option">
										<input
											class="option__input"
											type="radio"
											name="gender"
											:checked="store.state.user.data.sex === 'man'"
											@change="()=>{data.sex = 'man'}"
										>
										<p class="option__text">Муж
											<svg class="option__icon">
												<use xlink:href="#male"></use>
											</svg>
										</p>
									</label>
									<label class="option">
										<input
											class="option__input"
											type="radio"
											name="gender"
											:checked="store.state.user.data.sex === 'woman'"
											@change="()=>{data.sex = 'woman'}"
										>
										<p class="option__text">Жен
											<svg class="option__icon">
												<use xlink:href="#female"></use>
											</svg>
										</p>
									</label>
								</div>
							</div>
							<div class="form-group">
								<label class="form-group__label">Город</label>
								<input
									class="form-group__input"
									type="text"
									name="city"
									placeholder="Введите город"
									v-model="data.city"
								>
							</div>
							<div class="form-group mb24">
								<label class="form-group__label">Дата рождения</label>
								<input
									class="form-group__input _date"
									type="text"
									name="first-name"
									v-model.lazy="data.dateOfBirth"
								>
							</div>
							<div class="modal__form-panel">
								<div class="form-group">
									<label class="form-group__label">Email</label>
									<input
										class="form-group__input"
										type="email"
										name="email"
										placeholder="Введите email"
										v-model="data.email"
									>
								</div>
								<template v-if="!data.gotEmailBonus">
									<p class="modal__hint modal__hint--yellow">E-mail ещё не подтверждён.</p>
									<p class="modal__hint">
										Для подтверждения e-mail после обновления данных перейдите по ссылке из письма и получите
										<span class="text-white">+50 баллов.</span>
									</p>
								</template>
							</div>
						</div>
						<button
							class="button button--orange button--orange-md modal__btn"
							@click="closeModal"
						>Обновить</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { closeModal } from '~/assets/js/components/modal.js'
	import { dateInit } from '~/assets/js/components/date.js'
	import { computed, ref, onMounted } from "vue"
	import { useStore } from "vuex";
	const store = useStore();


	const data = ref({
		firstName:  "",
		lastName:  "",
		sex:  "",
		dateOfBirth:  "",
		email:  "",
		gotEmailBonus: false,
		city: ""
	})
	onMounted(()=>{
		store.commit('modal/setDataFunc', setData);
		dateInit();
	})

	const phone = computed(() => {
		if(store.state.user.data.phone)
		{
			let numberArr = store.state.user.data.phone.split('');
			return `+${numberArr[0]} ${numberArr[1]}${numberArr[2]}${numberArr[3]} ${numberArr[4]}${numberArr[5]}${numberArr[6]} ${numberArr[7]}${numberArr[8]} ${numberArr[9]}${numberArr[10]}`
		}
		else
			return '-';
	});
	const dateCorrect = (date) => {
		let dateObj = date.split('.');
		return `${dateObj[0]}-${dateObj[1]}-${dateObj[2]}`
	};
	const dateForVisible = (date) =>
	{
		let dateObj = date.split('-');
		console.log(dateObj);
		return `${dateObj[2]}.${dateObj[1]}.${dateObj[0]}`
	}
	function setData()
	{
		data.value.firstName = store.state.user.data.firstName;
		data.value.lastName = store.state.user.data.lastName;
		data.value.sex = store.state.user.data.sex;
		data.value.dateOfBirth = dateForVisible(store.state.user.data.dateOfBirth);
		data.value.email = store.state.user.data.email;
		data.value.gotEmailBonus = store.state.user.data.gotEmailBonus;
		data.value.city = store.state.user.data.cityName;
	}
	async function submitData()
	{
		if(isEmailChange())
			fetchVerificateEmail();
		await store.dispatch('user/updateUserData', 
			{
				"firstName": data.value.firstName,
				"lastName": data.value.lastName,
				"sex": data.value.sex,
				"dateOfBirth": dateCorrect(data.value.dateOfBirth),
				"email": data.value.email,
				"cityName": data.value.city
			}
		)
		
	}
	function isEmailChange()
	{
		
		console.log(data.value.email);
		console.log(store.state.user.data.email);
		return !(data.value.email === store.state.user.data.email);
	}
	function fetchVerificateEmail()
	{
		store.dispatch('user/fetchVerificateEmail', data.value.email)
	}
</script>
<style lang="scss">
</style>