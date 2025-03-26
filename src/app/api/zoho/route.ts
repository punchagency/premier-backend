import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    console.log("Received request to create Zoho lead:", { name, email });

    // Get access token using refresh token
    const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        grant_type: 'refresh_token',
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log("Token response:", tokenData);

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token: ' + JSON.stringify(tokenData));
    }

    // Create lead using REST API
    const createLeadResponse = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            Last_Name: name,
            Email: email,
            Lead_Source: 'Website Registration',
            Description: 'Registered through Premier Properties website'
          }
        ]
      }),
    });

    const leadData = await createLeadResponse.json();
    console.log("Lead creation response:", leadData);

    if (leadData.data && leadData.data[0] && leadData.data[0].status === 'success') {
      return NextResponse.json({ success: true, leadId: leadData.data[0].details.id });
    } else {
      throw new Error('Failed to create lead: ' + JSON.stringify(leadData));
    }
  } catch (error) {
    console.error('Error creating Zoho lead:', error);
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 500 });
  }
}