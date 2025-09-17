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

export async function POST() {
	try {
		const records = await pb.collection('users').getFullList();

		if (Array.isArray(records)) {
			for (const user of records) {
				if (user.avatar == '') {
					const hash = crypto.createHash('md5').update(user.username).digest('hex');

					const options = {
						foreground: [255, 255, 255, 255],
						background: hexToRgbaArray(user.color), // rgba white
						format: 'svg'
					};

					const svgData = new Identicon(hash, options).toString();
					const svgBlob = new Blob([Buffer.from(svgData, 'base64')], { type: 'image/svg+xml' });

					options.format = 'png';
					const pngData = new Identicon(hash, options).toString();
					const pngBlob = new Blob([Buffer.from(pngData, 'base64')], { type: 'image/png' });

					const formData = new FormData();
					formData.append('avatar', svgBlob, `${user.username}-avatar.svg`);
					formData.append('pngAvatar', pngBlob, `${user.username}-avatar.png`);

					await pb.collection('users').update(user.id, formData);
				}
			}
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
