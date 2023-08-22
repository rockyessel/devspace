import jwt from 'jsonwebtoken';
import { RevokedRefreshToken } from '../../models/tokens/revoke_token';
import { UsedRefreshToken } from '../../models/tokens/refresh_token';
import mongoose from 'mongoose';
import { User } from '../../models/users';


interface TokenProps {
  msg?: string,
  error?:string,
  token: { accessToken: string, refreshToken:string}
}

export const generateToken = async (method:string, user: any, clientRefreshToken?:string):Promise<TokenProps> => {

  
  switch (method) {
    case 'token':
      // "token" whenever the user either logins or register
      const accessToken = jwt.sign({...user}, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: `${process.env.ACCESS_TOKEN_EXPIRATION}`})
      const refreshToken = jwt.sign({ ...user, jti: generateRefreshTokenId() }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: `${process.env.REFRESH_ACCESS_TOKEN_EXPIRATION}` })
      return { msg: 'Generated successfully', token: { accessToken, refreshToken } };
     
      
    case 'refresh':
        // "refresh" is when the user has already logged, and
       // Check if the client refresh token has been used before
      const usedTokens = await UsedRefreshToken.findOne({ refreshToken: clientRefreshToken });

      // console.log('USedTokens', usedTokens)
   
      // If so, then we let the client know what error is about
      if (usedTokens) return { error: 'Refresh token has already been used', token: { accessToken: '', refreshToken: '' } };
      
      
       // Generate a new access token
      const decodeClientRefreshToken = jwt.decode(`${clientRefreshToken}`)
      // console.log('decodeClientRefreshToken',decodeClientRefreshToken)

     
      

      if (typeof decodeClientRefreshToken !==  'string') {
      //   // Check if the token has expired
        const expirationTime = decodeClientRefreshToken?.exp! * 1000; // Convert exp to milliseconds
        const currentTime = Date.now();
        if (currentTime > expirationTime) {


         const to = await UsedRefreshToken.create({ refreshToken: clientRefreshToken, usedAt: new Date() });

          console.log('token',to)
          // If the refresh token has expired, return an error response to the client
          return { error: 'Refresh token has expired', token: { accessToken: '', refreshToken: '' }};
          
        }
      }
      
      const verifyClientRefreshToken = jwt.verify(`${clientRefreshToken}`, `${process.env.ACCESS_TOKEN_SECRET}`) as unknown as any
      console.log('verifyClientRefreshToken', verifyClientRefreshToken);

      const user_info = {...verifyClientRefreshToken?.user_info} 
      

       // Generate a new refresh token and store it in the used refresh tokens collection
      const access = jwt.sign({user_info}, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: `${process.env.ACCESS_TOKEN_EXPIRATION}`})
      const newRefreshToken  = jwt.sign({user_info, jti: generateRefreshTokenId()},`${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: `${process.env.REFRESH_ACCESS_TOKEN_EXPIRATION}`})
     

      await UsedRefreshToken.create({ refreshToken: clientRefreshToken, usedAt: new Date() });
    

      return {msg: 'Generated successfully', token: {accessToken:access, refreshToken: newRefreshToken}}
  
    
    case 'revoke':
      try {
        // "revoke" is used when the user logs out from our application.
      

        const decodeClientRefreshToken_ = jwt.verify(`${clientRefreshToken}`, `${process.env.ACCESS_TOKEN_SECRET}`);
        console.log('decodeClientRefreshToken_', decodeClientRefreshToken_);

        if (typeof decodeClientRefreshToken_ !== 'string') {
          const tokenID = decodeClientRefreshToken_.jti;

          // Store the token ID in Redis with an expiration time equal to the remaining validity time of the refresh token.
          const refreshTokenExpiration = decodeClientRefreshToken_.exp! * 1000 - Date.now();

          await RevokedRefreshToken.create({jti: tokenID, expiresIn: refreshTokenExpiration,});

          return { msg: 'Token revoked successfully.', token: {accessToken:'', refreshToken:''} };
        } else {
          return { msg: 'Invalid refresh token.', token: {accessToken:'', refreshToken:''} };;
        }
      } catch (error) {
        console.log('Method: Revoke', error)

        return { msg: 'Method: Revoke', token: {accessToken:'', refreshToken:''} };
      }

    default:

      return { msg: 'Could not find method. Check the method and try again.', token: {accessToken:'', refreshToken:''} };
  }

};




// Generate a unique ID for the refresh token (optional but recommended)
function generateRefreshTokenId() {
  // Use a suitable library or function to generate a unique identifier
  // For example, you can use uuid or shortid libraries
  // Here, we are using a simple timestamp-based ID as an example
  return new Date().getTime().toString();
}
