//wait for page to load before running
$(document).ready(function () {

/*---------- Fetch Functions ----------*/

 //create fetch function
  const fetchData = (url) => {
   return fetch(url)
           //parse json
          .then (res => res.json())
  }

 //fetch data from url, specify for only 12  user profiles
fetchData('https://randomuser.me/api/?results=12')
//show each user profile on page
.then(data => {
  //create each user using the retrieved data results
  createUser(data.results);
  createModal();

})
.catch(error => console.log('Looks like there was a problem', error))



/*---------- Help Functions ----------*/

//display user profiles to page

//create users class for users
class Users {
  constructor (data){
   let profiles = data.map(profile =>{
   this.pageGrid = document.getElementById('grid');

  //create user list
  this.userLi = document.createElement('li');
  this.userImage = document.createElement('img');
  this.userName = document.createElement('h2');
  this.userEmail = document.createElement('p');
  this.userCity = document.createElement('p');
  this.lineBreak = document.createElement('hr');
  this.userCell = document.createElement('p');
  this.userAdress = document.createElement('p');
  this.userDOB = document.createElement('p');

  //set user values
  this.userLi.className = 'profiles';
  this.userImage.src = profile.picture.large;
   //set the user name and change the first charater to uppercase
  this.userName.textContent = profile.name.first.charAt(1).toUpperCase() + profile.name.first.slice(1) +' '+            profile.name.last.charAt(1).toUpperCase() + profile.name.last.slice(1);

  this.userEmail.textContent = profile.email;
  this.userCity.textContent = profile.location.city;
     //reformat cell number to (111)111-11111
  this.userCell.textContent = profile.cell.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  this.userAdress.textContent = profile.location.street + ', ' + profile.location.state + ', ' + profile.location.postcode;
     //reformat dob to 01/01/01
  this.userDOB.textContent = `Birthday: ${new Date(profile.dob).toLocaleDateString()}`;
   //apend profile elements
  this.userLi.append(this.userImage);
  this.userLi.append(this.userName);
  this.userLi.append(this.userEmail);
  this.userLi.append(this.userCity);
  this.userLi.append(this.lineBreak);
  this.userLi.append(this.userCell);
  this.userLi.append(this.userAdress);
  this.userLi.append(this.userDOB);

  //hide user information that is not for the main page
     this.lineBreak.style.display = 'none';
     this.userCell.style.display = 'none';
     this.userAdress.style.display = 'none';
     this.userDOB.style.display = 'none';

  //append profiles to the page
    this.pageGrid.append(this.userLi);
   });//end of map
  }//end of constructor
}//end of users class

 //create new user function
 const createUser = (data) => {
   const user = new Users(data)
}//end of create user

 //createModal function
 const createModal = () =>{
  let userProfileUl = document.getElementById('grid');
  userProfileUl.onclick =(e) => {
    console.log(e.target)
    if(e.target !== userProfileUl && e.target.className !== 'profiles'){
      buildModal(e.target.parentNode);
    } else if(e.target.className === 'profiles')
    buildModal(e.target)
      }
 };//end of createModal function

/*---------- Create Modal ----------*/

  //build modal function that accepts the profile information that was selected
const buildModal = (selectedProfile) => {
let mainHeader = document.getElementById('header');
let header = document.createElement('div');
  header.className ='modal';
let modalDiv = document.createElement('div');
modalDiv.className = 'modal-overlay';

  //create and append close button
let closeModal = document.createElement('span');
  closeModal.className = 'closebutton';
  closeModal.textContent = 'X';

  //create clone of user profile
 let userInfo =selectedProfile.cloneNode(true);

 //show hidden user info sections
 userInfo.children[2].style.display = 'block'
 userInfo.children[4].style.display = 'block';
 userInfo.children[5].style.display = 'block';
 userInfo.children[6].style.display = 'block';
 userInfo.children[7].style.display = 'block';
 userInfo.classList='modalContent'
  //append modal to to page
  mainHeader.appendChild(header);
  header.append(modalDiv);
 userInfo.prepend(closeModal);
  modalDiv.append(userInfo);

// add event listener to close modal
closeModal.onclick = ()=>{
   header.remove();

  }
}//end of build modal

/*---------- Event Listeners ----------*/

  });//end ready
