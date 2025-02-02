# ⚡ Caching for Performance

## 🔹 Overview
Using **Redis caching** reduces database load and speeds up requests.

## 🔹 Steps to Implement Redis
1. **Install Redis**:
```sh
docker run -d --name redis -p 6379:6379 redis
```
2.	Modify URL Lookup to Use Redis:
```
async function getShortenedUrl(slug: string) {
    let cachedUrl = await redis.get(slug);
    if (cachedUrl) return cachedUrl;

    const url = await urlRepository.findOne({ where: { slug } });
    if (url) redis.set(slug, url.originalUrl, 'EX', 3600);

    return url?.originalUrl;
}
```

🔹 Expected Performance Boost

•	🚀 5-10x faster responses for frequently accessed URLs.

•	✅ Reduces database load by up to 80%.