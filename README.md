# @pozible/image-processor
Listening to new objects added to GCS and properly resize images based on given dimensions if needed.

This package is specifically prepared to be deployed on GCF using Pub/Sub triggers. It works hand in hand with [@pozible/signed-upload](https://github.com/pozible/signed-upload) to prepare the metadata and upload the file to GCS bucket.

## Usage
Write `index.js` as follows:

```js
exports.service = require('@pozible/image-processor').default;
```

Then deploy with:
```sh
gcloud beta functions deploy image-processor --entry-point=service --source . --memory=256MB --trigger-bucket <bucket-name> --runtime nodejs10
```
