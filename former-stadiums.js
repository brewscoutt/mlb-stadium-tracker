// Retired MLB ballparks from the "modern ballpark era" (roughly the last
// 35 years) — stadiums a team called home before their *current* park,
// for teams whose old stadium closed in 1989 or later. This intentionally
// stops there rather than going back through MLB's full history (Polo
// Grounds, Forbes Field, etc.) — those predate anyone tracking visits today.
const FORMER_STADIUMS = [
  { id: "athletics-coliseum", team: "Athletics", stadium: "Oakland Coliseum", city: "Oakland", state: "CA", years: "1968–2024", replacedBy: "Sutter Health Park", colors: { primary: "#003831", secondary: "#EFB21E" } },
  { id: "rangers-globelife", team: "Texas Rangers", stadium: "Globe Life Park in Arlington", city: "Arlington", state: "TX", years: "1994–2019", replacedBy: "Globe Life Field", colors: { primary: "#003278", secondary: "#C0111F" } },
  { id: "braves-turner", team: "Atlanta Braves", stadium: "Turner Field", city: "Atlanta", state: "GA", years: "1997–2016", replacedBy: "Truist Park", colors: { primary: "#CE1141", secondary: "#13274F" } },
  { id: "marlins-hardrock", team: "Miami Marlins", stadium: "Sun Life Stadium", city: "Miami Gardens", state: "FL", years: "1993–2011", replacedBy: "loanDepot park", colors: { primary: "#00A3E0", secondary: "#EF3340" } },
  { id: "twins-metrodome", team: "Minnesota Twins", stadium: "Metrodome", city: "Minneapolis", state: "MN", years: "1982–2009", replacedBy: "Target Field", colors: { primary: "#002B5C", secondary: "#D31145" } },
  { id: "yankees-old", team: "New York Yankees", stadium: "Yankee Stadium (original)", city: "Bronx", state: "NY", years: "1923–2008", replacedBy: "Yankee Stadium (current)", colors: { primary: "#0C2340", secondary: "#C4CED4" } },
  { id: "mets-shea", team: "New York Mets", stadium: "Shea Stadium", city: "Queens", state: "NY", years: "1964–2008", replacedBy: "Citi Field", colors: { primary: "#002D72", secondary: "#FF5910" } },
  { id: "cardinals-busch2", team: "St. Louis Cardinals", stadium: "Busch Memorial Stadium", city: "St. Louis", state: "MO", years: "1966–2005", replacedBy: "Busch Stadium (current)", colors: { primary: "#C41E3A", secondary: "#0C2340" } },
  { id: "reds-riverfront", team: "Cincinnati Reds", stadium: "Riverfront Stadium (Cinergy Field)", city: "Cincinnati", state: "OH", years: "1970–2002", replacedBy: "Great American Ball Park", colors: { primary: "#C6011F", secondary: "#000000" } },
  { id: "pirates-threerivers", team: "Pittsburgh Pirates", stadium: "Three Rivers Stadium", city: "Pittsburgh", state: "PA", years: "1970–2000", replacedBy: "PNC Park", colors: { primary: "#27251F", secondary: "#FDB827" } },
  { id: "tigers-tiger", team: "Detroit Tigers", stadium: "Tiger Stadium", city: "Detroit", state: "MI", years: "1912–1999", replacedBy: "Comerica Park", colors: { primary: "#0C2340", secondary: "#FA4616" } },
  { id: "padres-qualcomm", team: "San Diego Padres", stadium: "Qualcomm Stadium", city: "San Diego", state: "CA", years: "1969–2003", replacedBy: "Petco Park", colors: { primary: "#2F241D", secondary: "#FFC425" } },
  { id: "phillies-vet", team: "Philadelphia Phillies", stadium: "Veterans Stadium", city: "Philadelphia", state: "PA", years: "1971–2003", replacedBy: "Citizens Bank Park", colors: { primary: "#E81828", secondary: "#002D72" } },
  { id: "astros-dome", team: "Houston Astros", stadium: "Astrodome", city: "Houston", state: "TX", years: "1965–1999", replacedBy: "Daikin Park", colors: { primary: "#002D62", secondary: "#EB6E1F" } },
  { id: "brewers-county", team: "Milwaukee Brewers", stadium: "County Stadium", city: "Milwaukee", state: "WI", years: "1953–2000", replacedBy: "American Family Field", colors: { primary: "#0A2351", secondary: "#B6922E" } },
  { id: "giants-candlestick", team: "San Francisco Giants", stadium: "Candlestick Park", city: "San Francisco", state: "CA", years: "1960–1999", replacedBy: "Oracle Park", colors: { primary: "#FD5A1E", secondary: "#27251F" } },
  { id: "mariners-kingdome", team: "Seattle Mariners", stadium: "Kingdome", city: "Seattle", state: "WA", years: "1977–1999", replacedBy: "T-Mobile Park", colors: { primary: "#0C2C56", secondary: "#005C5C" } },
  { id: "orioles-memorial", team: "Baltimore Orioles", stadium: "Memorial Stadium", city: "Baltimore", state: "MD", years: "1954–1991", replacedBy: "Oriole Park at Camden Yards", colors: { primary: "#DF4601", secondary: "#000000" } },
  { id: "whitesox-old-comiskey", team: "Chicago White Sox", stadium: "Comiskey Park (original)", city: "Chicago", state: "IL", years: "1910–1990", replacedBy: "Rate Field", colors: { primary: "#27251F", secondary: "#C4CED4" } },
  { id: "bluejays-exhibition", team: "Toronto Blue Jays", stadium: "Exhibition Stadium", city: "Toronto", state: "ON", years: "1977–1989", replacedBy: "Rogers Centre", colors: { primary: "#134A8E", secondary: "#E8291C" } },
];
