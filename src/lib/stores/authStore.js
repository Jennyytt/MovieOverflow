// src/lib/stores/authStore.js
import { writable } from 'svelte/store';
import pb from '$lib/pb';

// Initialize the store with the current auth status
const createAuthStore = () => {
	const { subscribe, set } = writable({
		isAuthenticated: pb.authStore.isValid,
		user: pb.authStore.model,
		loading: true
	});

	return {
		subscribe,
		login: async (email, password) => {
			try {
				const authData = await pb.collection('users').authWithPassword(email, password);
				set({
					isAuthenticated: true,
					user: authData.record,
					loading: false
				});
				return { success: true };
			} catch (err) {
				console.error('Login failed:', err);
				set({
					isAuthenticated: false,
					user: null,
					loading: false
				});
				return {
					success: false,
					error: err.message || 'Incorrect email or password'
				};
			}
		},
		logout: async () => {
			pb.authStore.clear();
			set({
				isAuthenticated: false,
				user: null,
				loading: false
			});
		},
		initialize: () => {
			// Check if there's a valid session
			const isAuthenticated = pb.authStore.isValid;
			const user = pb.authStore.model;

			set({
				isAuthenticated,
				user,
				loading: false
			});
		}
	};
};

export const authStore = createAuthStore();

// Initialize on app load
authStore.initialize();

// Sync with PocketBase auth state changes
pb.authStore.onChange(() => {
	authStore.initialize();
});
