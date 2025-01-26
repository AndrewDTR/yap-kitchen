import { redirect } from '@sveltejs/kit';

export async function POST({ locals, cookies }) {
    locals.pb.authStore.clear();

    cookies.delete('pb_auth', { path: '/' });

    return new Response(null, { status: 200 });
}