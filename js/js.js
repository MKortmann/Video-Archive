
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
}

class UI {

  addVideoToList(video) {

    const videoList = document.querySelector(".videoList");

    // Create tr element
    const row = document.createElement("tr");
    // Insert columns
    row.innerHTML = `
      <td>${video.projectName}</td>
      <td>${video.videoTitle}</td>
      <td>${video.yourName}</td>
      <td>${video.eMail}</td>
      <td>${video.videoDate}</td>
      <td>${video.videoTime}</td>
      <td>${video.videoNo}</td>
    `;
    //append element
    videoList.appendChild(row);
  }

}


document.querySelector("#submit").addEventListener("click", function() {

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
    alert("Check your input!");
  }

  class ui = new UI();

  ui.addVideoToList(video);

  console.log(`Project Name: ${projectName}, VideoTile: ${videoTitle}, yourName: ${yourName}, eMail: ${eMail}, videoDate: ${videoDate}, videoTime: ${videoTime}, videoNo: ${videoNo}`);

});
