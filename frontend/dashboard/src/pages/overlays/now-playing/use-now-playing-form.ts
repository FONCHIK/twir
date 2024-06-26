import { Settings } from '@twir/api/messages/overlays_now_playing/overlays_now_playing'
import { createGlobalState } from '@vueuse/core'
import { ref, toRaw } from 'vue'

export const defaultSettings: Settings = {
	id: '',
	preset: 'TRANSPARENT',
	backgroundColor: 'rgba(0, 0, 0, 0)',
	channelId: '',
	fontFamily: 'inter',
	fontWeight: 400,
	showImage: true,
	hideTimeout: undefined,
}

export const useNowPlayingForm = createGlobalState(() => {
	const data = ref<Settings>(structuredClone(defaultSettings))

	function setData(d: Settings) {
		data.value = structuredClone(toRaw(d))
	}

	function getDefaultSettings() {
		return structuredClone(Settings)
	}

	return {
		data,
		setData,
		getDefaultSettings,
	}
})
