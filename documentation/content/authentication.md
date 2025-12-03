---
title: "Authentication"
weight: 10
---

# Authentication

The SDI API uses API keys or service tokens to authenticate requests. You can configure authentication in your `application.yml` or via environment variables.

> To authorize, use this code:

```shell
# With shell, you can just pass the correct header with each request
curl "https://api.yourservice.com/api/sdi/analyze" \
  -H "Authorization: Bearer sdi_test_your_key"
```

```java
import com.sdi.SdiClient;

SdiClient client = new SdiClient("sdi_test_your_key");
```

```python
import sdi

client = sdi.SdiClient(api_key='sdi_test_your_key')
```

```javascript
const sdi = require('sdi');

const client = new sdi.Client('sdi_test_your_key');
```

```go
package main

import "github.com/yourusername/sdi-go"

client := sdi.NewClient("sdi_test_your_key")
```

> Make sure to replace `sdi_test_your_key` with your API key.

**Test mode** uses the prefix `sdi_test_` and **production mode** uses the prefix `sdi_live_`. Alternatively, you can use service account tokens for granular permissions.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

All API requests must be made over HTTPS in production. Calls made over plain HTTP will fail in production mode. API requests without authentication will also fail.

SDI expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: Bearer sdi_test_your_key`

<aside class="notice">
You must replace <code>sdi_test_your_key</code> with your personal API key.
</aside>
