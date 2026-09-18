/* =========================================================
   mah-e-kana's birthday site — shared script
   ========================================================= */

/* ---------- 1. Twinkling stars background (all pages) ---------- */
(function initStars() {
  const canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.floor((canvas.width * canvas.height) / 8000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      const twinkle = reduceMotion
        ? 0.8
        : 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 200, 105, ${0.2 + twinkle * 0.6})`;
      ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();

/* ---------- 2. Floating moonflower petals (cute extra touch) ---------- */
(function initPetals() {
  const layer = document.getElementById("petals-layer");
  if (!layer) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) return;

  const emojis = ["🌸", "🌷", "✨", "💮", "🌼"];
  const count = window.innerWidth < 600 ? 9 : 16;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.setProperty("--drift", Math.random() * 120 - 60 + "px");
    petal.style.fontSize = 0.9 + Math.random() * 1.1 + "rem";
    petal.style.animationDuration = 14 + Math.random() * 14 + "s";
    petal.style.animationDelay = Math.random() * 16 + "s";
    layer.appendChild(petal);
  }
})();

/* ---------- 3. Access control helpers ---------- */
const AUTH_KEY = "mahekana_unlocked";

function isUnlocked() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}
function requireUnlock() {
  if (!isUnlocked()) {
    window.location.href = "login.html";
  }
}
function lockAndGoHome() {
  sessionStorage.removeItem(AUTH_KEY);
  window.location.href = "index.html";
}

/* ---------- 4. Login page logic ---------- */
/* The password is her birthdate. We accept a few friendly formats:
   24102009 / 24/10/2009 / 24-10-2009 / 24.10.2009 — only the digits
   are compared. Change BIRTH_DIGITS below if you ever need to update it. */
const BIRTH_DIGITS = "24102009";

function initLoginPage() {
  const form = document.getElementById("login-form");
  if (!form) return;

  const input = document.getElementById("password-input");
  const errorEl = document.getElementById("login-error");
  const card = document.getElementById("login-card");
  const overlay = document.getElementById("unlock-overlay");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const digitsOnly = (input.value || "").replace(/\D/g, "");

    if (digitsOnly === BIRTH_DIGITS) {
      errorEl.textContent = "";
      sessionStorage.setItem(AUTH_KEY, "true");
      overlay.classList.add("is-active");
      setTimeout(() => {
        window.location.href = "gallery.html";
      }, 1300);
    } else {
      errorEl.textContent = "hmm, that's not quite her birthday 🌙 try again?";
      card.classList.remove("is-shaking");
      void card.offsetWidth;
      card.classList.add("is-shaking");
      input.select();
    }
  });
}

/* ---------- 5. Gallery page logic ---------- */
/* Add photos to /images/gallery/ then list filenames + captions below.
   The gallery is split into sections so you can organise lots of
   pictures — add, rename, or remove whole sections as you like. */
const gallerySections = [
  {
    title: "Us",
    note: "every photo of the two of us worth keeping",
    photos: [
      { src: "images/gallery/us-1.jpeg", caption: "MY Sher😚" },
      { src: "images/gallery/us-2.jpeg", caption: "We are Mentally Retarded!😭😭" },
      { src: "images/gallery/throwback-3.jpeg", caption: "Slayeddddd...!!!  " },
      { src: "images/gallery/us-4.jpeg", caption: "My Jaanu😗" },
    ],
  },
  {
    title: "Her main character moments",
    note: "just her, being iconic",
    photos: [
      { src: "images/gallery/her-3.jpeg", caption: "Nach Siraekan nach💃💃" },
      { src: "images/gallery/her-2.jpeg", caption: "Curly hairs baddiee😎😋" },
      { src: "images/gallery/chaos-1.jpeg", caption: "Kia cutie lagrahi ho bhai....SHOWWWW😭😭" },
      { src: "images/gallery/her-4.jpeg", caption: "Chilghozi✨🤷‍♀️" },
    ],
  },
  {
    title: "Random chaos",
    note: "the unhinged, unfiltered, very real moments",
    photos: [
      { src: "images/gallery/chaos-3.jpeg", caption: "Lelia SS XD" },
      { src: "images/gallery/chaos-2.jpeg", caption: "Dhund kr nikali showww😎" },
      { src: "images/gallery/her-1.jpeg", caption: "Ruko!! ab lelo SS😭" },
      { src: "images/gallery/chaos-4.jpeg", caption: "Biceps to hain fr👊" },
    ],
  },
  {
    title: "Throwbacks",
    note: "the old ones that still make us laugh",
    photos: [
      { src: "images/gallery/throwback-1.jpeg", caption: "Is aurat ki college mein bezatti hogai😭😭" },
      { src: "images/gallery/throwback-2.jpeg", caption: "Santra🙂" },
      { src: "images/gallery/us-3.jpeg", caption: "Bhai or pics pleaseeee!! HAHAHHAHA😣" },
      { src: "images/gallery/throwback-4.jpeg", caption: "Ao mein dikhati what biceps looks like😏" },
    ],
  },
];

function buildGalleryItem(photo, lightbox, lightboxImg, lightboxCaption) {
  const item = document.createElement("div");
  item.className = "gallery-item";

  const img = new Image();
  img.alt = photo.caption;
  img.onload = () => {
    item.appendChild(img);
    const cap = document.createElement("div");
    cap.className = "caption";
    cap.textContent = photo.caption;
    item.appendChild(cap);
    item.addEventListener("click", () => {
      lightboxImg.src = photo.src;
      lightboxCaption.textContent = photo.caption;
      lightbox.classList.add("is-active");
    });
  };
  img.onerror = () => {
    item.classList.add("is-placeholder");
    item.innerHTML = `<span class="icon">🌸</span><span>photo coming soon</span><small>${photo.src.split("/").pop()}</small>`;
  };
  img.src = photo.src;

  return item;
}

function initGalleryPage() {
  const container = document.getElementById("gallery-sections");
  if (!container) return;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");

  gallerySections.forEach((section) => {
    const wrap = document.createElement("div");
    wrap.className = "gallery-section";
    wrap.innerHTML = `
      <div class="gallery-section-head">
        <h2>${section.title}</h2>
        <p>${section.note}</p>
      </div>
    `;
    const grid = document.createElement("div");
    grid.className = "gallery-grid";
    section.photos.forEach((photo) => {
      grid.appendChild(
        buildGalleryItem(photo, lightbox, lightboxImg, lightboxCaption),
      );
    });
    wrap.appendChild(grid);
    container.appendChild(wrap);
  });

  function closeLightbox() {
    lightbox.classList.remove("is-active");
  }
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

/* ---------- 6. Letters page logic ---------- */
/* Edit the text below freely — write whatever you actually want to say.
   Add more letters by copying one object in this array. */
const letters = [
  {
    seal: "🌸",
    title: "How We Met",
    peek: "where it all started",
    body: `# How the Hell Did We Even Become Friends?

I still think about how random it was that we even became friends — and honestly, the more I think about it, the less sense it makes.

It all started in March 2025 on a completely random day. Ashal started following you, and wo jb kr raha tha tb mene dekh lia usko ye krte hue. Now, any normal person would've ignored that shit. But me? No. I decided to do what any beghairt bestfriend would do: stalk your profile first to know why ashal followed you.

And this is where i was mistaken!! ghalti hogaya malik! bhari mistake hogaya😭.

Sarcastically speaking, of course!! SHUTAAAPPPP....!

I followed you. At that point, you didn't follow me back Ajeeeebb!! But as usual meri adat k mutabik i used like your stories!! Dont feel special! wo to mein sbki krta hun! kisi ki bhi story kuch bhi ho!! i jus dont give a fuck when Im liking stories.

So naturally, I kept liking your stories.

And to your credit, as a very kind and incredibly bauni human being, you eventually started doing the same. So basically do Akhand chaman chamar log aj tk baat waat kiye baghair ek dusre ki stories like kr rahe the...!

Then came April 5th.

The day that changed everything.

You posted a story about Olivia Rodrigo. Now, let me clarify something. I love Olivia Rodrigo... She's great. But compared to you? I was basically a casual listener i mean mein koi aisa die heart fan nahi uska😭😭 jbke tum uske liye inteha ki pagal ho..!!

I wanted to reply to your story, but there ek beghairti thi.

You weren't following me... Peak jahalat... Matlab itne piyare insaan ko follow back hi nahi dia!!

So, mene tumhe unfollow kia and I followed you again , and somehow you followed me back.


Yummmmm.

What makes this even funnier is that both Ashal and I replied to your Olivia Rodrigo story. Peak best-friend behavior. Neither of us knew the other had replied. We just independently decided, "Yep, let's both annoy this girl today."

You were apparently shocked.

Understandable... but phir bhi ajeeb you should be knowing k humare yahan aisa hi hota h!! apke future bestfriend ka message tha Ajeeb!!!

Then we started talking.... Shit bhai Shit...

Now here's where the story gets even more ridiculous.

That day, I had gone somewhere, and Hashir had access to my Instagram account. Instead of behaving like a normal person, this man started talking to you from my account without me knowing.

And it gets worse.

He was literally using ChatGPT to generate replies.....AJEEB ullu ka phatta admi h ye fuck bhai....!!

I eventually found out and was like, "What the actual hell are you doing?"

At that point, I realized if I wanted to actually talk to you as myself, I needed to ask smth....

and I asked for your Snapchat..... TUm mujhe kata rahin thi usdin. Thori si pagal wagal ho kia aap.. Agar meri ego hurt hojati usdin to apko mein kabhi milta hi nahi..!!

And just like that, the story of how I met my homegirl officially began.

Looking back now, it's crazy.

A random profile on Instagram.

A few story likes.

An Olivia Rodrigo story.

Two best friends accidentally replying at the same time.

A guy secretly using ChatGPT from my account.

And somehow, out of all that chaos, I got you.

I still don't understand how everything lined up the way it did, but I'm genuinely grateful it happened. Because what started as random interactions somehow became one of the most important friendships in my life.

And honestly?

For someone who was just a random girl on Instagram, you've become way more than that.

But that's a story for another letter.

A letter called:

"You Suddenly Became My HG."`,
    signoff: "— the start of everything",
  },

  {
    seal: "🌙",
    title: "You Suddenly Became My HG",
    peek: "and I'm not complaining",
    body: `# You Suddenly Became My HG

Now what happened is we started talking!!!

Mostly daily.

At first, we weren't even that close. We were just two people talking regularly, getting to know each other little by little.

Then one day, I roasted you a bit.

Now normally, roasting people is one of my favorite hobbies. But the thing is, I wasn't very good at controlling it back then.

We were not good friends at that time, and after a while, I started feeling bad.

As you know, I just read the psyche of every person I talk to. I don't know how, but I pick up on things. And I knew you were a soft-hearted person.

Mujhe thora sa bura laga.

So I told you I was sorry.

I think you cried that day thinking about Souvik. You were a bit senti that day, and somehow I figured that out.

Obviously, I asked! kitna acha admi hun mein😎.

And honestly, I literally had a soft side for you from the very beginning.

You seemed so innocent. Like genuinely innocent.

Well...

Andha tha mein but as a gentleman I asked you about it.

And then you started telling me about your life.

Not just a little bit.

Literally everything.

Every major shit.

Every trauma.

You told me how bitchy your dadi is. You told me about your bharwe gandu se cousins.

And I swear, I was losing my mind that day... Itni to meri aj tk kisi se nahi jali!!! You're dadi and cousins got one more hater that day

Matlab ek bandi ke itne traumas?!

At some point I was just sitting there thinking, "bc drama h kia?"

And honestly?

i swear If I had a sister like you... Mein usko itna sambhal ke rakhta.

I don't have a sister. But still... mujhe bakhuda tumhare bhaiyon pr bhi gussa araha tha but now i know tumne kisi ko batya hi nahi h warna un jahil k bachon ka mun na parhna is nothing but jahalat

I don't know why, but that was genuinely what I felt.

Nobody deserves half the things you've had to deal with... but dw you have me now!! or ab to tumhari zubaan bhi itni chalti h ASTAGHFIRULLAH...!!😶🙄 to ab even if kisi ne tumhe tang bhi kia I'll deal with it...!! Fenk me later🥱

Then, two days later, we were talking again as usual.

And somehow the conversation took a turn ahhhh.

I told you that I could read minds. Okay, maybe not literally. But I definetly sense what the other person is thinking and you were a bit emotional about something that day... and mene tumse poocha bhi tha...

Anyways You were like, "ACHAAA and you started testing my skills."

You showed me the screenshots. The screenshots of Mahi and Souvik talking.

I looked at them. I told you what I thought but bohat hi dhake chupe alfazo mein.

But honestly? Those screenshots were screaming that Mahi and Souvik were in love.

I didn't say it that directly because unlike you, mein apna dimagh use krleta hun..!!

Then you told me the whole story.

The entire thing.

And that day, whether you realized it or not, you made a soft corner for yourself in my heart.

Although at the same time I was also thinking:

"Kia pagal aurat hai. 6 mahine mein aisa pyar kaise ho jata hai?"

Like seriously. I was confused and Concerned.

But tea mili thi to irl i was interested.

Then one day mere Mids se thore din pehle you introduced me to MLBB!! mujhe games chore hue 2-3 saal hogae the but thanks to you!! We started playing MLBB together!! Ajeeb ho tum!!

And from there, things just kept getting better.

To this day, I don't know how it happened.

There was no grand moment.

No official friendship agreement.

One day we were just talking. We just started spilling Tea's...!!

The next thing I knew, you became my HG.

Like literally on a random day you chose me as your HB... Ajeeb dimagh kharab but Thank god....!!

And somehow, without either of us realizing it, our friendship became absolutely goated.

It's honestly funny when I think about it.

A random Instagram follow.

Random conversations.

Random trauma dumps.

Random roasts.

And somehow all of that turned into one of the best friendships I've ever had.

I still don't know how you managed to become this important to me.

But somehow, you did.

And that's probably my favorite random thing that's ever happened.

I love you Mahe for being the Tea spiller and also for har waqt bakwas krte rehna!!!
`,
    signoff: "— Youre my homegirl for life",
  },

  {
    seal: "💮",
    title: "Who You Are To Me",
    peek: "the important one",
    body: `You're my safe place, my hype woman, my partner in crime. You make hard days lighter just by being in them.\n\nHappy birthday to someone who means absolutely nothing to me (no World no smth). 
    
    Zyada daant mat dikhana!! I hate you... Treat chahiye mujhe!! Aise hi humesha bakwas krti raho... 
    
    hn but thora kam tang kia karo mujhe!! just joking i love when you message me... krti raho tang... i dont mind!!
    
    Mere liye last year Doston mein Ashal k baad sirf hashir ka naam ata tha!! Like Ashal was my bwstest friend and hashir was second best but now Ashal and you both are top of the list!! 
    
    I literally cant choose between you and ashal!! And I dont even want to!! Youre the person jisko mein uthte sath hi jawab deta hun!! but youre not nerdy enough to understand what you mean to me!!!
    
    Always stay in my life!!! kahin jana nahi warn mujhe bohat ghussa ata h!! I mean it!! You're what warisha was to ashal when he didnt had a crush on her!! honestly our friendship is more goated than there's
    
    Bohat likh dia ajeeb!! Itne saare Efforts mujhse nikalwana is not a piece of cake!! know you're worth Mahe`,
    signoff: "— I love you... and I'm always proud of you",
  },

  {
    seal: "💕",
    title: "What you taught me",
    peek: "The best things",
    body: `**What you taught me**

You taught me so many things without even realizing it. You taught me how to treat women right, how to give proper princess treatment, and that being a little *run mureed* isn't actually such a bad thing 😭. You taught me how important emotional support is, how to actually be there for someone, listen to them, and make them feel understood.

You’ve also taught me that caring about someone means wanting to see them become better, and somehow, you've made me want to be a better person too. You’ve shown me that friendships aren't just about having fun and talking nonsense (although we do A LOT of that), but also about getting better(I'm the best though💃) and being there when things aren't so easy.

So thank you for teaching me all of that with alot of zillat and tafree. You just being you has taught me more than you probably realize.. ❤️

`,
    signoff: "— You're a great teacher BTW",
  },

   {
    seal: "🎎",
    title: "My Emotional wall",
    peek: "NAHI YAR",
    body: `**Hate you so much for all this**

Mein na chamar hi acha tha!! Saare heartbreaks! Saare emotional distress! Saari jahan ki beghairtiyan! What I actually feel! sb apne dil mein rakha rehta tha!! Meri insecurities, Mera khudke liye hate! Mera janwaron ki tarhan jeena! ye sb cheezein jb mujhe andar se kha rahin thin! 

There was no one i could share these with!! I'm ok jb bhi mera mazak urta h mere spots pr ya kisi or cheez pr because i have those shits!! And you made me such a shitty guy!! Jo ab sb share krdeta h tumse!! Ykw! mein Aj tk ashal ko nahi batapaya wht i feel!! How i feel!! Its only you jisse mein khul kr baat kr pata hun!!

I DONT KNOW WHY!!!?? WHY THE FUCK MEIN AISA HOGAYA HUN!?? I was not ok with that life ik! JB koi sunne ko hi nahi tha! Ashal bhai h mera kia batata usko!! BHai tum bhi ho but tum HG ho!! I dont like sharing anything but aap baat nikalwa leti ho and mood sahi bhi krdeti ho!! Thankyou for being in my life!!(han hai pocket pr ye wala apne pass rakho)..

I wish you would have came early in my life! meri 100's of nights in which i was depressed unse jaan chut jaati!! I love you as much as you cant count!!
`,
    signoff: "— THANK YOUUUUUUUUUU>>>>>3",
  },

   {
    seal: "💔",
    title: "US",
    peek: "FACTS",
    body: `**US CORE**

We are the most retarted bastards in the history of mankind! I Lowkey needed this DUO my whole life!! Har insaan ko judge kia h humne!! Har cheez discuss ki h!! Poori poori zindagi share ki h!! I bet no one knows you as much as i do now!!

The amount of joy i got in last 6 months is fs nothing less to the joy i got in last 19 years of my life!! but ofc this is not going to last forever!!! We both know that!! I hope it remains as it is... but i want us to be as clumsy and shitty as we are till its  (WE!!)

I want us to have the best moments of life till we are hb and hg!! I want us to make as much memories as we could to make sure usme life katjae!! And i want our END to be not like your END with Anumta or Rijja!! I dont want to leave you like that!! AND PLEASE AAP BHI EK BAAR IS GHAREEB KA SOCHLENA😭😭...

Na bhi socho to naraz hue baghair ek baar inform krdena!! 
`,
    signoff: "— WE ARE SO MAIN CHARACHTER VIBE BTW😜",
  },

     {
    seal: "😭",
    title: "We knew",
    peek: "Hota hai",
    body: `**I'll never be OK!**

I knew our end would not be OK! Tumhara curse bohat chota h mere aage! meri life fuck nahi hui tumhari hogai yr! Mein life mein tumhari wall banna chahta tha jispr se sbko guzarna pare tumhe kuch kehne k liye but I never knew k agar tum us wall k peeche se hatgain to ye wall chakna chur hojae gi! Mein chudgaya hun Mak-e-kana! Itna sochraha hun abhi tumhare baare mein k you cant imagine

but OK i just want you to be happy and do the best in life! I'm sorry apne meri wajah se bohat kuch saha hai!! These were the best 5 months of my life! I told you na no one knows Fasih and i told you k mein apni jaanu ko bataunga! Hn I will tell it to you!! Mein chahta hun jb mein marne wala hun kisi ko to bata paun k hn duniya mein there is one human jo janta h fasih kis chutiye ka naam hai!!

Meri zindagi kabhi aisi nahi rahegi!! I'll never forget you! aap sirf meri adat nahi zaroorat ho! mein nahi jee sakta yr aise! Sirf 1 din mein bukhar se phukraha hun but han i have to deal with it!! sahi rehna parega! Meri choro idk aap kese jiyogi! Ik thori din mein shayad apki mujhse baat krne ki adat ko aap overcome karlo! kia pata! I hope aisa hi ho!

Honestly mein ye nahi chahta! Mein chahta hun aap saare ghum duniya k bhula do bs mujhe na bhula pao! I'm selfish ik! pr nahi jee paunga yr! fuck my feelings! Ik aap akele is duniya ko handle nahi krsaktin! I want k aap seekh jao ye and hyper na hua karo pr phir bhi I want k mein apke dil mein humesha rahun! Ye spot nahi chorna mujhe kabhi bhi!! Mein nahi overcome krsakta is cheez ko!

But OK! Please wapis Ajana! I'll wait for you!,
    signoff: "— I'll Miss My HG😜"
    `,
  },
     {
    seal: "😣",
    title: "In my Heart",
    peek: "Always",
    body: `**What you did!**

I knew our end would not be OK! Tumhara curse bohat chota h mere aage! meri life fuck nahi hui tumhari hogai yr! Mein life mein tumhari wall banna chahta tha jispr se sbko guzarna pare tumhe kuch kehne k liye but I never knew k agar tum us wall k peeche se hatgain to ye wall chakna chur hojae gi! Mein chudgaya hun Mak-e-kana! Itna sochraha hun abhi tumhare baare mein k you cant imagine

but OK i just want you to be happy and do the best in life! I'm sorry apne meri wajah se bohat kuch saha hai!! These were the best 5 months of my life! I told you na no one knows Fasih and i told you k mein apni jaanu ko bataunga! Hn I will tell it to you!! Mein chahta hun jb mein marne wala hun kisi ko to bata paun k hn duniya mein there is one human jo janta h fasih kis chutiye ka naam hai!!

Meri zindagi kabhi aisi nahi rahegi!! I'll never forget you! aap sirf meri adat nahi zaroorat ho! mein nahi jee sakta yr aise! Sirf 1 din mein bukhar se phukraha hun but han i have to deal with it!! sahi rehna parega! Meri choro idk aap kese jiyogi! Ik thori din mein shayad apki mujhse baat krne ki adat ko aap overcome karlo! kia pata! I hope aisa hi ho!

Honestly mein ye nahi chahta! Mein chahta hun aap saare ghum duniya k bhula do bs mujhe na bhula pao! I'm selfish ik! pr nahi jee paunga yr! fuck my feelings! Ik aap akele is duniya ko handle nahi krsaktin! I want k aap seekh jao ye and hyper na hua karo pr phir bhi I want k mein apke dil mein humesha rahun! Ye spot nahi chorna mujhe kabhi bhi!! Mein nahi overcome krsakta is cheez ko!

But OK! Please wapis Ajana! I'll wait for you!,
    signoff: "— I'll Miss My HG😜"
    `,
  },

];

/* ---------- Fasih letters ---------- */
const fasihLetters = [
  {
    seal: "🧑‍💻",
    title: "Letter Title 1",
    peek: "short preview here",
    body: `Write your first letter here.

You can write as much as you want.

Just like your existing letters.`,
    signoff: "— Fasih",
  },

  {
    seal: "😭",
    title: "Letter Title 2",
    peek: "another little preview",
    body: `Write your second letter here.

This can be completely different from the first one.`,
    signoff: "— Fasih",
  },

  {
    seal: "🙄",
    title: "Letter Title 3",
    peek: "you'll understand",
    body: `Write your third letter here.`,
    signoff: "— Fasih",
  },

  {
    seal: "🤷‍♂️",
    title: "Letter Title 4",
    peek: "what can I say",
    body: `Write your fourth letter here.`,
    signoff: "— Fasih",
  },

  {
    seal: "🫶",
    title: "Letter Title 5",
    peek: "the final one",
    body: `Write your fifth letter here.`,
    signoff: "— Fasih",
  },
];

function initLettersPage() {
  const grid = document.getElementById("letters-grid");
  const fasihGrid = document.getElementById("fasih-letters-grid");
  if (!grid) return;

  const modal = document.getElementById("letter-modal");
  const modalTitle = document.getElementById("letter-modal-title");
  const modalBody = document.getElementById("letter-modal-body");
  const modalSignoff = document.getElementById("letter-modal-signoff");
  const modalSeal = document.getElementById("letter-modal-seal");
  const closeBtn = document.getElementById("letter-modal-close");

  letters.forEach((letter) => {
    const card = document.createElement("div");
    card.className = "envelope";
    card.innerHTML = `
      <div>
        <span class="seal">${letter.seal}</span>
        <h3>${letter.title}</h3>
        <p class="peek">${letter.peek}</p>
      </div>
      <span class="tap">tap to open</span>
    `;
    card.addEventListener("click", () => {
      modalTitle.textContent = letter.title;
      modalBody.textContent = letter.body;
      modalSignoff.textContent = letter.signoff;
      if (modalSeal) modalSeal.textContent = letter.seal;
      modal.classList.add("is-active");
    });
    grid.appendChild(card);
  });

    if (fasihGrid) {
    fasihLetters.forEach((letter) => {
      const card = document.createElement("div");
      card.className = "envelope";
      card.innerHTML = `
        <div>
          <span class="seal">${letter.seal}</span>
          <h3>${letter.title}</h3>
          <p class="peek">${letter.peek}</p>
        </div>
        <span class="tap">tap to open</span>
      `;

      card.addEventListener("click", () => {
        modalTitle.textContent = letter.title;
        modalBody.textContent = letter.body;
        modalSignoff.textContent = letter.signoff;
        if (modalSeal) modalSeal.textContent = letter.seal;
        modal.classList.add("is-active");
      });

      fasihGrid.appendChild(card);
    });
  }
   
  

  function closeModal() {
    modal.classList.remove("is-active");
  }
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* ---------- 7. Run relevant init on load ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initLoginPage();
  initGalleryPage();
  initLettersPage();
});


