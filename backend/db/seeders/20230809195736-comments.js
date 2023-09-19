'use strict';

const { Comments } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await await Comments.bulkCreate([
      {userId: 1, comment: "Wow, this is incredibly insightful!", postId: 1},
      {userId: 2, comment: "I couldn't agree more with your perspective.", postId: 2},
      {userId: 13, comment: "This is a unique take on the subject, nicely done!", postId: 3},
      {userId: 1, comment: "I'm really impressed by your analysis here.", postId: 4},
      {userId: 2, comment: "You've provided a comprehensive overview of the topic.", postId: 5},
      {userId: 3, comment: "I never thought about it this way, thanks for sharing!", postId: 6},
      {userId: 1, comment: "Your expertise on this matter really shines through.", postId: 7},
      {userId: 2, comment: "I'm learning so much from this discussion, thank you.", postId: 8},
      {userId: 3, comment: "Brilliant insights you've given me a lot to think about.", postId: 9},
      {userId: 1, comment: "Your attention to detail is commendable.", postId: 10},
      {userId: 2, comment: "I appreciate the effort you've put into explaining this.", postId: 11},
      {userId: 3, comment: "Your passion for the subject is evident, and it's contagious!", postId: 12},
      {userId: 14, comment: "I'm inclined to agree with your well-reasoned argument.", postId: 13},
      {userId: 20, comment: "You've eloquently expressed a complex idea. Kudos!", postId: 14},
      {userId: 3, comment: "This has definitely expanded my knowledge on the topic.", postId: 15},
      {userId: 1, comment: "I'm loving the depth of the conversation here.", postId: 16},
      {userId: 2, comment: "You've nailed the essence of the issue with your comment.", postId: 17},
      {userId: 3, comment: "Your comment is a breath of fresh air in this discussion.", postId: 18},
      {userId: 11, comment: "It's refreshing to see such a thoughtful contribution.", postId: 19},
      {userId: 2, comment: "Your unique perspective adds a lot to the conversation.", postId: 20},
      {userId: 3, comment: "I'm bookmarking this comment for future reference.", postId: 21},
      {userId: 12, comment: "I'm thoroughly enjoying the intellectual exchange happening here.", postId: 22},
      {userId: 2, comment: "Your comment is a standout amidst the noise.", postId: 23},
      {userId: 5, comment: "Your words have a certain eloquence that's hard to ignore.", postId: 24},
      {userId: 16, comment: "This is the kind of content that keeps me coming back.", postId: 25},
      {userId: 2, comment: "Your insight cuts through like a laser in the dark.", postId: 26},
      {userId: 3, comment: "You've woven a tapestry of understanding with your words.", postId: 27},
      {userId: 1, comment: "A standing ovation for your well-researched contribution!", postId: 28},
      {userId: 2, comment: "Your words are a symphony of agreement to my thoughts.", postId: 29},
      {userId: 3, comment: "Your clarity is like a mountain spring, refreshing and pure.", postId: 30},
      {userId: 1, comment: "Thank you for illuminating the path with your wisdom.", postId: 31},
      {userId: 12, comment: "Complexity bows down to your knack for simplicity.", postId: 32},
      {userId: 3, comment: "Your comment strikes chords of resonance within me.", postId: 33},
      {userId: 1, comment: "Diverse opinions dance harmoniously in your wake.", postId: 34},
      {userId: 7, comment: "You've painted a new panorama in the realm of ideas.", postId: 35},
      {userId: 3, comment: "You're a treasure chest of wisdom in this discourse.", postId: 36},
      {userId: 1, comment: "Your presence elevates the forum's worth in an instant.", postId: 37},
      {userId: 2, comment: "Your explanation is a gem, polished and brilliantly clear.", postId: 38},
      {userId: 3, comment: "Your insights have injected life into my understanding.", postId: 39},
      {userId: 8, comment: "Your comment ignited a wildfire of introspection within me.", postId: 40},
      {userId: 2, comment: "Your words flow like a river, nurturing thoughtful gardens.", postId: 41},
      {userId: 3, comment: "Every sentence you write is a star in the constellation of ideas.", postId: 42},
      {userId: 10, comment: "You've sculpted a masterpiece of accessibility from a complex topic.", postId: 43},
      {userId: 2, comment: "Your thoughts are cosmic threads weaving the fabric of discussion.", postId: 44},
      {userId: 11, comment: "Your comment waltzes with elegance amidst the chaos of words.", postId: 45},
      {userId: 17, comment: "In a sea of comments, yours is a lighthouse guiding minds.", postId: 46},
      {userId: 2, comment: "Your words are like a deep dive into the ocean of understanding.", postId: 47},
      {userId: 6, comment: "You've given this topic wings to soar to new heights.", postId: 48},
      {userId: 14, comment: "Your words are pillars, upholding the cathedral of diverse perspectives.", postId: 49},
      {userId: 2, comment: "Your insights are like constellations forming a map of insight.", postId: 50},
      {userId: 7, comment: "Your words are a symphony of enlightenment!", postId: 23},
      {userId: 2, comment: "You've ignited a fire of agreement within me.", postId: 5},
      {userId: 3, comment: "Your perspective is a refreshing breeze of creativity.", postId: 32},
      {userId: 8, comment: "Your analysis has left a vivid mark on my mind.", postId: 14},
      {userId: 5, comment: "Your comprehensive overview is like a treasure map to knowledge.", postId: 42},
      {userId: 3, comment: "Your share has transformed my thinking, thank you!", postId: 18},
      {userId: 9, comment: "Your expertise shines like a guiding star in this discussion.", postId: 37},
      {userId: 2, comment: "I'm soaking up wisdom from this discussion, thanks to you.", postId: 8},
      {userId: 3, comment: "Brilliant insights, a symphony of thoughts!", postId: 21},
      {userId: 11, comment: "Your attention to detail is a masterpiece in itself.", postId: 9},
      {userId: 12, comment: "Your explanation is like a compass pointing to clarity.", postId: 49},
      {userId: 3, comment: "Your passion is a spark that ignites the entire conversation.", postId: 46},
      {userId: 17, comment: "Your well-reasoned argument is a beacon of persuasion.", postId: 25},
      {userId: 2, comment: "Eloquence flows through your expression like a river.", postId: 17},
      {userId: 3, comment: "My knowledge has expanded like a universe through your words.", postId: 7},
      {userId: 6, comment: "The depth of this conversation is a treasure to behold, thanks to you.", postId: 31},
      {userId: 2, comment: "You've distilled the essence of the issue into a golden comment.", postId: 1},
      {userId: 3, comment: "Your contribution is a breath of fresh wisdom in this exchange.", postId: 12},
      {userId: 14, comment: "In a sea of thoughts, your contribution stands tall like a lighthouse.", postId: 28},
      {userId: 2, comment: "Your unique perspective is like a splash of color in this dialogue.", postId: 44},
      {userId: 3, comment: "Bookmarking your insights for a future journey of thought.", postId: 16},
      {userId: 5, comment: "Intellectual exchange is at its prime, thanks to your input.", postId: 26},
      {userId: 20, comment: "Your comment resonates like a harmonious chord in the symphony of ideas.", postId: 48},
      {userId: 3, comment: "Your eloquence is like a gentle breeze, impossible to ignore.", postId: 36},
      {userId: 18, comment: "Your content is the North Star that keeps me returning.", postId: 11},
      {userId: 2, comment: "Quality radiates from your comment like a brilliant star.", postId: 3},
      {userId: 5, comment: "Nuances bloom like flowers in your words, a garden of insight.", postId: 33},
      {userId: 17, comment: "Your well-done research has cast a spotlight on the topic.", postId: 19},
      {userId: 2, comment: "Every sentence you've written is a nod of agreement from me.", postId: 41},
      {userId: 3, comment: "Your clarity has polished my understanding like a gem.", postId: 13},
      {userId: 1, comment: "Gratitude for the insights you've planted in this thread.", postId: 45},
      {userId: 2, comment: "Complex ideas bow down to your knack for simplicity.", postId: 38},
      {userId: 9, comment: "Your words resonate in perfect harmony with my thoughts.", postId: 27},
      {userId: 16, comment: "Diverse opinions come together as a symphony, conducted by your input.", postId: 22},
      {userId: 2, comment: "Your comment has given me a new lens to see through.", postId: 39},
      {userId: 5, comment: "You're pouring a fountain of value into this discussion.", postId: 4},
      {userId: 17, comment: "Your contribution is the heartbeat that makes online forums alive.", postId: 15},
      {userId: 2, comment: "Gratitude for crafting a detailed fortress around your perspective.", postId: 47},
      {userId: 3, comment: "Your input is the compass guiding my ship of understanding.", postId: 29},
      {userId: 15, comment: "Your comment is a spark that ignites reflective flames within me.", postId: 35},
      {userId: 6, comment: "Your words illuminate the power of dialogue in its purest form.", postId: 50},
      {userId: 3, comment: "Thoughtfulness is a river that flows through every word you share.", postId: 6},
      {userId: 18, comment: "You've transformed complexity into a welcoming path for all.", postId: 24},
      {userId: 6, comment: "Your words are building blocks in the grand discourse architecture.", postId: 30},
      {userId: 3, comment: "Elegance dances with insight in every corner of your comment.", postId: 20},
      {userId: 14, comment: "Your civil and insightful presence uplifts this online realm.", postId: 43},
      {userId: 2, comment: "Depth blooms like a flower in the garden of this conversation.", postId: 34},
      {userId: 3, comment: "A familiar topic is reborn through your refreshing perspective.", postId: 2},
      {userId: 18, comment: "Your comment is a mosaic of the diverse colors of understanding.", postId: 40},
      {userId: 21, comment: "Your insights are like puzzle pieces elegantly fitting into the discourse.", postId: 10}
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
