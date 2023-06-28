# Media Hosting API

[![License](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/SxMAbel/media_hosting_api/blob/main/LICENSE) 
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/SxMAbel/media_hosting_api/pulls)
![GitHub Stars](https://img.shields.io/github/stars/SxMAbel/media_hosting_api.svg)
[![Issues](https://img.shields.io/github/issues/SxMAbel/media_hosting_api.svg)](https://github.com/SxMAbel/media_hosting_api/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/SxMAbel/media_hosting_api.svg)](https://github.com/SxMAbel/media_hosting_api/pulls)

**Media Hosting API** is an open-source solution for streaming and managing media files. It provides a simple and efficient way to upload, access, and delete various types of media files. With Media Hosting API, you can streamline your media hosting needs and easily integrate media file management into your applications.

## Endpoints

The following endpoints are available in the Media Hosting API:

- _GET_ **`/api/v1/check/:id`** - _Check if a media file exists by ID. Returns 'isFound', 'id', 'url'._
- _DELETE_ **`/api/v1/delete/:id`** - _Remove a file by ID. Returns 'deleted', 'message'._
- _GET_ **`/api/v1/play/:id`** - _Stream only videos or mp3 files. Turns link into stream source._
- _POST_ **`/api/v1/upload`** - _Upload either images, video files, audio files. Returns 'id', 'url'._
- _GET_ **`/api/v1/view/:id`** - _Get source link of the media that includes the ID. Returns 'url'._


## Accessing Errors

If you encounter any errors while using the API, you can access the specific error message by checking `response.data.error` in the API response.

## Contributing

We appreciate contributions to enhance the Media Hosting API. If you find any bugs or have suggestions for improvements, please feel free to contribute by following these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make the necessary modifications and fixes.
4. Test your changes thoroughly.
5. Submit a pull request, describing the changes you have made.

Your contributions will help make the Media Hosting API even better!

## Bug Fixes

If you have identified any bugs in the API and have fixed them, we encourage you to contribute by creating a pull request. We appreciate your effort in improving the stability and reliability of the API.

## Support

If you need any assistance or have questions related to the Media Hosting API, please open create an issue with your question. 

## Contributors
Special thanks to the all the contributors who have helped make the Media Hosting API even better!
<!-- CONTRIBUTORS_START -->  


<!-- CONTRIBUTORS_END -->
