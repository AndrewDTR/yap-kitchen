import pb from '../../../helper/superuser.js';
import Identicon from 'identicon.js';
import crypto from 'crypto';

function hexToRgbaArray(hex) {
	hex = hex.replace(/^#/, '');

	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	const a = 255;

	return [r, g, b, a];
}

export async function POST({ request }) {
	try {
		const records = await pb.collection('users').getFullList();

		if (Array.isArray(records)) {
			for (const user of records) {
				if (user.avatar !== '') {
					var hash = crypto.createHash('md5').update(user.username).digest('hex');

					var options = {
						foreground: [255, 255, 255, 255],
						background: hexToRgbaArray(user.color), // rgba white
						format: 'svg'
					};

					var data = new Identicon(hash, options).toString();

					const avatarBlob = new Blob([Buffer.from(data, 'base64')], { type: 'image/svg+xml' });
					const formData = new FormData();
					formData.append('avatar', avatarBlob, `${user.username}-avatar.svg`);

					await pb.collection('users').update(user.id, formData);
				}
			}
		} else {
			console.log('No records', records);
		}

		return new Response(JSON.stringify({ records, message: 'Data fetched successfully' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
