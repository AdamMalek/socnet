export class RegisterData {
    constructor(public username: string, public email: string, public password: string, public confirmPassword: string, public firstName: string,
                public lastName: string, public university: string) {
    }

    checkForValidationErrors() {
        var errors = {
            count: 0,
            username: [],
            email: [],
            password: [],
            confirmPassword: [],
            firstName: [],
            lastName: [],
            university: []
        };

        if (this.username == null || this.username == "") errors.username.push("Username cannot be empty");

        if (this.email == null || this.email == "") errors.email.push("Email cannot be empty");
        // email valid
        if (!this.email.match(".+@.+..+")) errors.email.push("This is not a valid e-mail address");

        if (this.password == null || this.password == "") errors.password.push("Password cannot be empty");
        // password min-lenght 6 max 30
        if (this.password.length < 6 || this.password.length > 30) errors.password.push("Password should be between 6 and 30 characters long");
        // passwords match
        if (this.password != this.confirmPassword) errors.confirmPassword.push("Passwords do not match");

        if (this.firstName == null || this.firstName == "") errors.firstName.push("First name cannot be empty");
        if (this.lastName == null || this.lastName == "") errors.lastName.push("Last name cannot be empty");
        if (this.university == null || this.university == "") errors.university.push("University cannot be empty");

        errors.count = errors.username.length + errors.email.length +
            errors.password.length + +errors.confirmPassword.length +
            errors.firstName.length + errors.lastName.length +
            errors.university.length;
        return errors;
    }
}
