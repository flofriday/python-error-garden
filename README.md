# Python Error Garden

## Build it yourself

First you need collect the errors python outputs

```bash
uv run main.py examples/wrong_function.py --version=3.14
```

This step will create the `errors.json` file which is needed to build the 
frontend.

```
cd frontend
npm run build
```

Which now created a single static `frontend/dist/index.html` file.

## Run the multiversion docker container

Since you probably don't want to install all python versions from the better 
part of the last two decades and their build dependencies, there is a docker 
image that does that for you.

Be aware that it might take a long time to build since its really hard to get
binaries for outdated python versions and they need to be built from source.


```bash
docker build --platform linux/amd64 -t error-garden .
docker run -it -v $(pwd):/workspace error-garden
```

The second command drops a shell in which you can run the generation script:
 
```bash
uv run main.py --versions all
```