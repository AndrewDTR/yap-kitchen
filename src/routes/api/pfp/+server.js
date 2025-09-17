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
		const formData = await request.formData();
		const username = formData.get('username');
		const color = formData.get('color') || '#cccccc';

		if (!username) {
			return new Response(JSON.stringify({ error: 'No username provided in form data!' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const hash = crypto.createHash('md5').update(username).digest('hex');

		const svgOptions = {
			foreground: [255, 255, 255, 255],
			background: hexToRgbaArray(color),
			format: 'svg'
		};
		const svgData = new Identicon(hash, svgOptions).toString();

		const pngOptions = {
			foreground: [255, 255, 255, 255],
			background: hexToRgbaArray(color),
			format: 'png'
		};
		const pngData = new Identicon(hash, pngOptions).toString();

		return new Response(
			JSON.stringify({
				message: 'Identicon generated successfully',
				avatar: svgData,
				pngAvatar: pngData
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
