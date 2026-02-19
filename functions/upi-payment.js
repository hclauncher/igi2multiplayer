export async function onRequestPost(context) { 
  try {
    const formData = await context.request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const txn = formData.get("txn");
    const product = formData.get("product");  // <-- new line to get selected product
    const file = formData.get("screenshot");

    if (!name || !email || !txn || !file || !product) {
      return new Response("Missing fields", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    const base64File = btoa(binary);

    const BREVO_API_KEY = context.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      return new Response("BREVO_API_KEY not set", { status: 500 });
    }

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
        subject: `New UPI Payment - ${product}`,  // include product in subject
        htmlContent: `
          <h3>New UPI Payment</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Tools:</strong> ${product}</p>  <!-- include selected product -->
          <p><strong>Transaction ID:</strong> ${txn}</p>
        `,
        attachment: [{
          content: base64File,
          name: file.name
        }]
      })
    });

    const result = await response.text();
    console.log("Brevo response:", result);

    if (!response.ok) {
      return new Response("Email failed: " + result, { status: 500 });
    }

    return new Response("Success", { status: 200 });

  } catch (err) {
    return new Response("Server error: " + err.message, { status: 500 });
  }
}
