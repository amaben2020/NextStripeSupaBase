// file path src/pages/api/auth/[...nextauth].ts

// install next auth

import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';

const handler = (req, res) =>
  NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
    providers: [
      AzureADB2CProvider({
        tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
        clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
        clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
        primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
        authorization: {
          params: {
            authorization: { params: { scope: 'offline_access openid' } },
          },
        },
      }),
    ],
    secret: 'bejamas',
  });

export default handler;

// .env:
// AZURE_AD_B2C_TENANT_NAME: string;
// AZURE_AD_B2C_CLIENT_ID: string;
// AZURE_AD_B2C_CLIENT_SECRET: string;
// AZURE_AD_B2C_PRIMARY_USER_FLOW: string;
