<template>
  <div>
  	<div class="modal modal--sticker" id="sticker">
		<div class="modal__body">
			<div class="modal__content">
				<div class="modal__title-box">
					<div class="modal__sticker-box">
						<figure
							class="sticker sticker--no-hover modal__sticker"
						 	v-if="$store.state.modal.stikerData?.iconUrl"
						 >
							<picture>
								<img
									class="sticker__img"
									:src="`${$store.state.modal.stikerData?.iconUrl}`"
									alt=""
								/>
							</picture>
							<figcaption>
								<p class="sticker__text">
									{{$store.state.modal.stikerData?.name}}
								</p>
							</figcaption>
						</figure>

						<div class="modal__wrap">
							<h2 class="modal__title" v-if="$store.state.modal.stikerData?.id>12">
								<template v-if="$store.state.modal.isStikerWin">
									Вы получили +50 баллов
									<br>и стикер - приз 
								</template>
								{{$store.state.modal.stikerData?.name}}
							</h2>
							<template v-else>
								<template v-if="$store.state.modal.isStikerWin">
									<h2 class="modal__title">Вы получили +50 баллов</h2>
									<h2 class="modal__title">и стикер «{{$store.state.modal.stikerData?.name}}»</h2>
								</template>
								<template v-else>
									<p class="modal__subtitle">Стикер</p>
									<h2 class="modal__title">«{{$store.state.modal.stikerData?.name}}»</h2>
								</template>
							</template>
							<div class="modal__info-box" v-if="$store.state.modal.stikerData?.extraText">
								<svg class="modal__info-box-icon">
									<use xlink:href="#info"></use>
								</svg>
								<p>
									{{$store.state.modal.stikerData?.extraText}}
								</p>
							</div>
						</div>
					</div>
					<button class="modal__close" @click="closeModal">
						<svg class="modal__close-icon">
							<use xlink:href="#close"></use>
						</svg>
					</button>
				</div>
				<template v-if="$store.state.modal.stikerData?.content">
					<div class="modal__text-block" v-html="$store.state.modal.stikerData?.content">
					</div>
				</template>
				<button class="button button--orange button--orange-md modal__btn" @click="closeModal">Отлично!</button>
			</div>
		</div>
	</div>
  </div>
</template>
<script setup>
	import { closeModal } from '~/assets/js/components/modal.js';
	const runtimeConfig = useRuntimeConfig();
</script>
<style>
.modal__text-block p {margin-bottom: 12px;}
</style>