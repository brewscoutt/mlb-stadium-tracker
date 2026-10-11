// All 30 MLB stadiums as of the 2026 season.
// Note: a few teams are in temporary ballparks while permanent venues are
// built or repaired; `note` calls that out so it doesn't look like a typo.
const STADIUMS = [
  { id: "orioles", team: "Baltimore Orioles", stadium: "Oriole Park at Camden Yards", city: "Baltimore", state: "MD", league: "AL", division: "East", colors: { primary: "#DF4601", secondary: "#000000" } },
  { id: "redsox", team: "Boston Red Sox", stadium: "Fenway Park", city: "Boston", state: "MA", league: "AL", division: "East", colors: { primary: "#BD3039", secondary: "#0C2340" } },
  { id: "yankees", team: "New York Yankees", stadium: "Yankee Stadium", city: "Bronx", state: "NY", league: "AL", division: "East", colors: { primary: "#0C2340", secondary: "#C4CED4" } },
  { id: "rays", team: "Tampa Bay Rays", stadium: "Tropicana Field", city: "St. Petersburg", state: "FL", league: "AL", division: "East", note: "Playing at Steinbrenner Field (Tampa) while Tropicana Field is repaired.", colors: { primary: "#092C5C", secondary: "#8FBCE6" } },
  { id: "bluejays", team: "Toronto Blue Jays", stadium: "Rogers Centre", city: "Toronto", state: "ON", league: "AL", division: "East", colors: { primary: "#134A8E", secondary: "#E8291C" } },

  { id: "whitesox", team: "Chicago White Sox", stadium: "Rate Field", city: "Chicago", state: "IL", league: "AL", division: "Central", colors: { primary: "#27251F", secondary: "#C4CED4" } },
  { id: "guardians", team: "Cleveland Guardians", stadium: "Progressive Field", city: "Cleveland", state: "OH", league: "AL", division: "Central", colors: { primary: "#E31937", secondary: "#0C2340" } },
  { id: "tigers", team: "Detroit Tigers", stadium: "Comerica Park", city: "Detroit", state: "MI", league: "AL", division: "Central", colors: { primary: "#0C2340", secondary: "#FA4616" } },
  { id: "royals", team: "Kansas City Royals", stadium: "Kauffman Stadium", city: "Kansas City", state: "MO", league: "AL", division: "Central", colors: { primary: "#004687", secondary: "#BD9B60" } },
  { id: "twins", team: "Minnesota Twins", stadium: "Target Field", city: "Minneapolis", state: "MN", league: "AL", division: "Central", colors: { primary: "#002B5C", secondary: "#D31145" } },

  { id: "astros", team: "Houston Astros", stadium: "Daikin Park", city: "Houston", state: "TX", league: "AL", division: "West", colors: { primary: "#002D62", secondary: "#EB6E1F" } },
  { id: "angels", team: "Los Angeles Angels", stadium: "Angel Stadium", city: "Anaheim", state: "CA", league: "AL", division: "West", colors: { primary: "#BA0021", secondary: "#003263" } },
  { id: "athletics", team: "Athletics", stadium: "Sutter Health Park", city: "West Sacramento", state: "CA", league: "AL", division: "West", note: "Temporary home until the Las Vegas ballpark opens.", colors: { primary: "#003831", secondary: "#EFB21E" } },
  { id: "mariners", team: "Seattle Mariners", stadium: "T-Mobile Park", city: "Seattle", state: "WA", league: "AL", division: "West", colors: { primary: "#0C2C56", secondary: "#005C5C" } },
  { id: "rangers", team: "Texas Rangers", stadium: "Globe Life Field", city: "Arlington", state: "TX", league: "AL", division: "West", colors: { primary: "#003278", secondary: "#C0111F" } },

  { id: "braves", team: "Atlanta Braves", stadium: "Truist Park", city: "Atlanta", state: "GA", league: "NL", division: "East", colors: { primary: "#CE1141", secondary: "#13274F" } },
  { id: "marlins", team: "Miami Marlins", stadium: "loanDepot park", city: "Miami", state: "FL", league: "NL", division: "East", colors: { primary: "#00A3E0", secondary: "#EF3340" } },
  { id: "mets", team: "New York Mets", stadium: "Citi Field", city: "Queens", state: "NY", league: "NL", division: "East", colors: { primary: "#002D72", secondary: "#FF5910" } },
  { id: "phillies", team: "Philadelphia Phillies", stadium: "Citizens Bank Park", city: "Philadelphia", state: "PA", league: "NL", division: "East", colors: { primary: "#E81828", secondary: "#002D72" } },
  { id: "nationals", team: "Washington Nationals", stadium: "Nationals Park", city: "Washington", state: "DC", league: "NL", division: "East", colors: { primary: "#AB0003", secondary: "#14225A" } },

  { id: "cubs", team: "Chicago Cubs", stadium: "Wrigley Field", city: "Chicago", state: "IL", league: "NL", division: "Central", colors: { primary: "#0E3386", secondary: "#CC3433" } },
  { id: "reds", team: "Cincinnati Reds", stadium: "Great American Ball Park", city: "Cincinnati", state: "OH", league: "NL", division: "Central", colors: { primary: "#C6011F", secondary: "#000000" } },
  { id: "brewers", team: "Milwaukee Brewers", stadium: "American Family Field", city: "Milwaukee", state: "WI", league: "NL", division: "Central", colors: { primary: "#0A2351", secondary: "#B6922E" } },
  { id: "pirates", team: "Pittsburgh Pirates", stadium: "PNC Park", city: "Pittsburgh", state: "PA", league: "NL", division: "Central", colors: { primary: "#27251F", secondary: "#FDB827" } },
  { id: "cardinals", team: "St. Louis Cardinals", stadium: "Busch Stadium", city: "St. Louis", state: "MO", league: "NL", division: "Central", colors: { primary: "#C41E3A", secondary: "#0C2340" } },

  { id: "dbacks", team: "Arizona Diamondbacks", stadium: "Chase Field", city: "Phoenix", state: "AZ", league: "NL", division: "West", colors: { primary: "#A71930", secondary: "#E3D4AD" } },
  { id: "rockies", team: "Colorado Rockies", stadium: "Coors Field", city: "Denver", state: "CO", league: "NL", division: "West", colors: { primary: "#333366", secondary: "#C4CED4" } },
  { id: "dodgers", team: "Los Angeles Dodgers", stadium: "Dodger Stadium", city: "Los Angeles", state: "CA", league: "NL", division: "West", colors: { primary: "#005A9C", secondary: "#A5ACAF" } },
  { id: "padres", team: "San Diego Padres", stadium: "Petco Park", city: "San Diego", state: "CA", league: "NL", division: "West", colors: { primary: "#2F241D", secondary: "#FFC425" } },
  { id: "giants", team: "San Francisco Giants", stadium: "Oracle Park", city: "San Francisco", state: "CA", league: "NL", division: "West", colors: { primary: "#FD5A1E", secondary: "#27251F" } },
];
