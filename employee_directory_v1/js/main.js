//wait for page to load before running
$(document).ready(function () {

/*---------- Fetch Functions ----------*/

 //create fetch function
  const fetchData = (url) => {
   return fetch(url)
           //parse json
          .then (res => res.json())
  }

 //fetch data from url
fetchData('https://randomuser.me/api/?results=12&seed=foobar')
//show each user profile on page
.then(data => {
  createUser(data.results)
  let test = document.getElementById('grid');
  let test2 = document.getElementsByTagName('button');
  test.onclick =(e) => {
    if (e.target.textContent === test2[1].textContent)
      console.log(test2[1].textContent)
      buildModal(e.target.parentNode)
  }
})
//.catch(error => console.log('Looks like there was a problem', error))



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
  this.userName = document.createElement('button');
  this.userEmail = document.createElement('p');
  this.userCity = document.createElement('p');
  this.lineBreak = document.createElement('hr');
  this.userCell = document.createElement('p');
  this.userAdress = document.createElement('p');
  this.userDOB = document.createElement('p');

  //set user values
  this.userLi.className = 'profiles';
  this.userName.id = 'name';
  this.userImage.src = profile.picture.large;
  this.userName.textContent = profile.name.first +' '+ profile.name.last;
  this.userEmail.textContent = profile.email;
  this.userCity.textContent = profile.location.city;
     //reformat cell number
  this.userCell.textContent = profile.cell.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  this.userAdress.textContent = profile.location.street + ', ' + profile.location.state + ', ' + profile.location.postcode;
     //reformat dob
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
   formatCell (){
    this.userCell.textContent.replace(/[^\d]/g, "");
      return profile.cell.replace(/(\d{3})(\d{4})/, "($1) $2-#3")
   }

}//end of users class

 //create new user
 const createUser = (data) => {
   const user = new Users(data)
}//end of create user

/*---------- Create Modal ----------*/

  //build modal
const buildModal = (selectedProfile) => {
let mainHeader = document.getElementById('header');
let header = document.createElement('div');
  header.className ='modal';
  header.id = 'myModal';
let modalDiv = document.createElement('div');
modalDiv.className = 'modal-content';

  //create close button
let closeModal = document.createElement('span');
  closeModal.className = 'closebutton';
  closeModal.textContent = 'X';

  //create user info seciton
 let userInfo =selectedProfile.cloneNode(true);
 userInfo.children[4].style.display = 'block';
 userInfo.children[5].style.display = 'block';
 userInfo.children[6].style.display = 'block';
 userInfo.children[7].style.display = 'block';
  //append modal
  mainHeader.appendChild(header);
  header.append(modalDiv);
  modalDiv.appendChild(closeModal);
  modalDiv.append(userInfo);

// close modal
closeModal.onclick = (e)=>{
   header.remove();

  }
}//end of build modal

/*---------- Event Listeners ----------*/

  });//end ready
