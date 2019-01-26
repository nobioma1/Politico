//'nav' sidebar on dashboard
let navDisplay = () => {
	let element = document.getElementById('nav');

	if (element.style.display === 'block'){
		element.style.display = 'none';
	} else {
		element.style.display = 'block';
	}
};

document.getElementById('nav-btn').addEventListener("click", navDisplay);


//Popups
let modal = (id) => {
  let modalDisplay = document.getElementById(id).style;

  if (modalDisplay.display === 'block' ) {
    modalDisplay.display ='none';
  } else {
    modalDisplay.display ='block';
  }
};