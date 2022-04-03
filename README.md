# Setup before run!

### Firstly set up env variables:
Setting up environment variables to connect to server and to choose the port for the server etc.

Create a .evn file if it does not already exists with variables with names:
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