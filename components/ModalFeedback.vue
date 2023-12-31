<template>
	<div
		class="modal"
		id="feedback"
		ref="modal"
	>
		<div class="modal__body" :class="{'modal--feedback': !isSuccess, 'modal--success': isSuccess}">
			<div class="modal__content" v-show="isSuccess">
				<svg class="modal__success-icon">
					<use xlink:href="#success"></use>
				</svg>
				<h2 class="modal__title">Ваше сообщение успешно отправлено!</h2>
				<p class="modal__subtitle">Наши менеджеры свяжутся с вами в ближайшее время</p>
				<button
					class="button button--orange button--orange-md modal__btn" 
					@click="reset"
				>Отлично!</button>
			</div>
			<div class="modal__content" v-show="!isSuccess">
				<div class="modal__content-box">
					<div class="modal__title-box">
						<div class="modal__wrap">
							<h2 class="modal__title">Обратная связь</h2>
							<p class="modal__subtitle">
								Есть вопросы?
								<br class="hide-desktop">Напишите нам, и мы ответим в ближайшее время
							</p>
						</div>
						<button class="modal__close" @click="reset">
							<svg class="modal__close-icon">
								<use xlink:href="#close"></use>
							</svg>
						</button>
					</div>
					<form @submit.prevent="submit">
						<div class="modal__wrap">
							<div class="form-group" :class="{'form-group--error': data.selectTopic.isEmpty}">
								<p class="form-group__label">Тема вопроса</p>
								<div class="dropdown" ref="dropdown">
									<div class="dropdown__value-box">
										<input class="dropdown__value" type="text" placeholder="Выберите тему" disabled :value="data.selectTopic.title">
										<svg class="dropdown__arrow">
											<use xlink:href="#dropdown-arrow"></use>
										</svg>
									</div>
									<ul class="dropdown__options-list">
										<li
											v-for="topic of topicsList"
											:key="topic.id"
											class="dropdown__option"
											:data-value="topic.title"
											@click="data.selectTopic = topic"
										>
											{{topic.title}}
										</li>
									</ul>
								</div>
								<span class="form-group__error-text" data-v-inspector="components/ModalUser.vue:20:97">Поле не должно быть пустым.</span>
							</div>
							<div class="form-group" :class="{'form-group--error': data.email.isEmpty}">
								<label class="form-group__label">E-mail для ответа</label>
								<input class="form-group__input" type="email" name="email" placeholder="Введите email" v-model="data.email.value">
								<span class="form-group__error-text" data-v-inspector="components/ModalUser.vue:20:97">Поле не должно быть пустым.</span>
							</div>
							<div class="form-group" :class="{'form-group--error': data.name.isEmpty}">
								<label class="form-group__label">Имя Фамилия</label>
								<input class="form-group__input" type="text" name="name" placeholder="Введите имя и фамилию" v-model="data.name.value">
								<span class="form-group__error-text" data-v-inspector="components/ModalUser.vue:20:97">Поле не должно быть пустым.</span>
							</div>
							<div class="form-group" :class="{'form-group--error': data.phone.isEmpty}">
								<label class="form-group__label">Номер телефона</label>
								<input ref="telTarget" class="form-group__input" type="tel" name="phone" value="+7"
								@input="(event)=>{data.phone.value = event.target.value}" >
								<span class="form-group__error-text" data-v-inspector="components/ModalUser.vue:20:97">Поле не должно быть пустым.</span>
							</div>
							<div class="form-group" :class="{'form-group--error': data.message.isEmpty}">
								<label class="form-group__label">Ваше сообщение</label>
								<textarea class="form-group__input form-group__input--textarea" name="message" v-model="data.message.value"></textarea>
								<span class="form-group__error-text" data-v-inspector="components/ModalUser.vue:20:97">Поле не должно быть пустым.</span>
							</div>
						</div>
						<label class="checkbox modal__checkbox form-group" :class="{'form-group--error':data.isConsent.isEmpty}">
							<input class="checkbox__input" type="checkbox" v-model="data.isConsent.value">
							<span class="checkbox__text">
								Даю согласие на обработку
								<NuxtLink class="text-orange" to="agreement" @click="reset();">
								персональных данных</NuxtLink>
							</span>
							<span class="form-group__error-text" data-v-inspector="components/ModalUser.vue:20:97">Объязательное поле</span>
						</label>
						<button class="button button--orange button--orange-md modal__btn">Отправить</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { closeModal } from '~/assets/js/components/modal.js';
	import { ref } from "vue";
	const runtimeConfig = useRuntimeConfig();
	let isSuccess = ref(false),
		telTarget = ref(null),
		topicsList = ref([]),
		data = ref({
			selectTopic: {
			  id: '',
			  title: '' ,
			  isEmpty: false
			},
			email: {
			 value: '',
			 isEmpty: false
			},
			name: {
			 value: '',
			 isEmpty: false
			},
			phone: {
			 value: '',
			 isEmpty: false
			},
			message: {
			 value: '',
			 isEmpty: false
			},
			isConsent:
			{
				value: false,
				isEmpty: false
			}
		});

	onMounted(()=>{
		getTopics();
	});
	
	function submit()
	{
		if(validateData()){
			fetch(runtimeConfig.public.API_BASE_URL +'/feedback/',
			{
				method:'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(
				{
					"topic_id": data.value.selectTopic.id,
					"email": data.value.email.value,
					"full_name": data.value.name.value,
					"phone": data.value.phone.value,
					"message": data.value.message.value
				})
			}).then(async (response)=>{
				let status = await response.json();
				if (status.success)
					isSuccess.value = true;
			})
		}

	}
	function validateData()
	{
		data.value.selectTopic.isEmpty = !data.value.selectTopic.id;
		data.value.email.isEmpty = !data.value.email.value;
		data.value.name.isEmpty = !data.value.name.value;
		data.value.phone.isEmpty = !data.value.phone.value; 
		data.value.message.isEmpty = !data.value.message.value;
		data.value.isConsent.isEmpty = !data.value.isConsent.value;
		console.log(data.value.selectTopic.isEmpty, data.value.email.isEmpty, data.value.name.isEmpty, data.value.phone.isEmpty, data.value.message.isEmpty, data.value.isConsent.isEmpty);
		return Object.values(data.value).reduce((accum, item)=> accum && !item.isEmpty, true)
	}
	function getTopics() {
		fetch( runtimeConfig.public.API_BASE_URL + '/feedback-topics/').then( async (data)=>{
			let dataJson = await data.json();
			topicsList.value = dataJson.topics;
		})
	}
	function reset()
	{
		closeModal();
		setTimeout( ()=>{
			isSuccess.value = false;
			data.value = {
				selectTopic: {
					id: '',
					title: '' ,
					isEmpty: false
				},
				email: {
					value: '',
					isEmpty: false
				},
				name: {
					value: '',
					isEmpty: false
				},
				phone: {
					value: '',
					isEmpty: false
				},
				message: {
					value: '',
					isEmpty: false
				},
				isConsent:
				{
					value: false,
					isEmpty: false
				}
			}
			telTarget.value.value = "+7"
		}, 1000)
	}
	import { useRouter } from 'vue-router';
	const route = useRouter();
	function openPagePalitic()
	{
		
		route.push({ path: "/agreement" });
		reset();
	}
</script>
<style lang="scss">
</style>