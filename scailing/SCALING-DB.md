# 🛢️ Database Scaling

## 🔹 Overview
Scaling the PostgreSQL database to handle more reads/writes.

## 🔹 Strategies for Scaling PostgreSQL
### **1. Connection Pooling (Pgbouncer)**
```sh
docker run -d --name pgbouncer -p 6432:6432 pgbouncer
```

2. Read Replicas
```sh
CREATE USER replica_user WITH REPLICATION ENCRYPTED PASSWORD 'securepassword';
```

3. Database Partitioning
```sh
CREATE TABLE visits_2025 PARTITION OF visits FOR VALUES FROM ('2025-01-01') TO ('2025-12-31');
```

🔹 Expected Performance Boost

•	🚀 Supports 10M+ visits per day.

•	✅ Faster database queries with connection pooling.