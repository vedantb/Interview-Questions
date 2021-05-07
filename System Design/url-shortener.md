# URL Shortener

## Why do we need URL shortening?

- Save space when displayed, printed, messaged, tweeted etc.
- Users are less likely to mistyle smaller URLs
- Optimize links across devices, tracking individual links to analyze performance, and hiding affiliated original URLs

Remember

- Interviewer is NOT looking for a solution where you take longer URL, generate shorter URL, store in map, and return longer URL from the map
- Interviewer is likely asking you this to test your knowledge on durability and scalability

## Database Design

URL - original URL, Expiration Date, UserId
User - Name, Email, CreationDate, LastLogin

A malicious user could consume all the URLs. To prevent this, we can limit users through an API key.

- Our service is read heavy
- There seems to be ONLY one relationship between records, which is to store which user created the URL.

- In general, relational databases are good for systems where you expect to make lots of complex queries involving joins and such.

- NoSQL databases are not as good at looking at relationships, in exchange, they're faster for writes and simple key-value reads.

We will go with a NoSQL which will also be easier to scale.

## Identify Core Features

Let's choose the length of url to be 7

- If we user a base10 system for our short URL, we will only have 10 ^ 7 urls (10 million)
- If we use a base62 (A-Z, a-z, 0-9) system, we'll have 3.5 trillion URLs
- The longer our key the more URLs we have and the less we have to worry about running out. However, the point is to keep them as short as possible. So we will stick to 7. Even if we consumed 1000 keys a second, it'll take 111 years to run out.

## SOLUTION 1

- Compute a unique hash (MD5, SHA256) of a given URL, and then encode using base62.

MD5(longURL) -> base62encode(128bit hash value) -> AB12CD23444 -> Pick first 7 characters?

- Could result in key duplication or collisions in the DB, however unlikely this is.

- We can use a PutIfAbsent to resolve this, then choose some other characters from encoded string or swap some characters. However, not all NoSQL databases support this.

## Solution 2 (Guaranteed No Duplicates / Collisions)

- Counter(0-3.5T) -> base62encode -> aAbB123 -> use this

Two problems:

- Single Point of Failure
- If requests spike, our counter host may not be able to handle it.

We are NOT encoding the url here

- A distributed systems maanger, such as ZooKeeper, gives servers unused ranges.
- To avoid having ZK be a single point of failure, we will run multiple instances
- If new server is added, give them an unused range. If range runs out, existing server can go to ZooKeeper and ask for new unused range.
- If one of the server dies, we waste 1 million possible keys, which is acceptable.
- **However, we are generating URLs in a sequential manner which can be a security threat**

- We could add another 10-15 bits after the counter number to increase the entropy.

## Solutions for Scaling

Cache

- We can speed up DB reads, by putting as much of the data in memory as possible.
- This becomes important if we get a heavy load of requests to a single link, like a popular meme. If we have a redirect URL in memory, we can redirect quickly.
- Our cache could store top 20% most used URLs
- When the cache is full, we want to replace a URL with a more popular one. A Least Recently Used cache eviction system would work.

Load Balancer

- Initially, we can use a simple round robin approach that distributes incoming traffic equally among backend servers.
- A round robin LB does not take server load into consideration, so it would still forward requests to overloaded servers.
- Least Connection or least response or least bandwidth

