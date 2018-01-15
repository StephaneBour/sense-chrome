# sense-chrome

The original extension "sense for chrome" was [blacklisted](https://www.elastic.co/blog/sense-chrome-plugin-malware-issue)

To use this fork (from https://github.com/elastic/sense) :

#### Directly in chrome :

- make a git clone of the project
- go in your chrome extensions tabs
- activate the developer mode
- choose your folder in "load extension unpacked"

#### On all browsers :

- Edit your elasticsearch.yml (on MacOS you can find in `/usr/local/etc/elasticsearch/`)
- Add the following lines :
```bash
http.cors.allow-origin: "http://sense.stephane.tech"
http.cors.enabled: true
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
http.cors.allow-credentials: true
```
- (_optional - recommended if you call something other than your localhost_) Filtering the request on your IP ([ELS > 2.4](https://www.elastic.co/guide/en/x-pack/current/ip-filtering.html) - [ELS <= 2.4](https://www.elastic.co/guide/en/shield/current/ip-filtering.html) )
- Restart your elasticsearch
- Go on http://sense.stephane.tech

Have fun !


#### Change from the original extension

- Deleting Google Analytics
- Autocompletion on indices
- Autocompletion on types
- Autocompletion on fields
- Autocompletion on aggregations (WIP)
- Add "filter" in autocomplete
- Add "Saved query"
- Export source data in CSV file 

### Screenshots

#### Main screen

![Main screen](https://github.com/StephaneBour/sense-chrome/raw/master/screenshots/main.jpg)

#### Autocomplete

![Main screen](https://github.com/StephaneBour/sense-chrome/raw/master/screenshots/autocomplete.jpg)


#### Save your query

![Save 1](https://github.com/StephaneBour/sense-chrome/raw/master/screenshots/saved-1.jpg)


![Save 2](https://github.com/StephaneBour/sense-chrome/raw/master/screenshots/saved-2.jpg)
