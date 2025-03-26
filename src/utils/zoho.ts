import {
  OAuthBuilder,
  InitializeBuilder,
  MODULES,
  Record,
  BodyWrapper
} from '@zohocrm/nodejs-sdk-2.0';

const initializeZoho = async () => {
  console.log("Initializing Zoho");
  try {
    // Step 3: Configure API environment
    const USDataCenter = require( "@zohocrm/nodejs-sdk-2.0/routes/dc/us_data_center").USDataCenter;
    console.log(USDataCenter);
    /*
     * Configure the environment
     * which is of the pattern Domain.Environment
     * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
     * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
    */
    let environment = USDataCenter.PRODUCTION();
    console.log(environment);
    // const environment = USDataCenter.PRODUCTION(); // This is the correct way according to docs

    // Step 4: Create OAuth token instance
    const OAuthBuilder = require("@zohocrm/nodejs-sdk-2.0/models/authenticator/oauth_builder").OAuthBuilder;
    const token = new OAuthBuilder()
      .clientId(process.env.ZOHO_CLIENT_ID!)
      .clientSecret(process.env.ZOHO_CLIENT_SECRET!)
      .refreshToken(process.env.ZOHO_REFRESH_TOKEN!)
      .redirectURL(process.env.ZOHO_REDIRECT_URL!) // Add this
      .build();

    // Step 9: Initialize the SDK
    await new InitializeBuilder()
      .environment(environment)
      .token(token)
      .initialize();

  } catch (error) {
    console.error('Error initializing Zoho:', error);
    throw error;
  }
};
export const createZohoLead = async (userData: { name: string; email: string }) => {
  try {
    await initializeZoho();
    const recordOperations = new MODULES.RecordOperations();
    const record = new Record();

    // Use string literals instead of ZOHO.Field
    record.addFieldValue("Last_Name", userData.name);
    record.addFieldValue("Email", userData.email);
    record.addFieldValue("Lead_Source", "Website Registration");

    const recordArray = [record];
    const request = new BodyWrapper();
    request.setData(recordArray);

    await recordOperations.createRecords("Leads", request);
    return true;
  } catch (error) {
    console.error('Error adding user to Zoho:', error);
    return false;
  }
};