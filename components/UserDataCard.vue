<template>
  <div class="data-card">
	<div class="data-card__title-box">
		<h2 class="data-card__title">Мои данные</h2>
		<button
			class="button button--outline-orange data-card__desktop-btn"
			@click="showUserDataModal"
		>Редактировать
			<svg class="button__icon">
				<use xlink:href="#pencil"></use>
			</svg>
		</button>
		<button
			@click="showModal('code')"
			class="button button--outline-orange button--icon-only data-card__mobile-btn"
			aria-label="Edit"
		>
			<svg class="button__icon">
				<use xlink:href="#pencil"></use>
			</svg>
		</button>
	</div>
	<p class="data-card__name">{{firstName}} {{lastName}}</p>
	<p class="data-card__birthday">
		Дата рождения: {{store.state.user.data.dateOfBirth}}
	</p>
	<p class="data-card__contacts">
		<svg class="data-card__contacts-icon">
			<use xlink:href="#phone"></use>
		</svg>{{phone}}
	</p>
	<p class="data-card__contacts">
		<svg class="data-card__contacts-icon">
			<use xlink:href="#envelope"></use>
		</svg>
		{{store.state.user.data.email}}
	</p>
	<div class="data-card__info-box" v-if="!store.state.user.data.gotEmailBonus">
		<p class="data-card__info-text-big">
			Получите +50 баллов
			<br class="show-desktop">за подтверждение e-mail
		</p>
		<p class="data-card__info-text">Получите +50 баллов за подтверждение e-mail</p>
		<p class="data-card__info-text-small">
			Для этого необходимо перейти по ссылке из письма. Если вы не получали письмо, то
			<a class="text-orange" href="#">запросите его ещё раз.</a>
		</p>
	</div>
	<div class="data-card__score-row">
		<p class="data-card__score"><span class="data-card__score-value">
			{{store.state.user.data.loyalty_points}}
		</span>
		<template v-if="store.state.user.data.loyalty_points === 1">Балл</template>
		<template v-else-if="store.state.user.data.loyalty_points < 5 && store.state.user.data.loyalty_points !== 0">Балла</template>
		<template v-else>Баллов</template>
			
		</p>
		<p class="data-card__score"><span class="data-card__score-value">
			{{store.getters['user/getStikerCount']}}
		</span>
		<template v-if="store.getters['user/getStikerCount'] === 1">Стикер</template>
		<template v-else-if="store.getters['user/getStikerCount'] < 5 && store.getters['user/getStikerCount'] !== 0">Стикера</template>
		<template v-else>Стикеров</template>
	</p>
	</div>
</div>
</template>
<script setup>
	import { computed, onMounted  } from "vue"
	import { showModal } from '~/assets/js/components/modal.js'
	import { useStore } from "vuex";
	const store = useStore();
	const firstName = computed(() => {
		return store.state.user.data?.firstName === '' ? 'Имя' : store.state.user.data?.firstName
	})
	const lastName = computed(() => {
		return store.state.user.data?.lastName === '' ? 'Фамилия' : store.state.user.data?.lastName
	})
	const phone = computed(() => {
		if(store.state.user.data.phone)
		{
			let numberArr = store.state.user.data.phone.split('');
			return `+${numberArr[0]} ${numberArr[1]}${numberArr[2]}${numberArr[3]} ${numberArr[4]}${numberArr[5]}${numberArr[6]} ${numberArr[7]}${numberArr[8]} ${numberArr[9]}${numberArr[10]}`
		}
		else
			return '-';
	})
	onMounted(()=>{
		store.dispatch('user/getSticker');
	})
	function showUserDataModal()
	{
		showModal('user');
		store.state.modal.getDataFunc();
	}
</script>
<style lang="scss">
</style>