
1. Front-end: React.js(CRUD)
2. JSON Server
3. Steps to Run the Project
4. Open the project in VS Code
5. Open terminal and change the Powershell to Command Prompt

Step 5.1 – Start JSON Server:

write these Commands in command prompt

Navigate to the db folder:
cd db

Run the JSON Server:
json-server --watch Users.json --port 8081

You’ll see the server starting at http://localhost:8081/user_details

Step 5.2 – Run the React Frontend:

Open another terminal tab

Navigate to the frontend folder:
cd front-end

Install dependencies:
npm install

Start the frontend app:
npm run dev

Now you can see the project will open in the browser.

Note:
If you don’t run the JSON Server first, the frontend will not work.
Always start the JSON Server before the frontend.
