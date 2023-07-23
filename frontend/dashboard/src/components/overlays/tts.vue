<script setup lang="ts">
import { NModal, NTabs, NTabPane } from 'naive-ui';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import Card from './card.vue';
import TTSSettings from './tts/settings.vue';
import UsersSettings from './tts/users.vue';

import { useCommandsManager, useProfile } from '@/api/index.js';
import TTSIcon from '@/assets/icons/overlays/tts.svg?component';
import CommandsList from '@/components/commands/list.vue';

const commandsManager = useCommandsManager();
const allCommands = commandsManager.getAll({});
const ttsCommands = computed(() => {
	return allCommands.data.value?.commands.filter((c) => c.module === 'TTS') ?? [];
});

const userProfile = useProfile();
const overlayLink = computed(() => {
	return `${window.location.origin}/overlays/${userProfile.data?.value?.apiKey}/tts`;
});

const isModalOpened = ref(false);

const { t } = useI18n();
</script>

<template>
	<card
		title="Text to speech"
		:icon="TTSIcon"
		:description="t('overlays.tts.description')"
		:overlay-link="overlayLink"
		@open-settings="isModalOpened = true"
	>
	</card>

	<n-modal
		v-model:show="isModalOpened"
		:mask-closable="false"
		:segmented="true"
		preset="card"
		title="TTS"
		content-style="padding: 0px; width: 100%"
		style="width: 800px; max-width: calc(100vw - 40px)"
	>
		<n-tabs
			default-value="settings"
			justify-content="space-evenly"
			type="line"
			pane-style="padding-top: 0px"
		>
			<n-tab-pane name="settings" tab="Settings">
				<TTSSettings />
			</n-tab-pane>
			<n-tab-pane name="users" tab="Users settings">
				<UsersSettings />
			</n-tab-pane>
			<n-tab-pane name="commands" tab="Commands">
				<commands-list :commands="ttsCommands" :show-header="false" />
			</n-tab-pane>
		</n-tabs>
	</n-modal>
</template>