import { computed, ref } from 'vue'

import { useProfile } from '@/api'

export function useAlertsInformation() {
	const { data: profile } = useProfile()
	const overlayLink = computed(() => {
		return `${window.location.origin}/overlays/${profile.value?.apiKey}/alerts`
	})

	const isShowOverlayLink = ref(false)
	function toggleShowOverlayLink() {
		isShowOverlayLink.value = !isShowOverlayLink.value
	}

	const isCopied = ref(false)
	async function copyOverlayLink() {
		try {
			await navigator.clipboard.writeText(overlayLink.value)
			isCopied.value = true
			setTimeout(() => (isCopied.value = false), 1000)
		} catch (error) {
			console.error(error)
		}
	}

	return {
		overlayLink,
		isShowOverlayLink,
		toggleShowOverlayLink,
		isCopied,
		copyOverlayLink,
	}
}
