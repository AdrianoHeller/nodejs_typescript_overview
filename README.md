# Nodejs Typescript Overview

This is the public repository for the source code management of the coding videos.

## Steps Coded 'til now:

- Native HTTP Server
- Handlers
- Helpers
- Native Router
- HTTPS Server
- Self Signed Certificate
- Install certificate on machine and make it trustable
- Create Simple API Endpoints
- Docker Overview
- Run MongoDB via Docker
- Insert Data inside container and connect to MongoDB Compass
- DB Client connection
- DB Services CRUD

## Ref to create req.cnf and openssl config:

```bash
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no
[req_distinguished_name]
C = YourCountryGoesHere
ST = YourStateGoesHere
L = YourCityGoesHere
O = YourOrganizationName
OU = MyDivision
CN = www.localhost.com
[v3_req]
keyUsage = critical, digitalSignature, keyAgreement
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = www.localhost.com
DNS.2 = localhost.com
DNS.3 = localhost.net
```

OpenSSL cli command(must be ran inside security folder):

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
 -keyout cert.key -out cert.pem -config req.cnf -sha256
```

## Steps to be done

- Models

### This list can grow, the idea is not to be closed, but creating content in a open manner.
