import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

// create & export session so it can be used elsewhere by importing it
const pb = new PocketBase(env.POCKETBASE_URL);
await pb.admins.authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);

export { pb };
