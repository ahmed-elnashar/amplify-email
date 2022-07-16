const aws = require('aws-sdk');
const ses = new aws.SES();

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const customerName = streamedItem.dynamodb.NewImage.name.S;
      const customerEmail = streamedItem.dynamodb.NewImage.email.S;

      await ses
        .sendEmail({
          Destination: {
            ToAddresses: [process.env.SES_EMAIL]
          },
          Source: process.env.SES_EMAIL,
          Message: {
            Subject: { Data: 'SACHI Registration Confirmation' },
            Body: {
              Text: {
                Data: `
                Dear ${customerName},${'\n'}
                Reservation under: ${customerName} ${'\n'}
                Date & time: ${new Date().toLocaleString()} ${'\n'}
                Number of guests: ${Math.round(Math.random() * 10)} ${'\n'}
                Location: Park St., Sheikh Zayed, Cairo Governorate
                https://goo.gl/maps/YYhnUfLTfgxm6JUx9  ${'\n'}

                We kindly ask you to follow our House Rules: ${'\n'}
                  • Age restricition: 21+ after 6PM ${'\n'}
                  • Dress Code - Smart Casual - shorts or flip-flops; uniforms or athletic 
                  sportswear will not be admitted. ${'\n'}
                  • Guests intoxicated or under the influence of drugs will not be
                  allowed entry. ${'\n'}
                  • Management reserves the right to refuse entry at their own
                  discretion. ${'\n'}
                  • Please arrive on time to secure your reservation. SACHI has a
                  30-minute table holding policy. ${'\n'}

                See you very soon!

                ` },
            },
          },
        })
        .promise();
    }
  }
  return { status: 'done' };
};