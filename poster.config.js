module.exports = {
  title: 'KEYNOTES',
  department: 'MS Data Visualization',
  school: 'Parsons School of Design',
  location: 'Arnhold Hall, room I202\n55 West 13th Street',
  date: '2026-05-13',
  time: '6:00PM',
  students: [
    'Neven Armanios',
    'Olivia Kasmin',
    'Saehun Kim',
    'Sofia Molina',
    'Nichos Molnar',
    'Maggie Navracruz',
    'LuisPablo Padres',
    'Derin Savasan',
    'Lara Yeyati Preiss',
  ].sort((a, b) => {
    const getLastName = (name) => name.split(' ').slice(-1)[0].toLowerCase();
    return getLastName(a).localeCompare(getLastName(b));
  }).concat(['https://dv.parsons.edu/', 'https://dv.parsons.edu/archive/about/'])
}
