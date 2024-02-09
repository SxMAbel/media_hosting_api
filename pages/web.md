[![License](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/SxMAbel/media_hosting_api/blob/main/LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/SxMAbel/media_hosting_api/pulls)
![GitHub Stars](https://img.shields.io/github/stars/SxMAbel/media_hosting_api.svg)
[![Issues](https://img.shields.io/github/issues/SxMAbel/media_hosting_api.svg)](https://github.com/SxMAbel/media_hosting_api/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/SxMAbel/media_hosting_api.svg)](https://github.com/SxMAbel/media_hosting_api/pulls)
![GitHub Latest Pre-Release)](https://img.shields.io/github/v/release/SxMAbel/media_hosting_api?include_prereleases&label=pre-release&logo=github)  
![GitHub Latest Release)](https://img.shields.io/github/v/release/SxMAbel/media_hosting_api?logo=github)
# Media Hosting API Documentation

## Introduction

Welcome to the documentation for the Media Hosting API npm package, an open-source solution designed to streamline media file hosting and management. This npm package provides a straightforward and efficient way to handle various types of media files, allowing you to seamlessly integrate media file management into your Node.js applications.

---

## Installation

To use the Media Hosting API npm package, you need to install it using npm. Run the following command in your terminal:

```bash
npm install media-hosting-api
```

---

## Usage

Once installed, you can use the Media Hosting API in your Node.js application by requiring it:

```javascript
const mediaHostingApi = require('media-hosting-api');
```

---

## Check Media File Existence

**Endpoint:** `GET /api/v1/check/:id`

Check if a media file exists by providing its ID.

### Example

```javascript
const result = mediaHostingApi.checkMediaFileExistence('123456');
console.log(result);
```

Output:

```json
{
  "isFound": true,
  "id": "123456",
  "url": "https://example.com/media/123456"
}
```

---

## Delete Media File

**Endpoint:** `DELETE /api/v1/delete/:id`

Remove a media file by providing its ID.

### Example

```javascript
const result = mediaHostingApi.deleteMediaFile('123456');
console.log(result);
```

Output:

```json
{
  "deleted": true,
  "message": "Media file with ID 123456 deleted successfully."
}
```

---

## Stream Media (Videos or MP3)

**Endpoint:** `GET /api/v1/play/:id`

Stream videos or MP3 files by providing the media file ID. This endpoint transforms the link into a stream source for seamless playback.

### Example

```javascript
const result = mediaHostingApi.streamMedia('123456');
console.log(result);
```

Output:

```json
{
  "streaming_url": "https://example.com/stream/123456"
}
```

---

## Upload Media File

**Endpoint:** `POST /api/v1/upload`

Upload media files, including images, video files, and audio files.

### Example

```javascript
const result = mediaHostingApi.uploadMediaFile('/path/to/file.jpg');
console.log(result);
```

Output:

```json
{
  "id": "789012",
  "url": "https://example.com/media/789012"
}
```

---

## View Media Source Link

**Endpoint:** `GET /api/v1/view/:id`

Retrieve the source link of the media file by providing its ID.

### Example

```javascript
const result = mediaHostingApi.viewMediaSourceLink('789012');
console.log(result);
```

Output:

```json
{
  "url": "https://example.com/source/789012"
}
```

---

## Accessing Errors

If you encounter any errors while using the API, you can access the specific error message by checking the error property in the response.

### Example

```javascript
try {
  const result = mediaHostingApi.checkMediaFileExistence('nonexistent');
  console.log(result);
} catch (error) {
  console.error(error.message);
}
```

Output:

```json
{
  "error": "Media file not found."
}
```

Feel free to explore and integrate these functions into your Node.js applications for efficient media file hosting and management using the Media Hosting API npm package!

## Customization and Configuration

The Media Hosting API npm package provides options for customization and configuration. You can set the API endpoint, authentication tokens, and other parameters to tailor the package to your specific requirements.

### Example

```javascript
const mediaHostingApi = require('media-hosting-api');

// Set API endpoint (optional, default is 'https://api.mediahosting.com')
mediaHostingApi.setEndpoint('https://custom-api-endpoint.com');

// Set authentication token (optional, if required by your Media Hosting API setup)
mediaHostingApi.setAuthToken('your-authentication-token');

// Use the configured API instance for subsequent calls
const result = mediaHostingApi.checkMediaFileExistence('123456');
console.log(result);
```

---

## Handling Rate Limits

Media Hosting API may have rate limits to prevent abuse. It's crucial to handle rate-limiting scenarios gracefully in your application. The npm package includes mechanisms to detect rate limits and manage requests accordingly.

### Example

```javascript
const mediaHostingApi = require('media-hosting-api');

try {
  const result = mediaHostingApi.checkMediaFileExistence('123456');
  console.log(result);
} catch (error) {
  if (error.statusCode === 429) {
    console.error('Rate limit exceeded. Please wait and try again later.');
  } else {
    console.error(error.message);
  }
}
```

---

## Error Handling

When using the Media Hosting API npm package, you may encounter various errors. It's essential to handle errors gracefully in your application. The package throws errors with descriptive messages to help you troubleshoot issues.

### Example

```javascript
const mediaHostingApi = require('media-hosting-api');

try {
  const result = mediaHostingApi.checkMediaFileExistence('nonexistent');
  console.log(result);
} catch (error) {
  console.error(error.message);
}
```

Output:

```json
{
  "error": "Media file not found."
}
```

---

## Contributing to the Package

If you find any issues or have suggestions for improvements, feel free to contribute to the Media Hosting API npm package on its [GitHub repository](https://github.com/yourusername/media-hosting-api).

---

## Conclusion

You've now explored the key features and usage of the Media Hosting API npm package. Integrate these functions into your Node.js applications for efficient media file hosting and management. If you have any questions or need further assistance, refer to the package documentation or reach out to the community on the [support forum](https://community.mediahostingapi.com).

Happy coding with Media Hosting API!