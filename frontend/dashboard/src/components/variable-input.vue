<script setup lang='ts'>
import { MentionOption, NMention, NText } from 'naive-ui';
import { computed, VNodeChild, h, FunctionalComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAllVariables } from '@/api/index.js';

const text = defineModel<string>({ default: '' });
const { t }  = useI18n();

withDefaults(defineProps<{
	inputType?: 'text' | 'textarea',
	minRows?: number,
	maxRows?: number,
}>(), {
	inputType: 'text',
});

defineSlots<{
	underSelect: FunctionalComponent
}>();

const allVariables = useAllVariables();

const selectVariables = computed<MentionOption[]>(() => {
	const variables = allVariables.data?.value;
	if (!variables) return [];

	return variables.map((variable) => ({
		label: `(${variable.example})`,
    value: `(${variable.example})`,
		description: variable.description,
	}));
});

function renderVariableSelectLabel(option: {
	type: string,
	label: string,
	description: string
}): VNodeChild {
	if (!option.description) return '$' + option.label;
	const variable = '$' + option.label;
	const description = h(NText, { depth: 3 }, option.description);
	return h('span', {}, [variable, ' ', description]);
}
</script>

<template>
	<n-mention
		v-model:value="text"
		:render-label="renderVariableSelectLabel"
		placeholder="Response"
		prefix="$"
		class="w-full"
		:type="inputType"
		:options="selectVariables"
		:autosize="inputType === 'text' ? {} : { minRows, maxRows }"
	>
		<template #empty>
			{{ t('sharedTexts.placeCursorMessage') }}
		</template>
	</n-mention>
</template>