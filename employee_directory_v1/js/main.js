//wait for page to load before running
$(document).ready(function () {

  //get random user data using ajax and display to page
 $.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(response) {
      let userHTML = '<ul>';
    $.each(response.results, function (i, user) {
      userHTML += '<li>';
      userHTML += '<img src="' + user.picture.large + '"></li>';
      userHTML += `<h2>${user.name.first} ${user.name.last}</h2>`;
    userHTML += `<p>${user.email} </p>`;
    userHTML += `<p>${user.location.city}</p>`

 });
    userHTML += '</ul>';
    $('#employees').html(userHTML);

  }
 });//end success



   //create modal
let mainHeader = document.getElementById('header');
let header = document.createElement('div');
  header.className ='modal';
  header.id = 'myModal';
let modalDiv = document.createElement('div');
modalDiv.className = 'modal-content';

let closeModal = document.createElement('span');
  closeModal.className = 'closebutton';
  closeModal.textContent = 'X';
let userPhoto = document.createElement('img');
  userPhoto.src = 'https://randomuser.me/api/portraits/med/men/83.jpg';

  let userName = document.createElement('h2');
  userName.textContent = 'Romian hoogmoed';

  let userEmail = document.createElement('p');
  userEmail.textContent = 'romain.hoogmoed@example.com';

  let userCity = document.createElement('p');
  userCity.textContent = 'maasdriel';

  let lineBreak = document.createElement('hr');

  let userCell = document.createElement('p');
  userCell.textContent = '(656)-976-4980';

  let userAddress = document.createElement('p');
  userAddress.textContent = '1861 jan pieterszoon coenstraat, zeeland, 69217';

  let userDOB = document.createElement('p');
  userDOB.textContent = '1983-07-14';

  mainHeader.appendChild(header);
  header.append(modalDiv);
  modalDiv.appendChild(closeModal);
  modalDiv.append(userPhoto);
  modalDiv.append(userName);
  modalDiv.append(userEmail);
  modalDiv.append(userCity);
  modalDiv.append(lineBreak);
  modalDiv.append(userCell);
  modalDiv.append(userAddress);
  modalDiv.append(userDOB);

// close modal =
closeModal.onclick = (e)=>{
    header.remove();

  }

  });//end ready
