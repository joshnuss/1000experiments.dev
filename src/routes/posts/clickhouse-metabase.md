---
title: Clickhouse + Metabase setup
experiment: 201
date: "2021-06-22"
permalink: clickhouse-metabase
tags: clickhouse, metabase, docker
---

I've been messing around with an analytics project using [Clickhouse](https://clickhouse.tech).

Clickhouse is really good at storing tons of data points and being able to querying them efficiently. It even understands the MySQL and PostgresSQL protocol, so you can using existing drivers.

## Metabase

To analyze the data I wanted to try [Metabase](https://www.metabase.com), but the docker container didn't have a clickhouse driver, so it took a little futzing around to make it work.

## Code

https://gist.github.com/joshnuss/927da848f5644bb3befad50491cfdd31

```bash
#!/usr/bin bash

# install clickhouse locally
sudo apt install clickhouse-server clickhouse-client

# download latest driver for metabase+clickhouse
mkdir metabase-plugins
wget https://github.com/enqueue/metabase-clickhouse-driver/releases/download/0.7.5/clickhouse.metabase-driver.jar -P metabase-plugins/

# boot container, mapping plugin dir and exposing current host as `host.docker.internal`
docker run -d -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  --mount type=bind,source=$(pwd)/metabase-plugins,destination=/plugins \
  --name metabase metabase/metabase

# open metabase in browser
google-chrome http://localhost:3000

# follow setup wizard
# - choose `clickhouse` as the driver
# - use `host.docker.internal` as the host
```

You can verify if the container has access by running `curl` within the container:

```bash
> docker exec -it metabase curl host.docker.internal:8123
Ok.
```
