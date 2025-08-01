# SMART GOAL PLANNER 

You’re working with a fintech company building a Smart Goal Planner. This tool allows users to manage multiple savings goals, allocate deposits across them, and track progress toward each goal.

The application will fetch and persist all goal data from a local db.json file, simulated using json-server. This allows for full Create, Read, Update, and Delete (CRUD) functionality.

You’ll be building a goal management dashboard, where users can:
Add new financial goals (e.g., “Travel Fund”, “Emergency Fund”)
Track progress for each goal
Make deposits to any goal
See a full overview of all their savings activity
CORE FEATURES
Data Management & Persistence (via db.json and json-server)
All goal data will be stored in a db.json file.
json-server will be used to serve this db.json file as a REST API (e.g., http://localhost:3000/goalsLinks to an external site.).
The application will fetch (Read) the initial list of goals from db.json upon loading.
Multiple Savings Goals (CRUD Operations)
Allow users to Add (Create) new financial goals. When a new goal is added, it will be persisted to db.json via a POST request.
Allow users to Update existing goals. This includes modifying:
                  Name

                   A target amount

                   Category

                   Deadline to meet the goal

Updates will be sent to db.json via PUT or PATCH requests.
Allow users to delete different goals. When a goal is deleted, it will be removed from db.json via a DELETE request.
 3. Progress Tracking

Show:
                   The total amount saved for each goal against the target

                    Remaining amount

                     Visual Progress bar per goal

 4. Make Deposits (CRUD: Update savedAmount)

Allow users to Add an amount and select the goal to which they want to save it.
This action will Update the savedAmount field of the correct goal in db.json via a PATCH request.
Update the correct goal’s progress when a deposit is made.
 5. Overview

            Display:

                  Total number of goals

                   Total money saved across all goals

                  Goals completed (if any)

                   How much time is left for each goal

                  If a deadline is within 30 days and the goal is not complete, show a warning

                  If the deadline has passed without reaching the goal, mark it as Overdue

db.json Structure and Example Data
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