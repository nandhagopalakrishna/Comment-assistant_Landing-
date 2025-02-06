interface Config {
  API_URL: string;
  GOOGLE_CLIENT_ID: string;
  frontendBaseUrl: string;
  websiteUrl: string;
}

const isDevelopment = false; // Force production mode

const config = {
  development: {
    API_URL: 'http://localhost:3001',
    frontendBaseUrl: 'http://localhost:5173',
    websiteUrl: 'http://localhost:5173',
    GOOGLE_CLIENT_ID: '1029011666173-vsciccbv75nn94m3ib734k7r1bfn3qg3.apps.googleusercontent.com'
  },
  production: {
    API_URL: 'https://comment-assistant-backend.onrender.com',
    frontendBaseUrl: 'https://comment-assistant-frontend.onrender.com',
    websiteUrl: 'https://comment-assistant-frontend.onrender.com',
    GOOGLE_CLIENT_ID: '1029011666173-vsciccbv75nn94m3ib734k7r1bfn3qg3.apps.googleusercontent.com'
  }
};

const currentConfig: Config = isDevelopment ? config.development : config.production;

export default currentConfig; 