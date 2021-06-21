const registerSchema = {
    type: "object",
    properties: {
        name: {
            "description": "Name of user",
            "type": "string",
            "minLength": 1,
            "maxLength": 100
        },
        dob: {
            "description": "Date of Birth of user",
            "type": "string",
            "format": "date"
        },
        gender: {
            "description": "Gender of user",
            "enum": ["Male", "Female"]
        },
        aboutMe: {
            "description": "About the user",
            "type": "string",
            "minLength": 1,
            "maxLength": 5000
        },
        profilePhoto: {
            "description": "Profile photo url of user",
            "type": "string",
            "minLength": 1,
            "maxLength": 500
        }

    },
    required: ["name", "dob", "gender", "aboutMe", "profilePhoto"]
}

module.exports = registerSchema;