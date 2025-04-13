<script>
	// Props for dynamic content
	export let title = 'Captain America: Brave New World';
	//export let year = '2025';
	export let rating = 'IIA';
	export let duration = '1h 58m';
	import posterImage from '../../assets/movie-poster-xl.png';
	import { MoveDown } from '@lucide/svelte';
	import LargerCommentCard from '$lib/customComponents/comment/LargerCommentCard.svelte';
</script>

<div class="frame-1000003578">
	<div class="frame-1000003499">
		<img class="image-21" src={posterImage} alt={title + 'poster'} />
		<div class="frame-1000003498">
			<div class="frame-1000003497">
				<div class="frame-1000003493">
					<div class="captain-america-brave-new-world">
						<span class="captainamericabravenewworld_span">{title}</span>
					</div>
					<div class="frame-1000003491">
						<div class="frame-1000003490">
							<div><span class="iia_span">{rating}</span></div>
							<div><span class="fspan">,</span></div>
						</div>
						<div><span class="fh58m_span">{duration}</span></div>
					</div>
				</div>
				<div class="line-10"></div>
				<div class="frame-1000003494">
					<div><span class="genre_span">Genre</span></div>
					<div><span class="actionadventurefantasy_span">Action, Adventure, Fantasy</span></div>
				</div>
				<div class="line-6"></div>
				<div class="frame-1000003495">
					<div><span class="director_span">Director</span></div>
					<div><span class="juliusonah_span">Julius Onah</span></div>
				</div>
				<div class="line-7"></div>
				<div class="frame-1000003496">
					<div><span class="releasedate_span">Release Date</span></div>
					<div><span class="feb142025_span">Feb 14, 2025</span></div>
				</div>
			</div>
		</div>
	</div>
	<div class="frame-1000003545">
		<div class="frame-1000003488">
			<div class="frame-1000003461">
				<div class="captain-america-brave-new-world-comments">
					<span class="captainamericabravenewworldcomments_span"
						>Captain America: Brave New World Comments</span
					>
				</div>
				<div class="frame-1000003460">
					<div class="frame-1000003384">
						<div><span class="sortby_span">Sort By</span></div>
					</div>
					<div class="frame-1000003459">
						<div class="frame-1000003384_01">
							<div><span class="date_span">Date</span></div>
						</div>
						<MoveDown
							class="width: 10.18px;
                        height: 16.11px;
                        left: 4.51px;
                        top: 1.61px;
                        position: absolute;"
							fill="none"
							color="#B693DC"
						/>
					</div>
				</div>
			</div>
			<div class="line-12"></div>
		</div>
		<LargerCommentCard />

		<div class="line-11"></div>
		<LargerCommentCard />
		<div class="line-13"></div>
		<LargerCommentCard />
		<div class="line-14"></div>
		<LargerCommentCard />
		<div class="line-15"></div>
		<LargerCommentCard />
		<div class="line-16"></div>
		<div class="frame-1000003463">
			<div><span class="loadmore_span">Load More</span></div>
		</div>
	</div>
</div>

<style>
	.image-21 {
		width: 315px;
		height: 473px;
		border-radius: 3.68px;
	}

	.captainamericabravenewworld_span {
		color: white;
		font-size: 22.09px;
		font-family: Inter;
		font-weight: 600;
		word-wrap: break-word;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.captain-america-brave-new-world {
		align-self: stretch;
	}

	.iia_span {
		color: #cccccc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.fspan {
		color: white;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.fh58m_span {
		color: #cccccc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.line-10 {
		width: 366px;
		height: 0px;
		outline: 2.76px #222222 solid;
		outline-offset: -1.38px;
	}

	.genre_span {
		color: #cccccc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.actionadventurefantasy_span {
		color: white;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 400;
		word-wrap: break-word;
	}

	.line-6 {
		width: 366px;
		height: 0px;
		outline: 2.76px #222222 solid;
		outline-offset: -1.38px;
	}

	.director_span {
		color: #cccccc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.juliusonah_span {
		color: white;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 400;
		word-wrap: break-word;
	}

	.line-7 {
		width: 366px;
		height: 0px;
		outline: 2.76px #222222 solid;
		outline-offset: -1.38px;
	}

	.releasedate_span {
		color: #cccccc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.feb142025_span {
		color: white;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 400;
		word-wrap: break-word;
	}

	.captainamericabravenewworldcomments_span {
		color: white;
		font-size: 22.09px;
		font-family: Inter;
		font-weight: 600;
		word-wrap: break-word;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.captain-america-brave-new-world-comments {
		width: 531.97px;
	}

	.sortby_span {
		color: #cccccc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 600;
		white-space: nowrap;
	}

	.date_span {
		color: #b693dc;
		font-size: 18.41px;
		font-family: Inter;
		font-weight: 600;
		text-decoration: underline;
		word-wrap: break-word;
	}

	.line-12 {
		align-self: stretch;
		height: 0px;
		outline: 4.6px #222222 solid;
		outline-offset: -2.3px;
	}

	.line-11 {
		align-self: stretch;
		height: 0px;
		outline: 2.76px #222222 solid;
		outline-offset: -1.38px;
	}

	.line-13 {
		align-self: stretch;
		height: 0px;
		outline: 2.76px #222222 solid;
		outline-offset: -1.38px;
	}

	.line-14 {
		align-self: stretch;
		height: 0px;
		outline: 2.76px #222222 solid;
		outline-offset: -1.38px;
	}

	.line-15 {
		align-self: stretch;
		height: 0px;
		outline: 2.76px #222222 solid;
		outline-offset: -1.38px;
	}

	.line-16 {
		align-self: stretch;
		height: 0px;
		outline: 2.76px #222222 solid;
		outline-offset: -1.38px;
	}

	.loadmore_span {
		color: white;
		font-size: 14.73px;
		font-family: Inter;
		font-weight: 500;
		word-wrap: break-word;
	}

	.frame-1000003490 {
		justify-content: flex-start;
		align-items: flex-end;
		gap: 7px;
		display: flex;
	}

	.frame-1000003494 {
		align-self: stretch;
		justify-content: center;
		align-items: center;
		gap: 77px;
		display: inline-flex;
	}

	.frame-1000003495 {
		align-self: stretch;
		justify-content: space-between;
		align-items: center;
		display: inline-flex;
	}

	.frame-1000003496 {
		align-self: stretch;
		opacity: 0.66;
		justify-content: space-between;
		align-items: center;
		display: inline-flex;
	}

	.frame-1000003384 {
		width: 62.13px;
		justify-content: space-between;
		align-items: center;
		display: flex;
	}

	.frame-1000003384_01 {
		width: 42px;
		outline: 0.92px rgba(0, 0, 0, 0) solid;
		outline-offset: -0.92px;
		justify-content: space-between;
		align-items: center;
		display: flex;
	}

	.frame-1000003463 {
		width: 103.08px;
		height: 34.05px;
		padding-left: 14px;
		padding-right: 14px;
		padding-top: 8px;
		padding-bottom: 8px;
		background: rgba(128, 43, 177, 0.8);
		border-radius: 4.6px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		display: inline-flex;
	}

	.frame-1000003491 {
		justify-content: center;
		align-items: center;
		gap: 12px;
		display: inline-flex;
	}

	.frame-1000003459 {
		justify-content: center;
		align-items: flex-end;
		gap: 6px;
		display: flex;
	}

	.frame-1000003493 {
		align-self: stretch;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 7px;
		display: flex;
	}

	.frame-1000003460 {
		justify-content: flex-start;
		align-items: center;
		gap: 25px;
		display: flex;
	}

	.frame-1000003497 {
		width: 370.79px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 14px;
		display: flex;
	}

	.frame-1000003461 {
		align-self: stretch;
		justify-content: center;
		align-items: flex-end;
		gap: 32px;
		display: inline-flex;
	}

	.frame-1000003498 {
		align-self: stretch;
		height: 274px;
		padding-left: 23px;
		padding-right: 23px;
		padding-top: 19px;
		padding-bottom: 19px;
		background: black;
		border-radius: 9.2px;
		outline: 2.76px #222222 solid;
		outline-offset: -2.76px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		display: flex;
	}

	.frame-1000003488 {
		align-self: stretch;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 19px;
		display: flex;
	}

	.frame-1000003499 {
		width: 418px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 31px;
		display: inline-flex;
	}

	.frame-1000003545 {
		width: 723.9px;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 22px;
		display: inline-flex;
	}

	.frame-1000003578 {
		width: 100%;
		height: 100%;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 28px;
		display: inline-flex;
	}
</style>
