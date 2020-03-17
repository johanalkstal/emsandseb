const guestList = [
  "Carin Alkstål",
  "Tomas Alkstål",
  "Carolina Alkstål",
  "Johan Alkstål",
  "Alicia Alkstål",
  "Elvin Alkstål",
  "Calle Alkstål",
  "Carl-Johan Alkstål",
  "Emelie Eriksson",
  "Eva Florin",
  "Åsa Brandt",
  "Uffe Brandt",
  "Ulf Brandt",
  "Engely Olivares",
  "Esteban Olivares",
  "Gunnar Carlsson",
  "Anna Pettersson",
  "Anna Selin",
  "Per Selin",
  "Emmy Selin",
  "Frida Selin",
  "Åke Carlson",
  "Åke Carlsson",
  "Erik Gustafsson",
  "Victoria Rönn",
  "Stefan Colazio",
  "Sandra Aidenpää",
  "Nils-Åke Alkstål",
  "Nisse Alkstål",
  "Gunvor Alkstål",
  "Helene Marcus",
  "Heléne Marcus",
  "Fredrik Lundquist",
  "Johan Carlsson",
  "Katarina Johnson",
  "Jennifer Bergman",
  "Captain Wedding",
  "Barbro Eriksson",
  "Kjell Eriksson",
  "Lena März",
  "Jakob März",
  "Roger Eriksson",
  "Hui Li",
  "Cecilia Eriksson",
  "Johan Berglund",
  "Märta Nilsson",
  "Ingemar Nilsson",
  "Nils-Åke Nilsson",
  "Anette Nilsson",
  "Per-Olof Nilsson",
  "Ylva Nilsson",
  "Lena Alkstål",
  "Lena Alkstål Åslund",
  "Ulf Åslund",
  "Uffe Åslund",
  "Jan Alkstål",
  "Karin Alkstål",
  "Sara Dahl",
  "Andreas Lindström",
  "Christer Alkstål",
  "Alexander Alkstål",
  "Pia Jakobsson",
  "Per Alkstål",
  "Margareta Alkstål",
  "Jörgen Marcus"
];

module.exports.handler = async function(event, context) {
  const guestName = JSON.parse(event.body).name;
  console.log("Guest name:", guestName);

  const isAGuest =
    guestList.find(guest => guest.toLowerCase() === guestName.toLowerCase())
      .length > 0;

  const body = JSON.stringify(isAGuest);

  console.log("Body:", body);

  return {
    statusCode: 200,
    body
  };
};

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum'
