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

Sample webhook object
WEBHOOK EVENT {
evt: {
id: 'evt_1M5DsuL3jXIJJMcYzgBPFTvL',
object: 'event',
api_version: '2022-08-01',
created: 1668713786,
data: { object: [Object] },
livemode: false,
pending_webhooks: 1,
request: {
id: 'req_EDHsyky9f8Y3lC',
idempotency_key: '3f41124c-98f9-4fc0-9498-78cdf99fb5d5'
},
type: 'customer.subscription.created'
}
}

I want subscribed patients to be able to chat with their doctors based on sub level
There would be relationships based on the doctor and patient over webhooks (calls an api based on an event)

https://adebola-niran.medium.com/building-a-serverless-realtime-chat-application-with-pusher-and-nextjs-fb92f451c75d

Stripe: Allowing customers manage their subscription
//settings ==> billing => customer portal ==> allow customers manage sub
