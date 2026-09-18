mah-e-kana's birthday website 🌙🌸
==================================

WHAT'S INSIDE
- index.html    → Home page
- login.html    → Locked entry page (password = her birthdate)
- gallery.html  → Photo gallery, split into 4 sections
- letters.html  → 3 letters: "How We Met", "You Suddenly Became My HG",
                   "Who You Are To Me"
- style.css     → All styling — dark "moonflower night" theme
- script.js     → All functionality (stars, petals, login, gallery, letters)
- images/gallery/ → put her photos here

HOW TO VIEW IT
Double-click index.html to open it in your browser. No install, no
server needed — it's fully static. To share it with her, zip the
folder and send it, or upload it to something like Netlify Drop or
GitHub Pages for a real link.

HOW TO ADD PHOTOS
The gallery is split into 4 sections so you can add a lot of photos
without it feeling like one long messy grid:
  1. "Us"                         → us-1.jpg, us-2.jpg, us-3.jpg, us-4.jpg
  2. "Her main character moments" → her-1.jpg ... her-4.jpg
  3. "Random chaos"                → chaos-1.jpg ... chaos-4.jpg
  4. "Throwbacks"                  → throwback-1.jpg ... throwback-4.jpg

Drop matching images into images/gallery/. Want more photos per
section, more sections, or different names? Open script.js, find
"gallerySections" near the top of section 5, and add/edit/remove
entries — each section is just a title, a short note, and a list of
{ src, caption } photos. Until real photos are added, a cute
placeholder shows instead so nothing looks broken.

HOW TO EDIT THE LETTERS
Open script.js and find "section 6. Letters page logic" — there's a
list called "letters" with the 3 you asked for already written in:
  - How We Met
  - You Suddenly Became My HG
  - Who You Are To Me
Each has a seal (emoji), title, peek (small preview text), body (the
actual letter — use \n\n for a new paragraph), and a signoff. Edit the
text in place, or copy a whole { ... } block to add a 4th letter.

THE PASSWORD (her birthdate)
Set to 24/10/2009 — she can type 24102009, 24/10/2009, 24-10-2009, or
24.10.2009 and it'll work (only the digits are checked). To change it,
edit this line in script.js:
   const BIRTH_DIGITS = '24102009';

THE LOOK
A dark "moonflower night" theme — moonflowers are flowers that bloom
after dark, which felt right alongside the moon motif from her name.
Floating flower/sparkle petals drift down on every page, plus little
corner flower doodles, a flower divider, and letters styled like
actual folded paper with a wax-seal circle and handwriting-style font.

A NOTE ON THE "LOCK"
This is a fun front-end lock, not real security — anyone who opens
script.js could technically see the digits. It's meant to feel like a
cute secret door, not to protect sensitive information.

Happy birthday to her 🌕🌸
