let flagLoadFromJSON = false;

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

  addVideoToList(video, index) {

    console.log(`Index in ui.addVideoToList: ${index}`);
    const videoList = document.querySelector(".videoList");
    // Create tr element
    const row = document.createElement("tr");
    // Video id
    let id;
    // index tells if you start from 1 and go through the loop adding the ids
    // if is true, means that we have add a video and we need only to increment the last index number
    if (index === "false") {
      id = document.querySelector(".videoList").childElementCount + 1;
    } else {
      id = index + 1;
    }

    // Insert columns
    row.innerHTML = `
      <td>${id}</td>
      <td>${video.projectName}</td>
      <td>${video.videoTitle}</td>
      <td>${video.yourName}</td>
      <td>${video.eMail}</td>
      <td>${this.newDateFormat(video.videoDate)}</td>
      <td>${video.videoTime}</td>
      <td>${video.videoNo}</td>
      <td class="delete">X</td>
    `;
    //append element
    videoList.appendChild(row);
  }

  deleteVideo(target) {
    if(target.className === "delete") {
      // remove it from the memory
      target.parentElement.remove();
      // remove it from the local Storage
      Store.removeVideo(target);
      // show the success message
      ui.showAlert(`The video was deleted!`, "success");
    }
  }

  clearFields() {
    // clearing the form!
    // document.querySelector(".form").reset();
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

  //Writing the Date in the table in another format
  newDateFormat(date) {
  let stringArray = date.split("");
  let day = [], month = [], year = [];
  let index = 0;
  stringArray.forEach(function(item) {

    if(index === 0) {
      year.push(item);
    } else if (index === 1) {
      month.push(item);
    } else {
      day.push(item);
    }
    if(item === "-") {
      index++;
    }

  });
  console.log(`${day[0]}${day[1]} / ${month[0]}${month[1]} / ${year[0]}${year[1]}${year[2]}${year[3]}`);

  return`${day[0]}${day[1]} / ${month[0]}${month[1]} / ${year[0]}${year[1]}${year[2]}${year[3]}`

  }

};
// ui object!
const ui = new UI();

// Local Storage Class - static so we do not need to instantiate
class Store {

// Get Videos from LocalStorage
  static getVideosFromLS() {
    let videos;
    if(localStorage.getItem("videos") === null) {
      videos = [];
    } else {
      videos = JSON.parse(localStorage.getItem("videos"));
      console.log(`Getting books from the memory!`);
    }
    return videos;
  }

  static displayVideos() {
    const videos = Store.getVideosFromLS();
    //Looping through the videos and add it!
    videos.forEach(function(item, index) {
      ui.addVideoToList(item, index);
    });
  }

// Add Video to localStorage
  static addVideo(video) {
    const videos = Store.getVideosFromLS();
    // add to LocalStorage
    videos.push(video);
    localStorage.setItem("videos", JSON.stringify(videos));
  }

  static removeVideo(target) {

    const videos = Store.getVideosFromLS();
    //minus 1 because the index start at zero and the ArchivNo. start at 1.
    let compareValue = target.parentElement.cells[0].innerText-1;

    videos.forEach(function(item, index) {
      if(compareValue == index) {
        videos.splice(index, 1);
      };
    })

    //rewriting localStorage
    // localStorage.clear();
    localStorage.setItem("videos", JSON.stringify(videos));
  }

  static downloadLS() {
    const videos = Store.getVideosFromLS();
    console.log(videos);
  }

  static downloadVideosToJSON() {
    // Save as file
    // trying to save it as a file
    /*setting*/
    const videos = Store.getVideosFromLS();
    const fileJSON = JSON.stringify(videos);

    let dataUri = 'data:storage/json;charset=utf-8,'+ encodeURIComponent(fileJSON);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    document.body.removeChild(linkElement);
  }

  // The method XMLhttpRequest works only if you have a server installed.
  // easier way: go to your project file throught prompt command and type:
  // npm install -g live-server
  // run it typing: live-server
  static  loadJSON() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        // readyState 4: the response has been capture and can be used
        // status: http status of 200 means that everything is ok
        var videoList = "";
        if (this.readyState == 4 && this.status == 200) {
           // Convert the json to and object
           let table = JSON.parse(xhttp.responseText);

          for(let id = 0; id < table.length; id++)
          {
           videoList = document.querySelector(".videoList");
           // Create tr element
           const row = document.createElement("tr");

           // Insert columns
           row.innerHTML = `
             <td>${table[id].id}</td>
             <td>${table[id].projectName}</td>
             <td>${table[id].videoTitle}</td>
             <td>${table[id].yourName}</td>
             <td>${table[id].eMail}</td>
             <td>${table[id].videoDate}</td>
             <td>${table[id].videoTime}</td>
             <td>${table[id].videoNo}</td>
             <td>${table[id].X}</td>
           `;
           //append element
           videoList.appendChild(row);
         }

         /*Converting it to JSON*/
         let newTableJSON = JSON.stringify(table);
         console.log(newTableJSON);

          /*setting*/
          let TYPE = "./storage/json";
          const fileJSON = newTableJSON;
          let dlLink = document.createElement('a');
          // file name
          dlLink.download = "table.json";
          // path from the file
          dlLink.href = "./storage/table.json";
          dlLink.dataset.downloadurl = [TYPE, dlLink.download, dlLinkvideoToJSON.href].join(':');
          /*add, click and removing*/
          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);

        }
      };
      xhttp.open("GET", "./storage/table.json", true);
      xhttp.send();
    }
}


document.querySelector(".LoadTableFromJSON").addEventListener("click", function() {
  Store.loadJSON();
});

document.querySelector(".downloadVideoToJSON").addEventListener("click", function() {
  Store.downloadVideosToJSON();
});

Store.downloadLS();

//DOM Load Event: Initialization!
document.addEventListener("DOMContentLoaded", Store.displayVideos());

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
    ui.addVideoToList(video, "false");

    // Add video to LocalStorage
    Store.addVideo(video);

    // Save it to JSON
    Store.downloadVideosToJSON();

    // Show sucess message
    ui.showAlert(`Dear ${video.yourName}, the video: ${video.videoTitle} was added!`, "success");

    // Clear Fields
    ui.clearFields();

  }

  e.preventDefault();

});

// delete the video
document.querySelector(".videoList").addEventListener("click", function(e) {
  ui.deleteVideo(e.target);
});
