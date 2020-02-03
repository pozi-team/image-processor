# @pozible/image-processor
Listening to new objects added to GCS and properly resize images based on given dimensions if needed. This package is specifically prepared to be deployed on GCF using Pub/Sub triggers.

## Usage
Write `index.js` as follows:

```js
exports.service = require('@pozible/image-processor').default;
```

Then deploy with:
```sh
gcloud beta functions deploy image-processor --entry-point=service --source . --memory=256MB --trigger-bucket <bucket-name> --runtime nodejs10
```
