import PocketBase from 'pocketbase';
import fs from 'fs';

// Connect to PocketBase
const pb = new PocketBase('http://127.0.0.1:8090');

// Read the JSON file
const data = fs.readFileSync('movies.json', 'utf-8');
const movies = JSON.parse(data);

// Function to insert movies into PocketBase
async function insertMovies() {
	try {
		for (const movie of movies) {
			const record = {
				title: movie.title,
				rating: parseFloat(movie.rating) || 0,
				genres: JSON.stringify(movie.genres),
				directors: JSON.stringify(movie.directors),
				writers: JSON.stringify(movie.writers),
				stars: JSON.stringify(movie.stars),
				description: movie.description,
				release_year: parseInt(movie.release_year) || 0,
				duration: movie.duration,
				certification: movie.certification,
				releaseDate: new Date(movie.release_date).toISOString(),
				posterURL: movie.poster_url,
				trailerURL: movie.trailer_url
			};
			await pb.collection('movies').create(record);
			console.log(`Inserted: ${movie.title}`);
		}
		console.log('All movies inserted successfully.');
	} catch (error) {
		console.error('Error inserting movies:', error);
		if (error.response) {
			console.error('PocketBase Response:', error.response.data);
		}
	}
}

// Run the function
insertMovies();
