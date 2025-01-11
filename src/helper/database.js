import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

const pb = new PocketBase(env.POCKETBASE_URL);
await pb.admins.authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);

export { pb };
