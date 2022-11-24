// pages/_app.js

import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';

function MyApp({ Component, pageProps }) {
  const options = {
    providers: [
      AzureADB2CProvider({
        tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
        clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
        clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
        primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
        authorization: {
          params: {
            scope: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api/demo.read https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api/demo.write offline_access openid`,
          },
        },
      }),
    ],
  };
  return (
    <AzureADB2CProvider {...options}>
      <div>Authenticate</div>
    </AzureADB2CProvider>
  );
}

export default MyApp;

// pages/api/auth/[...nextauth].js
// import NextAuth from 'next-auth'

// const tenantName = process.env.AUTH_TENANT_NAME
// const tenantGuid = process.env.AUTH_TENANT_GUID
// const userFlow = process.env.USER_FLOW

// const options = {
//   session: {
//     jwt: true,
//   },
//   secret: process.env.JWT_SECRET,
//   pages: {
//     signOut: '/auth/signout',
//   },
//   providers: [
//     {
//       id: 'azureb2c', // The providers.id string must match what you've used in your callback (Redirect URI) in Azure B2C, which for us was http://localhost:3000/api/auth/callback/azureb2c.
//       name: 'Azure B2C',
//       type: 'oauth',
//       version: '2.0',
//       debug: true,
//       scope: 'offline_access openid',
//       params: {
//         grant_type: 'authorization_code',
//       },
//       accessTokenUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`,
//       // requestTokenUrl: `https://login.microsoftonline.com/${process.env.AUTH_TENANT_GUID}/oauth2/v2.0/token`,
//       authorizationUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize?response_type=code+id_token&response_mode=form_post`,
//       profileUrl: 'https://graph.microsoft.com/oidc/userinfo',
//       profile: (profile) => {
//         console.log('THE PROFILE', profile)

//         return {
//           id: profile.oid,
//           fName: profile.given_name,
//           lName: profile.surname,
//           email: profile.emails.length ? profile.emails[0] : null,
//         }
//       },
//       clientId: process.env.AUTH_CLIENT_ID,
//       clientSecret: process.env.AUTH_CLIENT_SECRET,
//       idToken: true,
//       state: false,
//     },
//   ],
// }

// export default (req, res) => NextAuth(req, res, options)

// // pages/index.js
// // ...
// import styles from '../styles/Home.module.css'
// import { useSession } from 'next-auth/client'

// export default function Home() {
//   const [session, loading] = useSession()

//   return ( //...

// pages/index.js
// ...
// {session ?
//   <>
//     <div className={styles.grid}>
//     You are signed in!
//     </div>
//   </>
//   :
//   <div>
//     You are not signed in! <a style={{color: 'blue'}} href="/api/auth/signin">You must sign in to access documentation!</a>
//   </div>
// }
// ...

// That may not be a problem for you 🤷‍♂️ but if it is you can call the Azure B2C signout url, then redirect the user to the NextAuth signout url. The B2C sign-out URL looks like:

//https://${process.env.AUTH_TENANT_NAME}.b2clogin.com/${process.env.AUTH_TENANT_NAME}.onmicrosoft.com/${process.env.USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.NEXTAUTH_URL}/auth/signout
// Wherever you want the user to be able to log out, you can include that in a link. If you don't need the full B2C signout, you can also call the NextAuth API signout route instead:

// Addition to `index.js`
// Can also `useSession` to show only if signed in!
// ...
{
  /* <div>
  <p>You are signed in! You can also sign out if you like.</p>
  <ul>
    <li>
      <a style={{color: 'blue'}} href="/api/auth/signout/azureb2c">Sign Out (API)</a>
    </li>
    <li>
      <a style={{color: 'blue'}} href={`https://${process.env.AUTH_TENANT_NAME}.b2clogin.com/${process.env.AUTH_TENANT_NAME}.onmicrosoft.com/${process.env.USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.NEXTAUTH_URL}/auth/signout`}>Sign Out (FULL)</a>
    </li>
  </ul>
</div> */
}
// ...
// If you notice on the end of the url, we've specified the post_logout_redirect_uri set to ${process.env.NEXTAUTH_URL}/auth/signout - so we also need to make another route to facilitate this. The signOut method only works on the client, so this can not be an API route, and it should not run on the server. Create the file at pages/auth/signout.js

// pages/auth/signout.js
// import { signOut } from 'next-auth/client'

// export default function Signout() {
//   if (typeof window !== 'undefined') {
//     signOut({ callbackUrl: process.env.NEXTAUTH_URL })
//   }

//   return null
// }

// pages/auth/signout.js
// import { signOut } from 'next-auth/client'

// export default function Signout() {
//   if (typeof window !== 'undefined') {
//     signOut({ callbackUrl: process.env.NEXTAUTH_URL })
//   }

//   return null
// }

//https://next-auth.js.org/getting-started/client#usesession
