const { PubSub } = require('@google-cloud/pubsub');
const { Client } = require('@elastic/elasticsearch');

const pubsub = new PubSub({
    apiEndpoint: 'localhost:8085', // Point to the emulator
    projectId: 'my-local-project',       // Use any project ID here; it's only for local testing
});
const client = new Client({ node: 'http://localhost:9200' });

const subscriptionName = 'app-logs';
const subscription = pubsub.subscription(subscriptionName);

const messageHandler = async (message) => {
    try {
        const data = JSON.parse(message.data);
        await client.index({
            index: 'my-index',
            body: data,
        });

        console.log(`Indexed data: ${JSON.stringify(data)}`);
        message.ack();
    } catch (error) {
        console.error(`Error indexing data: ${error}`);
    }
};

subscription.on('message', messageHandler);

console.log('Subscriber running...');
