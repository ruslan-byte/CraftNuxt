<template>
	<div class="modal__form-panel">
		<div class="form-group">
			<label class="form-group__label">Телефон</label>
			<div class="form-group__row">
				<input
						class="form-group__input"
						type="tel"
						name="phone"
						value="+7"
						@input="inputNumber"
					>
				<button
					class="button form-group__confirm-btn button--white"
					@click="sendNumber"
					type="button"
					:disabled="isPhoneButtonDisabled"
				>Подтвердить</button>
			</div>
		</div>
		<div class="form-group" :class="{'form-group--error': isCodeError}">
			<label class="form-group__label form-group__label--small">Введите код из SMS, который мы отправили 5 секунд назад</label>
			<div class="form-group__row">
				<input class="form-group__input" type="text" name="code" placeholder="Код" @input="inputCode">
				<button
					@click="sendCode"
					type="button"
					class="button button--white form-group__confirm-btn"
					:disabled="isCodeSend"
				>
				Отправить</button>
			</div>
			<span class="form-group__error-text">Неверный код.</span>
		</div>
		<p class="modal__hint">
			Если код не пришёл, запросите
			<a class="modal__hint-link" href="#" @click="sendNumber">новый код</a>
		</p>
	</div>
</template>
<script setup>
	import { ref } from 'vue';
	import { useStore } from 'vuex';
	const emit = defineEmits(['getToken'])
	const store = useStore();
	const phoneNumber = ref('79187024219');
	function inputNumber ({target})
	{
		isPhoneButtonDisabled.value = false;
		phoneNumber.value = target.value
	};
	const isPhoneButtonDisabled = ref(false);
	function sendNumber()
	{
		store.dispatch('user/fetchPhone', phoneNumber.value).then(async (response)=>{
			let data = await response.json();
			isPhoneButtonDisabled.value = data.success;
		});
	};

	const isCodeError = ref(false);
	const code = ref('');
	const isCodeSend = ref(false);
	function inputCode ({target})
	{
		isCodeSend.value = false;
		code.value = target.value;
	};
	async function sendCode()
	{
		let response = await store.dispatch('user/fetchUserCode', {phone: phoneNumber.value, code: code.value });
		let data = await response.json()
		isCodeSend.value = data.success;
		isCodeError.value = !data.success;
		emit('getToken', data.token);
	};
	function reset()
	{
		
	}
</script>
<style >
.button--white:disabled
{
	background: transparent;
	user-select: none;
	cursor: default;
	color:#6F6F6F;
	border: 1px solid #6F6F6F;
}
</style>