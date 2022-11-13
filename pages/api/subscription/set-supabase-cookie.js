import { supabase } from '../../../utils/client';

const handler = async (req, res) => {
  // await supabase.auth.setA;

  //TODO: pass supabase session cookie to api route to identify user

  // derive user from request

  //parse cookie to header

  // add token to auth.session

  let token = req.cookies['sb:token'];
  if (!token) {
    return;
  }
  await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  });
};

export default handler;
