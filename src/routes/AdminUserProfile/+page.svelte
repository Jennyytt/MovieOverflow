<script>
    let userName = "ABC_Admin"; // Replace with actual user 
    import { Button } from "$lib/components/ui/button/index.js";
    let lists =[
        {
            title: "Captain America: Brave New World",
            year: 2025,
            cast: "Anthony Mackie, Harrison Ford, Tim Blake Nelson",
            review: "I like it, it is not the best but in comparison to what they have launched after endgame this was a good movie. I liked that they gave the spotlight Falcon deserves and it truly made me understand Steve's decision and why he didn't give the shield to Bucky. (Btw Anthony Mackie did a great job as a lead actor, lots of charisma I love it...)",
            date: "Feb 24, 2025"
        },
        {
            title: "Captain America: Brave New World",
            year: 2025,
            cast: "Anthony Mackie, Harrison Ford, Tim Blake Nelson",
            review: "I like it, it is not the best but in comparison to what they have launched after endgame this was a good movie. I liked that they gave the spotlight Falcon deserves and it truly made me understand Steve's decision and why he didn't give the shield to Bucky. (Btw Anthony Mackie did a great job as a lead actor, lots of charisma I love it...)",
            date: "Feb 24, 2025"
        }
    ];
    let searchQuery = "";
</script>

<style>
    /* user profile styles */
    .profile-block {
        background-color: #000000; /* Dark gray background for the block */
        border: 3px solid #222222; /* Subtle border */
        border-radius: 10px; /* Rounded corners */
        padding: 20px;
        width: 1100px;
        margin: 20px auto; 
        display: flex;
        align-items: baseline; /* Center items vertically */
        gap: 20px; /* Space between icon and text */
    }

    .profile-icon {
        width: 100px;
        height: 100px;
        border-radius: 50%; /* Make the icon circular */
        background-color: #555; /* Placeholder background color */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .profile-details {
        display: flex;
        flex-direction: row; 
        align-items: baseline; 
        gap: 10px; /* Add spacing between user-name and user-type */
    }

    .user-name {
        font-size: 36px;
        font-weight: bold;
        color:#FFFFFF;    
    }
    /*Searach Bar Block*/
    .search-bar-container {
        display: flex;
        justify-content: center;
        margin: 20px auto;
        width: 1100px; /* Match the width of other elements */
    }

    .search-bar {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #2B2B2B; /* Gray background color */
        color: white;
        font-size: 16px;
    }

    .search-bar::placeholder {
        color: #D1D7E0; /* Lighter gray for placeholder text */
    }
    /* Movie Info Block*/
    .movie-info{
        display: flex;
        flex-direction: row;
        align-items: center; /* Center items vertically */
        gap: 20px; /* Space between poster and text */
    }
    .movie-detail{
        display: flex;
        flex-direction: column;
        gap: 10px; /* Space between title, year, cast, and review */
    }
    .movie-poster {
        width: 100px;
        height: 150px;
        border-radius: 5px;
        background-color: #444; /* Placeholder for poster */
    }
    .movie-title {
        font-size: 15px;
        font-weight: bold;
        color: #FFFFFF;
    }
    .movie-year {
        font-size: 15px;
        color: #FFFFFF;
    }
    .movie-cast {
        font-size: 15px;
        color: #FFFFFF;
    }

    /* Movie List styles */
    .list-frame {
        background-color: #000000;
        border: 3px solid #222222;
        border-radius: 10px;
        padding: 20px;
        width: 1100px;
        margin: 20px auto;
    }

    .list-block{
        display: flex;
        flex-direction: column;
        gap: 10px; 
    }

    /*general styles*/
      :global(body) {
        background-color: #000000;
    }
    .section-title {
        color: white;
        font-weight: bold;
        text-align: left;
        padding-left: 20px;
        border-left: 5px solid purple; /* Purple line on the left */
        font-size: 40px;
        margin-left: 200px;
    }
    .separator {
        border: none;
        border-top: 1px solid #444; /* Adjust color as needed */
        margin: 20px 0; /* Add spacing above and below the line */
    }
    .button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px; /* Add spacing above the button */
    }
</style>

<h2 class="section-title">Personal Profile</h2>
<!-- Profile Block -->
<div class="profile-block">
    <div class="profile-icon">
        <!-- Placeholder for user icon -->
    </div>
    <div class="profile-details">
        <div class="user-name">{userName}</div>
    </div>
</div>
<!-- Search Bar Block -->
<h2 class="section-title">Search Comments</h2>
<div class="search-bar-container">
    <input
        type="text"
        class="search-bar"
        placeholder="Search by Comment ID"
        bind:value="{searchQuery}" />
</div>
<!-- List Block -->
<h2 class="section-title">Movies</h2>
<div class="list-frame">
    {#each lists as list, index}
    <div class="list-block">
    <div class="movie-info">
        <div class="movie-poster">
            <!-- Placeholder for movie poster -->
        </div>
        <div class="movie-detail">
            <div class="movie-title">{list.title}</div>
            <div class="movie-year">{list.year}</div>
            <div class="movie-cast">{list.cast}</div>
        </div>
    </div>
    {#if index < lists.length - 1}
        <div class="separator"></div>
    {/if}
    </div>
    {/each}
</div>
<div class="button-container">
    <Button class="load-more-button" variant="outline" 
    style="background-color: purple; border-color:purple; color: white;">
    Load More</Button>
</div>