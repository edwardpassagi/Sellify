/**
 * This script defines a user model, serves as a Data Access Object between
 * MongoDB and our backend
 */

export class User {
    userJson = {
        username: '',
        passwordHash: '',
        name: '',
    }
    constructor (username, passwordHash, name) {
        this.userJson.username = username;
        this.userJson.passwordHash = passwordHash;
        this.userJson.name = name;
    }
};