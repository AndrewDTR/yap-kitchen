import { fail, redirect } from '@sveltejs/kit';

function base64ToBlob(base64, mimeType) {
	const binaryString = atob(base64);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return new Blob([bytes], { type: mimeType });
}


export async function load({ locals }) {
	if (locals.pb.authStore.model) {
		return redirect(303, `/${locals.pb.authStore.model.username}`)
	}

	return {};
}

export const actions = {
	register: async ({ fetch, locals, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const username = data.get('username');

		if (!email || !password || !username) {
			return fail(400, {
				emailRequired: email === null,
				passwordRequired: password === null,
				usernameRequired: username === null
			});
		}

		const identiconFormData = new FormData();
		identiconFormData.set('username', username);

		const identiconResponse = await fetch('/api/pfp', {
			method: 'POST',
			body: identiconFormData
		});

		if (!identiconResponse.ok) {
			const { error } = await identiconResponse.json();
			return fail(500, { fail: true, message: error });
		}

		const { avatar, pngAvatar } = await identiconResponse.json();

		const svgBlob = base64ToBlob(avatar, 'image/svg+xml');
		const pngBlob = base64ToBlob(pngAvatar, 'image/png');

		data.set('avatar', svgBlob, 'avatar.svg');
		data.set('pngAvatar', pngBlob, 'avatar.png');

		data.set('color', '#cccccc');


		data.set('passwordConfirm', password?.toString());
		data.set('username', username);

		try {
			await locals.pb.collection('users').create(data);
			await locals.pb.collection('users').authWithPassword(email, password.toString());
			await locals.pb.collection('users').requestVerification(email);
		} catch (error) {
			return fail(500, {
				fail: true,
				message: error.data.message
			});
		}

		throw redirect(303, `/${username}`);
	},

	login: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return fail(400, {
				emailRequired: email === null,
				passwordRequired: password === null,
			});
		}

		try {
			await locals.pb.collection('users').authWithPassword(email.toString(), password.toString());
		} catch (error) {
			return fail(500, {
				fail: true,
				message: error.data.message
			});
		}

		throw redirect(303, `/${username}`);
	},

	reset: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (!email) {
			return fail(400, {
				emailRequired: email === null
			});
		}

		try {
			await locals.pb.collection('users').requestPasswordReset(email.toString());
		} catch (error) {
			return fail(500, {
				fail: true,
				message: error.data.message
			});
		}

		throw redirect(303, '/login');
	}
};