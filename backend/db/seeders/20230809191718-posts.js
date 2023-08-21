'use strict';

const { Posts } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Posts.bulkCreate([
      { communityId: 4, userId: 2, votes: 0, downVotes: 0, title: "Late-night cravings satisfied with a juicy burger and crispy fries. Good food, good vibes." },
      { communityId: 4, userId: 1, votes: 0, downVotes: 0, title: "Found my urban oasis at a corner café. Sipped a latte, people-watched, and let the city's rhythm fade away." },
      { communityId: 4, userId: 3, votes: 0, downVotes: 0, title: "Tacos on a Tuesday because why not? The perfect blend of flavors in every bite." },
      { communityId: 4, userId: 2, votes: 0, downVotes: 0, title: "Pizza night under the stars. Shared laughter, cheesy slices, and a side of good company." },
      { communityId: 4, userId: 1, votes: 0, downVotes: 0, title: "Dessert time at the neighborhood bakery. Savoring the sweetness of life, one bite at a time." },
      { communityId: 4, userId: 3, votes: 0, downVotes: 0, title: "Sushi date with friends. Rolled laughter, dipped in soy sauce, and wrapped in shared stories." },
      { communityId: 4, userId: 2, votes: 0, downVotes: 0, title: "Simple pleasures: a fresh salad enjoyed on a park bench. Nature's backdrop, urban serenity." },
      { communityId: 4, userId: 1, votes: 0, downVotes: 0, title: "Ice cream truck magic on a hot day. Childhood memories in a single scoop." },
      { communityId: 4, userId: 3, votes: 0, downVotes: 0, title: "Pasta night at home. A cozy meal cooked with love, filling the air with comfort and contentment." },
      { communityId: 4, userId: 2, votes: 0, downVotes: 0, title: "Rooftop cocktails, city lights, and good friends. Sipping happiness one glass at a time." },
      { communityId: 5, userId: 2, votes: 0, downVotes: 0, title: "Rocked a vintage leather jacket today feeling like a stylish time traveler. #FashionFinds #VintageVibes", tags: "oc"},
      { communityId: 5, userId: 1, votes: 0, downVotes: 0, title: "Stepped out in a tailored suit, embracing the power of a well-fitted ensemble. #SuitUp #ConfidenceBoost" },
      { communityId: 5, userId: 3, votes: 0, downVotes: 0, title: "Casual chic with denim and a graphic tee. Comfort meets style in the heart of the city. #UrbanFashion #StreetStyle", tags: "oc"},
      { communityId: 5, userId: 2, votes: 0, downVotes: 0, title: "Channeling boho vibes with flowy skirts and fringe accessories. Embracing the freedom of self-expression. #BohemianSpirit #FashionFreedom" },
      { communityId: 5, userId: 1, votes: 0, downVotes: 0, title: "Embracing minimalism with monochrome layers and clean lines. Less is more, and simplicity is the ultimate sophistication. #MinimalistFashion #EffortlessStyle" },
      { communityId: 5, userId: 3, votes: 0, downVotes: 0, title: "Streetwear game strong with sneakers, joggers, and a splash of bold color. Urban exploration in style. #StreetwearCulture #CityAdventures" },
      { communityId: 5, userId: 2, votes: 0, downVotes: 0, title: "Elevating everyday elegance with statement accessories and a touch of glamour. Confidence is the best accessory. #FashionStatement #ConfidentStyle", tags: "oc" },
      { communityId: 5, userId: 1, votes: 0, downVotes: 0, title: "Effortless weekend vibes in a cozy oversized sweater and ripped jeans. Casual comfort, city charm. #WeekendWardrobe #RelaxedStyle" },
      { communityId: 5, userId: 3, votes: 0, downVotes: 0, title: "Time to shine with metallic accents and shimmering fabrics. Reflecting the urban lights, one sequin at a time. #ShineBright #UrbanGlam" },
      { communityId: 5, userId: 2, votes: 0, downVotes: 0, title: "Exploring high-fashion territory with avant-garde silhouettes and daring design elements. Pushing the boundaries of urban couture. #HighFashion #UrbanEdge" },
      { communityId: 6, userId: 2, votes: 0, downVotes: 0, title: "Lost in the charm of cobblestone streets and historic architecture. Exploring hidden gems in the heart of the old town. #Wanderlust #TravelDiaries", tags: "oc" },
      { communityId: 6, userId: 1, votes: 0, downVotes: 0, title: "Sunset over the mountains, a breathtaking reward after a challenging hike. Nature's beauty knows no bounds. #MountainMagic #AdventureAwaits" },
      { communityId: 6, userId: 3, votes: 0, downVotes: 0, title: "Cruising through coastal roads with the wind in my hair. Embracing the freedom of the open road and the endless horizon. #RoadTrip #CoastalBeauty" },
      { communityId: 6, userId: 2, votes: 0, downVotes: 0, title: "In awe of ancient ruins, a testament to civilizations that once thrived. History whispers through every stone. #CulturalExploration #TimeTravel" },
      { communityId: 6, userId: 1, votes: 0, downVotes: 0, title: "Beachside relaxation, toes in the sand, and the rhythm of the waves. Finding serenity in the embrace of the ocean. #BeachVibes #ParadiseFound" },
      { communityId: 6, userId: 3, votes: 0, downVotes: 0, title: "Navigating bustling markets, a kaleidoscope of colors and scents. Immersed in the vibrant tapestry of local culture. #MarketAdventures #LocalFlavors" },
      { communityId: 6, userId: 2, votes: 0, downVotes: 0, title: "Unwinding in a cozy cabin, surrounded by towering pines. Nature's symphony and starry nights are the ultimate escape. #CabinRetreat #NatureTherapy" },
      { communityId: 6, userId: 1, votes: 0, downVotes: 0, title: "Exploring urban jungles, skyscrapers reaching for the clouds. Every corner holds a new story waiting to be discovered. #CityExplorer #UrbanAdventures" },
      { communityId: 6, userId: 3, votes: 0, downVotes: 0, title: "Gazing at the Northern Lights dancing across the sky, a celestial spectacle that leaves the soul in awe. #AuroraBorealis #Nature'sWonder" },
      { communityId: 6, userId: 2, votes: 0, downVotes: 0, title: "Embarking on a train journey through breathtaking landscapes. Each window reveals a new chapter of the world's beauty. #TrainTravel #ScenicRoutes" },
      { communityId: 7, userId: 2, votes: 0, downVotes: 0, title: "Movie night at home with 'The Shawshank Redemption.' A timeless tale of hope and friendship that never fails to inspire. #MovieMarathon #ClassicCinema", tags: "spoiler" },
      { communityId: 7, userId: 1, votes: 0, downVotes: 0, title: "Lost in the world of 'Inception' again. Mind-bending visuals and a labyrinth of dreams, a masterpiece that keeps me questioning reality. #MindBlown #MovieMagic" },
      { communityId: 7, userId: 3, votes: 0, downVotes: 0, title: "A journey through Middle-earth with 'The Lord of the Rings' trilogy. Epic battles, rich storytelling, and a world that feels like home. #FantasyAdventure #EpicQuest" },
      { communityId: 7, userId: 2, votes: 0, downVotes: 0, title: "Laughing out loud with 'Anchorman: The Legend of Ron Burgundy.' A hilarious escape from reality that never gets old. #ComedyNight #WillFerrell",  tags: "spoiler"},
      { communityId: 7, userId: 1, votes: 0, downVotes: 0, title: "Chasing ghosts and adventure with 'Indiana Jones and the Last Crusade.' Harrison Ford's charisma and iconic moments never cease to amaze."},
      { communityId: 7, userId: 3, votes: 0, downVotes: 0, title: "Diving into the unknown with 'Interstellar.' A thought-provoking journey through space and time that leaves me pondering our place in the universe. #SpaceOdyssey #Philosophy" },
      { communityId: 7, userId: 2, votes: 0, downVotes: 0, title: "Losing myself in the enchanting world of 'Spirited Away.' Studio Ghibli's magic touches the heart and ignites the imagination. #AnimeMagic #GhibliGems" },
      { communityId: 7, userId: 1, votes: 0, downVotes: 0, title: "Embracing nostalgia with 'The Lion King.' An animated masterpiece that continues to teach us about family, courage, and the circle of life."},
      {
        communityId: 7,
        userId: 3,
        votes: 0,
        downVotes: 0,
        title: "Unleashing my inner superhero with 'The Dark Knight.' Heath Ledger's iconic Joker and Christopher Nolan's vision redefine the superhero genre. #SuperheroDrama #CapedCrusader",
        description: "Exploring the depths of heroism and villainy, 'The Dark Knight' reimagines superheroes through Heath Ledger's unforgettable Joker and Christopher Nolan's visionary direction."
      },
      {
        communityId: 7,
        userId: 2,
        votes: 0,
        downVotes: 0,
        title: "Embarking on a cinematic journey with 'Forrest Gump.' Life's unpredictability and Tom Hanks' unforgettable performance leave a lasting impact. #LifeLessons #Heartwarming",
        description: "Joining Forrest Gump's remarkable journey, I'm reminded of life's twists, turns, and Tom Hanks' timeless portrayal, delivering heartwarming life lessons."
      },
      {
        communityId: 8,
        userId: 2,
        votes: 0,
        downVotes: 0,
        title: "Meet my furry friend, Luna!",
        description: "Introducing Luna, my beloved furry companion, whose presence fills my days with joy, comfort, and endless moments of companionship."
      },
      {
        communityId: 8,
        userId: 1,
        votes: 0,
        downVotes: 0,
        title: "Introducing Max, the world's most photogenic dog. His wagging tail and puppy eyes are the ultimate mood lifters. #DoggoLove #PawsomePal",
        description: "Meet Max, a photogenic dog whose wagging tail and puppy eyes have the power to lift any mood and spread joy."
      },
      {
        communityId: 8,
        userId: 3,
        votes: 0,
        downVotes: 0,
        title: "Cuteness overload: my bunny, Snowball, hopping around like a fluffy little cloud. #BunnyLife #FluffyFriend",
        description: "Experience cuteness overload with Snowball, my bunny, as it hops around like a fluffy cloud, bringing warmth and joy."
      },
      {
        communityId: 8,
        userId: 2,
        votes: 0,
        downVotes: 0,
        title: "In the presence of greatness: my majestic parrot, Rio. His vibrant feathers and cheerful squawks brighten up even the gloomiest days. #ColorfulCompanion #FeatheredFriend",
        description: "Meet Rio, my majestic parrot, whose vibrant feathers and cheerful squawks have the magical ability to brighten up even the gloomiest of days."
      },
      {
        communityId: 8,
        userId: 1,
        votes: 0,
        downVotes: 0,
        title: "Say hello to Oliver, my mischievous ferret. His boundless energy and curious nature remind me to always explore and play. #FerretFun #CuriousCritter",
        description: "Say hello to Oliver, the mischievous ferret who never lets his boundless energy and curiosity wane, reminding me to embrace exploration and playfulness."
      },
      {
        communityId: 8,
        userId: 3,
        votes: 0,
        downVotes: 0,
        title: "Meet Peanut, my cuddly guinea pig. His gentle squeaks and popcorn-like leaps fill my heart with warmth and laughter. #GuineaPigLove #PeanutPower",
        description: "Meet Peanut, my cuddly guinea pig, whose gentle squeaks and popcorn-like leaps have the extraordinary power to fill my heart with warmth and infectious laughter."
      },
      {
        communityId: 8,
        userId: 2,
        votes: 0,
        downVotes: 0,
        title: "Tiny but mighty: my hamster, Nibbles. His miniature adventures and tiny paws remind me to appreciate the little joys in life. #HamsterLife #TinyExplorer",
        description: "Meet Nibbles, the hamster whose tiny paws and miniature adventures serve as a delightful reminder to cherish and celebrate the little joys in life."
      },
      {
        communityId: 8,
        userId: 1,
        votes: 0,
        downVotes: 0,
        title: "Happiness is a wagging tail and a wet nose. Meet Bailey, my loyal and lovable Labrador. Every walk is an adventure and every cuddle a treasure. #LabradorLove #BestFurFriend",
        description: "Meet Bailey, my loyal Labrador whose wagging tail and wet nose turn every walk into an adventure and every cuddle into a cherished treasure."
      },
      {
        communityId: 8,
        userId: 3,
        votes: 0,
        downVotes: 0,
        title: "Sunny days are made for hanging out with Daisy, my charismatic bearded dragon. Her inquisitive eyes and gentle nature make her a fascinating companion. #BeardedDragon #ReptileLove",
        description: "Embrace sunny days with Daisy, my bearded dragon, whose inquisitive eyes and gentle nature make her a captivating and wonderful companion."
      },
      {
        communityId: 8,
        userId: 2,
        votes: 0,
        downVotes: 0,
        title: "Double trouble: my dynamic duo of kittens, Whiskers and Paws. Their synchronized pouncing and adorable meows are a constant source of entertainment. #KittenCuteness #DynamicDuo",
        description: "Experience double trouble with Whiskers and Paws, my dynamic kitten duo whose synchronized pouncing and adorable meows provide endless entertainment."
      },
      { communityId: 7, userId: 1, votes: 0, downVotes: 0, title: "Movie night with a classic: 'Casablanca.' A tale of romance and sacrifice that never loses its allure. #ClassicFilm #RomanticDrama" },
      { communityId: 4, userId: 3, votes: 0, downVotes: 0, title: "Indulging in comfort food with a steaming bowl of mac 'n' cheese. Nostalgia and cheesy goodness in every bite. #ComfortFood #CheesyDelight" },
      { communityId: 5, userId: 2, votes: 0, downVotes: 0, title: "Stepping out in style with a tailored blazer and sleek black trousers. Commanding attention with every confident stride. #PowerDressing #SharpStyle" },
      { communityId: 6, userId: 1, votes: 0, downVotes: 0, title: "Embarking on a spontaneous road trip, destination unknown. Embracing the thrill of the open road and the promise of new horizons. #RoadTripper #AdventureAwaits" },
      { communityId: 6, userId: 3, votes: 0, downVotes: 0, title: "Chasing sunsets on a remote beach, toes sinking into warm sand. Nature's masterpiece painted across the sky. #SunsetMagic #BeachEscapade" },
      { communityId: 8, userId: 1, votes: 0, downVotes: 0, title: "Cuddles and purrs: my feline friend, Whiskers, keeping me company on lazy afternoons. A bond beyond words. #CatCompanion #PurringPal" },
      { communityId: 7, userId: 2, votes: 0, downVotes: 0, title: "Revisiting 'The Godfather' trilogy, a cinematic masterpiece of family, power, and intrigue. An offer I can't refuse. #MovieMarathon #EpicSaga" },
      { communityId: 4, userId: 1, votes: 0, downVotes: 0, title: "Dinner date with a twist: sushi fusion, blending traditional flavors with modern creativity. A culinary adventure on every plate. #FoodExploration #SushiFusion" },
      { communityId: 5, userId: 3, votes: 0, downVotes: 0, title: "Effortless elegance in a flowy sundress and wide-brimmed hat. Capturing the essence of summer wherever I go. #SummerStyle #SundressChic" },
      { communityId: 6, userId: 2, votes: 0, downVotes: 0, title: "Wandering through ancient ruins, the stories of civilizations past echoing in the wind. Time travel through the lens of history. #ArchaeologicalWonders #TimelessBeauty" },
      { communityId: 4, userId: 1, votes: 0, downVotes: 0, title: "Savoring the taste of local street food, a symphony of flavors and textures. Every bite tells a tale of culture and cuisine. #StreetFood #GlobalTasteTour" },
      { communityId: 5, userId: 3, votes: 0, downVotes: 0, title: "Elevating casual with a leather jacket and statement boots. Rock 'n' roll vibes in the heart of the city streets. #EdgyFashion #CityChic" },
      {
        communityId: 6,
        userId: 2,
        votes: 0,
        downVotes: 0,
        title: "Wandering the cobbled streets of a European village, lost in the charm of old-world architecture and hidden cafes. #EuropeanEscape #VillageWanderer",
        description: "Strolling through cobbled streets of a quaint European village, I'm captivated by its old-world architecture and charming hidden cafes, experiencing a true #EuropeanEscape."
      },
      {
        communityId: 7,
        userId: 1,
        votes: 0,
        downVotes: 0,
        title: "Immersing in the magic of 'Harry Potter' once again. A journey through wizarding wonders and the power of friendship. #WizardingWorld #MagicalEscape",
        description: "Diving into the enchantment of 'Harry Potter' anew, I embark on a wondrous journey through the wizarding world, where friendship and magic intertwine in a #MagicalEscape."
      },
      {
        communityId: 8,
        userId: 3,
        votes: 0,
        downVotes: 0,
        title: "Playtime with my energetic pup, Charlie. His boundless enthusiasm and wagging tail are my daily dose of joy. #DoggoPlaytime #HappyPup",
        description: "Engaging in playtime with my exuberant pup, Charlie, brings forth boundless enthusiasm and wagging tails that serve as my delightful daily dose of joy. #HappyPup"
      },
      { communityId: 7, userId: 2, votes: 0, downVotes: 0, title: "Cozy movie night with 'Amélie.' A whimsical tale of Parisian charm and the magic of small gestures. #FrenchCinema #WhimsicalJourney", tags: "oc" },
      { communityId: 4, userId: 1, votes: 0, downVotes: 0, title: "Exploring culinary fusion with a spicy ramen burger. A flavor explosion that bridges cultures on a single bun. #FoodFusion #RamenBurger" },
      { communityId: 5, userId: 3, votes: 0, downVotes: 0, title: "Sunny days call for flowing maxi dresses and wide-brimmed hats. Embracing the breeze and sunshine with effortless grace. #MaxiDress #SunnyStyle" }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Posts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})

  }
};
