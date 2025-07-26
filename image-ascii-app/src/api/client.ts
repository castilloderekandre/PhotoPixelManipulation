const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiGet<T>(endpoint: string): Promise<T> {
	const res = await fetch(`${BASE_URL}${endpoint}`);
	if (!res.ok) {
		throw new Error(`HTTP ${res.status}`);
	}
	return res.json() as Promise<T>;
}

export async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
	const res = await fetch(`${BASE_URL}${endpoint}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		throw new Error(`HTTP ${res.status}`);
	}
	return res.json() as Promise<T>
}

