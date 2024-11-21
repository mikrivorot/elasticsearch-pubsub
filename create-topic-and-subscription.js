const { PubSub } = require('@google-cloud/pubsub');

// Initialize the Pub/Sub client to connect to the local emulator
const pubsub = new PubSub({
    apiEndpoint: 'localhost:8085', // Point to the emulator
    projectId: 'my-local-project',       // Use any project ID here; it's only for local testing
});
const topicName = 'my-topic';
const subscriptionName = 'app-logs';

async function createTopic() {
    try {
        const topics = await pubsub.getTopics();
        if (!topics?.[0]?.find(x => x?.name?.includes('my-topic'))) {
            await pubsub.createTopic(topicName);
            console.log(`Topic ${topicName} created.`);
        } else {
            console.log(`Topic ${topicName} already exists.`);
        }
    } catch (error) {
        console.error(`Failed to create topic: ${error}`);
    }
}

async function createSubscription() {
    try {
        // Create the subscription for the topic
        const subscriptions = await pubsub.topic(topicName).getSubscriptions();
        await pubsub.topic(topicName).createSubscription(subscriptionName);
        console.log(`Subscription ${subscriptionName} created.`);
    } catch (error) {
        console.error(`Failed to create subscription: ${error}`);
    }
}


createTopic();
createSubscription();