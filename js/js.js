
class Video {
  constructor(projectName, videoTitle, yourName, eMail, videoDate, videoTime, videoNo) {
    this.projectName = projectName;
    this.videoTitle = videoTitle;
    this.yourName = yourName;
    this.eMail = eMail;
    this.videoDate = videoDate;
    this.videoTime = videoTime;
    this.videoNo = videoNo;
  }
};

class UI {

  addVideoToList(video) {

    const videoList = document.querySelector(".videoList");
    // Create tr element
    const row = document.createElement("tr");
    // Video id
    let id = document.querySelector(".videoList").childElementCount + 1;

    // Insert columns
    row.innerHTML = `
      <td>${id}</td>
      <td>${video.projectName}</td>
      <td>${video.videoTitle}</td>
      <td>${video.yourName}</td>
      <td>${video.eMail}</td>
      <td>${video.videoDate}</td>
      <td>${video.videoTime}</td>
      <td>${video.videoNo}</td>
      <th class="delete">X</th>
    `;
    //append element
    videoList.appendChild(row);
  }

  deleteVideo(target) {
    if(target.className === "delete") {
      target.parentElement.remove();
    }
  }

  clearFields() {
    // document.querySelector(".projectName").value = "";
    // document.querySelector(".videoTitle").value = "";
    // document.querySelector(".yourName").value = "";
    // document.querySelector(".eMail").value = "";
    // document.querySelector(".videoDate").value = "";
    // document.querySelector(".videoTime").value = "";
    // document.querySelector(".videoNo").value = "";
  }

  showAlert(message, className) {
    //create div
    const div = document.createElement("div");
    //add classes: the class alert is used to be able to remove it afterwards!
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get the element to be insert it
    const container = document.querySelector(".container");
    // get the element in which the div will be insert before it
    const form = document.querySelector(".form");
    // insert alert
    container.insertBefore(div, form);

    //the message should disappear after 3 seconds
    setTimeout(function() {
      document.querySelector(".alert").remove();
    },3000);
  }



};
// ui object!
const ui = new UI();

document.querySelector("#submit").addEventListener("click", function(e) {

  const projectName = document.querySelector(".projectName").value;
  const videoTitle = document.querySelector(".videoTitle").value;
  const yourName = document.querySelector(".yourName").value;
  const eMail = document.querySelector(".eMail").value;
  const videoDate = document.querySelector(".videoDate").value;
  const videoTime = document.querySelector(".videoTime").value;
  const videoNo = document.querySelector(".videoNo").value;

  const video = new Video(projectName, videoTitle, yourName, eMail, videoDate, videoTime, videoNo);

  console.log(video);

  // Validate input
  if(projectName === "" || videoTitle === "" || yourName === "" || eMail === "" || videoDate === "" || videoTime === "" || videoNo === "") {

    ui.showAlert("Please, check your input!", "error");

  } else {

    // Add video to the video list table
    ui.addVideoToList(video);

    // Show sucess message
    ui.showAlert("The Video was added!", "success");

    // Clear Fields
    ui.clearFields();

  }

  e.preventDefault();

});

// delete the video
document.querySelector(".videoList").addEventListener("click", function(e) {
  ui.deleteVideo(e.target);
});
