## Endpoints

- _GET_ **`/api/v1/check/:id`** - _Check if a media file exists by ID. Returns 'isFound', 'id', 'url'._
- _DELETE_ **`/api/v1/delete/:id`** - _Remove a file by ID. Returns 'deleted', 'message'._
- _GET_ **`/api/v1/play/:id`** - _Stream only videos or mp3 files. Turns link into stream source._
- _POST_ **`/api/v1/upload`** - _Upload either images, video files, audio files. Returns 'id', 'url'._
- _GET_ **`/api/v1/view/:id`** - _Get source link of the media that includes the ID. Returns 'url'._

## Accessing Errors

**if any error is encountered to access the error, use `response.data.error`**

**If any bugs found and you fixed them please create a pull request <3**
