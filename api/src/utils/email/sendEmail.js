const mailjet = require('node-mailjet');

module.exports = {
  async sendEmail(body) {
    const {
      from,
      to,
      subject,
      textPart,
      emailHTML,
    } = body;

    await mailjet
      .connect('09197ba65e51529f33255b33bba7f892', 'ddbba32133507c94d74aa7f1816219fb')
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: from.email,
              Name: from.name,
            },
            To: to,
            Subject: subject,
            TextPart: textPart,
            HTMLPart: emailHTML,
            CustomID: 'AppGettingStartedTest',
          },
        ],
      });
  },
};
