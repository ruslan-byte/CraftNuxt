<template>
	<main class="main">
		<section class="section-winners">
			<div class="container">
				<h1 class="section-winners__title">Победители</h1>
				<div class="section-winners__row-box">
					<TransitionGroup name="winners-list" tag="ul">
						<div class="section-winners__row" v-for="(winner, index) of lotteryWinners" :key="index">
							<time class="section-winners__time section-winners__time--desktop">{{winner.lotteryDrawDate}}</time>
							<p class="section-winners__text">
								<time class="section-winners__time section-winners__time--mobile">{{winner.lotteryDrawDate}}</time><span>{{winner.userFirstName}}</span>
							</p>
							<p class="section-winners__text">{{winner.userPhone}}</p>
							<p class="section-winners__text">
								<template v-if="winner.lotteryType === 'instant'">
									Мгновенный приз
								</template>
								<template v-if="winner.lotteryType === 'basic'">
									Обычная лотерея
								</template>
								<template v-if="winner.lotteryType === 'collection'">
									Коллекция стикеров
								</template>
							</p>
							<p class="section-winners__text">{{winner.prizeName}}</p>
						</div>
					</TransitionGroup>
				</div>
				<div class="section-winners__button-box">
					<Transition name="winners-list">
						<button
							v-if="!isListEnd"
							@click="loadMore"
							class="button button--orange button--orange-xs section-winners__button" 
						>
							Показать еще
						</button>
					</Transition>
				</div>
			</div>
		</section>
	</main>
</template>
<script setup>
	import { onMounted, ref } from "vue";
	let countItems = ref(8);
	let lotteryWinners = ref([]);
	let isListEnd = ref(false);
	const runtimeConfig = useRuntimeConfig();
	onMounted(async()=>{
		await fetchLotteryWinners();
		await fetchAllWinners();
		isListEnd.value = !(countItems.value < allWinners.value);
	});
	let allWinners = ref(0);
	async function fetchAllWinners()
	{
		await fetch(runtimeConfig.public.API_BASE_URL + `/lottery-winners/?page=1`)
		.then(async (res)=>{
			let data = await res.json();
			allWinners.value = data.lotteryWinners.length;
		})
	}
	async function fetchLotteryWinners()
	{
		await fetch(runtimeConfig.public.API_BASE_URL + `/lottery-winners/?page=1&per_page=${countItems.value}`)
		.then(async (res)=>{
			let data = await res.json();
			lotteryWinners.value = data.lotteryWinners;
		})
	}
	async function loadMore()
	{
		countItems.value += 8;
		await fetchLotteryWinners();
		isListEnd.value = !(countItems.value < allWinners.value);
	}
	
</script>
<style>
.winners-list-enter-active,
.winners-list-leave-active {
  transition: all 0.5s ease;
}
.winners-list-enter-from,
.winners-list-leave-to {
  opacity: 0;
  -webkit-transform: scale(0) translateX(-10%);
      -ms-transform: scale(0) translateX(-10%);
          transform: scale(0) translateX(-10%);
  margin-bottom: 0;
  max-height: 0;
  overflow: hidden; 
}
</style>