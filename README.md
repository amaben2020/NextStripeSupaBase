routing
https://ashutosh.dev/next-js-file-based-routing-dynamic-routes-and-navigation-part-2/

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
