const { PubSub } = require('@google-cloud/pubsub');

// Initialize PubSub client
const pubsub = new PubSub({
    apiEndpoint: 'localhost:8085', // Point to the emulator
    projectId: 'my-local-project',       // Use any project ID here; it's only for local testing
});

// Define the topic name
const topicName = 'my-topic';

// Function to publish a message
async function publishMessage(data) {
    try {
        // Convert the message data to a Buffer
        const dataBuffer = Buffer.from(JSON.stringify(data));

        // Publish the message
        const messageId = await pubsub.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published with data: ${JSON.stringify(data)}`);
    } catch (error) {
        console.error(`Failed to publish message: ${error}`);
    }
}

// Example usage: Publish a sample message every 5 seconds
setInterval(() => {
    const sampleData = {
        type: 'example',
        timestamp: new Date().toISOString(),
        value: Math.random() * 100, // Random value for demonstration
    };

    publishMessage(sampleData);
}, 5000);
