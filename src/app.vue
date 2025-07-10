<script setup>
useHead({
  title: "A Portfolio of Kaden Griffith's Work",
  meta: [
    {
      name: "description",
      content:
        "A portfolio of Kaden Griffith's work. I'm a software engineer and entrepreneur.",
    },
    { charset: "utf-8" },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
    },
  ],
  link: [
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/android-chrome-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
  ],
});
const authorBytewave = {
  name: "Bytewave",
  description: "bytewaveco",
  avatar: {
    src: "https://github.com/bytewaveco.png",
  },
  to: "https://github.com/bytewaveco",
  target: "_blank",
};
const authorKaden = {
  name: "Kaden Griffith",
  description: "kadengriffith",
  avatar: {
    src: "https://github.com/kadengriffith.png",
  },
  to: "https://github.com/kadengriffith",
  target: "_blank",
};
const authorTarc = {
  name: "TARC",
  description: "tarcltd",
  avatar: {
    src: "https://github.com/tarcltd.png",
  },
  to: "https://github.com/tarcltd",
  target: "_blank",
};
const links = [
  {
    variant: "subtle",
    title: "My GitHub Profile",
    description:
      "My GitHub profile which is where I do most the most interesting stuff.",
    image: "https://brand.github.com/_next/static/media/logo-01.95b2b0a0.png",
    to: "https://github.com/kadengriffith",
    target: "_blank",
    authors: [authorKaden],
  },
  {
    variant: "subtle",
    title: "My TRBO Profile",
    description: "My TRBO profile where all my brand deals live.",
    image: "https://trbo.link/social-card.png",
    to: "https://trbo.link/at/kadengriffith",
    target: "_blank",
    authors: [authorKaden],
  },
  {
    variant: "subtle",
    title: "My Bluesky Profile",
    description:
      "The Bluesky profile where I post unaffiliated personal opinions on random things.",
    image:
      "https://cdn.bsky.app/img/banner/plain/did:plc:sjpzevlsuvm6xpadrd26sszh/bafkreigekn4ly5lb3qitq6fjnnbvrtbmwnj3ja7me6m4khls3rtmvstu2m@jpeg",
    to: "https://bsky.app/profile/kadengriffith.bsky.social",
    target: "_blank",
    authors: [authorKaden],
  },
  {
    variant: "subtle",
    title: "My X Profile",
    description: "I have it but don't use it.",
    image:
      "https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png",
    to: "https://x.com/griffith_kaden",
    target: "_blank",
    authors: [authorKaden],
  },
  {
    variant: "subtle",
    title: "My Instagram Profile",
    description: "Another social media platform I don't use.",
    image:
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.8562-6/148701539_3724512380920015_7768163355512350905_n.png?_nc_cat=110&ccb=1-7&_nc_sid=f537c7&_nc_ohc=akEpMIczSPoQ7kNvwFAAJ-4&_nc_oc=AdmBropentXBLvtXTEiUlJl6VAwVEjI8ttBTZkw6MUkODQSP2nQL_OzEL0CDrGuz9z-QbgEmqw8jOHxR-FKfBn5f&_nc_zt=14&_nc_ht=scontent-den2-1.xx&_nc_gid=P6euLqsK9fG2d2yaoDc-sw&oh=00_AfQwosFIpNvTeA4NmCAKNgX1Z7oPy6A8IrlQezb0bsJZJw&oe=6874E28D",
    to: "https://www.instagram.com/kadengriffith/",
    target: "_blank",
    authors: [authorKaden],
  },
  {
    variant: "subtle",
    title: "My Facebook Profile",
    description: "If I post here, it's boomer content (I don't).",
    image:
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.8562-6/419903227_1771882663255491_7530620370863632840_n.png?_nc_cat=101&ccb=1-7&_nc_sid=f537c7&_nc_ohc=P9y8pwdnXBcQ7kNvwEj826u&_nc_oc=Adlp4YR8KzoUGwS8L4GB43oxbYkbkrIBYYvc_2wvN4q_pvW8ano6ASIr5EiGXMf4cLy7OK9Q70UZbdNhtJpSzFx_&_nc_zt=14&_nc_ht=scontent-den2-1.xx&_nc_gid=MTUhusfyTjF7Ln1nbZrvpQ&oh=00_AfSl3e5pvCFlpISZjVRKndRrCgZM7RPB2CIGNVKvRh78gw&oe=6874B361",
    to: "https://www.facebook.com/griffith.kaden",
    target: "_blank",
    authors: [authorKaden],
  },
  {
    variant: "subtle",
    title: "My LinkedIn Profile",
    description: "I don't use it but it's here.",
    image: "https://brand.linkedin.com/linkedin-logo",
    to: "https://www.linkedin.com/in/kadengriffith/",
    target: "_blank",
    authors: [authorKaden],
  },
  {
    variant: "subtle",
    title: "Bytewave's Bluesky Profile",
    description:
      "The Bluesky profile where I post business updates and collabs.",
    image: "https://bytewave.co/logo.png",
    to: "https://bsky.app/profile/bytewave.co",
    target: "_blank",
    authors: [authorBytewave, authorKaden],
  },
  {
    variant: "subtle",
    title: "TRBO",
    description: "A modern link management platform with team and API access.",
    image: "https://trbo.link/social-card.png",
    to: "https://trbo.link",
    target: "_blank",
    authors: [authorBytewave, authorKaden],
  },
  {
    variant: "subtle",
    title: "Bytewave",
    description:
      "My company which I use as a proxy for you to hire me and support local businesses.",
    image: "https://bytewave.co/logo.png",
    to: "https://bytewave.co",
    target: "_blank",
    authors: [authorBytewave, authorKaden],
  },
  {
    variant: "subtle",
    title: "TARC",
    description:
      "A company founded to help push the agriculture industry forward in technology.",
    image: "https://tarc.ltd/social-card.png",
    to: "https://tarc.ltd",
    target: "_blank",
    authors: [authorTarc, authorKaden],
  },
  {
    variant: "subtle",
    title: "The Show Portal",
    description:
      "An all-in-one event management platform for livestock events.",
    image: "https://app.theshowportal.com/logo.png",
    to: "https://app.theshowportal.com",
    target: "_blank",
    authors: [authorTarc, authorKaden],
  },
  {
    variant: "subtle",
    title: "The Sort",
    description: "Helping top ranked students get discovered.",
    image: "https://thesortlsj.com/logo.png",
    to: "https://thesortlsj.com",
    target: "_blank",
    authors: [authorTarc, authorKaden],
  },
  {
    variant: "subtle",
    title: "Video Sale Book",
    description:
      "Experience the first mobile-friendly sale book viewer that integrates videos directly with your book pages.",
    image: "https://tarc.ltd/social-card.png",
    to: "https://videosalebook.com",
    target: "_blank",
    authors: [authorTarc, authorKaden],
  },
  {
    variant: "subtle",
    title: "Horse Hotel",
    description: "Simplifying global horse boarding and arena search.",
    image: "https://tarc.ltd/social-card.png",
    to: "https://horsehotel.net",
    target: "_blank",
    authors: [authorTarc, authorKaden],
  },
  {
    variant: "subtle",
    title: "Just in Time Tile & Design",
    description:
      "Justin Time Tile & Design. Precision Tiling. Just in Time, Every Time. | Justin Time Tile & Design",
    image: "https://justintimetile.com/logo-grey.png",
    to: "https://justintimetile.com",
    target: "_blank",
    authors: [authorBytewave, authorKaden],
  },
  {
    variant: "subtle",
    title: "Broken Heart Stables",
    description:
      "A family-owned and operated space rental service for horse owners.",
    image: "https://brokenheartstables.com/_nuxt/bhs-logo-alt.c37c647b.svg",
    to: "https://brokenheartstables.com",
    target: "_blank",
    authors: [authorBytewave, authorKaden],
  },
  {
    variant: "subtle",
    title: "MWP Automatic Solver",
    description:
      "This is a comprehensive training/testing environment using the Transformer model for solving Math Word Problems. Features easy configuration for novice users.",
    image: "https://brand.github.com/_next/static/media/logo-01.95b2b0a0.png",
    to: "https://github.com/kadengriffith/MWP-Automatic-Solver",
    target: "_blank",
    authors: [authorKaden],
  },
  {
    variant: "subtle",
    title: "Bytewave's Shop",
    description: "If you want to grab merch and support Bytewave.",
    image: "https://bytewave.co/logo.png",
    to: "https://bytewaveco.gumroad.com/",
    target: "_blank",
    authors: [authorBytewave],
  },
];
</script>

<template>
  <UApp>
    <UContainer
      class="flex flex-col gap-10 mt-40 mb-16 max-w-screen-lg mx-auto"
    >
      <PackedCircleNameSvg class="absolute -top-50 -left-1.5" />
      <UBlogPosts class="max-w-screen-lg mx-auto">
        <UBlogPost v-for="link in links" :key="link.title" v-bind="link" />
      </UBlogPosts>
      <USeparator>
        <UColorModeButton />
      </USeparator>
    </UContainer>
  </UApp>
</template>
