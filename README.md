# elasticsearch-pubsub
Example of using Elasticsearch as consumer and PubSub as Transport

### Install the Google Cloud SDK and start pubsub emulator

1. Download tag.gz file from https://cloud.google.com/sdk/docs/install

2. Run command from downloaded folder
```
./google-cloud-sdk/install.sh
```
No need to run `./google-cloud-sdk/bin/gcloud init`.

3. Start the Pub/Sub Emulator (follow CLI instructions to install required components)


```
gcloud beta emulators pubsub start --host-port=localhost:8085
```

or install components separately

```
gcloud components install pubsub-emulator
gcloud components update
```

Set global variable to narrow pubsub to emulator

```
export PUBSUB_EMULATOR_HOST=localhost:8085
```


Next Steps:

- docker compose for elastic / grafana