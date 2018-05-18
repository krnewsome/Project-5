//wait for page to load before running
$(document).ready(function () {

    //select main header and grid
    const mainHeader = document.getElementById('header');
    const userProfileUl = document.getElementById('grid');

    //create foundUserSet
    const foundUsersSet = new Set();

    /*---------- Search button -----------*/

    //create search form
    const searchForm = document.createElement('form');
    searchForm.name = 'userSearch';

    //create search input field
    const searchField = document.createElement('input');
    searchField.type = 'text';
    searchField.name = 'userSearch';
    searchField.placeholder = 'User Search';

    //create search button
    const searchButton = document.createElement('button');
    searchButton.name = 'userSearch';
    searchButton.textContent = 'Search';
    searchButton.className = 'searchButton';

    //append search field to page
    searchForm.append(searchField);
    searchForm.append(searchButton);
    mainHeader.append(searchForm);

    //add submit event listner to form
    searchForm.onsubmit = (e) => {
      e.preventDefault();

      //clear found user set for new search
      foundUsersSet.clear();

      //capture user name input
      let searchFieldVal = searchField.value;

      //select all 12 user names on page
      let userNames = document.getElementsByTagName('h2');

      //get all 12 user emails on page
      let userEmails = document.getElementsByClassName('email');

      //check searchfield value against user Names and emails
      for (i = 0; i < userNames.length; i++) {
        if (userNames[i].textContent.toUpperCase().includes(searchFieldVal.toUpperCase()) || userEmails[i].textContent.toUpperCase().includes(searchFieldVal.toUpperCase())) {
          //if there is a match show user profile
          foundUsersSet.add(userNames[i].parentNode);
          userNames[i].parentNode.style.display = 'block';
        } else {
          //if not hide user profile
          userNames[i].parentNode.style.display = 'none';
        }
      }//end of loop
    };//end of submit event listener

    /*---------- Fetch Functions ----------*/

    //create fetch function
    const fetchData = (url) => {
      return fetch(url)

    //parse json
    .then(res => res.json());
    };

    //fetch data from url, specify for only 12  user profiles that are US nationality
    fetchData('https://randomuser.me/api/?results=12&&nat=us')
.then(data => {
      //create each user using the retrieved data results and show on page
      createUser(data.results);

      //create modal when user profile is selected
      createModal();
    })

//log error message if an error occurs
.catch(error => console.log('Looks like there was a problem', error));

    /*---------- Help Functions ----------*/

    //create users class for users
    class Users {
      constructor (data) {
        let profiles = data.map(profile => {
          this.pageGrid = document.getElementById('grid');

          //create user profile list
          this.userLi = document.createElement('li');
          this.userImage = document.createElement('img');
          this.userName = document.createElement('h2');
          this.userEmail = document.createElement('p');
          this.userCity = document.createElement('p');
          this.lineBreak = document.createElement('hr');
          this.userCell = document.createElement('p');
          this.userAdress = document.createElement('p');
          this.userDOB = document.createElement('p');

          //set user profile values
          this.userLi.className = 'profiles';

          //user image
          this.userImage.src = profile.picture.large;

          //set the user name and change the first charater to uppercase
          this.userName.textContent = `${profile.name.first.charAt(1).toUpperCase() + profile.name.first.slice(1)} ${profile.name.last.charAt(1).toUpperCase() + profile.name.last.slice(1)}`;

          //user email
          this.userEmail.textContent = profile.email;
          this.userEmail.className = 'email';

          //user city
          this.userCity.textContent = profile.location.city;

          //reformat user cell number to (111)111-11111
          this.userCell.textContent = profile.cell.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

          //user address
          this.userAdress.textContent = `${profile.location.street}, ${profile.location.state}, ${profile.location.postcode}`;

          //reformat user dob to 01/01/01
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
      const user = new Users(data);
    };//end of create user

    //createModal function
    const createModal = () => {
      //add click event listener to parent element of user profiles
      userProfileUl.onclick = (e) => {
          //build modal for the user profile that is clicked
          if (e.target !== userProfileUl && e.target.className !== 'profiles') {
            buildModal(e.target.parentNode);
          } else if (e.target.className === 'profiles')
      buildModal(e.target);
        };
    };//end of createModal function

    /*---------- Create Modal ----------*/

    //build modal function that accepts the profile information that was selected
    const buildModal = (selectedProfile) => {
      let header = document.createElement('div');
      header.className = 'modal';
      let modalDiv = document.createElement('div');
      modalDiv.className = 'modal-overlay';

      //create close button
      let closeModal = document.createElement('span');
      closeModal.className = 'closebutton';
      closeModal.textContent = 'X';

      //create clone of user profile
      let userInfo = selectedProfile.cloneNode(true);

      //create navigation buttons
      //next user button
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next User';
      nextButton.className = 'navBtn';

      //previous user button
      const prevButton = document.createElement('button');
      prevButton.textContent = 'Previous User';
      prevButton.className = 'navBtn';

      //add event listener to next and button
      nextButton.onclick = () => {
        if (selectedProfile.nextElementSibling !== null) {
          header.remove();
          buildModal(selectedProfile.nextElementSibling);
        }
      };

      //add event listener to prev and button
      prevButton.onclick = () => {
        if (selectedProfile.previousElementSibling !== null) {
          header.remove();
          buildModal(selectedProfile.previousElementSibling);
        } else {console.log('error');
        }
      };

      //show hidden user info sections
      userInfo.children[2].style.display = 'block';
      userInfo.children[4].style.display = 'block';
      userInfo.children[5].style.display = 'block';
      userInfo.children[6].style.display = 'block';
      userInfo.children[7].style.display = 'block';
      userInfo.className = 'modalContent';

      //append modal to to page
      mainHeader.appendChild(header);
      header.append(modalDiv);

      //check if first user profile before apending button
      if (selectedProfile !== userProfileUl.children[0] && (foundUsersSet.size === 12 || foundUsersSet.size === 0))  {
        userInfo.append(prevButton);
      }

      //check if last user profile before apending button
      if (selectedProfile !== userProfileUl.children[11] && (foundUsersSet.size === 12 || foundUsersSet.size === 0)) {
        userInfo.append(nextButton);
      }

      //append the close button as the first element
      userInfo.prepend(closeModal);
      modalDiv.append(userInfo);

      // add event listener to close modal
      closeModal.onclick = () => {
        header.remove();
      };
    };//end of build modal
  });//end ready
