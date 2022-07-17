const aws = require('aws-sdk');
aws.config.update({region: 'eu-central-1'});
const ses = new aws.SES();

exports.handler = async (event) => {
    for (const streamedItem of event.Records) {
        if (streamedItem.eventName === 'INSERT') {
            //pull off items from stream
            const customerName = streamedItem.dynamodb.NewImage.name.S;
            const customerEmail = streamedItem.dynamodb.NewImage.email.S;
            const templateData = {};
            templateData.customerName = customerName;
            templateData.customerEmail = customerEmail;
            templateData.date = "20/02/2022";
            templateData.numberOfGuests = "3";
            await ses
                .sendTemplatedEmail({
                    ConfigurationSetName: 'EmailTracking',
                    Destination: {
                        ToAddresses: [process.env.SES_EMAIL]
                    },
                    Source: process.env.SES_EMAIL,
                    Template: 'SachiEmailTemplate',
                    TemplateData: JSON.stringify(templateData),
                })
                .promise();
        }
    }
    return { status: 'done' };
};