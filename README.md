What is this anyway?
Hi there, thanks for checking out my Restaurant Reviews project. This project was a part of my training course for Google's Mobile Web Specialist certification. The base code was provided by Udacity, and little by little it blossomed into a fully functional, responsive, offline, and accessible web app.

Project Overview: Stage 1
In stage one of the project, I transformed the raw code into a responsive and accessible website. This ensures that users on screens of all sizes, and with different accessibility needs were able to effectively (and efficiently) access the content in my web app.

Project Overview: Stage 2
This stage of the project focused on IndexedDB caching and performance optimization.

How do I get up and running (as a reviewer)?
1. File Setup
This project has modified both the back and frontend so you will need both repositories

Server (checkout `submitted` branch)
a. You can access the server code at this repo: https://github.com/shiolovesgod/mws-restaurant-stage-3.git 

b. Please be sure that the content of the "localDiskDB.db" file is the one in the Github repo referenced above. I store a little more information about the reviews in my database and read the file from "./tmp/localDiskDB.db".

c. You may need to run npm install but I don't think additional packages were used

Frontend (checkout `submitted` branch)
a. You can access frontend here: https://github.com/shiolovesgod/uda-mws-3.git

2. Up & Running
a. Start the server hosting the database using node server alternatively sails lift should work as well. The backend must behosted on port 1337 of localhost:

"http://localhost:1337/restaurants"
b. Launch the build/index.html folder in your browser and you should be all set (you can also use the dist/index.html folder).

3. Measuring Performance
I have also uploaded the screen shots from my computer. I know performance can be a little fickle.
I found that it works best when I:
Run audits in incognito mode
Detach the Dev Console from the browser window
