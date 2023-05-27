export const ssr = false;
import { isLoggedIn, getUserId} from '../utils/auth.js';

export async function load() {
	await isLoggedIn();
	await getUserId();
}
