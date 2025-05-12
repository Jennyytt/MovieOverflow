import PocketBase from 'pocketbase';
import nodemailer from 'nodemailer';

const pb = new PocketBase('http://127.0.0.1:8090');

// Use correct login with _superusers collection
await pb.collection('_superusers').authWithPassword(
  'tonball112@gmail.com',
  '00000000'
);

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
  auth: null, // no auth for MailHog
  tls: { rejectUnauthorized: false }
});

async function sendReminders() {
  const today = new Date().toISOString().split('T')[0];

  const movies = await pb.collection('movies').getFullList({
    filter: `releaseDate ~ "${today}"`,
  });

  if (movies.length === 0) {
    console.log("📭 No movies released today.");
    return;
  }

  for (const movie of movies) {
    console.log(`📽️ "${movie.title}" releases today.`);

    const watchlist = await pb.collection('watchlists').getFullList({
     // if single value
      filter: `movieId="${movie.id}" && notification=true`,
    //  if array
    //   filter: `movieId ?~ "${movie.id}" && notification=true`,
      expand: 'userId',
    });

    console.log(`🔍 Found ${watchlist.length} watchlist item(s) for "${movie.title}"`);

    for (const entry of watchlist) {
      const user = entry.expand.userId;
      if (!user?.email) continue;

      const mailOptions = {
        from: '"MovieOverflow" <no-reply@example.com>',
        to: user.email,
        subject: `🎬 ${movie.title} is released today!`,
        html: `
          <p>Hi ${user.username || 'there'},</p>
          <p>Great news! The movie <strong>${movie.title}</strong> has just been released today.</p>
          <p>🎥 <a href="${movie.trailerURL}" target="_blank">Watch the trailer</a></p>
          <br>
          <p>Thanks,<br>MovieOverflow Team</p>
        `
      };

      try {
        console.log(`📧 Sending email to ${user.email}`);
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${user.email}`);
      } catch (err) {
        console.error(`❌ Failed to send email to ${user.email}:`, err.message);
      }
    }
  }
}

sendReminders().catch((err) => {
  console.error("❌ Error:", err);
});

