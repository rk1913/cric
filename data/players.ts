
import { Player } from '../types';

export const players: Player[] = [
  {
    name: "Sachin Tendulkar",
    slug: "sachin-tendulkar",
    role: "Batter",
    primaryImage: "https://picsum.photos/id/101/800/1000",
    galleryImages: [
      "https://picsum.photos/id/102/800/800",
      "https://picsum.photos/id/103/800/800",
      "https://picsum.photos/id/104/800/800"
    ],
    shortInspiringStory: [
      "Known as the 'God of Cricket', Sachin started his journey at the age of 16. His passion for the game was so immense that he once played an entire match with a bloodied nose, refusing to leave the field.",
      "His career spanned over 24 years, during which he carried the expectations of a billion people on his shoulders. He proved that longevity is a result of discipline and an undying love for one's craft.",
      "Sachin's legacy isn't just about the 100 centuries; it's about the humility he maintained throughout his rise to global superstardom."
    ],
    stats: {
      matches: 664,
      debut: "1989 vs Pakistan",
      runs: 34357,
      bestPerformance: "248* vs Bangladesh",
      records: [
        "First male cricketer to score a double century in ODIs",
        "Only player to score 100 international centuries",
        "Highest run-scorer in Test and ODI formats",
        "Most Man of the Match awards in World Cup history"
      ],
      teams: ["India", "Mumbai Indians", "Yorkshire", "Mumbai"],
      style: "Right-handed Batter"
    }
  },
  {
    name: "MS Dhoni",
    slug: "ms-dhoni",
    role: "Wicket-keeper",
    primaryImage: "https://picsum.photos/id/201/800/1000",
    galleryImages: [
      "https://picsum.photos/id/202/800/800",
      "https://picsum.photos/id/203/800/800",
      "https://picsum.photos/id/204/800/800"
    ],
    shortInspiringStory: [
      "From a ticket collector in Kharagpur to India's most successful captain, Mahendra Singh Dhoni's story is the epitome of the Indian dream. His 'Captain Cool' demeanor changed how the world viewed pressure.",
      "He taught a generation that it's not where you start, but where you finish. His ability to finish games with a calm mind remains unparalleled in the history of limited-overs cricket.",
      "His leadership brought India two World Cups and the Champions Trophy, cementing his place as a tactical genius and a leader of men."
    ],
    stats: {
      matches: 538,
      debut: "2004 vs Bangladesh",
      runs: 17266,
      bestPerformance: "183* vs Sri Lanka",
      records: [
        "Only captain to win all ICC trophies (T20 WC, ODI WC, CT)",
        "Most stumpings in international cricket",
        "Most matches as a captain in T20Is",
        "Fastest stumping record (0.08 seconds)"
      ],
      teams: ["India", "Chennai Super Kings", "Rising Pune Supergiant", "Jharkhand"],
      style: "Right-handed Batter / Wicket-keeper"
    }
  },
  {
    name: "Virat Kohli",
    slug: "virat-kohli",
    role: "Batter",
    primaryImage: "https://picsum.photos/id/301/800/1000",
    galleryImages: [
      "https://picsum.photos/id/302/800/800",
      "https://picsum.photos/id/303/800/800",
      "https://picsum.photos/id/304/800/800"
    ],
    shortInspiringStory: [
      "Virat Kohli redefined fitness and aggression in Indian cricket. His journey from a chubby teenager to the world's fittest athlete is a testament to sheer willpower and self-transformation.",
      "When his father passed away during a Ranji Trophy match, Kohli chose to stay and bat for his team, showing mental fortitude far beyond his years. This hunger for success became his trademark.",
      "He remains the chase-master, turning impossible targets into routine victories through clinical precision and intense focus."
    ],
    stats: {
      matches: 522,
      debut: "2008 vs Sri Lanka",
      runs: 26733,
      bestPerformance: "254* vs South Africa",
      records: [
        "Fastest to 13,000 ODI runs",
        "Most centuries in ODI history (50)",
        "Highest run-scorer in a single IPL season (973 runs)",
        "Most centuries against a single opponent in ODIs"
      ],
      teams: ["India", "Royal Challengers Bengaluru", "Delhi"],
      style: "Right-handed Batter"
    }
  },
  {
    name: "Jasprit Bumrah",
    slug: "jasprit-bumrah",
    role: "Bowler",
    primaryImage: "https://picsum.photos/id/401/800/1000",
    galleryImages: [
      "https://picsum.photos/id/402/800/800",
      "https://picsum.photos/id/403/800/800",
      "https://picsum.photos/id/404/800/800"
    ],
    shortInspiringStory: [
      "Born with an unconventional action that many coaches thought wouldn't last, Jasprit Bumrah proved that being unique is a superpower. He is arguably India's greatest all-format pacer.",
      "His pinpoint yorkers and deceptive slower balls have made him the nightmare of every modern-day batter. He rose from humble beginnings to become the world's number one bowler.",
      "Bumrah's success lies in his ability to innovate under pressure, making him the go-to man in any crisis."
    ],
    stats: {
      matches: 187,
      debut: "2016 vs Australia",
      wickets: 382,
      bestPerformance: "6/19 vs England",
      records: [
        "First Asian bowler to take 5-wicket hauls in SA, ENG, and AUS in a year",
        "Fastest Indian pacer to 100 Test wickets",
        "Most wickets in a single IPL season for MI",
        "Highest score by a tail-ender in an over (35 runs vs Broad)"
      ],
      teams: ["India", "Mumbai Indians", "Gujarat"],
      style: "Right-arm Fast"
    }
  },
  {
    name: "Rohit Sharma",
    slug: "rohit-sharma",
    role: "Batter",
    primaryImage: "https://picsum.photos/id/501/800/1000",
    galleryImages: [
      "https://picsum.photos/id/502/800/800",
      "https://picsum.photos/id/503/800/800",
      "https://picsum.photos/id/504/800/800"
    ],
    shortInspiringStory: [
      "Rohit Sharma, known as the 'Hitman', possesses an extra second to play his shots. His journey from an off-spinner who could bat to one of the greatest openers is a story of evolution.",
      "After being dropped from the 2011 World Cup squad, he transformed himself into a dominant force, becoming the only player to score three double centuries in ODIs.",
      "His captaincy style, built on empathy and data, led Mumbai Indians to five IPL titles and India to the T20 World Cup 2024."
    ],
    stats: {
      matches: 472,
      debut: "2007 vs Ireland",
      runs: 18820,
      bestPerformance: "264 vs Sri Lanka",
      records: [
        "Highest individual score in ODI history (264)",
        "Only player with 3 double centuries in ODIs",
        "Most sixes in international cricket",
        "Most centuries in a single World Cup (5 in 2019)"
      ],
      teams: ["India", "Mumbai Indians", "Deccan Chargers", "Mumbai"],
      style: "Right-handed Batter"
    }
  },
  {
    name: "Ravindra Jadeja",
    slug: "ravindra-jadeja",
    role: "All-rounder",
    primaryImage: "https://picsum.photos/id/601/800/1000",
    galleryImages: [
      "https://picsum.photos/id/602/800/800",
      "https://picsum.photos/id/603/800/800",
      "https://picsum.photos/id/604/800/800"
    ],
    shortInspiringStory: [
      "Ravindra Jadeja, often called 'Sir Jadeja' by his fans, is the definition of a three-dimensional player. His fielding alone can change the course of a match.",
      "Growing up in Jamnagar, Jadeja overcame financial hardships to become India's premier all-rounder. His left-arm spin is relentless, and his batting has rescued India countless times.",
      "He remains one of the fastest moving athletes on the field, often called 'The Rockstar' by Shane Warne."
    ],
    stats: {
      matches: 332,
      debut: "2009 vs Sri Lanka",
      runs: 6200,
      wickets: 540,
      bestPerformance: "7/42 vs Australia",
      records: [
        "First Indian left-arm spinner to take 150 ODI wickets",
        "Most runs in an over in IPL history (37 runs)",
        "Ranked ICC World No. 1 Test All-rounder multiple times",
        "Fastest Indian left-armer to 200 Test wickets"
      ],
      teams: ["India", "Chennai Super Kings", "Rajasthan Royals", "Saurashtra"],
      style: "Left-handed Batter / Slow Left-arm Orthodox"
    }
  }
];
