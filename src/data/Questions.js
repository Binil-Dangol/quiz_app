const countries = [
  "United States", "Nepal", "Mexico", "Brazil", "Germany", "France", "Italy", 
  "Spain", "Japan", "India", "China", "Australia", "South Korea", "South Africa",
];

// const questions = [
//   {
//     type: "flag",
//     imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/800px-Flag_of_Nepal.svg.png",
//     options: ["Nepal", "India", "Bhutan", "China"],
//     correctOption: "Nepal",
//   },
//   {
//     type: "flag",
//     imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/167px-Flag_of_Bangladesh.svg.png",
//     options: ["Bangladesh", "Pakistan", "Sri Lanka", "Nepal"],
//     correctOption: "Bangladesh",
//   },
//   {
//     type: "flag",
//     imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png",
//     options: ["USA", "UK", "Canada", "Australia"],
//     correctOption: "USA",
//   },
//   {
//     type: "flag",
//     imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/1024px-Flag_of_India.svg.png",
//     options: ["India", "UK", "Canada", "Bhutan"],
//     correctOption: "India",
//   },
// ];

const questions = [
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png",
    correctOption: "United States",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/800px-Flag_of_Nepal.svg.png",
    correctOption: "Nepal",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/1024px-Flag_of_India.svg.png",
    correctOption: "India",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/143px-Flag_of_Brazil.svg.png",
    correctOption: "Brazil",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/150px-Flag_of_France.svg.png",
    correctOption: "France",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/167px-Flag_of_Germany.svg.png",
    correctOption: "Germany",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/150px-Flag_of_Italy.svg.png",
    correctOption: "Italy",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/150px-Flag_of_Japan.svg.png",
    correctOption: "Japan",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/200px-Flag_of_Australia.svg.png",
    correctOption: "Australia",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/150px-Flag_of_South_Korea.svg.png",
    correctOption: "South Korea",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/150px-Flag_of_Spain.svg.png",
    correctOption: "Spain",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/150px-Flag_of_South_Africa.svg.png",
    correctOption: "South Africa",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/175px-Flag_of_Mexico.svg.png",
    correctOption: "Mexico",
  },
  {
    type: "flag",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/150px-Flag_of_the_People%27s_Republic_of_China.svg.png",
    correctOption: "China",
  },

  // maps

  // {
  //   type: "map",
  //   imageUrl: "path/to/us-map.jpg", // Replace with actual image paths
  //   correctOption: "United States",
  // },
  // {
  //   type: "map",
  //   imageUrl: "path/to/brazil-map.jpg",
  //   correctOption: "Brazil",
  // },
  // {
  //   type: "map",
  //   imageUrl: "path/to/india-map.jpg",
  //   correctOption: "India",
  // },
  // {
  //   type: "map",
  //   imageUrl: "path/to/germany-map.jpg",
  //   correctOption: "Germany",
  // },
];

export {questions, countries};