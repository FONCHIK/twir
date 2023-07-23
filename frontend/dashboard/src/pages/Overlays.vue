<script setup lang="ts">
import { NGrid, NGridItem, NResult } from 'naive-ui';
import { useI18n } from 'vue-i18n';

import { useUserAccessFlagChecker } from '@/api/index.js';
import OBS from '@/components/overlays/obs.vue';
import TTS from '@/components/overlays/tts.vue';

const userCanViewOverlays = useUserAccessFlagChecker('VIEW_OVERLAYS');

const { t } = useI18n();
</script>

<template>
	<n-result v-if="!userCanViewOverlays" status="403" :title="t('haveNoAccess.message')" />
	<div
		v-else
		style="
			display: flex;
			align-items: center;
			justify-content: center;
			max-width: 1000px;
			margin: 0 auto;
		"
	>
		<n-grid cols="1 m:2" :x-gap="16" :y-gap="16" responsive="screen">
			<n-grid-item :span="1">
				<TTS />
			</n-grid-item>
			<n-grid-item :span="1">
				<OBS />
			</n-grid-item>
		</n-grid>
	</div>
</template>