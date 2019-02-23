function errorClass() {
  const currentState = document.getElementById('err_output');
  if (currentState.className === 'hidden') {
    currentState.className = 'visible';
    setTimeout(errorClass, 5000);
  } else {
    currentState.className = 'hidden';
  }
}
