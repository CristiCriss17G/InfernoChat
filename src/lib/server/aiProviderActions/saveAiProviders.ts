import prisma from '$lib/server/prisma';
import type { AiProviderOption } from '$lib/types/AiProviderSubTypes/AiProviderOption';
import type { AiProvider } from '@prisma/client';
import type { JsonValue } from '@prisma/client/runtime/library';
import { error } from '@sveltejs/kit';

export const validateAiProviderOptions = async (
	options:
		| JsonValue
		| {
				[key: string]: string | AiProviderOption;
		  }
) => {
	console.log({ options });

	if (options === null) {
		// Handle the case when options is null, according to your logic
		throw new Error('options cannot be null');
	}

	if (typeof options !== 'object') {
		// Handle the case when options is not an object, according to your logic
		throw new Error('options must be an object');
	}

	const validOptions = Object.entries(options).map(([key, option]) => {
		if (option === null || option === undefined) {
			return {
				[key]: {
					type: 'string',
					default: ''
				}
			};
		}
		if (typeof option === 'string' || typeof option === 'number' || typeof option === 'boolean') {
			return {
				[key]: {
					type: typeof option,
					default: option
				}
			};
		}
		if (Array.isArray(option)) {
			return {
				[key]: {
					type: 'array',
					default: option
				}
			};
		}

		if (!option.type && !option.default) {
			return {
				[key]: {
					type: typeof option.default, // Same note as before regarding undefined
					default: option.default
				}
			};
		} else if (!option.type) {
			return {
				[key]: {
					...option,
					type: typeof option.default
				}
			};
		} else if (!option.default) {
			return {
				[key]: {
					...option,
					default: option.type === 'string' ? '' : option.type === 'number' ? 0 : false
				}
			};
		}
		return { [key]: option };
	});

	// If you want to convert the array of objects back to a single object
	const finalOptions = Object.assign({}, ...validOptions);

	return finalOptions;
};

export const saveAiProvider = async (provider: AiProvider) => {
	const providerExists = await prisma.aiProvider.findFirst({
		where: { name: provider.name }
	});
	if (providerExists) {
		throw error(409, 'Provider already exists');
	}

	const options = await validateAiProviderOptions(provider.options);

	const newProvider = await prisma.aiProvider.create({
		data: {
			...provider,
			options
		}
	});

	return newProvider;
};

export const updateAiProvider = async (id: number, provider: AiProvider) => {
	const options = await validateAiProviderOptions(provider.options);

	const updatedProvider = await prisma.aiProvider.update({
		where: {
			id
		},
		data: {
			...provider,
			options
		}
	});

	return updatedProvider;
};

export const deleteAiProvider = async (id: number) => {
	const deletedProvider = await prisma.aiProvider.delete({
		where: {
			id
		}
	});

	return deletedProvider;
};
