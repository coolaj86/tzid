tzid
====

Bidirectional conversion between tzids and timezone abbreviations.

Goal
---

I need a library which can convert between a JavaScript Locale string such as "GMT-0600 (MDT)" and a Timezone ID (TZID) such as "America/Denver" and back which works in node.js (and should also work in the browser);

Example:

```javascript
tz = require('tzid');

tz.toTzid("EDT") // "America/New York"
tz.toTzid("EST") // "America/New York"

tz.toTzid("EDT", true) // { tzid: "America/New York", offset: "-0400", dst: "+0100" }
tz.toTzid("EST", true) // { tzid: "America/New York", offset: "-0500", dst: false }

tz.toLocale("America-New_York") // { locale: "EST", offset: "-0500" }
tz.toLocale("America/New-York", true) // { locale: "EDT", offset: "-0400" }

tz.toLocale("US_Eastern", "-0500") // "EST"
tz.toLocale("America/NYC", "-0500") // "EST"
tz.toLocale("America-New_York", "-0500") // "EST"
tz.toLocale("America-New_York", "-0400") // "EDT"

// BONUS
// In the case where only the time is supplied and daylight savings is true, undefined (standard time), or false (no time change) it should prefer timezones in this order: America, Europe, Asia
tz.toTzid("-0600", true) // "America/Denver"
tz.toTzid("-0700") // "America/Denver"
tz.toTzid("-0700", false) // "America/Phoenix"
```

This will consist of 1 library file, 1 json file, and possibly 3 scraper files which are used to build the json file:

Scraping
=======

1. I should end up with a few files for the following sites (or more authoritative sources if you can find them)
* http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
* http://www.timeanddate.com/library/abbreviations/timezones/
* (or possibly the subsites such as http://www.timeanddate.com/library/abbreviations/timezones/na/)
* http://wwp.greenwichmeantime.com/to/abbreviations/index.htm
2. I should be able to copy and paste the contents of the files into Chrome's debug console and reacquire the data.
3. jQuery should be used to scrape

Data
====

The data from the various sites should be combined into a single format, perhaps similar to this:

```javascript
{ tzids: [
  { "id": "americanewyork", name: "America/New York", offset: "-0500", dst: "+0100" }
, { "id": "US/Eastern", alias: "americanewyork" }
, { "id": "America/NYC", alias: "americanewyork" }
, { "id": "americaphoenix", name: "America/Phoenix", offset: "-0700", dst: false }
], locales: [
  { "id": "EST", alias: "americanewyork" }
, { "id": "EDT", alias: "americanewyork", dst: true }
] }
```

Library
======

The library should handle non-standard spacing and punctuation - for example:
* "MDT" vs "mdt"
* "America/New York" vs "America_New-York" vs "america:NewYork"

The library should only need the combined data file as a dependency - no jquery or other framework.
