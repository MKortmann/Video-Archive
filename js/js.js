"use strict"
//TODO:
// 3) button to change the order of displayed video
// 4) able to reedit the entered informations
// 5) ablet to refill the inputs with the last add or clickesd information
// 6) Future: load videos from json: it should open a new window with the table of saves file.
// the user should click it and it will be reload from this data.
// Now should be able to open a window to select the specific file.

/**
 * The code is composed and written in the order below:
 * PART 1: INITIALIZATION/SETUP/STRUCTURE
 * Class Video: create an object for each video with the specific informations
 as project name, video title, user name and so on.
 * Class UI: used to manipulate the DOM. Here we see important methods from the
 user interface as addVideoToList, deleteVideo, clearFields, showAlertMessage,
 new date format and so on.
 * Class Store: we use here static methods to be able to call it without instatiating
 the class. Used to store the data to Local Storage (LS) and also to JSON.
 We see here many important methods as: getVideosFromLS, retrieveVideosFromLS,
 addVideo, removeVideo, downloadVideosToJSON, loadJSON.
 * PART 2: User Interface Interaction/LOGIC
 * We see here eventListeners for the buttons as Select Videos, Submit and so on.
 * SUBMIT BUTTON: here is where start the hole logic. We first check if the User
 * have add all the necessary information in the inputs fields. If not the User
 * will be alert. If yes, we do these steps:
 * 1) Add Video To list (and update the ui)
 * 2) Store the Video to Local Storage
 * 3) Store the Video to a JSON file that will be direct downloaded. (Backup-Security)
 * 4) Show the success message
 * 5) Clear all the input fields!
 * @summary KJP Video System concise functionality description.
 */


/*
 * PART 1: INITIALIZATION/SETUP/STRUCTURE
 */

/**
 * Creates an object video with the respective informations as
 * project Name, title and so on.
 * @class
 */
class Video {
  constructor(projectName = "", videoTitle = "", patientName = "", videoDate = "", videoTime = "", videoNo = "") {
    this.projectName = projectName;
    this.videoTitle = videoTitle;
    this.patientName = patientName;
    this.videoDate = videoDate;
    this.videoTime = videoTime;
    this.videoNo = videoNo;
    //variables from the local video data
    this.videoName = "";
    this.videoSize = "";
    this.videoType = "";
  }

  getLocalVideoInfos(name, size, type) {
    this.videoName = name;
    this.videoSize = size;
    this.videoType = type;
  }

  getFormData(projectName = "", videoTitle = "", patientName = "", videoDate = "", videoTime = "", videoNo = "") {
    this.projectName = projectName;
    this.videoTitle = videoTitle;
    this.patientName = patientName;
    this.videoDate = videoDate;
    this.videoTime = videoTime;
    this.videoNo = videoNo;
  }
};
//video object
let video = new Video();

/**
 * Creates an UI object video with the necessary methods to manipulate the DOM.
 * @class
 */
class UI {

  addVideoToList(video, index) {

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
      <!-- <td><video width="320" height="240" controls><source src="./videos/${video.videoName}" type="video/mp4"></video></td> -->
      <td class="videoFlex"><video width="160" height="auto" controls><source src="./videos/${video.videoName}" type="video/mp4"></video></td>
      <td>${video.projectName}</td>
      <td>${video.videoTitle}</td>
      <td>${video.patientName}</td>
      <td>${this.newDateFormat(video.videoDate)}</td>
      <td>${video.videoTime}</td>
      <td>${video.videoNo}</td>
      <td  class="delete">X</td>
    `;
    //append element
    videoList.appendChild(row);
  }

  deleteVideo(target) {
    if (target.className === "delete") {
      // remove it from the memory
      target.parentElement.remove();
      // remove it from the local Storage
      Store.removeVideo(target);
      // show the success message
      ui.showAlert(`The video was deleted!`, "success");
    }

    // Save it to JSON: extra backup! After savingToLocalStorageTheJSON file will be downlaoded.
    // It basically load the localstorage to an variable, convert it to JSON and download it.
    Store.downloadVideosToJSON();
  }

  clearFields() {
    // clearing the form!
    document.querySelector(".form").reset();
    document.querySelector(".openSelectVideoFile").innerText = "SELECT A VIDEO FILE";
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
    }, 4000);
  }

  //Writing the Date in the table in another format
  newDateFormat(date) {
    let stringArray = date.split("");
    let day = [],
      month = [],
      year = [];
    let index = 0;
    stringArray.forEach(function(item) {

      if (index === 0) {
        year.push(item);
      } else if (index === 1) {
        month.push(item);
      } else {
        day.push(item);
      }
      if (item === "-") {
        index++;
      }

    });
    // console.log(`${day[0]}${day[1]} / ${month[0]}${month[1]} / ${year[0]}${year[1]}${year[2]}${year[3]}`);

    return `${day[0]}${day[1]} / ${month[0]}${month[1]} / ${year[0]}${year[1]}${year[2]}${year[3]}`

  }

};
// ui object!
const ui = new UI();

/**
 * Local Storage Class - static so we do not need to instantiate
 * retrieve, save and delete information to the local storage
 * download JSON and LOAD JSON to the Local Storage
 * @class
 */
class Store {

  // Get Videos from LocalStorage
  static getVideosFromLS() {
    let videos;
    if (localStorage.getItem("videos") === null) {
      videos = [];
    } else {
      videos = JSON.parse(localStorage.getItem("videos"));
    }
    return videos;
  }

  static displayVideos() {
    const videos = Store.getVideosFromLS();
    //Looping through the videos and add it!
    videos.forEach(function(item, index) {
      ui.addVideoToList(item, index);
    });

    // IMPORTANT: here download the JSON file automatically in case there is no
    // video in the Local Storage!!!
    //In case of a server you can always ignore IGNORE THE LOCAL STORAGE
    //AND DOWNLOAD FILES FROM JSON... TODO: CHECK IT!
    // ////////////////////////////////////////////////////////////////////////////
    // if(videos.length === 0) {
    //   Store.loadJSON();
    // }
    // ///////////////////////////////////////////////////////////////////////////
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
    let compareValue = target.parentElement.cells[0].innerText - 1;

    videos.forEach(function(item, index) {
      if (compareValue == index) {
        videos.splice(index, 1);
      };
    })

    //rewriting localStorage
    // localStorage.clear();
    localStorage.setItem("videos", JSON.stringify(videos));
  }

  static downloadVideosToJSON() {
    // Save as file
    // trying to save it as a file
    /*setting*/
    const videos = Store.getVideosFromLS();
    const fileJSON = JSON.stringify(videos);

    // let dataUri = 'data:./storage/json;charset=utf-8,'+ encodeURIComponent(fileJSON);
    let dataUri = 'data:storage/json;charset=utf-8,' + encodeURIComponent(fileJSON);

    let exportFileDefaultName = 'table.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    linkElement.remove();
  }

  // The method XMLhttpRequest works only if you have a server installed.
  // easier way: go to your project file throught prompt command and type:
  // npm install -g live-server
  // run it typing: live-server
  static loadJSON() {
    var xhttp = new XMLHttpRequest();
    // we will use now onload instead of onreadystatechange. So we do not need
    // to check for this.readyState
    xhttp.onload = function() {
      // xhttp.onreadystatechange = function() {
      // readyState 4: the response has been capture and can be used
      // status: http status of 200 means that everything is ok
      var videoList = "";
      // if (this.readyState == 4 && this.status == 200) {
      if (this.status == 200) {
        // Convert the json to and object
        let videos = JSON.parse(xhttp.responseText);

        //loading the table
        //Looping through the videos and add it!
        videos.forEach(function(item, index) {
          ui.addVideoToList(item, index);
        });

        // Storing the table in the Local Storage
        localStorage.setItem("videos", JSON.stringify(videos));

      }
    };
    xhttp.open("GET", "./storage/table.json", true);

    xhttp.onerror = function() {
      console.log("Request error in XMLHttpRequest...");
    }
    xhttp.send();

  }
}

/*
 * PART 2: User Interface Interaction/LOGIC
 */
/* LOAD TABLE FROM A JSON FILE
 * As Backup it will load the JSON file! Necessary in case the Local Storage is
 * cleared!
 */
document.querySelector(".loadTableFromJSON").addEventListener("click", function() {
  //removing the old table!
  // document.querySelector(".videoList").remove();
  let taskList = document.querySelector(".videoList");
  if (taskList.children.length > 0) {
    do {
      taskList.children[taskList.children.length - 1].remove();
    } while (taskList.children.length > 0);
  }
  Store.loadJSON();
});

/* DOWNLOAD A VIDEO TO A JSON FILE
 * As Backup it will load the JSON file! Necessary in case the Local Storage is
 * cleared!
 */
document.querySelector(".downloadVideoToJSON").addEventListener("click", function() {
  Store.downloadVideosToJSON();
});

/* OPEN A DIALOG BOX TO SELECT A VIDEO
 * It opens a dialog box to be able to select the video to be stored. The info
 * capture is the name, file and size of the video. The videos should be always in
 * a specific folder already defined. In this case ./videos/*.mp4
 * At this moment the video must be copied to the videos folder!
 */
document.querySelector(".openSelectVideoFile").addEventListener("click", function() {

  // open a file selection dialog
  const input = document.createElement('input');
  input.type = 'file';
  // handle the selected file
  input.onchange = e => {
    const file = e.target.files[0];
    document.querySelector(".openSelectVideoFile").innerText = file.name;
    video.getLocalVideoInfos(file.name, file.size, file.type);
  }
  input.click();
});

/* REMOVE FORM FOR BETTER TABLE VISUALIZATION
 * It toogles the form to be allowed to see only the table on the screen
 */
document.querySelector(".toggleContainer").addEventListener("click", function() {
  if (document.querySelector(".container").classList.contains("openClose")) {
    document.querySelector(".toggleContainer").innerText = "Remove the input form";
    document.querySelector(".container").classList.toggle("openClose");
  } else {
    document.querySelector(".toggleContainer").innerText = "Add the input form";
    document.querySelector(".container").classList.toggle("openClose");
  }
});


// IMPOSSIBLE: IT'S BLOCKED! YOU CAN NOT RUN A BAT;EXE;CMD DATEI DIRECT FROM CLIENT
// WE WILL NEED TO USE NODE.JS
// document.querySelector(".runBat").addEventListener("click", function() {
//   // var wshShell = new ActiveXObject("WScript.Shell");
//   // wshShell.Run("C:\\Git_Repository\\Video-Archive\\bat\\run.bat");
//
//   // var oShell = WScript.CreateObject("WScript.Shell");
//   // console.log(oShell);
//   // oShell.Exec("start D:\dir\user.bat");
//
//   // <a href="#file.bat">Batch File</a>
//
//
//   // let dataUri = 'data:./storage/json;charset=utf-8,'+ encodeURIComponent(fileJSON);
//   // let dataUri = '#run.bat';
//   let dataUri = 'run.cmd';
//
//   // let exportFileDefaultName = 'user.bat';
//
//   let linkElement = document.createElement('a');
//   linkElement.setAttribute('href', dataUri);
//   // linkElement.setAttribute('download', exportFileDefaultName);
//   linkElement.click();
//   linkElement.remove();
//
//   console.log("clicked!");
//
// });

/* DOM Load Event: Initialization!
 * It's a very important step. Here the localStorage will be retrieve and the table
 * list of videos will be filled.
 */
document.addEventListener("DOMContentLoaded", Store.displayVideos());

/* SUBMIT
 * It submit the form! Here is where the hole logic of this video archive starts.
 * 1) Add Video To list (and update the ui)
 * 2) Store the Video to Local Storage
 * 3) Store the Video to a JSON file that will be direct downloaded. (Backup-Security)
 * 4) Show the success message
 * 5) Clear all the input fields!
 */
document.querySelector("#submit").addEventListener("click", function(e) {

  const projectName = document.querySelector(".projectName").value;
  const videoTitle = document.querySelector(".videoTitle").value;
  const patientName = document.querySelector(".patientName").value;
  const videoDate = document.querySelector(".videoDate").value;
  const videoTime = document.querySelector(".videoTime").value;
  const videoNo = document.querySelector(".videoNo").value;
  //Check if you have selected a file
  const videoFile = document.querySelector(".openSelectVideoFile").innerText;

  video.getFormData(projectName, videoTitle, patientName, videoDate, videoTime, videoNo);

  // Validate input
  if (!validateProjectName(projectName) || !validateVideoTitle(videoTitle) || !validatepatientName(patientName) || !validateDate(videoDate) || !validateTime(videoTime) || !validateVideoNo(videoNo)) {
    ui.showAlert("Please, check your inputs!", "error");
  } else if (videoFile === "SELECT A VIDEO FILE") {
    ui.showAlert("Please, select a video!", "error");
  } else {
    // Add video to the video list table
    ui.addVideoToList(video, "false");
    // Add video to LocalStorage: it will load the local storage and push the new video
    Store.addVideo(video);
    // Save it to JSON: extra backup! After savingToLocalStorageTheJSON file will be downlaoded.
    // It basically load the localstorage to an variable, convert it to JSON and download it.
    Store.downloadVideosToJSON();
    // Show sucess message
    ui.showAlert(`Dear ${video.patientName}, the video: ${video.videoTitle} has been added!`, "success");
    // Clear Fields
    ui.clearFields();
  }
  e.preventDefault();
});
/* DELETE THE VIDEO
 * If the user clicked in the X field, it will clear the video and update the
 * Local Storage. In this case, will not be generate a JSON file.
 */
document.querySelector(".videoList").addEventListener("click", function(e) {
  ui.deleteVideo(e.target);
});

/*
***REGULAR EXPRESSIONS TO VALIDATE THE INPUT!!!!
*/
// Validate functions to check the inputs: Using Regular expressions
// ProjectName should be only carachters from min. 3 to max. 12.
function validateProjectName(projectName) {
  const re = /^[a-zA-Z]{3,12}$/;
  if(!re.test(projectName)) {
    ui.showAlert("Please, the project name must be between 3 and 12 characters", "error");
  } else {
    return true;
  }
}

// videoTitle should be only carachters from min. 3 to max. 12.
function validateVideoTitle(videoTitle) {
  const re = /^[a-zA-Z]{3,10}$/;
  if(!re.test(videoTitle)) {
    ui.showAlert("Please, the video title must be between 3 and 10 characters", "error");
  } else {
    return true;
  }
}
// patientName should be only carachters the firstname, lastname FORMAT!!!
function validatepatientName(patientName) {
  const re = /^([a-zA-Z]{3,10})\,[ ]([a-zA-Z]{3,10})$/;
  if(!re.test(patientName)) {
    ui.showAlert("Please, your name should be written in this format: firstname, lastname! The first and lastname must be between 3 and 10 characters!", "error");
  } else {
    return true;
  }
}
// videoDate should be in the format mm/dd/yyyy
function validateDate(videoDate) {
  // We check this format here: "2019-07-05"
  const re = /^\d{4}[-]\d{2}[-]\d{2}$/;
  if(!re.test(videoDate)) {
    ui.showAlert("Please, the date should be in the format mm/dd/yyyy", "error");
  } else {
    return true;
  }
}
// videoTime should be in the format dd:dd
function validateTime(videoTime) {
  // We check this format here: "01:01"
  const re = /^\d{2}[:]\d{2}$/;
  if(!re.test(videoTime)) {
    ui.showAlert("Please, the time should be in the format dd:dd", "error");
  } else {
    return true;
  }
}
// videoTime should be in the format dd:dd
function validateVideoNo(videoNo) {
  // We check that the video number should have max. 4 digits!
  // First way to write:
  // const re = /^\d{1,4}$/;
  // Second way to write: To make it differently
  const re = /^[0-9]{1,4}$/;
  if(!re.test(videoNo)) {
    ui.showAlert("Please, the video number must be between 1 and 9999", "error");
  } else {
    return true;
  }
}
