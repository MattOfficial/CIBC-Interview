# CIBC Interview Application
This application is created for CIBC interview. The react app runs on port 3069 and the local DB runs on port 3006. Use the following commands to get the app up and running. 

1. Clone the repo. 
2. Install node modules. 
    ```sh
    npm i
    ```
3. First run json server for local DB. It uses the `db.json` file.
    ```sh
    npx json-server db.json --PORT 3006
    ```
4. Run the app.
    ```sh
    npm start
    ```