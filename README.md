# Smart Goal Planner (React App)
This is a React-based application for managing multiple savings goals, allocating deposits, and tracking progress. It uses json-server to simulate a local REST API for data persistence, allowing for full CRUD (Create, Read, Update, Delete) functionality.

Features
Data Management & Persistence: All goal data is stored in db.json and served via json-server. The app fetches this data on startup and persists all changes back to the file.

Multiple Savings Goals (CRUD):

Add: Create new financial goals with a name, target amount, category, and deadline.

Update: Modify a goal's details or saved amount.

Delete: Remove existing goals from your list.

Progress Tracking: Each goal displays its total saved amount against the target, the remaining amount needed, and a visual progress bar.

Make Deposits: Easily add funds to any of your active goals.

Dashboard Overview: A summary section shows your total number of goals, total money saved, and the number of completed, on-track, warning (due soon), and overdue goals.

Setup and Running the Application
You'll need two separate terminal windows for the API server and the React development server.

Clone or download this repository:

Bash

git clone <repository-url>
cd smart-goal-planner-react
Install project dependencies:

Bash

npm install
Start the JSON Server (Mock API):
Open your first terminal, navigate to the project root, and run:

Bash

npm run start-api
This will start json-server on http://localhost:3000, using db.json as the data source.

Start the React Development Server:
Open your second terminal, navigate to the project root, and run:

Bash

npm run dev
This will start the React application, usually on http://localhost:5173.

Once both servers are running, open your web browser and go to the React development server URL to access the Smart Goal Planner.

Code Structure and File-by-File Breakdown
The project is structured to separate concerns, making the code easier to manage and understand.

src/ - The Core React Application
main.jsx: This is the entry point of the entire React application. It imports App.jsx and mounts it to the DOM element with the ID root in public/index.html.

App.jsx: The central brain of the application.

It uses React's useState hook to manage the application's state, most importantly the goals array.

It uses the useEffect hook to fetch initial goal data from the API when the component first mounts.

It acts as a parent component, rendering all other components (GoalForm, DepositForm, Overview, and the list of **GoalCard**s).

It contains the core logic for all CRUD operations (handleAddGoal, handleUpdateGoal, handleDeleteGoal) and passes these functions down to child components as props.

App.css: Contains the main layout and top-level styles for the application's overall structure.

src/api/ - API Interaction
goalsApi.js: A dedicated module for all API calls. This file is crucial because it isolates all network requests from the main application logic.

It exports functions like fetchGoals(), addGoal(), updateGoal(), and deleteGoal().

These functions use the browser's native fetch API to make requests to the json-server endpoint (http://localhost:3000/goals).

App.jsx imports and uses these functions to communicate with the backend without needing to know the low-level details of the fetch calls.

src/components/ - Reusable UI Components
GoalCard.jsx: This component renders a single goal.

It receives a goal object and callback functions like onEdit and onDelete as props from App.jsx.

It displays the goal's name, amounts, deadline, and a progress bar.

The "Edit" and "Delete" buttons inside this component trigger the parent's onEdit and onDelete functions, passing up the necessary goal data.

GoalForm.jsx: This component handles adding and editing goals.

It uses useState to manage the form's input values.

It receives an onSubmit prop (which is either handleAddGoal or handleUpdateGoal from App.jsx) to handle form submission.

If a goal is being edited, the initialData prop is used to pre-fill the form fields.

DepositForm.jsx: A form specifically for making deposits.

It receives the goals array to populate its dropdown menu.

When submitted, it calls the onMakeDeposit function prop, which is defined in App.jsx, to update a goal's savedAmount.

Overview.jsx: This component calculates and displays summary statistics.

It receives the full goals array as a prop.

It uses methods from utils/helpers.js to compute totals, completed goals, and other metrics.

ProgressBar.jsx: A simple, reusable component to render the progress bar for each goal.

src/utils/ - Helper Functions
helpers.js: A collection of pure JavaScript functions that perform calculations and formatting.

calculateProgress(): Computes the completion percentage of a goal.

getTimeRemaining(): Calculates days left until a deadline and determines if a goal is "on-track," "warning," "overdue," or "completed."

How It All Connects
When the app loads, App.jsx calls goalsApi.js to fetchGoals() and gets the initial data from db.json.

The goals data is stored in the state of App.jsx.

App.jsx passes this goals data down to the Overview.jsx component to display the summary and maps over the array to render a GoalCard for each goal.

User actions, like clicking the "Delete" button on a GoalCard or submitting the GoalForm, trigger a function in App.jsx.

This function in App.jsx then calls the appropriate method in goalsApi.js (deleteGoal(), addGoal(), or updateGoal()) to send a request to json-server.

Once the API request is successful, App.jsx updates its goals state.

Because of React's architecture, this state change automatically causes all components that depend on the goals data (Overview, **GoalCard**s) to re-render with the new information, keeping the UI in sync with the data.

This setup ensures a clean separation of concerns, where components focus on rendering, and the core App component manages state and logic, all while goalsApi.js handles the communication with your data source.