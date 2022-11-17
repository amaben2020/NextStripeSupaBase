routing
https://ashutosh.dev/next-js-file-based-routing-dynamic-routes-and-navigation-part-2/

ICONS: https://fonts.google.com/icons?icon.query=news

https://heroicons.dev/

Github: Settings ==> Developer settings

creating random string
node -e "console.log(crypto.randomBytes(32).toString('hex'))"

Postgres function that inserts into the profile table a new id from stripe

begin
insert into public.profile(id, email)
values(new.id, new.email);

return new;
end;

Then we update the table in our serverless function like this
await supabase
.from('profile')
.update({
stripe_customer: customer.id,
})
.eq('id', req.body.record.id);

https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe
Middleware: https://www.ctnicholas.dev/articles/how-to-use-nextjs-middleware

Webhooks to notify us on when subscription events occur
Go to stripe developers, webhooks => add an endpoint ==> use ngrok tunneling
add events ==> customer

install micro eto ensure the req shape meets stripe requirements
