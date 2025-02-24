//load the .env file
// console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('JWT_EXPIRATION_TIME:', process.env.DATABASE_URL);
export const jwtConstants = {
    secret: process.env.JWT_SECRET, //openssl rand -hex 64 to generate a secret
};
  