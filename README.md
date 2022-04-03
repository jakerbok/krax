# Setup before run!

### Firstly set up env variables:
Setting up environment variables to connect to server and to choose the port for the server etc.

Create a .evn file if it does not already exists and use variables with names:
>REACT_APP_SERVER_IP = 127.0.0.1 - IP for the server. Only needed if server is started on another machine: Default = 127.0.0.1 <br />
REACT_APP_SERVER_PORT = 4500 - Port for the server: Default = 4500 <br />
PORT = 3000 - Port for the REACT application: Default = 3000 <br />
SERVER_PORT = 4500 - Port for the server: Default = 4500 <br />

SERVER_PORT and REACT_APP_SERVER_PORT have to be the same to be able to connect to each other. <br />

Save the .env file in root folder for the React project.<br />


### Install dependencies

1. Sit in the root directory and use command "npm install". <br />
2. Jump into ./server and use commmand "npm install". <br />

# Starting the application

Stand in the root folder and use the command: "npm run start-all" to start both the server and the React application. <br /> 
If you only want to start the React application use the command: "npm start". <br />
If you only want to start the server, traverse into ./root/server and use command "npm start" to start the server. <br />

# Application usage

1. Start with creating a user by using the button "Sign up" in the top right corner.
2. Sign in with the user you just created by closing the "Sign up" window and press "Sign in".
3. Now you can go through the different tabs and also add messages by writing in the textbox and pressing "Send message". 

To change user information press the tab with your name on it and update user. <br />
There is a user list where you can view all of the users by using the "Users" tab. <br />
To view user information you can press the users name under "Users" tab or click their name on a message they have created. <br />
You can only create a message if you are logged in. <br />
