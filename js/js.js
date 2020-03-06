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
 as datei name, video title, user name and so on.
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
 * dateiName, videoDate, title and so on.
 * @class
 */
class Video {
  constructor(dateiName = "", videoDate = "", patientName = "", piz = "", icdABC = [],
              dsfS=[], leitungName="") {
    this.dateiName = dateiName;
    this.videoDate = videoDate;
    this.patientName = patientName;
    this.piz = piz;
    this.icdABC = icdABC;
    this.dsfS = dsfS;
    //variables from the local video data
    this.leitungName = "";
  }

  getLocalVideoInfos(name, size, type) {
    this.videoName = name;
    this.videoSize = size;
    this.videoType = type;
  }

  getFormData(dateiName="", videoDate = "", patientName = "", piz = "", icdABC = [],
              dsfS=[], leitungName="") {
    this.dateiName = dateiName;
    this.videoDate = videoDate;
    this.patientName = patientName;
    this.piz = piz;
    this.icdABC = icdABC;
    this.dsfS = dsfS;
    //variables from the local video data
    this.leitungName = "";
  }
};
//video object
let video = new Video();

/**
 * Creates an UI object video with the necessary methods to manipulate the DOM.
 * @class
 */
class UI {
  //add video to the table
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
      <td>${video.dateiName}</td>
      <!-- <td><video width="320" height="240" controls><source src="./videos/${video.videoName}" type="video/mp4"></video></td> -->
      <td class="videoFlex"><video width="160" height="auto" controls><source src="./videos/${video.dateiName}" type="video/mp4"></video></td>
      <td>${video.videoDate}</td>
      <td>${video.patientName}</td>
      <td>${video.icdABC[0]}</td>
      <td>${video.icdABC[1]}</td>
      <td>${video.icdABC[2]}</td>
      <td>${this.dsfS[0]}</td>
      <td>${this.dsfS[1]}</td>
      <td>${this.dsfS[2]}</td>
      <td>${this.dsfS[3]}</td>
      <td>${this.dsfS[4]}</td>
      <td>${this.dsfS[5]}</td>
      <td>${video.leitungName}</td>
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
  // Clear the input fields
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

}; //end of class UI
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

  // Add Video to localStorage: we get the stored videos, add the new (push), then
  // set the localStorage again
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
} //end of class storage


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
 * Why? Because of the restrictions/security added by all browsers!
 * At this moment the video must be copy/save direct to the videos folder!
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
    document.querySelector(".toggleContainer").innerText = "Eingabeformular schließen";
    document.querySelector(".container").classList.toggle("openClose");
  } else {
    document.querySelector(".toggleContainer").innerText = "Eingabeformular öffnen";
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
// document.addEventListener("DOMContentLoaded", Store.displayVideos());

/* SUBMIT
 * It submit the form! Here is where the hole logic of this video archive starts.
 * 1) Add Video To list (and update the ui)
 * 2) Store the Video to Local Storage
 * 3) Store the Video to a JSON file that will be direct downloaded. (Backup-Security)
 * 4) Show the success message
 * 5) Clear all the input fields!
 */
document.querySelector("#submit").addEventListener("click", function(e) {

  const videoDate = document.querySelector(".videoDate").value;
  const patientName = document.querySelector(".patientName").value;
  const piz = document.querySelector(".piz").value;
  const icdA = document.querySelector(".icdA").value;
  const icdB = document.querySelector(".icdB").value;
  const icdC = document.querySelector(".icdC").value;
  const icdABC = [icdA, icdB, icdC];

  const dsf1 = document.querySelector(".dsf1").checked;
  const dsf2 = document.querySelector(".dsf2").checked;
  const dsf3 = document.querySelector(".dsf3").checked;
  const dsf4 = document.querySelector(".dsf4").checked;
  const dsf5 = document.querySelector(".dsf5").checked;
  const alle = document.querySelector(".alle").checked;
  const dsfS = [dsf1, dsf2, dsf3, dsf4, dsf5, alle];

  const leitungName = document.querySelector(".leitungName").value;

  //Check if you have selected a file
  const dateiName = document.querySelector(".openSelectVideoFile").innerText;

  video.getFormData(dateiName, videoDate, patientName, piz, icdABC, dsfS, leitungName);

  // Validate inputs
  if (dateiName === "SELECT A VIDEO FILE") {
    ui.showAlert("Please, select a video!", "error");
  } else if (!validateDate(videoDate) || !validateName(patientName) || !validatePiz(piz)
      || !validateIcdABC(icdABC)|| !validateDsfS(dsfS) || !validateName(leitungName)) {
    ui.showAlert("Please, check your inputs!", "error");
  }  else {
    // Add video to the video list table
    ui.addVideoToList(video, "false");
    // Add video to LocalStorage: it will load the local storage and push the new video
    Store.addVideo(video);
    // Save it to JSON: extra backup! After savingToLocalStorageTheJSON file will be downlaoded.
    // It basically load the localstorage to an variable, convert it to JSON and download it.
    Store.downloadVideosToJSON();
    // Show sucess message
    ui.showAlert(`Hallo ${video.leitungName}, das Video: ${video.dateiName} ist hochgeladen!`, "Erfolg");
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
// function validateProjectName(projectName) {
//   const re = /^[a-zA-Z]{3,12}$/;
//   if(!re.test(projectName)) {
//     ui.showAlert("Please, the project name must be between 3 and 12 characters", "error");
//   } else {
//     return true;
//   }
// }

// videoTitle should be only carachters from min. 3 to max. 12.
// function validateVideoTitle(videoTitle) {
//   const re = /^[a-zA-Z]{3,10}$/;
//   if(!re.test(videoTitle)) {
//     ui.showAlert("Please, the video title must be between 3 and 10 characters", "error");
//   } else {
//     return true;
//   }
// }
// patientName should be only carachters the firstname, lastname FORMAT!!!
function validateName(Name) {
  const re = /^([a-zA-Z]{3,10})\,[ ]([a-zA-Z]{3,10})$/;
  if(!re.test(Name)) {
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
    ui.showAlert("Bitte, das Datum sollte im Format MM / TT / JJJJ sein", "error");
  } else {
    return true;
  }
}
// NOT USING!
// videoTime should be in the format dd:dd
// function validateTime(videoTime) {
//   // We check this format here: "01:01"
//   const re = /^\d{2}[:]\d{2}$/;
//   if(!re.test(videoTime)) {
//     ui.showAlert("Please, the time should be in the format dd:dd", "error");
//   } else {
//     return true;
//   }
// }
// videoTime should be in the format dd:dd
// piz should have exactly 8 digits
function validatePiz(piz) {
  // We check that the video number should have exactly 8 digits!
  /*
  String regEx = "^[0-9]{8}$";
    ^ - start with a number.
    [0-9] - use only digits (you can also use \d )
    {8} - use 8 digits.
    $ - End here. Don't add anything after 8 digits.
  */
  const re = /^[0-9]{8}$/;
  if(!re.test(piz)) {
    ui.showAlert("Please, the piz number must be between 11111111 and 99999999", "error");
  } else {
    return true;
  }
}
//The video should not be upload if the icdA is empty... The icdB and icdC can be empty.
function validateIcdABC(icdABC) {
  if(!icdABC[0] === undefined) {
    ui.showAlert("Bitte, ICD_A sollte ausgefüllt werden", "error");
  } else {
    return true;
  }
}
//The video should not be upload if, at least, one of the fields of dsf1, dsf2...
//is not checked
function validateDsfS(dsfS) {
  if(dsfS.length === 0) {
    ui.showAlert("Bitte, ICD_A sollte ausgefüllt werden", "error");
  } else {
    return true;
  }
}
