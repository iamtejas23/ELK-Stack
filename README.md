``Node App Deploy``

```
git clone https://github.com/repo.git
cd repo
```
``create a Dockerfile``

```
# Use official Node.js image as base
FROM node:14

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application (if applicable)
RUN npm run build

# Expose port (adjust if necessary)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

``Docker image``

```
# Build the Docker image
docker build -t myrepo/vitual-browser:latest .

# Push the Docker image to Docker Hub
docker tag myrepo/vitual-browser:latest myrepo/vitual-browser:v1.0.0
docker push myrepo/vitual-browser:v1.0.0
```

``Deploy On Cluster Using Kops``

```
#vim .bashrc
#export PATH=$PATH:/usr/local/bin/
#source .bashrc


#! /bin/bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
wget https://github.com/kubernetes/kops/releases/download/v1.25.0/kops-linux-amd64
chmod +x kops-linux-amd64 kubectl
mv kubectl /usr/local/bin/kubectl
mv kops-linux-amd64 /usr/local/bin/kops

aws s3api create-bucket --bucket tejasmanets236.k8s.local --region us-east-1
aws s3api put-bucket-versioning --bucket tejasmanets236.k8s.local --region us-east-1 --versioning-configuration Status=Enabled
export KOPS_STATE_STORE=s3://tejasmanets236.k8s.local
kops create cluster --name tejasmanets236.k8s.local --zones us-east-1a --master-count=1 --master-size t2.medium --node-count=2 --node-size t2.medium
kops update cluster --name tejasmanets236.k8s.local --yes --admin

```
