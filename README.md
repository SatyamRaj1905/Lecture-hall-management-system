# Lecture Hall Management System

A simple and efficient web-based Lecture Hall Management System designed for The Laxmi Niwas Mittal Institute of Information Technology (LNMIIT) to manage the allocation and scheduling of lecture halls across departments with minimal human intervention

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Future Scope](#future-scope)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About the Project

The **Lecture Hall Management System** streamlines the process of booking, scheduling, and managing lecture halls within an academic institution. Designed for easy use by both faculty and administrators at LNMIIT, it helps prevent scheduling conflicts and optimizes lecture hall usage.

## Features

- User-friendly interface for booking and managing lecture halls
- Real-time checking of lecture hall availability
- Separate views for admins and faculty/users
- Conflict detection for overlapping schedules
- Secure authentication and role-based access
- Responsive interface for multiple devices

## Project Structure

```
Directory structure:
└── satyamraj1905-lecture-hall-management-system/
    ├── backend/
    │   ├── README.md
    │   ├── app.js
    │   ├── jsconfig.json
    │   ├── package.json
    │   ├── seed.js
    │   ├── .eslintrc.js
    │   ├── .flowconfig
    │   ├── config/
    │   │   └── db.js
    │   └── src/
    │       ├── controllers/
    │       │   ├── BookingController.js
    │       │   ├── RoomController.js
    │       │   └── UserController.js
    │       ├── models/
    │       │   ├── BookingsModel.js
    │       │   ├── RoomModel.js
    │       │   ├── test.js
    │       │   └── UsersModel.js
    │       └── routes/
    │           ├── BookingsRoute.js
    │           ├── RoomRoutes.js
    │           └── UserRoutes.js
    └── frontend/
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package.json
        ├── vite.config.js
        └── src/
            ├── App.css
            ├── App.jsx
            ├── index.css
            ├── main.jsx
            ├── components/
            │   ├── bookings/
            │   │   └── MakeBooking.jsx
            │   ├── Details/
            │   │   ├── Details.css
            │   │   └── Details.jsx
            │   ├── Error/
            │   │   ├── Error.css
            │   │   └── Error.jsx
            │   ├── Help/
            │   │   ├── Help.css
            │   │   └── Help.jsx
            │   ├── Home/
            │   │   ├── Home.jsx
            │   │   └── Multitheme.jsx
            │   ├── NavBar/
            │   │   └── NavBar.jsx
            │   ├── NotAuthorized/
            │   │   ├── NotAuthorized.css
            │   │   └── NotAuthorized.jsx
            │   ├── PendingRequest/
            │   │   ├── Pending.css
            │   │   ├── Pending.jsx
            │   │   ├── PendingRequest.css
            │   │   └── PendingRequest.jsx
            │   ├── Rooms/
            │   │   └── AddRooms.jsx
            │   ├── SessionExpired/
            │   │   └── SessionExpired.jsx
            │   ├── Tables/
            │   │   ├── TableDaily.css
            │   │   ├── TableDaily.jsx
            │   │   └── TableWeekly.jsx
            │   └── users/
            │       ├── DeleteUser.jsx
            │       ├── Login.css
            │       ├── Login.jsx
            │       └── Register.jsx
            └── store/
                ├── index.js
                ├── actions/
                │   ├── booking.jsx
                │   ├── rooms.jsx
                │   └── users.jsx
                ├── reducers/
                │   ├── booking.jsx
                │   ├── rooms.jsx
                │   └── users.jsx
                └── sagas/
                    ├── booking.jsx
                    ├── rooms.jsx
                    └── users.jsx
```

## Getting Started

### Prerequisites

- Node.js and npm installed on your system
- Git for cloning the repo

### Installation

1. Clone the repository

```
git clone https://github.com/SatyamRaj1905/Lecture-hall-management-system.git
```

2. Install backend dependencies  
```
npm install
```
3. start the server by running
```
npm run start
```

## Usage

- Open the URL https://lt-management-frontend.onrender.com/ in your browser. (project is deployed on render)
- Register or login as a student, staff, or admin.
- Book lecture halls or view/manage existing bookings.
- Admins can manage users and view all bookings.

## Future Scope

- Role-based access for faculty and students
- API Integration for campus-wide scheduling systems
- Notification system for successful/failed bookings
- Analytics for hall usage optimization

## Contributing

Contributions are always welcome! Please feel free to open issues or pull requests to improve the project.

## License

This project is made for academic purposes at LNMIIT. Please contact me for further use.

## Acknowledgements

- LNMIIT Faculty and Students for support and valuable feedback
- Open-source libraries and frameworks

---



