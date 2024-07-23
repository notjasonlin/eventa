import Stripe from "https://esm.sh/stripe?target=deno";

export const stripe = Stripe(Deno.env.get("STRIPE_KEY"), {
    httpClient: Stripe.createFetchHttpClient(),
  });