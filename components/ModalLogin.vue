<template>
	<div>
		<div class="modal modal--login" id="login">
			<div class="modal__body">
				<div class="modal__content modal__content--image-left"
					v-show="store.state.user.login.step === 1">
					<div class="modal__img-box">
						<picture>
							<source srcset="/images/modal-img1@1x.webp, /images/modal-img1@2x.webp 2x" type="image/webp"/><img class="modal__img" src="/images/modal-img1@1x.jpg" srcset="/images/modal-img1@2x.jpg 2x" alt=""/>
						</picture>
					</div>
					<div class="modal__content-box">
						<div class="modal__title-box">
							<h2 class="modal__title">Вход в личный кабинет</h2>
							<button class="modal__close" @click="closeModal">
								<svg class="modal__close-icon">
									<use xlink:href="#close"></use>
								</svg>
							</button>
						</div>
						<div class="modal__wrap">
							<div class="form-group">
								<label class="form-group__label form-group__label--center">Введите свой номер телефона</label>
								<input
									ref="telIntpur"
									class="form-group__input"
									type="tel"
									name="phone"
									value="+7"
									@input="inputNumber"
								>
							</div>
							<label class="checkbox modal__checkbox">
								<input class="checkbox__input" type="checkbox" v-model="isConsentToDataProcessing">
								<span class="checkbox__text">
									Даю согласие на обработку
									<NuxtLink class="text-orange" to="agreement" @click="closeModal();">
									персональных данных</NuxtLink>
								</span>

							</label>
						</div>
						<button
							class="button button--orange button--orange-md modal__btn"
							:disabled="!(phoneNumber.length === 16 && isConsentToDataProcessing)"
							@click="sendNumber"
						>Далее</button>
					</div>
				</div>
				<div class="modal__content modal__content--image-left"
					v-show="store.state.user.login.step === 2">
					<div class="modal__img-box">
						<picture>
							<source srcset="/images/modal-img1@1x.webp, /images/modal-img1@2x.webp 2x" type="image/webp"/><img class="modal__img" src="/images/modal-img1@1x.jpg" srcset="/images/modal-img1@2x.jpg 2x" alt=""/>
						</picture>
					</div>
					<div class="modal__content-box">
						<div class="modal__title-box">
							<h2 class="modal__title">Вход в личный кабинет</h2>
							<button class="modal__close js-modal-close">
								<svg class="modal__close-icon">
									<use xlink:href="#close"></use>
								</svg>
							</button>
						</div>
						<div class="modal__wrap">
							<div class="form-group">
								<label class="form-group__label form-group__label--small form-group__label--center">Введите код из SMS, который мы отправили 5 секунд назад</label>
								<input
									class="form-group__input"
									type="number"
									name="code"
									placeholder="Код"
									v-model="code"
								>
							</div>
							<p class="modal__hint">
								Если код не пришёл, запросите
								<a class="modal__hint-link" href="#" @click="sendNumber">новый код</a>
							</p>
						</div>
						<button
							class="button button--orange button--orange-md modal__btn"
							:disabled="!code"
							@click="checkCode"
						>Подтвердить</button>
						<button class="modal__button-back" @click="store.commit('user/setLoginStep', 1)">
							<svg class="modal__button-back-icon">
								<use xlink:href="#arrow-back"></use>
							</svg>Изменить телефон
						</button>
					</div>
				</div>
				<div class="modal__content modal__content--image-left"
					v-show="store.state.user.login.step === 3">
					<div class="modal__img-box">
						<picture>
							<source srcset="/images/modal-img1@1x.webp, /images/modal-img1@2x.webp 2x" type="image/webp"/><img class="modal__img" src="/images/modal-img1@1x.jpg" srcset="/images/modal-img1@2x.jpg 2x" alt=""/>
						</picture>
					</div>
					<div class="modal__content-box">
						<div class="modal__title-box">
							<h2 class="modal__title show-desktop">Вход в личный кабинет</h2>
							<button class="modal__close" @click="closeModal">
								<svg class="modal__close-icon">
									<use xlink:href="#close"></use>
								</svg>
							</button>
						</div>
						<div class="modal__success-box">
							<svg class="modal__success-icon">
								<use xlink:href="#success"></use>
							</svg>
							<p class="modal__success-text">Ваш номер телефона подтверждён!</p>
						</div>
						<NuxtLink
							to="lk"
							class="button button--orange button--orange-md modal__btn"
							@click="login">Войти
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { ref } from "vue"
	import { useStore } from "vuex";
	import { closeModal } from "~/assets/js/components/modal" 
	const store = useStore();
	let phoneNumber = ref('');
	let code = ref('');
	let isConsentToDataProcessing = ref(true);
	let telIntpur = ref(null);
	function inputNumber ({target})
	{
		phoneNumber.value = target.value
	};
	function sendNumber()
	{
		store.dispatch('user/sendPhoneNumber', phoneNumber.value)	
	}
	function checkCode()
	{
		store.dispatch('user/checkCode', {phone: phoneNumber.value, code: code.value})	
	}
	async function login()
	{
		closeModal();
		await store.dispatch('user/loginInToSystem');
		setTimeout(resetFormData, 1000)
	}
	function resetFormData()
	{
		telIntpur.value.value ='+7'
		store.commit('user/setLoginStep', 1);
		phoneNumber.value = '';
		code.value = '';
		isConsentToDataProcessing.value = true;
	}
</script>
<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>