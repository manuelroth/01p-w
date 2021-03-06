document.addEventListener("DOMContentLoaded", function() {
  try {
    let app = firebase.app();
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        window.isLoggedIn = true;
        toggleUI();
        document.querySelector("#user").textContent = user.displayName;
        getImagesByUserId(user.uid);
      } else {
        window.isLoggedIn = false;
      }
    });
  } catch (error) {
    console.error(`(error): ${JSON.stringify(error)}`);
  }
});

function showHome() {
  if (!window.isLoggedIn) {
    window.location.href = "/";
    $("#currentweek").text("All");
  } else {
    showSingle(event, "", "", "All", new Date().getFullYear());
  }
}

function signIn(event) {
  event.preventDefault();
  const email = document.querySelector("#login_email").value;
  const password = document.querySelector("#login_password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function() {
      var currentUser = firebase.auth().currentUser;
      document.querySelector("#login_email").value = "";
      document.querySelector("#login_password").value = "";
      if (currentUser.emailVerified) {
        toggleUIElement("#loginfield");
      } else {
        document.querySelector("#login_error").innerHTML =
          "Email address is not verified yet. Please check your inbox to confirm your registration and refresh this page.";
        toggleUIElement("#resendEmail");
      }
    })
    .catch(error => {
      console.error(`(signIn): (${error.code}) ${error.message}`);
      document.querySelector("#login_error").innerHTML =
        "Sorry, invalid email or password. Please try again.";
    });
}

function resendVerificationEmail() {
  var currentUser = firebase.auth().currentUser;
  currentUser.sendEmailVerification();
}

function closeSignIn() {
  toggleUIElement("#loginfield");
  document.querySelector("#loginform").classList.remove("hidden");
  document.querySelector("#forgotpwForm").classList.add("hidden");
  document.querySelector("#forgotpwInput").classList.remove("hidden");
  document.querySelector("#afterreset").innerHTML = "";
  document.querySelector("#forgotpw_email").value = "";
  document.querySelector("#forgotpw_error").innerHTML = "";
  document
    .querySelector("#registrationFormContainer")
    .classList.remove("hidden");
  document.querySelector("#emailVerification").classList.add("hidden");
  document.querySelector("#signup_error").innerHTML = "";
  document.querySelector("#login_error").innerHTML = "";
  document.querySelector("#resendEmail").classList.add("hidden");
}

function showForgotPwForm() {
  toggleUIElement("#loginform");
  toggleUIElement("#forgotpwForm");
}

function resetPassword() {
  var emailAddress = document.querySelector("#forgotpw_email").value;
  if (emailAddress !== "") {
    var auth = firebase.auth();
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function() {
        document.querySelector("#forgotpw_error").innerHTML = "";
        document.querySelector(
          "#afterreset"
        ).innerHTML = `Thank you! An email has been sent to ${emailAddress} containing a link to reset your password.`;
        document.querySelector("#forgotpw_email").value = "";
        document.querySelector("#forgotpwInput").classList.add("hidden");
      })
      .catch(function(error) {
        console.error(`(reset password): (${error.code}) ${error.message}`);
        document.querySelector("#forgotpw_error").innerHTML =
          "An error occured while resetting your password. Please try again.";
        document.querySelector("#forgotpw_email").value;
      });
  } else {
    document.querySelector("#forgotpw_error").innerHTML =
      "Please enter a valid email address.";
  }
}

function showTermsOfUse() {
  toggleUIElement("#termsofuse");
  document.querySelector("#privacypolicy").classList.add("hidden");
}

function showPrivacyPolicy() {
  toggleUIElement("#privacypolicy");
  document.querySelector("#termsofuse").classList.add("hidden");
}

function toggleUIElement(element) {
  if (document.querySelector(element)) {
    document.querySelector(element).classList.toggle("hidden");
  }
}

function showSingle(event, id, caption, week, year) {
  if (event) {
    event.stopPropagation();
  }
  window.singleElementPage = id;
  $("#currentweek").text(week);
  $("#currentyear").text(year);
  $("#caption").removeClass("hidden");
  $("#week").removeClass("visible");
  $("#single > div").each(function() {
    $(this).addClass("hidden");
  });
  if (id) {
    $("#gallery").addClass("hidden");
    $(`#single`).removeClass("hidden");
    $(`.fullscreen`).removeClass("hidden");
    $(`#single-${id}`).removeClass("hidden");
    $("#captionInputElement").data("id", id);
    if (caption !== "") {
      $("#captionInput").addClass("hidden");
      $("#captionText").removeClass("hidden");
      $("#captionText").text(caption);
    } else {
      $("#captionInput").removeClass("hidden");
      $("#captionText").addClass("hidden");
    }
  } else {
    // when all is clicked
    window.singleElementPage = undefined;
    $("#caption").addClass("hidden");
    $("#gallery").removeClass("hidden");
    $(`#single`).addClass("hidden");
    $(`.fullscreen`).addClass("hidden");
  }
}

async function saveCaption(event) {
  event.preventDefault();
  event.stopPropagation();
  const id = $("#captionInputElement").data("id");
  const caption = $("#captionInputElement").val();
  $("#captionText").text(caption);
  await firebase
    .firestore()
    .collection("images")
    .doc(id)
    .update({
      caption: caption
    });
  $("#captionInput").addClass("hidden");
  $("#captionText").removeClass("hidden");
  $("#captionText").text(caption);
}

function captionTextFocused(event) {
  event.preventDefault();
  event.stopPropagation();
  $("#captionInput").removeClass("hidden");
  $("#captionText").addClass("hidden");
  $("#captionInputElement").val($("#captionText").text());
  $("#captionInputElement").focus();
}

function captionInputTextInserted() {
  if ($("#captionInputElement").val().length !== 0) {
    $("#captionSaveButton").attr("disabled", false);
  } else {
    $("#captionSaveButton").attr("disabled", true);
  }
}

function changeYear(event, year) {
  event.stopPropagation();
  $("#week").toggleClass("visible");
  $("#year").toggleClass("visible");
  $("#currentyear").html(year);
  $(`.dropdownWeekItem`).addClass("hidden");
  $(`.dropdownWeekItem-`).removeClass("hidden");
  $(`.dropdownWeekItem-${year}`).removeClass("hidden");
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      window.unsubscribe();
      toggleUI();
      hideUI();
      document.querySelector("#templateContainer").innerHTML = "";
    });
}

function signUp(event) {
  event.preventDefault();
  const user = {
    firstname: document.querySelector("#signup_firstname").value,
    lastname: document.querySelector("#signup_lastname").value,
    email: document.querySelector("#signup_email").value,
    password: document.querySelector("#signup_password").value,
    confirmpassword: document.querySelector("#signup_confirmpassword").value,
    policy: document.querySelector("#signup_policy").checked
  };

  if (validateSignUpForm(user)) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(function() {
        var currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({
          displayName: `${user.firstname} ${user.lastname}`
        });
        document.querySelector("#signup_firstname").value = "";
        document.querySelector("#signup_lastname").value = "";
        document.querySelector("#signup_email").value = "";
        document.querySelector("#signup_password").value = "";
        document.querySelector("#signup_confirmpassword").value = "";
        currentUser
          .sendEmailVerification()
          .then(function() {
            toggleUIElement("#registrationFormContainer");
            toggleUIElement("#emailVerification");
          })
          .catch(function(error) {
            console.error(
              `(send verification email): (${error.code}) ${error.message}`
            );
            signup_error(
              "An error happend while sending the verification email. Please try to register again."
            );
          });
      })
      .catch(error => {
        document.querySelector("#signup_firstname").value = "";
        document.querySelector("#signup_lastname").value = "";
        document.querySelector("#signup_email").value = "";
        document.querySelector("#signup_password").value = "";
        document.querySelector("#signup_confirmpassword").value = "";
        console.error(`(signUp): (${error.code}) ${error.message}`);
        signup_error(
          "The user already exists. Please log in</br>or sign up with a new account."
        );
      });
  }
}

function validateSignUpForm(user) {
  if (
    !user.firstname ||
    !user.lastname ||
    !user.email ||
    !user.password ||
    !user.confirmpassword
  ) {
    signup_error("Please fill out all the fields");
    return false;
  }
  if (user.password !== user.confirmpassword) {
    signup_error("Passwords don't match.");
    return false;
  }
  if (user.policy !== true) {
    signup_error("Privacy and membership policy must be accepted.");
    return false;
  }
  return true;
}

function signup_error(message) {
  document.querySelector("#signup_error").innerHTML = message;
}

function showSettings() {
  var user = firebase.auth().currentUser;
  var username = user.displayName.split(" ");
  document.querySelector("#setting_firstname").value = username[0];
  document.querySelector("#setting_lastname").value = username[1];
  document.querySelector("#setting_email").value = user.email;
  toggleUIElement("#profilefield");
  document.querySelector("#profilefieldform").classList.remove("hidden");
  document.querySelector("#deleteAccount").classList.add("hidden");
  document.querySelector("#showDeleteAccount_error").innerHTML = "";
  document.querySelector("#deleteAccount_error").innerHTML = "";
}

function updateProfile(event) {
  event.preventDefault();
  const user = {
    firstname: document.querySelector("#setting_firstname").value,
    lastname: document.querySelector("#setting_lastname").value,
    email: document.querySelector("#setting_email").value,
    oldpassword: document.querySelector("#setting_oldpassword").value,
    password: document.querySelector("#setting_password").value,
    confirmpassword: document.querySelector("#setting_confirmpassword").value
  };

  if (validateSettingForm(user)) {
    var currentUser = firebase.auth().currentUser;
    let username = `${user.firstname} ${user.lastname}`;
    var credentials = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      user.oldpassword
    );
    if (currentUser.displayName !== username) {
      currentUser
        .updateProfile({
          displayName: username
        })
        .then(function() {
          document.querySelector("#user").textContent = username;
        })
        .catch(function(error) {
          console.error(`(updateProfile): (${error.code}) ${error.message}`);
          setting_error("Updating the username failed. Please try again.");
        });
    }
    if (currentUser.email !== user.email) {
      currentUser
        .reauthenticateAndRetrieveDataWithCredential(credentials)
        .then(function() {
          currentUser
            .updateEmail(user.email)
            .then(function() {
              signOut();
            })
            .catch(function(error) {
              console.error(
                `(updateProfile): (${error.code}) ${error.message}`
              );
              setting_error(
                "Updating the email address failed. Please try again."
              );
            });
        })
        .catch(function(error) {
          console.error(`(updateProfile): (${error.code}) ${error.message}`);
        });
    }
    currentUser
      .reauthenticateAndRetrieveDataWithCredential(credentials)
      .then(function() {
        currentUser
          .updatePassword(user.password)
          .then(function() {
            // Update successful.
          })
          .catch(function(error) {
            console.error(`(updateProfile): (${error.code}) ${error.message}`);
            setting_error("Updating the password failed. Please try again.");
          });
      })
      .catch(function(error) {
        console.error(`(updateProfile): (${error.code}) ${error.message}`);
      });

    document.querySelector("#setting_oldpassword").value = "";
    document.querySelector("#setting_password").value = "";
    document.querySelector("#setting_confirmpassword").value = "";
    setting_error("");
  }
}

function validateSettingForm(user) {
  if (
    !user.firstname ||
    !user.lastname ||
    !user.email ||
    !user.password ||
    !user.confirmpassword
  ) {
    setting_error("Please fill out all the fields.");
    return false;
  }
  if (user.password !== user.confirmpassword) {
    setting_error("Passwords don't match.");
    return false;
  }
  return true;
}

function setting_error(message) {
  document.querySelector("#setting_error").innerHTML = message;
}

function showDeleteAccount() {
  if (document.querySelector("#setting_oldpassword").value !== "") {
    toggleUIElement("#profilefieldform");
    toggleUIElement("#deleteAccount");
  } else {
    document.querySelector("#showDeleteAccount_error").innerHTML =
      "Please enter your current password to delete your account.";
  }
}

function cancelDeleteAccount() {
  toggleUIElement("#profilefieldform");
  toggleUIElement("#deleteAccount");
  document.querySelector("#deleteAccount_error").innerHTML = "";
  document.querySelector("#showDeleteAccount_error").innerHTML = "";
}

function deleteAccount() {
  var currentUser = firebase.auth().currentUser;
  var credentials = firebase.auth.EmailAuthProvider.credential(
    currentUser.email,
    document.querySelector("#setting_oldpassword").value
  );
  currentUser
    .reauthenticateAndRetrieveDataWithCredential(credentials)
    .then(function() {
      currentUser
        .delete()
        .then(function() {
          signOut();
          document.querySelector("#setting_oldpassword").value = "";
        })
        .catch(function(error) {
          console.error(`(deleteAccount): (${error.code}) ${error.message}`);
          document.querySelector("#deleteAccount_error").innerHTML =
            "Deleteing your account failed. Please try again.";
        });
    })
    .catch(function(error) {
      console.error(`(deleteAccount): (${error.code}) ${error.message}`);
      document.querySelector("#deleteAccount_error").innerHTML =
        "Deleteing your account failed. Please try again.";
    });
}

function toggleUI() {
  const elements = [
    "#user",
    "#login",
    "#logout",
    "#popup",
    "#description",
    "#gallery"
  ];
  for (const element of elements) {
    if (document.querySelector(element)) {
      document.querySelector(element).classList.toggle("hidden");
    }
  }
}

function hideUI() {
  const elements = [
    "#profilefield",
    "#privacypolicy",
    "#termsofuse",
    "#single",
    ".fullscreen",
    "#optionbar",
    "#captionbar"
  ];
  for (const element of elements) {
    if (document.querySelector(element)) {
      document.querySelector(element).classList.add("hidden");
    }
  }
}

function getImagesByUserId(userId) {
  const yearAndWeek = getYearAndWeek(new Date());
  const currentWeek = parseInt(yearAndWeek[1]);
  const currentYear = parseInt(yearAndWeek[0]);
  const ref = firebase
    .firestore()
    .collection("images")
    .where("uid", "==", userId)
    .orderBy("year", "desc")
    .orderBy("week", "desc");
  ref.get().then(async querySnapshot => {
    if (querySnapshot.size === 0) {
      await createImage(currentWeek, currentYear.toString());
    } else {
      const firstDoc = querySnapshot.docs[0].data();
      // if most actual document is current week and has already an image
      // add image for next week
      if (
        firstDoc.year === currentYear &&
        firstDoc.week === currentWeek &&
        firstDoc.downloadUrl
      ) {
        await createImage(currentWeek + 1, currentYear.toString());
      } else if (firstDoc.year === currentYear && firstDoc.week < currentWeek) {
        // if most actual document is not the current week
        const numberOfWeeks = currentWeek - firstDoc.week;
        for (let i = 0; i < numberOfWeeks; i++) {
          await createImage(currentWeek - i, currentYear.toString());
        }
      } else if (
        firstDoc.year !== currentYear &&
        firstDoc.week !== currentWeek
      ) {
        for (let i = 0; i < currentWeek; i++) {
          await createImage(currentWeek - i, currentYear.toString());
        }
      }
    }
    window.unsubscribe = ref.onSnapshot(async querySnapshot => {
      const images = [];
      const singleImages = [];
      const weeks = [];

      weeks.push({
        label: "All",
        hidden: ""
      });
      const yearsSet = new Set();

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const label = getLabel(data.week);
        if (
          data.downloadUrl !== undefined &&
          data.downloadUrl !== "" &&
          data.downloadUrl !== null
        ) {
          singleImages.push(
            Object.assign({}, data, { id: doc.id, label: label })
          );
          const hidden = currentYear === data.year ? "" : "hidden";
          weeks.push({
            id: doc.id,
            label: label,
            year: data.year,
            caption: data.caption,
            hidden: hidden
          });
        }
        const other = { id: doc.id, label: label };
        if (data.year === currentYear && data.week > currentWeek) {
          other.nextWeek = true;
        }
        images.push(Object.assign({}, data, other));
        yearsSet.add(data.year);
      });

      for (let i = 0; i < singleImages.length; i++) {
        if (singleImages.length === 1) {
          singleImages[0].prevId = singleImages[0].id;
          singleImages[0].nextId = singleImages[0].id;
          singleImages[0].prevCaption = singleImages[0].caption;
          singleImages[0].nextCaption = singleImages[0].caption;
        } else {
          if (i === 0) {
            singleImages[i].prevId = singleImages[singleImages.length - 1].id;
            singleImages[i].nextId = singleImages[i + 1].id;
            singleImages[i].prevCaption =
              singleImages[singleImages.length - 1].caption;
            singleImages[i].nextCaption = singleImages[i + 1].caption;
          } else if (i === singleImages.length - 1) {
            singleImages[i].prevId = singleImages[i - 1].id;
            singleImages[i].nextId = singleImages[0].id;
            singleImages[i].prevCaption = singleImages[i - 1].caption;
            singleImages[i].nextCaption = singleImages[0].caption;
          } else {
            singleImages[i].prevId = singleImages[i - 1].id;
            singleImages[i].nextId = singleImages[i + 1].id;
            singleImages[i].prevCaption = singleImages[i - 1].caption;
            singleImages[i].nextCaption = singleImages[i + 1].caption;
          }
        }
      }

      const years = [];
      for (let year of yearsSet) years.push({ year: year });
      const context = {
        images: images,
        singleImages: singleImages,
        weeks: weeks,
        years: years
      };
      if (!window.handlebarsTemplate) {
        window.handlebarsTemplate = document.querySelector(
          "#entry-template"
        ).innerHTML;
      }
      const template = Handlebars.compile(window.handlebarsTemplate);
      document.querySelector("#templateContainer").innerHTML = template(
        context
      );
      toggleUIElement("#gallery");
      toggleUIElement("#captionbar");
      addEventListeners();
      if (window.singleElementPage !== undefined) {
        const image = context.images.find(
          image => image.id === window.singleElementPage
        );
        showSingle(
          null,
          window.singleElementPage,
          image.caption,
          image.label,
          image.year
        );
      }
    });
  });
}

function getLabel(index) {
  let label = "";
  if (index < 9) {
    label = "0" + index;
  } else {
    label = label + index;
  }
  return label;
}

async function createImage(week, year) {
  try {
    await firebase
      .firestore()
      .collection("images")
      .add({
        uid: firebase.auth().currentUser.uid,
        week: parseInt(week),
        year: parseInt(year)
      });
  } catch (error) {
    console.error(`(error): ${JSON.stringify(error)}`);
  }
}

async function addImage(event) {
  try {
    event.preventDefault();
    event.stopPropagation();
    const addImageElement = document.querySelector(
      `#addimageelement-${event.target.dataset.id}`
    );
    const file = document.querySelector(
      `#addimageinput-${event.target.dataset.id}`
    ).files[0];
    const originalName = file.name;
    loadImage(
      file,
      async function(canvas) {
        await canvas.toBlob(async function(blob) {
          const storageRef = firebase.storage().ref();
          const yearAndWeek = getYearAndWeek(new Date());
          const fileName = `${firebase.auth().currentUser.uid}/${
            yearAndWeek[0]
          }/${yearAndWeek[1]}-${getUUID()}`;
          const uploadTask = storageRef.child(fileName).put(blob, {
            contentDisposition: `attachment; filename="${originalName}"`
          });
          window.progressBarInstance = new ProgressBar.Line("#progress", {
            color: "#000000"
          });

          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = snapshot.bytesTransferred / snapshot.totalBytes;
              console.log("Progress: ", progress);
              window.progressBarInstance.set(progress);
            },
            error => {
              window.progressBarInstance.destroy();
              console.error(`(error): ${JSON.stringify(error)}`);
              addImageElement.style.backgroundImage = "url(../img/plus.png)";
            },
            async () => {
              window.progressBarInstance.destroy();
              const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
              await firebase
                .firestore()
                .collection("images")
                .doc(event.target.dataset.id)
                .update({
                  imagePath: uploadTask.snapshot.ref.fullPath,
                  downloadUrl: downloadUrl
                });
              addImageElement.style.backgroundImage = "url(../img/plus.png)";
            }
          );
        });
      },
      { orientation: true }
    );
  } catch (error) {
    console.error(`(error): ${JSON.stringify(error)}`);
    addImageElement.style.backgroundImage = "url(../img/plus.png)";
  }
}

function getYearAndWeek(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}

async function deleteImage(event) {
  event.preventDefault();
  event.stopPropagation();
  try {
    const doc = await firebase
      .firestore()
      .collection("images")
      .doc(event.target.dataset.id)
      .get();
    if (doc.exists) {
      var data = doc.data();
      await firebase
        .storage()
        .ref()
        .child(data.imagePath)
        .delete();
      await firebase
        .firestore()
        .collection("images")
        .doc(event.target.dataset.id)
        .update({
          imagePath: null,
          downloadUrl: null,
          caption: null
        });
    }
  } catch (error) {
    console.error(`(error): ${JSON.stringify(error)}`);
  }
}

function showDeleteImage(event, id) {
  event.preventDefault();
  event.stopPropagation();
  document.querySelector(`#imageDialog-${id}`).classList.add("hidden");
  document.querySelector(`#deleteImageDialog-${id}`).classList.remove("hidden");
}

function hideDeleteImage(event, id) {
  event.preventDefault();
  event.stopPropagation();
  document.querySelector(`#imageDialog-${id}`).classList.remove("hidden");
  document.querySelector(`#deleteImageDialog-${id}`).classList.add("hidden");
}

function getUUID() {
  let date = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    let randomNumber = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c == "x" ? randomNumber : (randomNumber & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

function setCountDown() {
  var element = document.getElementById("nextweektext");
  if (element) {
    // Set the date we're counting down to
    var d = new Date();
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7) + 1);
    d.setHours(0, 0, 0, 0);

    var countDownDate = d.getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      element.innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        element.innerHTML = "Add your weekly image!";
      }
    }, 1000);
  }
}

function addEventListeners() {
  setCountDown();
  $("#optionbar").addClass("hidden");
  if (!window.userProfileClickAdded) {
    $("header #user").on("click", function() {
      window.userProfileClickAdded = true;
      $("#optionbar").toggleClass("hidden");
      $("#captionbar").toggleClass("hidden");
    });
  }

  $("#optionbar .pointer").on("click", function() {
    if ($(window).width() < 1025) {
      $("#optionbar").addClass("hidden");
      $("#captionbar").removeClass("hidden");
    }
  });
  $(".fullscreen").on("click", function() {
    if (screenfull.enabled) {
      screenfull.request();
      $("header, footer, #captionbar, #optionbar").addClass("hidden");
      $("#single").addClass("fullsize");
    }
  });
  $(".fullcross").on("click", function() {
    if (screenfull.enabled) {
      screenfull.exit();
      $("header, footer, #captionbar, #optionbar").removeClass("hidden");
      $("#single").removeClass("fullsize");
    }
  });
  $("#nextWeek").hover(
    function() {
      document.querySelector(`#addimageelement--nextweek`).style.display =
        "none";
      document.querySelector(`#nextweektext`).style.display = "flex";
    },
    function() {
      document.querySelector(`#addimageelement--nextweek`).style.display =
        "block";
      document.querySelector(`#nextweektext`).style.display = "none";
    }
  );
  // document.getElementById("fullscreen").addEventListener("click", () => {
  //   if (screenfull.enabled) {
  //     screenfull.toggle();
  //     // $("header, footer, #captionbar, #optionbar").addClass("invisible");
  //     // $("#single").addClass("fullsize");
  //   }
  // });

  // document.getElementById("fullcross").addEventListener("click", () => {
  //   if (screenfull.enabled) {
  //     screenfull.exit();
  //     // $("header, footer, #captionbar, #optionbar").removeClass("invisible");
  //     // $("#single").removeClass("fullsize");
  //   }
  // });
}
