const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const { mailerToken } = require('../../config/auth.json');

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = mailerToken;

const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

emailCampaigns.name = 'Campaign sent via the API';
emailCampaigns.subject = 'My subject';
emailCampaigns.sender = { name: 'From name', email: 'matthew199624@gmail.com' };
emailCampaigns.type = 'classic';
emailCampaigns.body = {
  htmlContent: 'Congratulations! You successfully sent this example campaign via the Sendinblue API.',

  recipients: { listIds: [2, 7] },

  scheduledAt: '2018-01-01 00:00:01',
};

apiInstance.createEmailCampaign(emailCampaigns).then((data) => {
  console.log(`API called successfully. Returned data: ${data}`);
}, (error) => {
  console.error(error);
});
