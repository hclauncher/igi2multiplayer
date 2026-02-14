export async function onRequestPost(context) {
  try {
    const request = context.request;
    const data = await request.json();

    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response("Missing fields", { status: 400 });
    }

    const BREVO_API_KEY = context.env.BREVO_API_KEY;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          email: "igi2.homecoming@gmail.com",
          name: "Homecoming Gaming"
        },
        to: [{
          email: "igi2.homecoming@gmail.com"
        }],
        subject: data.subject,
        htmlContent: `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong><br>${data.message}</p>
        `
      })
    });

    const result = await response.text();
    return new Response("Status: " + response.status + " | " + result);

  } catch (err) {
    return new Response("Server error: " + err.message, { status: 500 });
  }
}
