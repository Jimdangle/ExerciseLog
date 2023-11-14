const bcrypt = require('bcrypt');
const DefaultWorkouts= {
  "workouts": [
    {
      "name": "Push-Ups",
      "muscles": {
        "Upper Pectorals": 0.4,
        "Lower Pectorals": 0.4,
        "Triceps": 0.2
      },
      "type": 0
    },
    {
      "name": "Lat Pulldowns",
      "muscles": {
        "Lats": 0.7,
        "Biceps": 0.3
      },
      "type": 0
    },
    {
      "name": "Squats",
      "muscles": {
        "Quads": 0.5,
        "Hamstrings": 0.3,
        "Glutes": 0.2
      },
      "type": 0
    },
    {
      "name": "Deadlift",
      "muscles": {
        "Lower Back": 0.4,
        "Quads": 0.3,
        "Hamstrings": 0.3
      },
      "type": 0
    },
    {
      "name": "Bench Press",
      "muscles": {
        "Upper Pectorals": 0.4,
        "Lower Pectorals": 0.4,
        "Triceps": 0.2
      },
      "type": 0
    },
    {
      "name": "Pull-Ups",
      "muscles": {
        "Lats": 0.7,
        "Biceps": 0.3
      },
      "type": 0
    },
    {
      "name": "Shoulder Press",
      "muscles": {
        "Front Deltoids": 0.6,
        "Triceps": 0.2,
        "Rear Deltoids": 0.2
      },
      "type": 0
    },
    {
      "name": "Bicep Curls",
      "muscles": {
        "Biceps": 0.6,
        "Forearm": 0.4
      },
      "type": 0
    },
    {
      "name": "Tricep Dips",
      "muscles": {
        "Triceps": 0.6,
        "Lower Pectorals": 0.2,
        "Front Deltoids": 0.2
      },
      "type": 0
    },
    {
      "name": "Leg Press",
      "muscles": {
        "Quads": 0.6,
        "Hamstrings": 0.2,
        "Glutes": 0.2
      },
      "type": 0
    },
    {
      "name": "Plank",
      "muscles": {
        "Abs": 0.4,
        "Obliques": 0.4,
        "Lower Back": 0.2
      },
      "type": 2
    },
    {
      "name": "Lunges",
      "muscles": {
        "Quads": 0.4,
        "Hamstrings": 0.3,
        "Glutes": 0.3
      },
      "type": 0
    },
    {
      "name": "Chest Flyes",
      "muscles": {
        "Upper Pectorals": 0.6,
        "Lower Pectorals": 0.4
      },
      "type": 0
    },
    {
      "name": "Dumbbell Rows",
      "muscles": {
        "Lats": 0.6,
        "Biceps": 0.4
      },
      "type": 0
    },
    {
      "name": "Leg Curls",
      "muscles": {
        "Hamstrings": 0.7,
        "Glutes": 0.3
      },
      "type": 0
    },
    {
      "name": "Russian Twists",
      "muscles": {
        "Obliques": 0.6,
        "Abs": 0.4
      },
      "type": 1
    },
    {
      "name": "Calf Raises",
      "muscles": {
        "Calves": 0.8,
        "Quads": 0.2
      },
      "type": 0
    },
    {
      "name": "Arnold Press",
      "muscles": {
        "Front Deltoids": 0.5,
        "Middle Deltoid": 0.3,
        "Triceps": 0.2
      },
      "type": 0
    },
    {
      "name": "Hammer Curls",
      "muscles": {
        "Biceps": 0.6,
        "Forearm": 0.4
      },
      "type": 0
    },
    {
      "name": "Seated Leg Extensions",
      "muscles": {
        "Quads": 0.7,
        "Adductors": 0.3
      },
      "type": 0
    },
    {
      "name": "Treadmill Running",
      "muscles": {
        "Quads": 0.5,
        "Adductors": 0.3,
        "Hamstrings": 0.2
      },
      "type": 1
    }
  ]
}


const DefaultUsers = {
  users: [
    {
      "email": "john.doe@example.com",
      "username": "johndoe",
      "password": "SecurePassword123"
    },
    {
      "email": "alice.smith@example.com",
      "username": "alicesmith",
      "password": "StrongPass789"
    },
    {
      "email": "bob.johnson@example.com",
      "username": "bobjohnson",
      "password": "Password1234"
    },
    {
      "email": "lisa.wilson@example.com",
      "username": "lisawilson",
      "password": "UserPass5678"
    },
    {
      "email": "e@evil.com",
      "username": "e",
      "password": "e"
    }
  ]
  
}


module.exports = {DefaultWorkouts,DefaultUsers}
