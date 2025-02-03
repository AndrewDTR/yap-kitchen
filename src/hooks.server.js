import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import pb from '../src/helper/superuser';

function base64ToBlob(base64, mimeType) {
	const binaryString = atob(base64);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return new Blob([bytes], { type: mimeType });
}

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(env.POCKETBASE_URL);

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	if (event.url.pathname !== '/api/pfp') {
		if (event.locals.pb.authStore.isValid && event.locals.pb.authStore.model.avatar == '') {
			console.log("no avatar")

			const identiconFormData = new FormData();
			identiconFormData.set('username', event.locals.pb.authStore.model.username);
			identiconFormData.set('color', event.locals.pb.authStore.model.color)

			const identiconResponse = await event.fetch('/api/pfp', {
				method: 'POST',
				body: identiconFormData
			});

			if (!identiconResponse.ok) {
				const { error } = await identiconResponse.json();
				console.log("issue")
				return fail(500, { fail: true, message: error });
			}

			const userId = event.locals.pb.authStore.model.id;

			const { avatar, pngAvatar } = await identiconResponse.json();

			const svgBlob = base64ToBlob(avatar, 'image/svg+xml');
			const pngBlob = base64ToBlob(pngAvatar, 'image/png');

			const data = new FormData();
			data.set('avatar', svgBlob, 'avatar.svg');
			data.set('pngAvatar', pngBlob, 'avatar.png');

			try {
				await pb.collection('users').update(userId, data);
			} catch (error) {
				console.log("issue 2")
				console.log(error);
				return fail(500, {
					fail: true,
					message: error.data.message
				});
			}
		}
	}

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());
	return response;
}