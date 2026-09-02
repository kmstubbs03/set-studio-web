const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const oldFeedImages = `const FEED_IMAGES = [
  { id: 'img-1', src: '/feed/web_pic_1.jpeg', actionLabel: 'Subscribe', actionType: 'subscribe' },
  { id: 'img-4', src: '/feed/web_pic_4.jpeg', actionLabel: 'Book Single Appointment', actionType: 'single' },
  { id: 'img-2', src: '/feed/web_pic_2.jpeg' },
  { id: 'img-3', src: '/feed/web_pic_3.jpeg' },
  { id: 'img-5', src: '/feed/web_pic_5.jpeg' },
  { id: 'img-6', src: '/feed/web_pic_6.jpeg' },
];`;

const newFeedImages = `const FEED_IMAGES = [
  { id: 'img-1', src: '/feed/web_pic_1.jpeg', actionLabel: 'Subscribe', actionType: 'subscribe' },
  { id: 'img-4', src: '/feed/web_pic_4.jpeg', actionLabel: 'Book Single Appointment', actionType: 'single' },
  { id: 'img-2', src: '/feed/web_pic_2.jpeg' },
  { id: 'img-3', src: '/feed/web_pic_3.jpeg' },
  { id: 'img-5', src: '/feed/web_pic_5.jpeg' },
  { id: 'img-6', src: '/feed/web_pic_6.jpeg' },
  { id: 'img-7', src: '/feed/web_pic_7.jpeg' },
  { id: 'img-8', src: '/feed/web_pic_8.jpeg' },
  { id: 'img-9', src: '/feed/web_pic_9.jpeg' },
  { id: 'img-10', src: '/feed/web_pic_10.jpeg' },
];`;

home = home.replace(oldFeedImages, newFeedImages);
fs.writeFileSync('src/pages/Home.jsx', home);
