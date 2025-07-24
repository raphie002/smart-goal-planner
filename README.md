# SMART GOAL PLANNER

Welcome to the Smart Goal Planner! This application helps you manage multiple savings goals, track your progress, and make deposits to stay on top of your financial aspirations. Whether you're saving for a dream vacation, an emergency fund, or a new gadget, this tool provides a clear overview of your financial journey.

Features
   📊 Goal Management: Easily add, view, update, and delete your financial goals.

   📈 Progress Tracking: See how close you are to reaching each goal with visual progress bars, remaining amounts, and total saved.

   💰 Deposits: Quickly add funds to any of your active goals.

   💡 Overview Dashboard: Get a quick summary of your financial health, including:

      Total number of goals.

      Overall money saved across all goals.

      Number of completed goals.

      Time remaining for each goal.

      Deadline warnings for goals approaching within 30 days that are not yet complete.

      Overdue indicators for goals whose deadlines have passed without being met.

   💾 Data Persistence: All your goal data is securely stored and managed using a local db.json file, simulated via json-server. This provides full CRUD (Create, Read, Update, Delete) functionality.

Technologies Used
   - Frontend: HTML, CSS, JavaScript (or a framework like React/Vue/Angular - specify if you're using one!)

  - Backend Simulation: json-server

  - Data Storage: db.json

Getting Started
Follow these steps to get your Smart Goal Planner up and running on your local machine.

Prerequisites
You'll need Node.js and npm (Node Package Manager) installed on your system.

  - Node.js & npm: Download and install from nodejs.org.

Installation
  1. Clone the repository (if applicable):

      Bash

      git clone <your-repository-url>
      cd smart-goal-planner
      
      If you don't have a repository yet, create the smart-goal-planner folder and navigate into it.

  2. Initialize the project and install dependencies:

      Navigate to your project directory in the terminal and run:

      Bash

      npm init -y
      npm install json-server # Install json-server for the backend simulation
      # If using a frontend framework (e.g., React):
      # npx create-react-app . --template typescript # or --template javascript
      # npm install # Install frontend dependencies
  
  Running the Application
   You'll need to run two separate commands in two different terminal windows: one for the json-server (your "backend") and one for your frontend application.

     1. Start json-server:

      In your project's root directory, make sure you have a db.json file. If not, create one with the example data provided in the project description:

      JSON

     {
         "goals": [
             {
                 "id": "1",
                 "name": "Travel Fund - Japan",
                 "targetAmount": 5000,
                 "savedAmount": 3200,
                 "category": "Travel",
                 "deadline": "2025-12-31",
                 "createdAt": "2024-01-15"
             },
             {
                 "id": "2",
                 "name": "Emergency Fund",
                 "targetAmount": 10000,
                 "savedAmount": 7500,
                 "category": "Emergency",
                 "deadline": "2026-06-30",
                 "createdAt": "2023-05-01"
              },
              {
                 "id": "3",
                 "name": "New Laptop",
                 "targetAmount": 1500,
                 "savedAmount": 1500,
                 "category": "Electronics",
                 "deadline": "2024-07-20",
                 "createdAt": "2024-03-10"
              },
              {
                 "id": "4",
                 "name": "Down Payment - House",
                 "targetAmount": 50000,
                 "savedAmount": 12000,
                 "category": "Real Estate",
                 "deadline": "2027-12-31",
                 "createdAt": "2024-02-01"
              },
              {
                 "id": "5",
                 "name": "Car Maintenance",
                 "targetAmount": 800,
                 "savedAmount": 600,
                 "category": "Vehicle",
                 "deadline": "2025-09-15",
                 "createdAt": "2024-06-01"
              },
              {
                 "id": "6",
                 "name": "Education Fund",
                 "targetAmount": 20000,
                 "savedAmount": 5000,
                 "category": "Education",
                 "deadline": "2028-01-01",
                 "createdAt": "2024-04-20"
              },
              {
                 "id": "7",
                 "name": "Holiday Gifts",
                 "targetAmount": 1000,
                 "savedAmount": 200,
                 "category": "Shopping",
                 "deadline": "2024-08-10",
                 "createdAt": "2024-07-01"
              },
              {
                 "id": "8",
                 "name": "New Phone",
                 "targetAmount": 1200,
                 "savedAmount": 0,
                 "category": "Electronics",
                 "deadline": "2025-01-31",
                 "createdAt": "2024-07-10"
              },
              {
                 "id": "9",
                 "name": "Retirement Savings",
                 "targetAmount": 100000,
                 "savedAmount": 15000,
                 "category": "Retirement",
                 "deadline": "2035-01-01",
                 "createdAt": "2023-01-01"
             },
             {
                 "id": "10",
                 "name": "Home Renovation",
                 "targetAmount": 7500,
                 "savedAmount": 1000,
                 "category": "Home",
                 "deadline": "2025-03-31",
                 "createdAt": "2024-05-15"
             }
          ]
       }
      
      Then, start json-server by running:

      Bash

      json-server --watch db.json --port 3000
     
     This command starts the JSON server at http://localhost:3000. You can access your goals data at http://localhost:3000/goals.

     2. Start the Frontend Application:

      In a separate terminal window, navigate to your project directory and run the command to start your frontend.

      - For simple HTML/CSS/JS (if using a local development server like Live Server):
          Open public/index.html in your web browser, or use a tool like VS Code's "Live Server" extension to serve the public directory.

      - If you used create-react-app or a similar tool:

          Bash

          npm start
          
          This will typically open your application in your browser at http://localhost:3001 (or another available port).

    Once both servers are running, your Smart Goal Planner application should be accessible in your web browser, displaying your goals and allowing you to interact with them!

  Project Structure (Simplified)
     smart-goal-planner/
      ├── public/                 # Static assets (index.html)
      ├── src/                    # All your application's source code
      │   ├── components/         # Reusable UI components (e.g., GoalCard, GoalForm)
      │   ├── services/           # API interaction logic (e.g., goalService.js)
      │   ├── utils/              # Helper functions (e.g., date calculations)
      │   ├── App.js              # Main application logic
      │   ├── index.js            # Entry point of the frontend application
      │   └── index.css           # Global styles
      ├── db.json                 # Your local database file for json-server
      ├── package.json            # Project dependencies and scripts
      └── README.md               # This file!

Contributing
Feel free to fork this repository, make improvements, and submit pull requests.

License
This project is open-source and available under the MIT License.