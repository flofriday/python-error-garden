FROM ubuntu:24.04

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    libssl-dev \
    zlib1g-dev \
    libncurses5-dev \
    libncursesw5-dev \
    libreadline-dev \
    libsqlite3-dev \
    libgdbm-dev \
    libdb5.3-dev \
    libbz2-dev \
    libexpat1-dev \
    liblzma-dev \
    tk-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Build Python 3.2.6 (last 3.2 release)
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.2.6/Python-3.2.6.tgz && \
    tar -xzf Python-3.2.6.tgz && \
    cd Python-3.2.6 && \
    ./configure --prefix=/usr/local/python3.2 --enable-shared LDFLAGS="-Wl,-rpath /usr/local/python3.2/lib" && \
    make -j$(nproc) && \
    make install && \
    ln -s /usr/local/python3.2/bin/python3 /usr/local/bin/python3.2 && \
    cd /tmp && rm -rf Python-3.2.6*

# Build Python 3.3.7 (last 3.3 release)
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.3.7/Python-3.3.7.tgz && \
    tar -xzf Python-3.3.7.tgz && \
    cd Python-3.3.7 && \
    ./configure --prefix=/usr/local/python3.3 --enable-shared LDFLAGS="-Wl,-rpath /usr/local/python3.3/lib" && \
    make -j$(nproc) && \
    make install && \
    ln -s /usr/local/python3.3/bin/python3 /usr/local/bin/python3.3 && \
    cd /tmp && rm -rf Python-3.3.7*

# Verify installations
RUN python3.2 --version && python3.3 --version

WORKDIR /workspace

CMD ["/bin/bash"]