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
      { communityId: 1, userId: 2, votes: 3, description: "Late-night cravings satisfied with a juicy burger and crispy fries. Good food, good vibes." },
      { communityId: 1, userId: 1, votes: 2, description: "Found my urban oasis at a corner café. Sipped a latte, people-watched, and let the city's rhythm fade away." },
      { communityId: 1, userId: 3, votes: 1, description: "Tacos on a Tuesday because why not? The perfect blend of flavors in every bite." },
      { communityId: 1, userId: 2, votes: 3, description: "Pizza night under the stars. Shared laughter, cheesy slices, and a side of good company." },
      { communityId: 1, userId: 1, votes: 2, description: "Dessert time at the neighborhood bakery. Savoring the sweetness of life, one bite at a time." },
      { communityId: 1, userId: 3, votes: 1, description: "Sushi date with friends. Rolled laughter, dipped in soy sauce, and wrapped in shared stories." },
      { communityId: 1, userId: 2, votes: 3, description: "Simple pleasures: a fresh salad enjoyed on a park bench. Nature's backdrop, urban serenity." },
      { communityId: 1, userId: 1, votes: 2, description: "Ice cream truck magic on a hot day. Childhood memories in a single scoop." },
      { communityId: 1, userId: 3, votes: 1, description: "Pasta night at home. A cozy meal cooked with love, filling the air with comfort and contentment." },
      { communityId: 1, userId: 2, votes: 3, description: "Rooftop cocktails, city lights, and good friends. Sipping happiness one glass at a time." },
      { communityId: 2, userId: 2, votes: 3, description: "Rocked a vintage leather jacket today feeling like a stylish time traveler. #FashionFinds #VintageVibes" },
      { communityId: 2, userId: 1, votes: 2, description: "Stepped out in a tailored suit, embracing the power of a well-fitted ensemble. #SuitUp #ConfidenceBoost" },
      { communityId: 2, userId: 3, votes: 1, description: "Casual chic with denim and a graphic tee. Comfort meets style in the heart of the city. #UrbanFashion #StreetStyle" },
      { communityId: 2, userId: 2, votes: 3, description: "Channeling boho vibes with flowy skirts and fringe accessories. Embracing the freedom of self-expression. #BohemianSpirit #FashionFreedom" },
      { communityId: 2, userId: 1, votes: 2, description: "Embracing minimalism with monochrome layers and clean lines. Less is more, and simplicity is the ultimate sophistication. #MinimalistFashion #EffortlessStyle" },
      { communityId: 2, userId: 3, votes: 1, description: "Streetwear game strong with sneakers, joggers, and a splash of bold color. Urban exploration in style. #StreetwearCulture #CityAdventures" },
      { communityId: 2, userId: 2, votes: 3, description: "Elevating everyday elegance with statement accessories and a touch of glamour. Confidence is the best accessory. #FashionStatement #ConfidentStyle" },
      { communityId: 2, userId: 1, votes: 2, description: "Effortless weekend vibes in a cozy oversized sweater and ripped jeans. Casual comfort, city charm. #WeekendWardrobe #RelaxedStyle" },
      { communityId: 2, userId: 3, votes: 1, description: "Time to shine with metallic accents and shimmering fabrics. Reflecting the urban lights, one sequin at a time. #ShineBright #UrbanGlam" },
      { communityId: 2, userId: 2, votes: 3, description: "Exploring high-fashion territory with avant-garde silhouettes and daring design elements. Pushing the boundaries of urban couture. #HighFashion #UrbanEdge" },
      { communityId: 3, userId: 2, votes: 3, description: "Lost in the charm of cobblestone streets and historic architecture. Exploring hidden gems in the heart of the old town. #Wanderlust #TravelDiaries" },
      { communityId: 3, userId: 1, votes: 2, description: "Sunset over the mountains, a breathtaking reward after a challenging hike. Nature's beauty knows no bounds. #MountainMagic #AdventureAwaits" },
      { communityId: 3, userId: 3, votes: 1, description: "Cruising through coastal roads with the wind in my hair. Embracing the freedom of the open road and the endless horizon. #RoadTrip #CoastalBeauty" },
      { communityId: 3, userId: 2, votes: 3, description: "In awe of ancient ruins, a testament to civilizations that once thrived. History whispers through every stone. #CulturalExploration #TimeTravel" },
      { communityId: 3, userId: 1, votes: 2, description: "Beachside relaxation, toes in the sand, and the rhythm of the waves. Finding serenity in the embrace of the ocean. #BeachVibes #ParadiseFound" },
      { communityId: 3, userId: 3, votes: 1, description: "Navigating bustling markets, a kaleidoscope of colors and scents. Immersed in the vibrant tapestry of local culture. #MarketAdventures #LocalFlavors" },
      { communityId: 3, userId: 2, votes: 3, description: "Unwinding in a cozy cabin, surrounded by towering pines. Nature's symphony and starry nights are the ultimate escape. #CabinRetreat #NatureTherapy" },
      { communityId: 3, userId: 1, votes: 2, description: "Exploring urban jungles, skyscrapers reaching for the clouds. Every corner holds a new story waiting to be discovered. #CityExplorer #UrbanAdventures" },
      { communityId: 3, userId: 3, votes: 1, description: "Gazing at the Northern Lights dancing across the sky, a celestial spectacle that leaves the soul in awe. #AuroraBorealis #Nature'sWonder" },
      { communityId: 3, userId: 2, votes: 3, description: "Embarking on a train journey through breathtaking landscapes. Each window reveals a new chapter of the world's beauty. #TrainTravel #ScenicRoutes" },
      { communityId: 4, userId: 2, votes: 3, description: "Movie night at home with 'The Shawshank Redemption.' A timeless tale of hope and friendship that never fails to inspire. #MovieMarathon #ClassicCinema" },
      { communityId: 4, userId: 1, votes: 2, description: "Lost in the world of 'Inception' again. Mind-bending visuals and a labyrinth of dreams, a masterpiece that keeps me questioning reality. #MindBlown #MovieMagic" },
      { communityId: 4, userId: 3, votes: 1, description: "A journey through Middle-earth with 'The Lord of the Rings' trilogy. Epic battles, rich storytelling, and a world that feels like home. #FantasyAdventure #EpicQuest" },
      { communityId: 4, userId: 2, votes: 3, description: "Laughing out loud with 'Anchorman: The Legend of Ron Burgundy.' A hilarious escape from reality that never gets old. #ComedyNight #WillFerrell" },
      { communityId: 4, userId: 1, votes: 2, description: "Chasing ghosts and adventure with 'Indiana Jones and the Last Crusade.' Harrison Ford's charisma and iconic moments never cease to amaze."},
      { communityId: 4, userId: 3, votes: 1, description: "Diving into the unknown with 'Interstellar.' A thought-provoking journey through space and time that leaves me pondering our place in the universe. #SpaceOdyssey #Philosophy" },
      { communityId: 4, userId: 2, votes: 3, description: "Losing myself in the enchanting world of 'Spirited Away.' Studio Ghibli's magic touches the heart and ignites the imagination. #AnimeMagic #GhibliGems" },
      { communityId: 4, userId: 1, votes: 2, description: "Embracing nostalgia with 'The Lion King.' An animated masterpiece that continues to teach us about family, courage, and the circle of life."},
      { communityId: 4, userId: 3, votes: 1, description: "Unleashing my inner superhero with 'The Dark Knight.' Heath Ledger's iconic Joker and Christopher Nolan's vision redefine the superhero genre. #SuperheroDrama #CapedCrusader" },
      { communityId: 4, userId: 2, votes: 3, description: "Embarking on a cinematic journey with 'Forrest Gump.' Life's unpredictability and Tom Hanks' unforgettable performance leave a lasting impact. #LifeLessons #Heartwarming" },
      { communityId: 5, userId: 2, votes: 3, description: "Meet my furry friend, Luna!" },
      { communityId: 5, userId: 1, votes: 2, description: "Introducing Max, the world's most photogenic dog. His wagging tail and puppy eyes are the ultimate mood lifters. #DoggoLove #PawsomePal" },
      { communityId: 5, userId: 3, votes: 1, description: "Cuteness overload: my bunny, Snowball, hopping around like a fluffy little cloud. #BunnyLife #FluffyFriend" },
      { communityId: 5, userId: 2, votes: 3, description: "In the presence of greatness: my majestic parrot, Rio. His vibrant feathers and cheerful squawks brighten up even the gloomiest days. #ColorfulCompanion #FeatheredFriend" },
      { communityId: 5, userId: 1, votes: 2, description: "Say hello to Oliver, my mischievous ferret. His boundless energy and curious nature remind me to always explore and play. #FerretFun #CuriousCritter" },
      { communityId: 5, userId: 3, votes: 1, description: "Meet Peanut, my cuddly guinea pig. His gentle squeaks and popcorn-like leaps fill my heart with warmth and laughter. #GuineaPigLove #PeanutPower" },
      { communityId: 5, userId: 2, votes: 3, description: "Tiny but mighty: my hamster, Nibbles. His miniature adventures and tiny paws remind me to appreciate the little joys in life. #HamsterLife #TinyExplorer" },
      { communityId: 5, userId: 1, votes: 2, description: "Happiness is a wagging tail and a wet nose. Meet Bailey, my loyal and lovable Labrador. Every walk is an adventure and every cuddle a treasure. #LabradorLove #BestFurFriend" },
      { communityId: 5, userId: 3, votes: 1, description: "Sunny days are made for hanging out with Daisy, my charismatic bearded dragon. Her inquisitive eyes and gentle nature make her a fascinating companion. #BeardedDragon #ReptileLove" },
      { communityId: 5, userId: 2, votes: 3, description: "Double trouble: my dynamic duo of kittens, Whiskers and Paws. Their synchronized pouncing and adorable meows are a constant source of entertainment. #KittenCuteness #DynamicDuo" },
      { communityId: 4, userId: 1, votes: 3, description: "Movie night with a classic: 'Casablanca.' A tale of romance and sacrifice that never loses its allure. #ClassicFilm #RomanticDrama" },
      { communityId: 1, userId: 3, votes: 2, description: "Indulging in comfort food with a steaming bowl of mac 'n' cheese. Nostalgia and cheesy goodness in every bite. #ComfortFood #CheesyDelight" },
      { communityId: 2, userId: 2, votes: 1, description: "Stepping out in style with a tailored blazer and sleek black trousers. Commanding attention with every confident stride. #PowerDressing #SharpStyle" },
      { communityId: 3, userId: 1, votes: 3, description: "Embarking on a spontaneous road trip, destination unknown. Embracing the thrill of the open road and the promise of new horizons. #RoadTripper #AdventureAwaits" },
      { communityId: 3, userId: 3, votes: 2, description: "Chasing sunsets on a remote beach, toes sinking into warm sand. Nature's masterpiece painted across the sky. #SunsetMagic #BeachEscapade" },
      { communityId: 5, userId: 1, votes: 1, description: "Cuddles and purrs: my feline friend, Whiskers, keeping me company on lazy afternoons. A bond beyond words. #CatCompanion #PurringPal" },
      { communityId: 4, userId: 2, votes: 3, description: "Revisiting 'The Godfather' trilogy, a cinematic masterpiece of family, power, and intrigue. An offer I can't refuse. #MovieMarathon #EpicSaga" },
      { communityId: 1, userId: 1, votes: 2, description: "Dinner date with a twist: sushi fusion, blending traditional flavors with modern creativity. A culinary adventure on every plate. #FoodExploration #SushiFusion" },
      { communityId: 2, userId: 3, votes: 1, description: "Effortless elegance in a flowy sundress and wide-brimmed hat. Capturing the essence of summer wherever I go. #SummerStyle #SundressChic" },
      { communityId: 3, userId: 2, votes: 3, description: "Wandering through ancient ruins, the stories of civilizations past echoing in the wind. Time travel through the lens of history. #ArchaeologicalWonders #TimelessBeauty" },
      { communityId: 1, userId: 1, votes: 2, description: "Savoring the taste of local street food, a symphony of flavors and textures. Every bite tells a tale of culture and cuisine. #StreetFood #GlobalTasteTour" },
      { communityId: 2, userId: 3, votes: 1, description: "Elevating casual with a leather jacket and statement boots. Rock 'n' roll vibes in the heart of the city streets. #EdgyFashion #CityChic" },
      { communityId: 3, userId: 2, votes: 3, description: "Wandering the cobbled streets of a European village, lost in the charm of old-world architecture and hidden cafes. #EuropeanEscape #VillageWanderer" },
      { communityId: 4, userId: 1, votes: 2, description: "Immersing in the magic of 'Harry Potter' once again. A journey through wizarding wonders and the power of friendship. #WizardingWorld #MagicalEscape" },
      { communityId: 5, userId: 3, votes: 1, description: "Playtime with my energetic pup, Charlie. His boundless enthusiasm and wagging tail are my daily dose of joy. #DoggoPlaytime #HappyPup" },
      { communityId: 4, userId: 2, votes: 3, description: "Cozy movie night with 'Amélie.' A whimsical tale of Parisian charm and the magic of small gestures. #FrenchCinema #WhimsicalJourney" },
      { communityId: 1, userId: 1, votes: 2, description: "Exploring culinary fusion with a spicy ramen burger. A flavor explosion that bridges cultures on a single bun. #FoodFusion #RamenBurger" },
      { communityId: 2, userId: 3, votes: 1, description: "Sunny days call for flowing maxi dresses and wide-brimmed hats. Embracing the breeze and sunshine with effortless grace. #MaxiDress #SunnyStyle" }

    ]);
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Posts', null, {});

  }
};
