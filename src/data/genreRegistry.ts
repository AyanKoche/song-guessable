import type { Category, Era, Difficulty } from '../types/game';

export interface CuratedTrackEntry {
  title: string;
  artist: string;
  category: Category;
  era: Era;
  year: number;
  difficulty: Difficulty;
  popularity: number;
}

/**
 * Curated Registry of 100% Verified Global & Regional Mega-Hits
 * Categorized strictly by Genre, Era, and Popularity.
 */
export const GENRE_REGISTRY: CuratedTrackEntry[] = [
  // ==========================================
  // BOLLYWOOD (2020s, 2010s, 2000s, 90s, 80s)
  // ==========================================
  // 2020s
  { title: 'Kesariya', artist: 'Pritam & Arijit Singh', category: 'bollywood', era: '2020s', year: 2022, difficulty: 'easy', popularity: 100 },
  { title: 'Apna Bana Le', artist: 'Arijit Singh & Sachin-Jigar', category: 'bollywood', era: '2020s', year: 2022, difficulty: 'easy', popularity: 99 },
  { title: 'Jhoome Jo Pathaan', artist: 'Vishal-Shekhar & Arijit Singh', category: 'bollywood', era: '2020s', year: 2022, difficulty: 'easy', popularity: 98 },
  { title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal & Asees Kaur', category: 'bollywood', era: '2020s', year: 2021, difficulty: 'easy', popularity: 98 },
  { title: 'Chaleya', artist: 'Anirudh Ravichander & Arijit Singh', category: 'bollywood', era: '2020s', year: 2023, difficulty: 'easy', popularity: 97 },
  { title: 'Besharam Rang', artist: 'Vishal-Shekhar & Shilpa Rao', category: 'bollywood', era: '2020s', year: 2022, difficulty: 'easy', popularity: 96 },
  { title: 'O Bedardeya', artist: 'Arijit Singh & Pritam', category: 'bollywood', era: '2020s', year: 2023, difficulty: 'easy', popularity: 96 },
  { title: 'Tere Hawaale', artist: 'Arijit Singh & Shilpa Rao', category: 'bollywood', era: '2020s', year: 2022, difficulty: 'easy', popularity: 95 },
  { title: 'Lutt Putt Gaya', artist: 'Arijit Singh & Pritam', category: 'bollywood', era: '2020s', year: 2023, difficulty: 'easy', popularity: 94 },
  { title: 'Soulmate', artist: 'Badshah & Arijit Singh', category: 'bollywood', era: '2020s', year: 2024, difficulty: 'medium', popularity: 92 },

  // 2010s
  { title: 'Tum Hi Ho', artist: 'Arijit Singh', category: 'bollywood', era: '2010s', year: 2013, difficulty: 'easy', popularity: 100 },
  { title: 'Channa Mereya', artist: 'Arijit Singh & Pritam', category: 'bollywood', era: '2010s', year: 2016, difficulty: 'easy', popularity: 99 },
  { title: 'Dil Diyan Gallan', artist: 'Atif Aslam', category: 'bollywood', era: '2010s', year: 2017, difficulty: 'easy', popularity: 98 },
  { title: 'Kabira', artist: 'Tochi Raina & Rekha Bhardwaj', category: 'bollywood', era: '2010s', year: 2013, difficulty: 'easy', popularity: 97 },
  { title: 'Gerua', artist: 'Arijit Singh & Antara Mitra', category: 'bollywood', era: '2010s', year: 2015, difficulty: 'easy', popularity: 97 },
  { title: 'Balam Pichkari', artist: 'Vishal Dadlani & Shalmali Kholgade', category: 'bollywood', era: '2010s', year: 2013, difficulty: 'easy', popularity: 96 },
  { title: 'Galliyan', artist: 'Ankit Tiwari', category: 'bollywood', era: '2010s', year: 2014, difficulty: 'easy', popularity: 95 },
  { title: 'Subhanallah', artist: 'Sreeram & Shilpa Rao', category: 'bollywood', era: '2010s', year: 2013, difficulty: 'medium', popularity: 91 },
  { title: 'Kun Faya Kun', artist: 'A.R. Rahman, Javed Ali & Mohit Chauhan', category: 'bollywood', era: '2010s', year: 2011, difficulty: 'hard', popularity: 88 },

  // 2000s
  { title: 'Kal Ho Naa Ho', artist: 'Sonu Nigam', category: 'bollywood', era: '2000s', year: 2003, difficulty: 'easy', popularity: 99 },
  { title: 'Tere Liye', artist: 'Atif Aslam & Shreya Ghoshal', category: 'bollywood', era: '2000s', year: 2010, difficulty: 'easy', popularity: 98 },
  { title: 'Tu Jaane Na', artist: 'Atif Aslam & Pritam', category: 'bollywood', era: '2000s', year: 2009, difficulty: 'easy', popularity: 98 },
  { title: 'Pee Loon', artist: 'Mohit Chauhan & Pritam', category: 'bollywood', era: '2000s', year: 2010, difficulty: 'easy', popularity: 97 },
  { title: 'Mauja Hi Mauja', artist: 'Mika Singh & Pritam', category: 'bollywood', era: '2000s', year: 2007, difficulty: 'easy', popularity: 96 },
  { title: 'Mitwa', artist: 'Shankar Mahadevan & Shafqat Amanat Ali', category: 'bollywood', era: '2000s', year: 2006, difficulty: 'easy', popularity: 96 },
  { title: 'Main Hoon Na', artist: 'Sonu Nigam & Shreya Ghoshal', category: 'bollywood', era: '2000s', year: 2004, difficulty: 'easy', popularity: 95 },
  { title: 'Tum Se Hi', artist: 'Mohit Chauhan & Pritam', category: 'bollywood', era: '2000s', year: 2007, difficulty: 'medium', popularity: 92 },
  { title: 'Zara Sa', artist: 'KK & Pritam', category: 'bollywood', era: '2000s', year: 2008, difficulty: 'medium', popularity: 91 },

  // 90s
  { title: 'Chaiyya Chaiyya', artist: 'Sukhwinder Singh & A.R. Rahman', category: 'bollywood', era: '90s', year: 1998, difficulty: 'easy', popularity: 99 },
  { title: 'Tujhe Dekha To', artist: 'Kumar Sanu & Lata Mangeshkar', category: 'bollywood', era: '90s', year: 1995, difficulty: 'easy', popularity: 99 },
  { title: 'Mera Dil Bhi Kitna Pagal Hai', artist: 'Kumar Sanu & Alka Yagnik', category: 'bollywood', era: '90s', year: 1991, difficulty: 'easy', popularity: 98 },
  { title: 'Taal Se Taal', artist: 'Alka Yagnik & Udit Narayan', category: 'bollywood', era: '90s', year: 1999, difficulty: 'easy', popularity: 97 },
  { title: 'Tip Tip Barsa Paani', artist: 'Udit Narayan & Alka Yagnik', category: 'bollywood', era: '90s', year: 1994, difficulty: 'easy', popularity: 97 },
  { title: 'Pehla Nasha', artist: 'Udit Narayan & Sadhana Sargam', category: 'bollywood', era: '90s', year: 1992, difficulty: 'easy', popularity: 96 },
  { title: 'Chura Ke Dil Mera', artist: 'Kumar Sanu & Alka Yagnik', category: 'bollywood', era: '90s', year: 1994, difficulty: 'easy', popularity: 95 },
  { title: 'Do Dil Mil Rahe Hain', artist: 'Kumar Sanu', category: 'bollywood', era: '90s', year: 1997, difficulty: 'medium', popularity: 92 },

  // 80s
  { title: 'Om Shanti Om', artist: 'Kishore Kumar', category: 'bollywood', era: '80s', year: 1980, difficulty: 'easy', popularity: 97 },
  { title: 'Aap Jaisa Koi', artist: 'Nazia Hassan & Biddu', category: 'bollywood', era: '80s', year: 1980, difficulty: 'easy', popularity: 96 },
  { title: 'Hawa Hawai', artist: 'Kavita Krishnamurthy', category: 'bollywood', era: '80s', year: 1987, difficulty: 'easy', popularity: 96 },
  { title: 'Disco Deewane', artist: 'Nazia Hassan', category: 'bollywood', era: '80s', year: 1981, difficulty: 'easy', popularity: 95 },
  { title: 'I Am a Disco Dancer', artist: 'Vijay Benedict & Bappi Lahiri', category: 'bollywood', era: '80s', year: 1982, difficulty: 'easy', popularity: 95 },
  { title: 'Humein Tumse Pyar Kitna', artist: 'Kishore Kumar & R.D. Burman', category: 'bollywood', era: '80s', year: 1981, difficulty: 'easy', popularity: 95 },

  // ==========================================
  // ROCK (2020s, 2010s, 2000s, 90s, 80s)
  // ==========================================
  // 2020s
  { title: 'Beggin\'', artist: 'Måneskin', category: 'rock', era: '2020s', year: 2021, difficulty: 'easy', popularity: 98 },
  { title: 'ONE MORE TIME', artist: 'Blink-182', category: 'rock', era: '2020s', year: 2023, difficulty: 'easy', popularity: 95 },
  { title: 'This Is Why', artist: 'Paramore', category: 'rock', era: '2020s', year: 2022, difficulty: 'easy', popularity: 94 },
  { title: 'Rescued', artist: 'Foo Fighters', category: 'rock', era: '2020s', year: 2023, difficulty: 'medium', popularity: 91 },

  // 2010s
  { title: 'Do I Wanna Know?', artist: 'Arctic Monkeys', category: 'rock', era: '2010s', year: 2013, difficulty: 'easy', popularity: 99 },
  { title: 'Radioactive', artist: 'Imagine Dragons', category: 'rock', era: '2010s', year: 2012, difficulty: 'easy', popularity: 99 },
  { title: 'Believer', artist: 'Imagine Dragons', category: 'rock', era: '2010s', year: 2017, difficulty: 'easy', popularity: 99 },
  { title: 'R U Mine?', artist: 'Arctic Monkeys', category: 'rock', era: '2010s', year: 2013, difficulty: 'easy', popularity: 97 },
  { title: 'The Less I Know The Better', artist: 'Tame Impala', category: 'rock', era: '2010s', year: 2015, difficulty: 'easy', popularity: 97 },
  { title: 'Shut Up and Dance', artist: 'WALK THE MOON', category: 'rock', era: '2010s', year: 2014, difficulty: 'easy', popularity: 96 },
  { title: 'Pumped Up Kicks', artist: 'Foster the People', category: 'rock', era: '2010s', year: 2011, difficulty: 'easy', popularity: 96 },
  { title: 'Stressed Out', artist: 'Twenty One Pilots', category: 'rock', era: '2010s', year: 2015, difficulty: 'easy', popularity: 96 },

  // 2000s
  { title: 'In The End', artist: 'Linkin Park', category: 'rock', era: '2000s', year: 2000, difficulty: 'easy', popularity: 100 },
  { title: 'Numb', artist: 'Linkin Park', category: 'rock', era: '2000s', year: 2003, difficulty: 'easy', popularity: 100 },
  { title: 'Boulevard of Broken Dreams', artist: 'Green Day', category: 'rock', era: '2000s', year: 2004, difficulty: 'easy', popularity: 99 },
  { title: 'Mr. Brightside', artist: 'The Killers', category: 'rock', era: '2000s', year: 2004, difficulty: 'easy', popularity: 99 },
  { title: 'Seven Nation Army', artist: 'The White Stripes', category: 'rock', era: '2000s', year: 2003, difficulty: 'easy', popularity: 98 },
  { title: 'Chop Suey!', artist: 'System Of A Down', category: 'rock', era: '2000s', year: 2001, difficulty: 'easy', popularity: 97 },
  { title: 'Welcome to the Black Parade', artist: 'My Chemical Romance', category: 'rock', era: '2000s', year: 2006, difficulty: 'easy', popularity: 97 },
  { title: 'Bring Me To Life', artist: 'Evanescence', category: 'rock', era: '2000s', year: 2003, difficulty: 'easy', popularity: 96 },
  { title: 'All The Small Things', artist: 'Blink-182', category: 'rock', era: '2000s', year: 2000, difficulty: 'easy', popularity: 96 },
  { title: 'The Pretender', artist: 'Foo Fighters', category: 'rock', era: '2000s', year: 2007, difficulty: 'medium', popularity: 92 },

  // 90s
  { title: 'Smells Like Teen Spirit', artist: 'Nirvana', category: 'rock', era: '90s', year: 1991, difficulty: 'easy', popularity: 100 },
  { title: 'Wonderwall', artist: 'Oasis', category: 'rock', era: '90s', year: 1995, difficulty: 'easy', popularity: 99 },
  { title: 'Zombie', artist: 'The Cranberries', category: 'rock', era: '90s', year: 1994, difficulty: 'easy', popularity: 99 },
  { title: 'Under the Bridge', artist: 'Red Hot Chili Peppers', category: 'rock', era: '90s', year: 1991, difficulty: 'easy', popularity: 98 },
  { title: 'Californication', artist: 'Red Hot Chili Peppers', category: 'rock', era: '90s', year: 1999, difficulty: 'easy', popularity: 98 },
  { title: 'Creep', artist: 'Radiohead', category: 'rock', era: '90s', year: 1992, difficulty: 'easy', popularity: 98 },
  { title: 'Basket Case', artist: 'Green Day', category: 'rock', era: '90s', year: 1994, difficulty: 'easy', popularity: 97 },
  { title: 'Don\'t Speak', artist: 'No Doubt', category: 'rock', era: '90s', year: 1995, difficulty: 'easy', popularity: 96 },
  { title: 'Black Hole Sun', artist: 'Soundgarden', category: 'rock', era: '90s', year: 1994, difficulty: 'easy', popularity: 95 },
  { title: 'Song 2', artist: 'Blur', category: 'rock', era: '90s', year: 1997, difficulty: 'easy', popularity: 95 },

  // 80s
  { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', category: 'rock', era: '80s', year: 1987, difficulty: 'easy', popularity: 100 },
  { title: 'Livin\' on a Prayer', artist: 'Bon Jovi', category: 'rock', era: '80s', year: 1986, difficulty: 'easy', popularity: 100 },
  { title: 'Back In Black', artist: 'AC/DC', category: 'rock', era: '80s', year: 1980, difficulty: 'easy', popularity: 99 },
  { title: 'Eye of the Tiger', artist: 'Survivor', category: 'rock', era: '80s', year: 1982, difficulty: 'easy', popularity: 99 },
  { title: 'Welcome to the Jungle', artist: 'Guns N\' Roses', category: 'rock', era: '80s', year: 1987, difficulty: 'easy', popularity: 98 },
  { title: 'You Give Love A Bad Name', artist: 'Bon Jovi', category: 'rock', era: '80s', year: 1986, difficulty: 'easy', popularity: 98 },
  { title: 'Highway to Hell', artist: 'AC/DC', category: 'rock', era: '80s', year: 1980, difficulty: 'easy', popularity: 97 },
  { title: 'Another One Bites the Dust', artist: 'Queen', category: 'rock', era: '80s', year: 1980, difficulty: 'easy', popularity: 98 },
  { title: 'Under Pressure', artist: 'Queen & David Bowie', category: 'rock', era: '80s', year: 1981, difficulty: 'easy', popularity: 97 },
  { title: 'Jump', artist: 'Van Halen', category: 'rock', era: '80s', year: 1984, difficulty: 'easy', popularity: 97 },

  // ==========================================
  // POP (2020s, 2010s, 2000s, 90s, 80s)
  // ==========================================
  // 2020s
  { title: 'Blinding Lights', artist: 'The Weeknd', category: 'pop', era: '2020s', year: 2020, difficulty: 'easy', popularity: 100 },
  { title: 'Levitating', artist: 'Dua Lipa', category: 'pop', era: '2020s', year: 2020, difficulty: 'easy', popularity: 99 },
  { title: 'As It Was', artist: 'Harry Styles', category: 'pop', era: '2020s', year: 2022, difficulty: 'easy', popularity: 99 },
  { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', category: 'pop', era: '2020s', year: 2021, difficulty: 'easy', popularity: 98 },
  { title: 'Good 4 U', artist: 'Olivia Rodrigo', category: 'pop', era: '2020s', year: 2021, difficulty: 'easy', popularity: 98 },
  { title: 'Drivers License', artist: 'Olivia Rodrigo', category: 'pop', era: '2020s', year: 2021, difficulty: 'easy', popularity: 97 },
  { title: 'Flowers', artist: 'Miley Cyrus', category: 'pop', era: '2020s', year: 2023, difficulty: 'easy', popularity: 98 },
  { title: 'Cruel Summer', artist: 'Taylor Swift', category: 'pop', era: '2020s', year: 2023, difficulty: 'easy', popularity: 99 },
  { title: 'Save Your Tears', artist: 'The Weeknd', category: 'pop', era: '2020s', year: 2020, difficulty: 'easy', popularity: 98 },
  { title: 'Watermelon Sugar', artist: 'Harry Styles', category: 'pop', era: '2020s', year: 2020, difficulty: 'easy', popularity: 97 },
  { title: 'Anti-Hero', artist: 'Taylor Swift', category: 'pop', era: '2020s', year: 2022, difficulty: 'easy', popularity: 97 },
  { title: 'Espresso', artist: 'Sabrina Carpenter', category: 'pop', era: '2020s', year: 2024, difficulty: 'easy', popularity: 98 },

  // 2010s
  { title: 'Shape of You', artist: 'Ed Sheeran', category: 'pop', era: '2010s', year: 2017, difficulty: 'easy', popularity: 100 },
  { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', category: 'pop', era: '2010s', year: 2014, difficulty: 'easy', popularity: 100 },
  { title: 'Rolling in the Deep', artist: 'Adele', category: 'pop', era: '2010s', year: 2011, difficulty: 'easy', popularity: 99 },
  { title: 'Bad Guy', artist: 'Billie Eilish', category: 'pop', era: '2010s', year: 2019, difficulty: 'easy', popularity: 98 },
  { title: 'Blank Space', artist: 'Taylor Swift', category: 'pop', era: '2010s', year: 2014, difficulty: 'easy', popularity: 98 },
  { title: 'Shake It Off', artist: 'Taylor Swift', category: 'pop', era: '2010s', year: 2014, difficulty: 'easy', popularity: 98 },
  { title: 'Roar', artist: 'Katy Perry', category: 'pop', era: '2010s', year: 2013, difficulty: 'easy', popularity: 97 },
  { title: 'Counting Stars', artist: 'OneRepublic', category: 'pop', era: '2010s', year: 2013, difficulty: 'easy', popularity: 97 },
  { title: 'Closer', artist: 'The Chainsmokers ft. Halsey', category: 'pop', era: '2010s', year: 2016, difficulty: 'easy', popularity: 98 },
  { title: 'Havana', artist: 'Camila Cabello', category: 'pop', era: '2010s', year: 2017, difficulty: 'easy', popularity: 97 },
  { title: 'Someone Like You', artist: 'Adele', category: 'pop', era: '2010s', year: 2011, difficulty: 'easy', popularity: 98 },

  // 2000s
  { title: 'Poker Face', artist: 'Lady Gaga', category: 'pop', era: '2000s', year: 2008, difficulty: 'easy', popularity: 100 },
  { title: 'Bad Romance', artist: 'Lady Gaga', category: 'pop', era: '2000s', year: 2009, difficulty: 'easy', popularity: 99 },
  { title: 'Umbrella', artist: 'Rihanna ft. JAY-Z', category: 'pop', era: '2000s', year: 2007, difficulty: 'easy', popularity: 99 },
  { title: 'Toxic', artist: 'Britney Spears', category: 'pop', era: '2000s', year: 2003, difficulty: 'easy', popularity: 98 },
  { title: 'Single Ladies', artist: 'Beyoncé', category: 'pop', era: '2000s', year: 2008, difficulty: 'easy', popularity: 98 },
  { title: 'Hips Don\'t Lie', artist: 'Shakira ft. Wyclef Jean', category: 'pop', era: '2000s', year: 2006, difficulty: 'easy', popularity: 98 },
  { title: 'Crazy In Love', artist: 'Beyoncé ft. JAY-Z', category: 'pop', era: '2000s', year: 2003, difficulty: 'easy', popularity: 97 },
  { title: 'I Gotta Feeling', artist: 'Black Eyed Peas', category: 'pop', era: '2000s', year: 2009, difficulty: 'easy', popularity: 98 },
  { title: 'Yeah!', artist: 'Usher ft. Lil Jon & Ludacris', category: 'pop', era: '2000s', year: 2004, difficulty: 'easy', popularity: 98 },
  { title: 'TiK ToK', artist: 'Kesha', category: 'pop', era: '2000s', year: 2009, difficulty: 'easy', popularity: 97 },

  // 90s
  { title: '...Baby One More Time', artist: 'Britney Spears', category: 'pop', era: '90s', year: 1998, difficulty: 'easy', popularity: 100 },
  { title: 'I Want It That Way', artist: 'Backstreet Boys', category: 'pop', era: '90s', year: 1999, difficulty: 'easy', popularity: 100 },
  { title: 'Wannabe', artist: 'Spice Girls', category: 'pop', era: '90s', year: 1996, difficulty: 'easy', popularity: 99 },
  { title: 'My Heart Will Go On', artist: 'Celine Dion', category: 'pop', era: '90s', year: 1997, difficulty: 'easy', popularity: 99 },
  { title: 'No Scrubs', artist: 'TLC', category: 'pop', era: '90s', year: 1999, difficulty: 'easy', popularity: 98 },
  { title: 'Genie in a Bottle', artist: 'Christina Aguilera', category: 'pop', era: '90s', year: 1999, difficulty: 'easy', popularity: 97 },
  { title: 'Believe', artist: 'Cher', category: 'pop', era: '90s', year: 1998, difficulty: 'easy', popularity: 97 },
  { title: 'Barbie Girl', artist: 'Aqua', category: 'pop', era: '90s', year: 1997, difficulty: 'easy', popularity: 97 },
  { title: 'Everybody (Backstreet\'s Back)', artist: 'Backstreet Boys', category: 'pop', era: '90s', year: 1997, difficulty: 'easy', popularity: 98 },

  // 80s
  { title: 'Billie Jean', artist: 'Michael Jackson', category: 'pop', era: '80s', year: 1982, difficulty: 'easy', popularity: 100 },
  { title: 'Beat It', artist: 'Michael Jackson', category: 'pop', era: '80s', year: 1982, difficulty: 'easy', popularity: 99 },
  { title: 'Thriller', artist: 'Michael Jackson', category: 'pop', era: '80s', year: 1982, difficulty: 'easy', popularity: 99 },
  { title: 'Take On Me', artist: 'a-ha', category: 'pop', era: '80s', year: 1985, difficulty: 'easy', popularity: 99 },
  { title: 'Never Gonna Give You Up', artist: 'Rick Astley', category: 'pop', era: '80s', year: 1987, difficulty: 'easy', popularity: 99 },
  { title: 'Girls Just Want to Have Fun', artist: 'Cyndi Lauper', category: 'pop', era: '80s', year: 1983, difficulty: 'easy', popularity: 98 },
  { title: 'Like a Virgin', artist: 'Madonna', category: 'pop', era: '80s', year: 1984, difficulty: 'easy', popularity: 98 },
  { title: 'Material Girl', artist: 'Madonna', category: 'pop', era: '80s', year: 1984, difficulty: 'easy', popularity: 97 },
  { title: 'I Wanna Dance with Somebody', artist: 'Whitney Houston', category: 'pop', era: '80s', year: 1987, difficulty: 'easy', popularity: 99 },
  { title: 'Careless Whisper', artist: 'George Michael', category: 'pop', era: '80s', year: 1984, difficulty: 'easy', popularity: 98 },

  // ==========================================
  // HIP-HOP & RAP
  // ==========================================
  // 2020s
  { title: 'Rich Flex', artist: 'Drake & 21 Savage', category: 'hiphop', era: '2020s', year: 2022, difficulty: 'easy', popularity: 98 },
  { title: 'First Class', artist: 'Jack Harlow', category: 'hiphop', era: '2020s', year: 2022, difficulty: 'easy', popularity: 97 },
  { title: 'Whats Poppin', artist: 'Jack Harlow', category: 'hiphop', era: '2020s', year: 2020, difficulty: 'easy', popularity: 97 },
  { title: 'Rockstar', artist: 'DaBaby ft. Roddy Ricch', category: 'hiphop', era: '2020s', year: 2020, difficulty: 'easy', popularity: 98 },
  { title: 'Industry Baby', artist: 'Lil Nas X & Jack Harlow', category: 'hiphop', era: '2020s', year: 2021, difficulty: 'easy', popularity: 99 },
  // 2010s
  { title: 'God\'s Plan', artist: 'Drake', category: 'hiphop', era: '2010s', year: 2018, difficulty: 'easy', popularity: 100 },
  { title: 'HUMBLE.', artist: 'Kendrick Lamar', category: 'hiphop', era: '2010s', year: 2017, difficulty: 'easy', popularity: 100 },
  { title: 'SICKO MODE', artist: 'Travis Scott', category: 'hiphop', era: '2010s', year: 2018, difficulty: 'easy', popularity: 99 },
  { title: 'Hotline Bling', artist: 'Drake', category: 'hiphop', era: '2010s', year: 2015, difficulty: 'easy', popularity: 99 },
  { title: 'Rockstar', artist: 'Post Malone ft. 21 Savage', category: 'hiphop', era: '2010s', year: 2017, difficulty: 'easy', popularity: 99 },
  { title: 'See You Again', artist: 'Wiz Khalifa ft. Charlie Puth', category: 'hiphop', era: '2010s', year: 2015, difficulty: 'easy', popularity: 99 },
  { title: 'Bodak Yellow', artist: 'Cardi B', category: 'hiphop', era: '2010s', year: 2017, difficulty: 'easy', popularity: 98 },
  { title: 'Lucid Dreams', artist: 'Juice WRLD', category: 'hiphop', era: '2010s', year: 2018, difficulty: 'easy', popularity: 98 },
  // 2000s
  { title: 'Lose Yourself', artist: 'Eminem', category: 'hiphop', era: '2000s', year: 2002, difficulty: 'easy', popularity: 100 },
  { title: 'In Da Club', artist: '50 Cent', category: 'hiphop', era: '2000s', year: 2003, difficulty: 'easy', popularity: 100 },
  { title: 'Without Me', artist: 'Eminem', category: 'hiphop', era: '2000s', year: 2002, difficulty: 'easy', popularity: 100 },
  { title: 'Stronger', artist: 'Kanye West', category: 'hiphop', era: '2000s', year: 2007, difficulty: 'easy', popularity: 99 },
  { title: 'Gold Digger', artist: 'Kanye West ft. Jamie Foxx', category: 'hiphop', era: '2000s', year: 2005, difficulty: 'easy', popularity: 99 },
  { title: 'Candy Shop', artist: '50 Cent ft. Olivia', category: 'hiphop', era: '2000s', year: 2005, difficulty: 'easy', popularity: 98 },
  { title: 'Dilemma', artist: 'Nelly ft. Kelly Rowland', category: 'hiphop', era: '2000s', year: 2002, difficulty: 'easy', popularity: 98 },
  // 90s
  { title: 'Gangsta\'s Paradise', artist: 'Coolio', category: 'hiphop', era: '90s', year: 1995, difficulty: 'easy', popularity: 100 },
  { title: 'Still D.R.E.', artist: 'Dr. Dre ft. Snoop Dogg', category: 'hiphop', era: '90s', year: 1999, difficulty: 'easy', popularity: 100 },
  { title: 'California Love', artist: '2Pac ft. Dr. Dre', category: 'hiphop', era: '90s', year: 1995, difficulty: 'easy', popularity: 99 },
  { title: 'Juicy', artist: 'The Notorious B.I.G.', category: 'hiphop', era: '90s', year: 1994, difficulty: 'easy', popularity: 99 },
  { title: 'Hypnotize', artist: 'The Notorious B.I.G.', category: 'hiphop', era: '90s', year: 1997, difficulty: 'easy', popularity: 98 },
  { title: 'Gin and Juice', artist: 'Snoop Dogg', category: 'hiphop', era: '90s', year: 1993, difficulty: 'easy', popularity: 98 },

  // ==========================================
  // EDM & DANCE
  // ==========================================
  // 2020s
  { title: 'Marea (we\'ve lost dancing)', artist: 'Fred again.. & The Blessed Madonna', category: 'edm', era: '2020s', year: 2021, difficulty: 'easy', popularity: 97 },
  { title: 'Where Are You Now', artist: 'Lost Frequencies & Calum Scott', category: 'edm', era: '2020s', year: 2021, difficulty: 'easy', popularity: 98 },
  { title: 'Love Tonight', artist: 'Shouse & David Guetta', category: 'edm', era: '2020s', year: 2021, difficulty: 'easy', popularity: 96 },
  { title: 'I\'m Good (Blue)', artist: 'David Guetta & Bebe Rexha', category: 'edm', era: '2020s', year: 2022, difficulty: 'easy', popularity: 99 },
  // 2010s
  { title: 'Wake Me Up', artist: 'Avicii', category: 'edm', era: '2010s', year: 2013, difficulty: 'easy', popularity: 100 },
  { title: 'Levels', artist: 'Avicii', category: 'edm', era: '2010s', year: 2011, difficulty: 'easy', popularity: 100 },
  { title: 'Titanium', artist: 'David Guetta ft. Sia', category: 'edm', era: '2010s', year: 2011, difficulty: 'easy', popularity: 100 },
  { title: 'Get Lucky', artist: 'Daft Punk ft. Pharrell Williams', category: 'edm', era: '2010s', year: 2013, difficulty: 'easy', popularity: 100 },
  { title: 'Summer', artist: 'Calvin Harris', category: 'edm', era: '2010s', year: 2014, difficulty: 'easy', popularity: 99 },
  { title: 'Animals', artist: 'Martin Garrix', category: 'edm', era: '2010s', year: 2013, difficulty: 'easy', popularity: 99 },
  { title: 'Lean On', artist: 'Major Lazer & DJ Snake', category: 'edm', era: '2010s', year: 2015, difficulty: 'easy', popularity: 99 },
  { title: 'Don\'t You Worry Child', artist: 'Swedish House Mafia', category: 'edm', era: '2010s', year: 2012, difficulty: 'easy', popularity: 99 },
  { title: 'Faded', artist: 'Alan Walker', category: 'edm', era: '2010s', year: 2015, difficulty: 'easy', popularity: 99 },
  { title: 'Clarity', artist: 'Zedd ft. Foxes', category: 'edm', era: '2010s', year: 2012, difficulty: 'easy', popularity: 98 },
  { title: 'This Is What You Came For', artist: 'Calvin Harris ft. Rihanna', category: 'edm', era: '2010s', year: 2016, difficulty: 'easy', popularity: 99 },
  { title: 'Happier', artist: 'Marshmello ft. Bastille', category: 'edm', era: '2010s', year: 2018, difficulty: 'easy', popularity: 98 },
  // 2000s
  { title: 'One More Time', artist: 'Daft Punk', category: 'edm', era: '2000s', year: 2000, difficulty: 'easy', popularity: 100 },
  { title: 'Harder, Better, Faster, Stronger', artist: 'Daft Punk', category: 'edm', era: '2000s', year: 2001, difficulty: 'easy', popularity: 99 },
  { title: 'Satisfaction', artist: 'Benny Benassi', category: 'edm', era: '2000s', year: 2002, difficulty: 'easy', popularity: 98 },
  { title: 'When Love Takes Over', artist: 'David Guetta ft. Kelly Rowland', category: 'edm', era: '2000s', year: 2009, difficulty: 'easy', popularity: 98 },
  { title: 'Ghosts \'n\' Stuff', artist: 'deadmau5 ft. Rob Swire', category: 'edm', era: '2000s', year: 2009, difficulty: 'easy', popularity: 97 },
  // 90s
  { title: 'Around the World', artist: 'Daft Punk', category: 'edm', era: '90s', year: 1997, difficulty: 'easy', popularity: 99 },
  { title: 'Sandstorm', artist: 'Darude', category: 'edm', era: '90s', year: 1999, difficulty: 'easy', popularity: 100 },
  { title: 'The Rockafeller Skank', artist: 'Fatboy Slim', category: 'edm', era: '90s', year: 1998, difficulty: 'easy', popularity: 98 },
  { title: 'Firestarter', artist: 'The Prodigy', category: 'edm', era: '90s', year: 1996, difficulty: 'easy', popularity: 98 },

  // ==========================================
  // K-POP
  // ==========================================
  // 2020s
  { title: 'Dynamite', artist: 'BTS', category: 'kpop', era: '2020s', year: 2020, difficulty: 'easy', popularity: 100 },
  { title: 'Butter', artist: 'BTS', category: 'kpop', era: '2020s', year: 2021, difficulty: 'easy', popularity: 100 },
  { title: 'How You Like That', artist: 'BLACKPINK', category: 'kpop', era: '2020s', year: 2020, difficulty: 'easy', popularity: 100 },
  { title: 'Hype Boy', artist: 'NewJeans', category: 'kpop', era: '2020s', year: 2022, difficulty: 'easy', popularity: 99 },
  { title: 'OMG', artist: 'NewJeans', category: 'kpop', era: '2020s', year: 2023, difficulty: 'easy', popularity: 99 },
  { title: 'Super Shy', artist: 'NewJeans', category: 'kpop', era: '2020s', year: 2023, difficulty: 'easy', popularity: 99 },
  { title: 'LOVE DIVE', artist: 'IVE', category: 'kpop', era: '2020s', year: 2022, difficulty: 'easy', popularity: 98 },
  { title: 'Next Level', artist: 'aespa', category: 'kpop', era: '2020s', year: 2021, difficulty: 'easy', popularity: 98 },
  { title: 'ANTIFRAGILE', artist: 'LE SSERAFIM', category: 'kpop', era: '2020s', year: 2022, difficulty: 'easy', popularity: 98 },
  { title: 'MANIAC', artist: 'Stray Kids', category: 'kpop', era: '2020s', year: 2022, difficulty: 'easy', popularity: 98 },
  { title: 'Seven', artist: 'Jung Kook ft. Latto', category: 'kpop', era: '2020s', year: 2023, difficulty: 'easy', popularity: 100 },
  { title: 'Cupid', artist: 'FIFTY FIFTY', category: 'kpop', era: '2020s', year: 2023, difficulty: 'easy', popularity: 99 },
  // 2010s
  { title: 'Gangnam Style', artist: 'PSY', category: 'kpop', era: '2010s', year: 2012, difficulty: 'easy', popularity: 100 },
  { title: 'Boy With Luv', artist: 'BTS ft. Halsey', category: 'kpop', era: '2010s', year: 2019, difficulty: 'easy', popularity: 100 },
  { title: 'DDU-DU DDU-DU', artist: 'BLACKPINK', category: 'kpop', era: '2010s', year: 2018, difficulty: 'easy', popularity: 100 },
  { title: 'Kill This Love', artist: 'BLACKPINK', category: 'kpop', era: '2010s', year: 2019, difficulty: 'easy', popularity: 99 },
  { title: 'What is Love?', artist: 'TWICE', category: 'kpop', era: '2010s', year: 2018, difficulty: 'easy', popularity: 98 },
  { title: 'Fancy', artist: 'TWICE', category: 'kpop', era: '2010s', year: 2019, difficulty: 'easy', popularity: 98 },
  { title: 'DNA', artist: 'BTS', category: 'kpop', era: '2010s', year: 2017, difficulty: 'easy', popularity: 99 },
  { title: 'TT', artist: 'TWICE', category: 'kpop', era: '2010s', year: 2016, difficulty: 'easy', popularity: 98 },
  { title: 'BANG BANG BANG', artist: 'BIGBANG', category: 'kpop', era: '2010s', year: 2015, difficulty: 'easy', popularity: 98 },
  { title: 'Growl', artist: 'EXO', category: 'kpop', era: '2010s', year: 2013, difficulty: 'easy', popularity: 97 },
  // 2000s
  { title: 'Gee', artist: 'Girls\' Generation', category: 'kpop', era: '2000s', year: 2009, difficulty: 'easy', popularity: 99 },
  { title: 'Sorry, Sorry', artist: 'Super Junior', category: 'kpop', era: '2000s', year: 2009, difficulty: 'easy', popularity: 98 },
  { title: 'Nobody', artist: 'Wonder Girls', category: 'kpop', era: '2000s', year: 2008, difficulty: 'easy', popularity: 98 },
  { title: 'Haru Haru', artist: 'BIGBANG', category: 'kpop', era: '2000s', year: 2008, difficulty: 'easy', popularity: 98 },

  // ==========================================
  // LATIN
  // ==========================================
  // 2020s
  { title: 'Tití Me Preguntó', artist: 'Bad Bunny', category: 'latin', era: '2020s', year: 2022, difficulty: 'easy', popularity: 100 },
  { title: 'Dákiti', artist: 'Bad Bunny & Jhay Cortez', category: 'latin', era: '2020s', year: 2020, difficulty: 'easy', popularity: 99 },
  { title: 'Pepas', artist: 'Farruko', category: 'latin', era: '2020s', year: 2021, difficulty: 'easy', popularity: 99 },
  { title: 'Todo De Ti', artist: 'Rauw Alejandro', category: 'latin', era: '2020s', year: 2021, difficulty: 'easy', popularity: 99 },
  { title: 'PROVENZA', artist: 'KAROL G', category: 'latin', era: '2020s', year: 2022, difficulty: 'easy', popularity: 99 },
  { title: 'Monaco', artist: 'Bad Bunny', category: 'latin', era: '2020s', year: 2023, difficulty: 'easy', popularity: 98 },
  { title: 'TQG', artist: 'KAROL G & Shakira', category: 'latin', era: '2020s', year: 2023, difficulty: 'easy', popularity: 99 },
  // 2010s
  { title: 'Despacito', artist: 'Luis Fonsi & Daddy Yankee', category: 'latin', era: '2010s', year: 2017, difficulty: 'easy', popularity: 100 },
  { title: 'Mi Gente', artist: 'J Balvin & Willy William', category: 'latin', era: '2010s', year: 2017, difficulty: 'easy', popularity: 100 },
  { title: 'Danza Kuduro', artist: 'Don Omar & Lucenzo', category: 'latin', era: '2010s', year: 2010, difficulty: 'easy', popularity: 100 },
  { title: 'Bailando', artist: 'Enrique Iglesias ft. Descemer Bueno', category: 'latin', era: '2010s', year: 2014, difficulty: 'easy', popularity: 99 },
  { title: 'Chantaje', artist: 'Shakira ft. Maluma', category: 'latin', era: '2010s', year: 2016, difficulty: 'easy', popularity: 99 },
  { title: 'Calma (Remix)', artist: 'Pedro Capó & Farruko', category: 'latin', era: '2010s', year: 2018, difficulty: 'easy', popularity: 98 },
  { title: 'Ginza', artist: 'J Balvin', category: 'latin', era: '2010s', year: 2015, difficulty: 'easy', popularity: 98 },
  { title: 'Con Calma', artist: 'Daddy Yankee & Snow', category: 'latin', era: '2010s', year: 2019, difficulty: 'easy', popularity: 98 },
  // 2000s
  { title: 'Gasolina', artist: 'Daddy Yankee', category: 'latin', era: '2000s', year: 2004, difficulty: 'easy', popularity: 100 },
  { title: 'Hips Don\'t Lie', artist: 'Shakira ft. Wyclef Jean', category: 'latin', era: '2000s', year: 2006, difficulty: 'easy', popularity: 100 },
  { title: 'Whenever, Wherever', artist: 'Shakira', category: 'latin', era: '2000s', year: 2001, difficulty: 'easy', popularity: 99 },
  { title: 'Ella Me Levantó', artist: 'Daddy Yankee', category: 'latin', era: '2000s', year: 2007, difficulty: 'easy', popularity: 98 },
  { title: 'La Tortura', artist: 'Shakira ft. Alejandro Sanz', category: 'latin', era: '2000s', year: 2005, difficulty: 'easy', popularity: 98 },
  // 90s
  { title: 'Livin\' la Vida Loca', artist: 'Ricky Martin', category: 'latin', era: '90s', year: 1999, difficulty: 'easy', popularity: 100 },
  { title: 'Macarena', artist: 'Los Del Rio', category: 'latin', era: '90s', year: 1993, difficulty: 'easy', popularity: 99 },
  { title: 'Suavemente', artist: 'Elvis Crespo', category: 'latin', era: '90s', year: 1998, difficulty: 'easy', popularity: 99 },
  { title: 'Bailamos', artist: 'Enrique Iglesias', category: 'latin', era: '90s', year: 1999, difficulty: 'easy', popularity: 98 },
];
