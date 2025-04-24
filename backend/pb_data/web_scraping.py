import requests
import re
from bs4 import BeautifulSoup
#from fpdf import FPDF
import json

# Function to scrape movie information
def scrape_movies(url):
    try:
        # Add headers to mimic a browser
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        # Send a GET request to the URL
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        # Get a list of URLs of the top movies
        movies_urls = []
        for movie in soup.select('.ipc-metadata-list-summary-item'):
            url = movie.select_one('.ipc-title-link-wrapper')['href']
            full_url = f"https://www.imdb.com{url}"
            movies_urls.append(full_url)

        # Limit the number of movies to scrape (for testing purposes)
        movies_urls = movies_urls[:10]


        # Get the information of the top movies
        # Loop through each movie URL and scrape the details(Only for IMDB only)
        movies = []
        for url in movies_urls:
            # Send a GET request to the movie URL
            movie_response = requests.get(url, headers=headers, timeout=10)
            movie_response.raise_for_status()
            movie_soup = BeautifulSoup(movie_response.text, 'html.parser')
            # Extract movie details
            title = movie_soup.select_one('h1[data-testid="hero__pageTitle"]').text.strip()
            # Download the poster as a PDF
            poster_element = movie_soup.select_one('a[aria-label*="Poster"]')
            poster_url = poster_element['href'] if poster_element else None
            poster_url = f"https://www.imdb.com{poster_url}" if poster_url else None
            # If pdf of poster is needed, uncomment the following line      
            #if poster_url:
            #   download_poster_as_pdf(title, poster_url)
            trailer_element = movie_soup.select_one('a[data-testid="videos-slate-overlay-1"]')
            trailer_url = trailer_element['href'] if trailer_element else None
            trailer_url = f"https://www.imdb.com{trailer_url}" 
            rating_element = movie_soup.select_one('div[data-testid="hero-rating-bar__aggregate-rating__score"]')
            rating = rating_element.text.split('/')[0].strip() if rating_element else "N/A"
            genre_elements = movie_soup.select('a[class="ipc-chip ipc-chip--on-baseAlt"] .ipc-chip__text')
            genres = [genre.text.strip() for genre in genre_elements] if genre_elements else ["N/A"]

            # Extract directors
            director_span = movie_soup.find('span', string=re.compile(r'Director.*'))
            director_div = director_span.find_next_sibling('div')
            director_links = director_div.find_all('a')
            directors = [link.text.strip() for link in director_links]
            # Extract writers
            writer_span = movie_soup.find(['span', 'a'], string=re.compile(r'Writer.*'))
            writer_div = writer_span.find_next_sibling('div')
            writer_links = writer_div.find_all('a')
            writers = [link.text.strip() for link in writer_links]
            # Extract stars
            stars_section = movie_soup.select_one('li[data-testid="title-pc-principal-credit"]:has(a[href*="cast"])')
            stars_elements = stars_section.select('a.ipc-metadata-list-item__list-content-item--link') if stars_section else []
            stars = [star.text.strip() for star in stars_elements] if stars_elements else ["N/A"]

            description = movie_soup.select_one('span[data-testid="plot-xs_to_m"]').text.strip() if movie_soup.select_one('span[data-testid="plot-xs_to_m"]') else "N/A"
            release_year = movie_soup.select_one('a[href*="releaseinfo"]').text.strip() if movie_soup.select_one('a[href*="releaseinfo"]') else "N/A"
            release_date_url = movie_soup.select_one('a[href*="releaseinfo"]')['href'] if movie_soup.select_one('a[href*="releaseinfo"]') else None
            if release_date_url:
                release_date_response = requests.get(f"https://www.imdb.com{release_date_url}", headers=headers, timeout=10)
                release_date_response.raise_for_status()
                release_date_soup = BeautifulSoup(release_date_response.text, 'html.parser')
                release_date_rel_1 = release_date_soup.select_one('li[id="rel_1"]')
                release_date = release_date_rel_1.select_one('span[class="ipc-metadata-list-item__list-content-item ipc-btn--not-interactable"]').text.strip() if release_date_rel_1 else "N/A"
            duration_element = movie_soup.select_one('ul.ipc-inline-list li.ipc-inline-list__item:not(:has(a))')
            if duration_element and 'h' in duration_element.text:
                duration = duration_element.text.strip()
            else:
                duration = "N/A"
            certification = movie_soup.select_one('a[href*="parentalguide"]').text.strip() if movie_soup.select_one('a[href*="parentalguide"]') else "N/A"
            movies.append({
                'title': title, 
                'rating': rating, 
                'genres': genres, 
                'directors': directors,
                'writers': writers,  
                'stars': stars, 
                'description': description, 
                'release_year': release_year, 
                'duration': duration, 
                'certification': certification,
                'release_date' : release_date, 
                'poster_url': poster_url,
                'trailer_url': trailer_url
            })  # Add other fields as needed

        if not movies:
            print("No movies found. Check your selectors.")  # Debugging

        return movies

    except requests.exceptions.RequestException as e:
        print(f"Error fetching the URL: {e}")
        return []

# Function to download the poster and save it as a PDF
def download_poster_as_pdf(title, poster_url):
    try:
        response = requests.get(poster_url, stream=True)
        response.raise_for_status()

        # Save the image temporarily
        image_file = f"{title}.jpg"
        with open(image_file, 'wb') as file:
            file.write(response.content)

        # Create a PDF with the poster
        pdf = FPDF()
        pdf.add_page()
        pdf.image(image_file, x=10, y=10, w=100)  # Adjust dimensions as needed
        pdf_file = f"{title}.pdf"
        pdf.output(pdf_file)

        print(f"Poster saved as PDF: {pdf_file}")

    except requests.exceptions.RequestException as e:
        print(f"Error downloading poster: {e}")


if __name__ == "__main__":
    imdb_url = "https://www.imdb.com/chart/top"
    movie_data = scrape_movies(imdb_url)
    #uncooment the following line to print the scraped data to the terminal
    # # Print the scraped data
    for movie in movie_data:
        print(f"Title: {movie['title']} \n"
              f"Rating: {movie['rating']} \n"
              f"Genres: {', '.join(movie['genres'])} \n"
              f"Directors: {','.join(movie['directors'])} \n"
              f"Writers: {', '.join(movie['writers'])} \n"
              f"Stars: {', '.join(movie['stars'])} \n"
              f"Description: {movie['description']} \n"
              f"Release Year: {movie['release_year']} \n"
              f"Duration: {movie['duration']} \n"
              f"Certification: {movie['certification']}\n"
              f"Release Date: {movie['release_date']} \n"
              f"Poster URL: {movie['poster_url']} \n"
              f"Trailer URL: {movie['trailer_url']} \n"
              "-----------------------------------")
    
    # Save the data to a JSON file
    # output_file = "movies.json"
    # try:
    #     with open(output_file, 'w', encoding='utf-8') as file:
    #         json.dump(movie_data, file, ensure_ascii=False, indent=4)
    #     print(f"Movie data saved to {output_file}")
    # except Exception as e:
    #     print(f"Error saving data to JSON: {e}")