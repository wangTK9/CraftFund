<template>
  <section class="hero">
    <div class="hero-text">
      <h1>Buy, sell and collect NFTs.</h1>
      <p>
        The world's largest digital marketplace for crypto collectibles and
        non-fungible tokens
      </p>
      <div class="buttons">
        <a class="upload" href="#">Upload</a>
        <a class="explore" href="#">Explore</a>
      </div>
    </div>
    <div class="hero-image">
      <img
        alt="3D illustration of a cute character with purple hair and a red shirt"
        height="500"
        src="https://storage.googleapis.com/a1aa/image/vAEZetgT7l5nV7fGAwyg2kWUkuqvOSpfmETrpeW3DTg.jpg"
        width="500"
      />
      <div class="emoji emoji-1">
        <img
          alt="Thumbs up emoji"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/Zixm4pxx0LYFYNtjJO6P49jc44sLb4KnULwhHCIwByw.jpg"
          width="40"
        />
      </div>
      <div class="emoji emoji-2">
        <img
          alt="Surprised emoji"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/XpladCcxVKhaJ4qaf3619iR08SBTvZo_9JG3FfiXvIA.jpg"
          width="40"
        />
      </div>
      <div class="emoji emoji-3">
        <img
          alt="Chat bubble emoji"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/_S_3DDof8Qy-TBKB1PjNP93Mqhi1b388BN4JWE8Qioc.jpg"
          width="40"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 50px 0;
  padding-top: 100px;
}
.hero .hero-text {
  max-width: 600px;
}
.hero .hero-text h1 {
  font-size: 48px;
  color: #1a1a1a;
  margin-bottom: 20px;
}
.hero .hero-text p {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
}
.hero .hero-text .buttons {
  display: flex;
}
.hero .hero-text .buttons a {
  padding: 10px 20px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  margin-right: 10px;
}
.hero .hero-text .buttons a.upload {
  background-color: #7b3fe4;
  color: #fff;
}
.hero .hero-text .buttons a.explore {
  background-color: #fff;
  color: #7b3fe4;
  border: 1px solid #7b3fe4;
}
.hero .hero-image {
  position: relative;
}
.hero .hero-image img {
  max-width: 100%;
  border-radius: 20px;
}
.hero .hero-image .emoji {
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.hero .hero-image .emoji.emoji-1 {
  top: -20px;
  left: -20px;
}
.hero .hero-image .emoji.emoji-2 {
  bottom: -20px;
  right: -20px;
}
.hero .hero-image .emoji.emoji-3 {
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
}
</style>
