document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const submitButton = document.getElementById("submit-btn");
  let timeOut = null;
  let erros = {};
  const mailformatRegex = /^[^@]+@\w+(\.\w+)+\w$/;

  document.querySelectorAll(".form-box").forEach((box) => {
    const boxInput = box.querySelector("input");
    boxInput.addEventListener("keydown", (event) => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        validation(box, boxInput);
      }, 300);
    });
  });

  const validation = (box, boxInput) => {
    if (boxInput.value === "") {
      showError(true, box, boxInput);
    } else {
      showError(false, box, boxInput);
    }

    if (boxInput.name === "email") {
      if (!boxInput.value.match(mailformatRegex)) {
        showError(true, box, boxInput);
      }
    }
    if (boxInput.name === "password") {
      if (boxInput.value.length <= 6) {
        showError(true, box, boxInput);
      } 
    }
    enableSubmitButton(submitController());
  };

  const showError = (check, box, boxInput) => {
    if (check) {
      box.classList.remove("form-success");
      box.classList.add("form-error");
      erros[boxInput.name] = true;
    } else {
      box.classList.remove("form-error");
      box.classList.add("form-success");
      erros[boxInput.name] = false;
    }
  };

  const submitController = () => {
    for (const key in erros) {
      if (erros[key] === true || Object.keys(erros).length < 3) return false;
    }
    return true;
  };

  const enableSubmitButton = (check) => {
    return check
      ? submitButton.toggleAttribute("disabled", false)
      : submitButton.toggleAttribute("disabled", true);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log([...formData]);
  });
});
