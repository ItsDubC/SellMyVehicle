interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
  }
  
  export const AUTH_CONFIG: AuthConfig = {
    clientID: 'rIBtG64LD7IuSGG9e7yCequNBovvTDD0',
    domain: 'sellmyvehicle.auth0.com',
    callbackURL: 'http://localhost:5000/vehicles'
  };