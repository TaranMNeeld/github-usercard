/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const container = document.querySelector('.container');

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];
const realFollowers = [];

//My data
axios.get('https://api.github.com/users/taranmneeld')
  .then((response) => {
    container.appendChild(createGitHubCard(response));
  })
  .catch((err) => {
    console.log(err)
  })

//Stretch: Dynamic follower data
axios.get('https://api.github.com/users/taranmneeld/followers')
  .then((response) => {
    response.data.forEach(follower => {
      axios.get(`https://api.github.com/users/${follower.login}`)
      .then((data) => {
        container.appendChild(createGitHubCard(data));
      })
    });
  })
  .catch((err) => {
    console.log(err)
  })

//followersArray data
followersArray.forEach(follower => {
  axios.get(`https://api.github.com/users/${follower}`)
  .then((response) => {
    container.appendChild(createGitHubCard(response));
  })
  .catch((err) => {
    console.log(err)
  })
});

function createGitHubCard(user) {

  const card = document.createElement('div');
  card.classList.add('card');

  const userImage = document.createElement('img');
  userImage.setAttribute('src', user.data.avatar_url);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = user.data.name;

  const username = document.createElement('p');
  username.classList.add('username');
  username.textContent = user.data.login;

  const location = document.createElement('p');
  location.textContent = 'Location: ' + user.data.location;

  const link = document.createElement('a');
  link.setAttribute('href', user.data.html_url);

  const profile = document.createElement('p');
  profile.textContent = 'Profile: ' + link;

  const followerCount = document.createElement('p');
  followerCount.textContent = 'Followers: ' + user.data.followers;

  const followingCount = document.createElement('p');
  followingCount.textContent = 'Following: ' + user.data.following;

  const bio = document.createElement('p');
  bio.textContent = 'Bio: ' + user.data.bio;

  card.appendChild(userImage);
  card.appendChild(cardInfo);

  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followerCount);
  cardInfo.appendChild(followingCount);
  cardInfo.appendChild(bio);

  return card;
}