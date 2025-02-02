# 🚀 Horizontal Scaling

## 🔹 Overview
Horizontal scaling means **running multiple backend instances** and using a **load balancer** to distribute traffic.

## 🔹 Steps to Scale Backend Horizontally
1. **Run multiple instances of the NestJS backend**:
   ```sh
   docker-compose up --scale backend=3
   ```
2.	Use Nginx or Traefik as a load balancer:
```sh
upstream backend {
    server backend1:3000;
    server backend2:3000;
}
```
3.	Deploy with Kubernetes for auto-scaling:
```sh
replicas: 5  # ✅ Automatically scale when needed
```
🔹 Expected Performance Boost 

•	🚀 Can handle 5,000+ RPS with multiple instances.

•	✅ Ensures high availability (no single point of failure).