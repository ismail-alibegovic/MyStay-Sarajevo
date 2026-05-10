import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Ime, email i poruka su obavezni.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Neispravna email adresa.' },
        { status: 400 }
      )
    }

    // Check if RESEND_API_KEY is available
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    
    if (!RESEND_API_KEY) {
      // If no Resend API key, log the message (development mode)
      console.log('Contact form submission (no Resend API key):', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      })
      
      return NextResponse.json({ 
        success: true, 
        message: 'Poruka je primljena (dev mode).' 
      })
    }

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@mystaysarajevo.ba',
        to: 'info@mystaysarajevo.ba',
        reply_to: email,
        subject: subject || `Nova poruka od ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #C5A267; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #666; }
                .value { margin-top: 5px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>MyStay Sarajevo - Nova Poruka</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Ime:</div>
                    <div class="value">${name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Predmet:</div>
                    <div class="value">${subject || 'Nema predmeta'}</div>
                  </div>
                  <div class="field">
                    <div class="label">Poruka:</div>
                    <div class="value">${message.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend API error:', error)
      return NextResponse.json(
        { error: 'Greška pri slanju email-a. Molimo pokušajte ponovo.' },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Email sent successfully:', result)

    return NextResponse.json({ 
      success: true, 
      message: 'Poruka je uspješno poslana.' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Došlo je do greške. Molimo pokušajte ponovo.' },
      { status: 500 }
    )
  }
}
