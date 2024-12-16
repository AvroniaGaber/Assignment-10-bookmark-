var siteName = document.getElementById("websiteName");

var siteURL = document.getElementById("websiteURL");

var allData = [];

if (localStorage.getItem("data") !== null) {
  allData = JSON.parse(localStorage.getItem("data"))
  displayData()
}

function addData() {
  if (validationData(websiteName, 'massageName') && validationData(websiteURL, 'massageURL')) {
    var data = {
      name: siteName.value,
      url: siteURL.value,
    };
    allData.push(data);
    localStorage.setItem("data", JSON.stringify(allData));
    displayData();
    clearData()
    console.log(allData);
  }
  else{ 
    massageBox.classList.remove('d-none');
  }
}

function clearData() {
  siteName.value = "";
  siteURL.value = "";
  siteName.classList.remove('is-valid');
  siteURL.classList.remove('is-valid');
}

function displayData() {
  var product = "";
  for (var i = 0; i < allData.length; i++) {
    product += `
      <tr>
      <td>${i}</td>
      <td>${allData[i].name}</td>
      <td>
      <button onclick="VisitData(${i})" class="btn text-capitalize btn-outline-warning"> 
       <i class="fa-solid fa-eye"></i> Visit
      </button>
      </td>
      <td>
        <button onclick="deleteData(${i})" class="btn text-capitalize btn-outline-danger ">
         <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    </tr>`
  }
  document.getElementById("tableData").innerHTML = product;
}

function VisitData(index) {
  window.open(allData[index].url, "_blank")
}

function deleteData(index) {
  allData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(allData));
  displayData()
}

function validationData(element, massage) {
  var massage = document.getElementById(massage)
  var Regex = {
    websiteName: /^\w{3,}(\s+\w+)*$/,
    websiteURL: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/,
  };

  if (Regex[element.id].test(element.value) == true) {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    massage.classList.add('d-none');
    return true;
  }
  else {
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    massage.classList.remove('d-none');
    return false;
  }
}
