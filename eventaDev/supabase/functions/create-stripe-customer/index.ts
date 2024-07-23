// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";
import Stripe from "https://esm.sh/stripe?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js?dts";

const stripe = Stripe(Deno.env.get("STRIPE_KEY"), {
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

Deno.serve(async (req) => {
  const { record } = await req.json();

  console.log({ record });

  const customer = await stripe.customers.create({
    name: record.firstName + " " + record.lastName,
    email: record.email,
    phone: record.phone,
    metadata: {
      supabaseKey: record.id,
    },
  });

  const { data, error } = await supabase
    .from("profile")
    .update({
      stripe_customer_id: customer.id,
    })
    .match({ id: record.id });

  console.log ({ data, error, customer });

  return new Response(
    JSON.stringify({ stripe_customer_id: customer.id }),
    { headers: { "Content-Type": "application/json" } }
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-stripe-customer' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
