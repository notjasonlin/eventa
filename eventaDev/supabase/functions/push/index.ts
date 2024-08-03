import { createClient } from 'jsr:@supabase/supabase-js@2'

console.log('Hello from Functions!')

// interface Notification {
//   id: string
//   user_id: string
//   body: string
// }

// interface WebhookPayload {
//   type: 'INSERT' | 'UPDATE' | 'DELETE'
//   table: string
//   record: Notification
//   schema: 'public'
//   old_record: null | Notification
// }

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("SERVICE_URL or SERVICE_ROLE_KEY is not set in environment variables");
}

const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
)

console.log('1')

Deno.serve(async (req) => {
  console.log('2')

  // const text = await req.text();
  // console.log('Request body:', text); // Log the request body

  // const payload: WebhookPayload = await req.json()
  const payload = await req.json()

  console.log("payload", payload);
  console.log("record", payload.record);


  const { data } = await supabase
    .from('profile')
    .select('expo_push_token')
    .eq('id', payload.record.reciever)
    .single()

  console.log("push token", data);

  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Deno.env.get('EXPO_ACCESS_TOKEN')}`,
    },
    body: JSON.stringify({
      to: data?.expo_push_token,
      sound: 'default',
      body: payload.record.content,
      // body: "Hello world!",
    }),
  }).then((res) => {
    console.log("res", res);
    return res.json();
  })

  console.log('3')

  return new Response(JSON.stringify(res), {
    headers: { 'Content-Type': 'application/json' },
  })
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
