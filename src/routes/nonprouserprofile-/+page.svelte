<script lang="ts">
    let userName = "ABC_User"; // Replace with actual user name
    let comments = [
        {
            title: "Captain America: Brave New World",
            year: 2025,
            cast: "Anthony Mackie, Harrison Ford, Tim Blake Nelson",
            review: "I like it, it is not the best but in comparison to what they have launched after endgame this was a good movie. I liked that they gave the spotlight Falcon deserves and it truly made me understand Steve's decision and why he didn't give the shield to Bucky. (Btw Anthony Mackie did a great job as a lead actor, lots of charisma I love it...)",
            date: "Feb 24, 2025",
            rate: 4,
            likes: 100,
            dislikes: 0
        },
        {
            title: "Captain America: Brave New World",
            year: 2025,
            cast: "Anthony Mackie, Harrison Ford, Tim Blake Nelson",
            review: "I like it, it is not the best but in comparison to what they have launched after endgame this was a good movie. I liked that they gave the spotlight Falcon deserves and it truly made me understand Steve's decision and why he didn't give the shield to Bucky. (Btw Anthony Mackie did a great job as a lead actor, lots of charisma I love it...)",
            date: "Feb 24, 2025",
            rate: 5,
            likes: 0,
            dislikes: 450
        }
    ];
    let watchlists = [
        {
            title: "Captain America: Brave New World",
            rate: 4,
            length: 120
        },
        {
            title: "Captain America: Brave New World",
            rate: 5,
            length: 120
        },
        {
            title: "Captain America: Brave New World",
            rate: 5,
            length: 120
        },
        {
            title: "Captain America: Brave New World",
            rate: 5,
            length: 120
        },
        {
            title: "Captain America: Brave New World",
            rate: 5,
            length: 120
        }
    ]
    import { Button } from "$lib/components/ui/button/index.js";
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

    /* Watchlist Block*/
    .watchlist-frame {
        background-color: #000000; /* Dark gray background for the block */
        border: 3px solid #222222; /* Subtle border */
        border-radius: 10px; /* Rounded corners */
        padding: 12px;
        display: flex;
        flex-direction: row;
        width: 1100px;
        margin: 20px auto; 
        gap: 10px; /* Space between watchlist items */
    }
    .watchlist-block{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .watchlist-poster {
        width: 206px;
        height: 309px;
        border-radius: 5px;
        background-color: #444; /* Placeholder for poster */
    }
    .watchlist-rate-length-block{
        display: flex;
        flex-direction: row;
        gap: 20px; /* Space between rate and length */
    }
    .watchlist-rate {
        font-size: 15px;
        color: #FFFFFF;
    }
    .watchlist-length {
        font-size: 15px;
        color: #FFFFFF;
    }
    .watchlist-title {
        font-size: 15px;
        font-weight: bold;
        color: #FFFFFF;
        width: 206px; /* Adjust width as needed */
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

    /* Comments Section */
    .comment-frame {
        background-color: #000000;
        border: 3px solid #222222;
        border-radius: 10px;
        padding: 20px;
        width: 1100px;
        margin: 20px auto;
    }
    .comment-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .comment-content {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
    .comment-rating {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 200px; /* Adjust width as needed */
    }
    .comment-rate{
        display: flex;
        flex-direction: row;
        gap: 1px;
    }
    .comment-date {
        font-size: 14px;
        color: #FFFFFF;
    }
    .comment-review-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .comment-review{
        font-size: 14px;
        color: #FFFFFF;
    }

    .like-button,
    .dislike-button {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        color: #FFFFFF;
    }
    .comment-like-dislike-block{
        display: flex;
        flex-direction: row;
        width: 100px;
    }
    .show-more {
        font-size: 14px;
        font-weight: bold;
        text-decoration: underline;
        color: #FFFFFF;
        cursor: pointer;
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
<!-- Watchlist Block -->
<h2 class="section-title">Watchlist</h2>
<div class="watchlist-frame">
    {#each watchlists as watchlist}
    <div class="watchlist-block">
        <div class="watchlist-poster">
            <!-- Placeholder for movie poster -->
        </div>
        <div class="watchlist-rate-length-block">
            <div class="watchlist-rate">⭐: {watchlist.rate}</div>
            <div class="watchlist-length">⏰: {watchlist.length} min</div>
        </div>
        <div class="watchlist-title">{watchlist.title}</div>
    </div>
    {/each}
</div>
<!-- User Comment Block -->
<h2 class="section-title">User Comment</h2>
<div class="comment-frame">
    {#each comments as comment, index}
        <div class="comment-block">
            <div class="movie-info">
                <div class="movie-poster">
                    <!-- Placeholder for movie poster -->
                </div>
                <div class="movie-detail">
                    <div class="movie-title">{comment.title}</div>
                    <div class="movie-year">{comment.year}</div>
                    <div class="movie-cast">{comment.cast}</div>
                </div>
            </div>
            <div class="comment-content">
                <div class="comment-rating">
                    <div class="comment-rate">
                        {#each Array(comment.rate) as _}
                            <div class="star">⭐</div>
                        {/each}
                        {#each Array(5 - comment.rate) as _}
                            <div class="star">☆</div>
                        {/each}
                    </div>
                    <div class="comment-date">{comment.date}</div>
                    <div class="comment-like-dislike-block">
                        <div class="like-button">👍 {comment.likes}</div>
                        <div class="dislike-button">👎 {comment.dislikes}</div>
                    </div>
                </div>
                <div class="comment-review-block">
                    <div class="comment-review">{comment.review}</div>
                    <div class="show-more">Show more</div>
                </div>
            </div>
        </div>
        {#if index < comments.length - 1}
            <div class="separator"></div>
        {/if}
    {/each}
</div>
<div class="button-container">
    <Button class="load-more-button" variant="outline" 
    style="background-color: purple; border-color:purple; color: white;">
    Load More</Button>
</div>
<div class="button-container">
    <Button class="log-out-button" variant="outline" 
    style="background-color: purple; border-color:purple; color: white;">
    Log Out</Button>
</div>