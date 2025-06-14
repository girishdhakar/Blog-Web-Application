import express from "express";
import bodyParser from "body-parser";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
// Data Center
let posts = [];

app.use(bodyParser.urlencoded({extended : false})); 
app.use(express.static("public"));

// Post Constructor
function Post(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

// Add Post
function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}

// Delete Post
function deletePost(index) {
    posts.splice(index, 1);
}
// Edit Post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

// Todo All paths

// Home
app.get("/", (req, res) => {
    res.render("home.ejs", {posts: posts});
});

// View Post
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

// Delete Post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

// Update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

// Create Post Page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Save Post
app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});


// Todo Listen thing
app.listen(port, () => {
    addPost("I went to Sikkim seeking peace, but I ended up in a yak chase.", "Hey peace-seekers! I booked a solo trip to Sikkim for some mountain calm, meditation, and great sunrise photos. But Mother Nature had different plans. On Day 1, I tried to pet a friendly yak near Tsomgo Lake, which was a big mistake. It turns out yaks don't like selfies. I ended up sprinting through rhododendron forests while locals cheered as if it were a sport. I lost a shoe, gained a viral video (#YakChaseChallenge), and somehow made friends with the yak's owner over butter tea. Sikkim gets a 10/10 for excitement and a -5 for my dignity.")
    addPost("Manali Trip Gone Wrong: How I Became the Local Snowman", "Greetings, adventurers I traveled to Manali in order to become an expert snowboarder. Spoiler alert: I was defeated by the snow. I made a snowman (which looked more like a melting potato) and gave up after face-planting on my first slope. A group of children began decorating me with sticks and a carrot after thinking I was a piece of art. Up until my nose froze, I played along. The high point? I was tipped by tourists for pictures. I had saved up enough money by sunset to buy extra momos and learn that humility goes better with chili sauce.")
    addPost("Goa Beach Detox Turned Into a Coconut Heist Adventure", "Listen up, sun lovers. In Goa, I organized a digital detox that included journaling, smoothies, and yoga. However, I later learned that if you return the shell, beachside shacks give away free coconuts. Brilliant, huh? False. I might have borrowed a few extra (to stay hydrated) and was caught by a fiercely protective coconut vendor. A kayak, a bewildered German tourist, and me hiding in a drum circle were all part of the chase. In addition to a lifetime ban from one coconut stand, I also have a trending hashtag (#CoconutOutlaw).");
    console.log(`Listening on port ${port}`);
  })
