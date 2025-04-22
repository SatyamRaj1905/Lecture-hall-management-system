import User from "./src/models/UsersModel.js";
const Dummy_users = [
    {
        userName: 'admin2',
        name: 'Admin',
        phoneNum: '1234567890',
        email: 'admin2@example.com',
        password: 'admin2password',
        admin: true,
        superAdmin: false,
    },
    {
        userName: 'admin3',
        name: 'Admin',
        phoneNum: '1234567890',
        email: 'admin3@example.com',
        password: 'admin3password',
        admin: true,
        superAdmin: false,
    },
    {
        userName: 'admin4',
        name: 'Admin',
        phoneNum: '1234567890',
        email: 'admin4@example.com',
        password: 'admin4password',
        admin: true,
        superAdmin: false,
    }
];

async function seedDB() {
     await User.insertMany(Dummy_users);
     console.log("DB Seeded");
}

export default seedDB;
