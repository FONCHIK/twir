<script setup lang="ts">
import {
	IconActivity,
	IconBell,
	IconBox,
	IconCalendarEvent,
	IconClockHour7,
	IconCommand,
	IconDashboard,
	IconDeviceDesktop,
	IconDeviceGamepad2,
	IconHammer,
	IconHeadphones,
	IconKey,
	IconMessageCircle2,
	IconPencilPlus,
	IconSpeakerphone,
	IconSword,
	IconUsers,
} from '@tabler/icons-vue'
import { NBadge, NMenu } from 'naive-ui'
import { computed, h, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'

import { renderIcon } from '../helpers/index.js'

import type { MenuDividerOption, MenuOption } from 'naive-ui'

import { useUserAccessFlagChecker } from '@/api'
import { ChannelRolePermissionEnum } from '@/gql/graphql'

const { t } = useI18n()

const activeKey = ref<string | null>('/')

const canViewIntegrations = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewIntegrations)
const canViewEvents = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewEvents)
const canViewOverlays = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewOverlays)
const canViewSongRequests = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewSongRequests)
const canViewCommands = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewCommands)
const canViewTimers = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewTimers)
const canViewKeywords = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewKeywords)
const canViewVariables = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewVariables)
const canViewGreetings = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewGreetings)
// const canViewRoles = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewRoles)
const canViewAlerts = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewAlerts)
const canViewGames = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewGames)
const canViewModeration = useUserAccessFlagChecker(ChannelRolePermissionEnum.ViewModeration)

const menuOptions = computed<(MenuOption | MenuDividerOption)[]>(() => {
	return [
		{
			label: t('sidebar.dashboard'),
			icon: renderIcon(IconDashboard),
			path: '/dashboard',
			isNew: false,
		},
		{
			label: t('sidebar.integrations'),
			icon: renderIcon(IconBox),
			path: '/dashboard/integrations',
			disabled: !canViewIntegrations.value,
		},
		{
			label: t('sidebar.alerts'),
			icon: renderIcon(IconBell),
			path: '/dashboard/alerts',
			disabled: !canViewAlerts.value,
		},
		{
			label: t('sidebar.chatAlerts'),
			icon: renderIcon(IconMessageCircle2),
			path: '/dashboard/events/chat-alerts',
			disabled: !canViewEvents.value,
		},
		{
			label: t('sidebar.events'),
			icon: renderIcon(IconCalendarEvent),
			disabled: !canViewEvents.value,
			path: '/dashboard/events/custom',
		},
		{
			label: t('sidebar.overlays'),
			icon: renderIcon(IconDeviceDesktop),
			path: '/dashboard/overlays',
			disabled: !canViewOverlays.value,
		},
		{
			label: t('sidebar.songRequests'),
			icon: renderIcon(IconHeadphones),
			path: '/dashboard/song-requests',
			disabled: !canViewSongRequests.value,
		},
		{
			label: t('sidebar.games'),
			icon: renderIcon(IconDeviceGamepad2),
			path: '/dashboard/games',
			disabled: !canViewGames.value,
		},
		{
			label: t('sidebar.commands.label'),
			icon: renderIcon(IconCommand),
			disabled: !canViewCommands.value,
			children: [
				{
					label: t('sidebar.commands.custom'),
					icon: renderIcon(IconPencilPlus),
					path: '/dashboard/commands/custom',
				},
				{
					label: t('sidebar.commands.builtin'),
					icon: renderIcon(IconHammer),
					path: '/dashboard/commands/builtin',
				},
			],
		},
		{
			label: t('sidebar.moderation'),
			icon: renderIcon(IconSword),
			path: '/dashboard/moderation',
			disabled: !canViewModeration.value,
		},
		{
			label: t('sidebar.community'),
			icon: renderIcon(IconUsers),
			path: '/dashboard/community',
		},
		{
			label: t('sidebar.timers'),
			icon: renderIcon(IconClockHour7),
			path: '/dashboard/timers',
			disabled: !canViewTimers.value,
		},
		{
			label: t('sidebar.keywords'),
			icon: renderIcon(IconKey),
			path: '/dashboard/keywords',
			disabled: !canViewKeywords.value,
		},
		{
			label: t('sidebar.variables'),
			icon: renderIcon(IconActivity),
			path: '/dashboard/variables',
			disabled: !canViewVariables.value,
		},
		{
			label: t('sidebar.greetings'),
			icon: renderIcon(IconSpeakerphone),
			path: '/dashboard/greetings',
			disabled: !canViewGreetings.value,
		},
	].map((item) => ({
		...item,
		key: item.path ?? item.label,
		extra: item.disabled ? 'No perms' : undefined,
		label: !item.path || item.disabled
			? item.label ?? undefined
			: () => h(
				RouterLink,
				{
					to: {
						path: item.path,
					},
				},
				{
					default: () => item.isNew
						? h(NBadge, {
							type: 'info',
							value: 'new',
							processing: true,
							offset: [17, 5],
						}, { default: () => item.label })
						: item.label,
				},
			),
		children: item.children?.map((child) => ({
			...child,
			key: child.path,
			label: item.disabled
				? child.label
				: () => h(
					RouterLink,
					{
						to: {
							path: child.path,
						},
					},
					{ default: () => child.label },
				),
		})),
	}))
})

const router = useRouter()

onMounted(async () => {
	await router.isReady()
	activeKey.value = router.currentRoute.value.path
})
</script>

<template>
	<NMenu
		v-model:value="activeKey"
		:collapsed-width="64"
		:collapsed-icon-size="22"
		:options="menuOptions"
	/>
</template>

<style scoped>
:deep(.n-menu-item-content-header) {
	@apply self-stretch flex items-center;
}
</style>
