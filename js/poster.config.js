const config = {
  title: 'KEYNOTES',
  department: 'MS Data Visualization',
  school: 'Parsons School of Design',
  location: 'Wollman Hall - Room 500\n65 West 11th St',
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
  }).concat(['dv.parsons.edu'])
};
