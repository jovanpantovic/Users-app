export class User {
    public id: string;
    public username: string;
    public email: string;
    public password: string;
    public role: string;
    
    constructor(id: string, username: string, email: string, password: string, role: string) {
     this.id = id;
     this.username = username;
     this.email = email;
     this.password = password;
     this.role = role;
    }
 }