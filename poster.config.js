module.exports = {
  title: 'KEYNOTES',
  department: 'MS Data Visualization',
  school: 'Parsons School of Design',
  location: 'Online',
  date: '2025-05-13',
  time: '6:30PM',
  students: [
    'Lisa Sakai Quinley',
    'Tak Watanabe',
    'Josh Strupp',
    'Hyeonjeong Kwon',
    'Daia Bromberg',
    'Monsicha Srisuantang',
    'Tan De Xuan',
    'Harshita Chakravadhanula',
    'Nour Al Safadi',
    'Katherine Chui',
    'Annie Lee',
    'Ian Yu',
    'Sanidhya Sharma',
    'Ani Matevosian',
    'Sophie Graves',
    'Steph Wu',
    'Livia Ramos',
  ].sort((a, b) => {
    const getLastName = (name) => name.split(' ').slice(-1)[0].toLowerCase();
    return getLastName(a).localeCompare(getLastName(b));
  }).concat(['parsons.nyc', 'parsons.nyc/ support'])
}
