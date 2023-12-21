var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var BookMarkerList = [];
var boxInfo = document.getElementById("boxInfo");

//&_________________ Display LocalStorage Data when open if its founded  ________________

if (localStorage.getItem("BookMarkerList") != null) {
  BookMarkerList = JSON.parse(localStorage.getItem("BookMarkerList"));
  displayData(BookMarkerList);
}

//&__________________________ Add BookMarker Function  _________________________
var bookMarkerr;
function AddBookmarker() {
  if (
    siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
    bookMarkerr = {
      sName: bookmarkName.value,
      sUrl: siteUrl.value,
    };
    BookMarkerList.push(bookMarkerr);
    console.log(bookMarkerr);
    localStorage.setItem("BookMarkerList", JSON.stringify(BookMarkerList));
    displayData(BookMarkerList);
    clearInputs();
  } else {
    boxInfo.classList.replace("d-none", "d-flex");
  }
}

//&______________________________ Display Function  ____________________________

function displayData(BookMarkerList) {
  var cartona = "";
  for (var i = 0; i < BookMarkerList.length; i++) {
    cartona += `<tr>
                    <td>${i + 1}</td>
                    <td>${BookMarkerList[i].sName}</td>
                    <td>
                      <button class="btn btnVisit" onclick="visitWebsite(${i})">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                      </button>
                    </td>
                    <td>
                      <button class="btn btnDelete " onclick="deleteBookmarker(${i})">
                        <i class="fa-solid fa-trash-can pe-2"></i>Delete
                      </button>
                    </td>
                </tr>`;
  }
  document.getElementById("tableData").innerHTML = cartona;
}

//&_________________________ clear Inputs Function  _______________________

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
  theElement.classList.remove("is-invalid");
}

//&_________________________ Delete Bookmarker Function  ______________________

function deleteBookmarker(index) {
  Deleteindex = index;
  BookMarkerList.splice(index, 1);
  localStorage.setItem("BookMarkerList", JSON.stringify(BookMarkerList));

  displayData(BookMarkerList);
}

//&________________________ visit Bookmarker Function ______________________

function visitWebsite(e) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(BookMarkerList[e].sUrl)) {
    open(BookMarkerList[i].siteURL);
  } else {
    open(`https://${BookMarkerList[e].sUrl}`);
  }
}

//&________________________ Validate Function  _________________________

var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var nameRegex = /^\w{3,}(\s+\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteUrl.addEventListener("input", function () {
  validate(siteUrl, urlRegex);
});

function validate(theElement, regex) {
  var testRegex = regex;
  if (testRegex.test(theElement.value)) {
    theElement.classList.add("is-valid");
    theElement.classList.remove("is-invalid");
    return true;
  } else {
    theElement.classList.add("is-invalid");
    theElement.classList.remove("is-valid");
    return false;
  }
}

//&______________________ Close Info popUp Function  ________________________

function closeInfo() {
  boxInfo.classList.add("d-none");
}

closeBtn.addEventListener("click", closeInfo);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeInfo();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("boxInfo")) {
    closeInfo();
  }
});
