/**
 * Initializes the application once the DOM content is fully loaded.
 * It selects all character options and triggers password generation.
 */
document.addEventListener("DOMContentLoaded", () => {
  selectAllChars();
  generatePassword();
});

/**
 * Selects all checkboxes that represent character options for password generation.
 * This ensures all character types are included in the password by default.
 */
function selectAllChars() {
  const checkboxes = document.querySelectorAll(".checkbox_input");
  checkboxes.forEach(checkbox => checkbox.checked = true);
}

/**
 * Triggers the click event on the generate button to create a password.
 * Assumes there is an element with an ID of "generate" that, when clicked, 
 * initiates password generation.
 */
function generatePassword() {
  document.getElementById("generate").click();
} 

/**
 * Generates a password based on the user's selections and sets the value of the input field and the range slider.
 * @param {number} length The length of the password to generate
 * @param {boolean} useUppercase Whether to include uppercase characters in the password
 * @param {boolean} useLowercase Whether to include lowercase characters in the password
 * @param {boolean} useNumbers Whether to include numbers in the password
 * @param {boolean} useSpecial Whether to include special characters in the password
 */
document.getElementById("generate").addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value);
  const useUppercase = document.getElementById("uppercase").checked;
  const useLowercase = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSpecial = document.getElementById("symbols").checked;

  // The characters to include in the password
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+";

  // Combine the characters into a single string
  let allChars = "";
  if (useUppercase) allChars += upperChars;
  if (useLowercase) allChars += lowerChars;
  if (useNumbers) allChars += numberChars;
  if (useSpecial) allChars += specialChars;

  // If no character types are selected, show an error message
  if (allChars === "") {
    alert("Choose a character type to generate a password !");
    return;
  }

  // Generate the password
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  // Set the tooltip text
  const tooltipElement = document.getElementById("myTooltip");
  (password) ? tooltipElement.innerText = "Copy" : console.log(error);

  const easyToRead = document.getElementById("easy-to-read");
  if(easyToRead.checked) {
    avoidAmbiguousChars();
  }
  
  // Set the value of the input field and the range slider
  document.getElementById("slider").value = password.length;
  document.getElementById("generated-password").value = password;
});

/**
 * Handles the password length range input and updates the value of the input field and the range slider.
 * @function passwordLengthRange
 */
function passwordLengthRange() {
  const sliderRange = document.getElementById("slider");
  const passwordLength = document.getElementById("length");  

  /**
   * Updates the value of the input field when the user drags the slider.
   * @param {Event} event The input event triggered by the slider.
   */
  sliderRange.addEventListener("input", (event) => {
    // Update the value of the input field when the user drags the slider
    passwordLength.value = sliderRange.value;
    generatePassword();
    rangeSlider();
  });

  /**
   * Updates the value of the range slider when the user types in the input field.
   * @param {Event} event The input event triggered by the input field.
   */
  passwordLength.addEventListener("input", (event) => {
    // Update the value of the range slider when the user types in the input field.
    sliderRange.value = passwordLength.value;
    generatePassword();
    rangeSlider();
  });
}

passwordLengthRange();

/**
 * Copies the generated password to the clipboard.
 */
function copyPassword() {
  const copyButtonElement = document.getElementById("copy"); 
  /**
   * When the copy button is clicked, copy the generated password
   * to the clipboard.
   */
  copyButtonElement.addEventListener("click", () => {
    const passwordElement = document.getElementById("generated-password").value;
    navigator.clipboard.writeText(passwordElement);
    
    const tooltipElement = document.getElementById("myTooltip");
    if (passwordElement === "") {      
      // If no password is generated, show an error message
      alert("Please generate a password first!");
    } else {
      // If a password is generated, show "Copied" as the tooltip text
      tooltipElement.innerText = "Copied";
    }
  });
}
copyPassword();


document.getElementById("copyBtn").addEventListener("click", () => {
  copyButtonActive();
});

/**
 * Copies the generated password to the clipboard and shows a temporary alert
 * with the text "Copied".
 * @function copyButtonActive
 */
function copyButtonActive() {
  const passwordElement = document.getElementById("generated-password").value;
  navigator.clipboard.writeText(passwordElement);

  // Show a temporary alert with the text "Copied"
  const btnAlert = document.querySelector(".copy-btn-alert");
  btnAlert.classList.add("fadeInUp");
  btnAlert.style.visibility = "visible";

  // Hide the alert after 2.5 seconds
  setTimeout(() => {
    btnAlert.classList.remove("fadeInUp");
    btnAlert.style.visibility = "hidden";
  }, 2500);
}


document.getElementById("all-characters").addEventListener("click", () => {
  allCharsSelected();
});

/**
 * Selects all character types when the "All" radio button is clicked.
 */
function allCharsSelected() {
  const useUppercase = document.getElementById("uppercase");
  const useLowercase = document.getElementById("lowercase");
  const useNumbers = document.getElementById("numbers");
  const useSpecial = document.getElementById("symbols");
  
  const radioAllChars = document.getElementById("all-characters");

  if (radioAllChars.checked) {
    // Select all character types when the "All" radio button is clicked
    useUppercase.checked = true;
    useLowercase.checked = true;
    useNumbers.checked = true;
    useSpecial.checked = true;
  } else {
    // Do nothing if the "All" radio button is not checked
    return false;
  }
}


/**
 * Avoids ambiguous characters in the generated password.
 * This function removes characters that can be easily confused,
 * such as '0', 'O', '1', and 'I', from the generated password.
 */
function avoidAmbiguousChars() {
  const generatedPassword = document.getElementById("generated-password");
  const easyToRead = document.getElementById("easy-to-read"); 

  // Add an event listener to the "easy-to-read" checkbox
  easyToRead.addEventListener("click", () => {
    // Replace ambiguous characters in the password
    const filteredPassword = generatedPassword.value.replace(/[0O1Il]/g, "");
    // Set the filtered password as the new value
    generatedPassword.value = filteredPassword;
  }); 
}

avoidAmbiguousChars();

/**
 * Ensures that the "easy-to-say" checkbox controls the "numbers" and "special" checkboxes.
 * If the "easy-to-say" checkbox is checked, the "numbers" and "special" checkboxes are unchecked.
 */
function avoidNumSpecial() {
  const easyToSay = document.getElementById("easy-to-say");

  // Add an event listener to the "easy-to-say" checkbox
  easyToSay.addEventListener("click", () => {
    const useNumbers = document.getElementById("numbers");
    const useSpecial = document.getElementById("symbols");

    // If the "easy-to-say" checkbox is checked, uncheck the "numbers" and "special" checkboxes
    if (easyToSay.checked) {
      useNumbers.checked = false;
      useSpecial.checked = false;
    }
  });
}

avoidNumSpecial();
  
/**
 * Updates the appearance of the range input based on password length.
 * Adjusts the width and background color of the range input thumb to indicate password strength.
 * @function rangeSlider
 */
function rangeSlider() {
  const rangeInputElement = document.getElementById("passwordStrength");
  const passwordLength = document.getElementById("length").value;
  const strongLabelElement = document.querySelector(".strong-label");

  // Set thumb properties for password length greater than or equal to 11
  if (passwordLength >= 11) {    
    rangeInputElement.style.setProperty("--thumb-width", "100%");
    rangeInputElement.style.setProperty("--thumb-background-color", "#04ac01");
    strongLabelElement.style.backgroundColor = "#04ac01";
    strongLabelElement.innerHTML = "Very strong";
  }
  // Set thumb properties for password length 10 or less
  if (passwordLength <= 10) {
    rangeInputElement.style.setProperty("--thumb-width", "75%");
    rangeInputElement.style.setProperty("--thumb-background-color", "rgb(0, 168, 120)");
    strongLabelElement.style.backgroundColor = "#4CCD99";
    strongLabelElement.innerHTML = "Strong";
  }
  // Set thumb properties for password length 8 or less
  if (passwordLength <= 8) {
    rangeInputElement.style.setProperty("--thumb-width", "50%");
    rangeInputElement.style.setProperty("--thumb-background-color", "rgb(239, 194, 15)");
    strongLabelElement.style.backgroundColor = "rgb(239, 194, 15)";
    strongLabelElement.innerHTML = "Good";
  }
  // Set thumb properties for password length 6 or less
  if (passwordLength <= 6) {
    rangeInputElement.style.setProperty("--thumb-width", "25%");
    rangeInputElement.style.setProperty("--thumb-background-color", "rgb(223, 102, 97)");
    strongLabelElement.style.backgroundColor = "rgb(223, 102, 97)";
    strongLabelElement.innerHTML = "Weak";
  }
  // Set thumb properties for password length 3 or less
  if (passwordLength <= 3) {
    rangeInputElement.style.setProperty("--thumb-width", "5%");
    rangeInputElement.style.setProperty("--thumb-background-color", "red");
    strongLabelElement.style.backgroundColor = "red";
    strongLabelElement.innerHTML = "Very weak";
  }
}

rangeSlider();

  