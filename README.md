# Video Archive

The idea is to develop a mobile web friendly web application to store and manage **video files** with a very easy and clean user interface.
Looking to the point from the programmer, I developed it simple as possible using only:
  * html
  * css 
  * javascript
 
 **You do not need a databank! No Node.JS, No PHP, Nothing! The code store the necessary information in LocalStorage and for security 
    exports it to a JSON file. In case your local storage is cleared, you can simple load it from JSON.** We are using XmlHttpRequest (XHR) object to get the data from the computer that in this case is/can be your server.
   
I used only one library called: skeleton. It is: a dead simple, responsive boilerplate. It is composed 
basically with only 400 lines of code.

  - **Nice Features:**
    
    * The app has an incredible user-friendly interface! 
    * **Responsive Design**
    * Remove and Add input form
    * Any submit or delete is automatically saved as backup in a JSON file
    * If Local Storage is empty, load a JSON file
 
## In Development

  - popUp to let the user to select a JSON file.
  - re-edit the specification of any uploaded video
  - reload the input box with the last added specification
  - improve time & date inputs

## How to start the App?

 To use the app, please, click in the link:
 https://mkortmann.github.io/Video-Archive/
 
 I really advise you to install the app! To do so, please, follow the instructions at Installation section. 
 **I advise you to install the program only in one pc and let the people access this pc remotely or locally with a local account!** The videos should be at an ordner in a server (to be edited in the js file (line 102) and the JSON file locally but also copied daily to a server. Security reasons in case of computer crash.
 
## What make this app so different?

 It's a really light application used to store and manage your videos in a very simple way! It is also a nice example how to do 
 this without using many libraries, frameworks and tools. 
 
## Installation

1. open your Git Bash editor
2. create a directory in the desire location
3. go inside to the folder of your desire location and type: 
4. type: **git init** , then press enter 
5. type: **git clone <address from git hub>** , then press enter
6. type: **npm install -g live-server** , then press enter
7. type: **live-server** , then press enter

**Done! It will open after that the application. We are using a very simple live-server necessary for the method XMLhttpRequest.

#### Note about ES6 

The code in this project has been written only in ES6 JavaScript. The code is compatible with modern web browsers and future-proofing JavaScrip code. 
-- The design was also done using CSS and Skeleton. 

### More Information

This project was one idea of me to be able to improve my knowledge about ES6, JSON and LocalStorage. For any extra information, please, feel free to contact me.

### Contributions

The project was done completely by me starting from scratch. However, if you want to contribute, please, do not hesitate to contact me!
