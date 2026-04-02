import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const NOTIFICATION_EMAIL = "contato@renovaturismo.com.br";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { nome, email, telefone } = await req.json();

    if (!nome || !email || !telefone) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store submission in database
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ nome, email, telefone });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar dados." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notification email via Resend (if API key is configured)
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Renova Turismo <noreply@renovaturismo.com.br>",
          to: [NOTIFICATION_EMAIL],
          subject: `Novo contato - Viagem Turquia: ${nome}`,
          html: `
            <h2>Novo contato pelo site - Viagem Turquia</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><em>Enviado em ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</em></p>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Email send error:", await emailResponse.text());
      }
    } else {
      console.log("RESEND_API_KEY not configured. Submission stored in database only.");
      console.log(`New contact: ${nome} - ${email} - ${telefone}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
