export default {

    firstName: {
        required: { value: true, message: "Missing first name" },
        minLength: { value: 2, message: "First name too short" },
        maxLength: { value: 50, message: "First name cant exceed 50 charecters" }
    },
    lastName: {
        required: { value: true, message: "Missing last name" },
        minLength: { value: 2, message: "Last name is too short" },
        maxLength: { value: 50, message: "Last name cant exceed 50 charecters" }
    },
    email: {
        required: { value: true, message: "Missing email" },
        minLength: { value: 4, message: "Email is too short" },
        maxLength: { value: 50, message: "Email cant exceed 50 charecters" }
    },
    password: {
        required: { value: true, message: "Missing password" },
        minLength: { value: 4, message: "Password is too short" },
        maxLength: { value: 50, message: "Password can't exceed 50 charecters" }
    },
}
