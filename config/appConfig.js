export function getAppConfig() {
  const errorMsgPrefix = 'Error loading app configuration';

  const port = process.env.PORT;
  if (!port){
    throw new Error(`${errorMsgPrefix} The PORT value cannot be empty or undefined`);
  }

  const appDomain = process.env.APP_DOMAIN;
  if (!appDomain){
    throw new Error(`${errorMsgPrefix} The APP_DOMAIN value cannot be empty or undefined`);
  }

  const appName = process.env.APP_NAME;
  if (!appName){
    throw new Error(`${errorMsgPrefix} The APP_NAME value cannot be empty or undefined`);
  }

  const dbConnection = process.env.DB_CONNECTION;
  if (!dbConnection){
    throw new Error(`${errorMsgPrefix} The DB_CONNECTION value cannot be empty or undefined`);
  }

  const dbHost = process.env.DB_HOST;
  if (!dbHost){
    throw new Error(`${errorMsgPrefix} The DB_HOST value cannot be empty or undefined`);
  }

  const dbPort = process.env.DB_PORT;
  if (!dbPort){
    throw new Error(`${errorMsgPrefix} The DB_PORT value cannot be empty or undefined`);
  }

  const dbDatabase = process.env.DB_DATABASE;
  if (!dbDatabase){
    throw new Error(`${errorMsgPrefix} The DB_DATABASE value cannot be empty or undefined`);
  }

  const dbUsername = process.env.DB_USERNAME;
  if (!dbUsername){
    throw new Error(`${errorMsgPrefix} The DB_USERNAME value cannot be empty or undefined`);
  }

  const dbPassword = process.env.DB_PASSWORD;
  if (!dbPassword){
    throw new Error(`${errorMsgPrefix} The DB_PASSWORD value cannot be empty or undefined`);
  }

  const secretWord = process.env.SECRET_WORD;
  if (!secretWord){
    throw new Error(`${errorMsgPrefix} The SECRET_WORD value cannot be empty or undefined`);
  }

  return {
    app: {
      port: appPort,
      domain: appDomain,
      name: appName
    },
    db: {
      connection: dbConnection,
      host: dbHost,
      port: dbPort,
      database: dbDatabase,
      username: dbUsername,
      password: dbPassword
    },
    secretWord: secretWord
  }
}
