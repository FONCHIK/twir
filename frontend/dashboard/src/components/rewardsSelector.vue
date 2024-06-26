<script setup lang="ts">
import { NAvatar, NSelect, NSpace, NText, type SelectOption } from 'naive-ui'
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'

import type { VNodeChild } from 'vue'

import { useTwitchRewards } from '@/api'
import RewardFallbackImg from '@/assets/images/reward-fallback.png?url'

const props = defineProps<{
	multiple?: boolean
	clearable?: boolean
	onlyWithInput?: boolean
}>()

const modelValue = defineModel<string | string[] | undefined | null>()

const { t } = useI18n()

const {
	data: rewardsData,
	isLoading: isRewardsLoading,
	isError: isRewardsError,
} = useTwitchRewards()

type RewardSelectOptions = SelectOption & {
	image?: string
	color: string
}

const rewardsSelectOptions = computed(() => {
	const rewards: RewardSelectOptions[] = []
	if (!rewardsData.value?.rewards) return rewards

	for (const reward of rewardsData.value.rewards) {
		if (props.onlyWithInput && !reward.isUserInputRequired) continue

		rewards.push({
			value: reward.id,
			label: reward.title,
			image: reward.image?.url4X,
			color: reward.backgroundColor,
			disabled: !reward.isEnabled,
		})
	}

	return rewards
})

function renderRewardTag(option: RewardSelectOptions): VNodeChild {
	return h(NSpace, { align: 'center' }, {
		default: () => [
			h(NAvatar, {
				src: option.image || RewardFallbackImg,
				color: option.color,
				class: 'flex w-5 h-5 p-1',
			}),
			h(NText, {
				style: {
					color: option.disabled
						? 'var(--n-text-disabled-color)'
						: 'var(--n-text-color)',
				},
			}, { default: () => option.label }),
		],
	})
}
</script>

<template>
	<NSelect
		v-model:value="modelValue"
		:multiple="multiple"
		size="large"
		:options="rewardsSelectOptions"
		:placeholder="t('events.targetTwitchReward')"
		:loading="isRewardsLoading"
		:render-label="renderRewardTag"
		:disabled="isRewardsError"
		:clearable="clearable"
		:virtual-scroll="false"
		filterable
	/>
</template>
