# Setup before run!

### Firstly set up env variables:
Setting up environment variables to connect to server and to choose the port for the server etc.

Create a .evn file with variables with names:
>REACT_APP_SERVER_IP = 127.0.0.1 - IP for the server. Only needed if server is started on another machine: Default = 127.0.0.1
REACT_APP_SERVER_PORT = 4500 - Port for the server: Default = 4500
PORT = 3000 - Port for the REACT application: Default = 3000
SERVER_PORT = 4500 - Port for the server: Default = 4500

SERVER_PORT and REACT_APP_SERVER_PORT have to be the same to be able to connect to each other. 

Save the .env file in root folder for the React project.

# Starting the application

Stand in the root folder and use the command: "npm run start-all" to start both the server and the React application. 
If you only want to start the React application use the command: "npm start".
If you only want to start the server, traverse into ./root/server and use command "npm start" to start the server.