<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useThemeVars } from 'naive-ui'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import { type Component, onBeforeMount, ref } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import type { StringOrNumber } from 'radix-vue/dist/shared/types'

import { useTheme } from '@/composables/use-theme.js'

const props = withDefaults(defineProps<PageLayoutProps>(), {
	activeTab: '',
	tabs: () => [],
})
const router = useRouter()
const themeVars = useThemeVars()
const { theme } = useTheme()

export interface PageLayoutProps {
	activeTab?: string
	tabs?: PageLayoutTab[]
}

export interface PageLayoutTab {
	name: string
	title: string
	component: Component
	disabled?: boolean
}

const activeTab = ref(props.activeTab)

const queryActiveTab = useRouteQuery<string>('tab')
const unsubscribe = watch(queryActiveTab, setTab)
if (!props.activeTab) unsubscribe()

onBeforeMount(() => {
	if (!props.activeTab) return
	setTab()
	onChangeTab(activeTab.value, true)
})

function setTab(): void {
	const tabValue = (queryActiveTab.value ?? props.activeTab).toLowerCase()
	if (props.tabs.some((tab) => tab.name === tabValue)) {
		activeTab.value = tabValue
	}
}

function onChangeTab(tab: StringOrNumber, replace = false): void {
	router.push({ query: { tab }, replace })
}
</script>

<template>
	<TabsRoot v-model="activeTab" @update:model-value="onChangeTab">
		<div
			class="after:inset-0 after:bottom-0 after:block after:h-px after:w-full after:content-['']"
			:class="[theme === 'dark' ? 'after:bg-white/[.15]' : 'after:bg-zinc-600/[.15]']"
			:style="{ 'background-color': themeVars.cardColor }"
		>
			<div
				class="container flex flex-col gap-2"
				:class="[activeTab ? 'pt-9' : 'py-9']"
			>
				<div class="flex justify-between gap-2 flex-wrap">
					<h1 class="text-4xl">
						<slot name="title" />
					</h1>

					<slot name="action" />
				</div>

				<div v-if="props.tabs" class="flex gap-2">
					<TabsList class="flex flex-wrap overflow-x-auto -mb-px">
						<TabsTrigger
							v-for="tab of props.tabs"
							:key="tab.name"
							class="tabs-trigger data-[disabled]:cursor-not-allowed data-[disabled]:text-zinc-400"
							:value="tab.name"
							:class="[
								theme === 'dark'
									? 'data-[state=active]:after:border-white'
									: 'data-[state=active]:after:border-zinc-800',
							]"
							:disabled="tab.disabled"
						>
							{{ tab.title }}
						</TabsTrigger>
					</TabsList>
				</div>
			</div>
		</div>
		<div class="container py-8">
			<template v-if="activeTab">
				<TabsContent v-for="tab of props.tabs" :key="tab.name" :value="tab.name" class="outline-none">
					<component :is="tab.component" />
				</TabsContent>
			</template>
			<template v-else>
				<slot name="content" />
			</template>
		</div>
	</TabsRoot>
</template>

<style scoped>
.tabs-trigger {
	@apply relative z-[1] flex whitespace-nowrap px-3 py-4 text-sm  transition-colors before:absolute before:left-0 before:top-2 before:-z-[1] before:block before:h-9 before:w-full before:rounded-md before:transition-colors before:content-[''] hover:text-white hover:before:bg-zinc-800 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-2 data-[state=active]:after:right-2 data-[state=active]:after:block data-[state=active]:after:h-0 data-[state=active]:after:border-b-2 data-[state=active]:after:content-[''] data-[state=active]:after:rounded-t-sm font-medium
}
</style>
