FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# Install build dependencies and curl for uv
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    curl \
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

# Build Python 3.0.1 (last 3.0 release)
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.0.1/Python-3.0.1.tgz && \
    tar -xzf Python-3.0.1.tgz && \
    cd Python-3.0.1 && \
    ./configure --prefix=/usr/local/python3.0 --enable-shared LDFLAGS="-Wl,-rpath /usr/local/python3.0/lib" && \
    make -j$(nproc) && \
    make install && \
    ln -s /usr/local/python3.0/bin/python3 /usr/local/bin/python3.0 && \
    cd /tmp && rm -rf Python-3.0.1*

# Build Python 3.1.5 (last 3.1 release)
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.1.5/Python-3.1.5.tgz && \
    tar -xzf Python-3.1.5.tgz && \
    cd Python-3.1.5 && \
    ./configure --prefix=/usr/local/python3.1 --enable-shared LDFLAGS="-Wl,-rpath /usr/local/python3.1/lib" && \
    make -j$(nproc) && \
    make install && \
    ln -s /usr/local/python3.1/bin/python3 /usr/local/bin/python3.1 && \
    cd /tmp && rm -rf Python-3.1.5*

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

# Build Python 3.4.10 (last 3.4 release)
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.4.10/Python-3.4.10.tgz && \
    tar -xzf Python-3.4.10.tgz && \
    cd Python-3.4.10 && \
    ./configure --prefix=/usr/local/python3.4 --enable-shared LDFLAGS="-Wl,-rpath /usr/local/python3.4/lib" && \
    make -j$(nproc) && \
    make install && \
    ln -s /usr/local/python3.4/bin/python3 /usr/local/bin/python3.4 && \
    cd /tmp && rm -rf Python-3.4.10*

# Build Python 3.5.10 (last 3.5 release)
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.5.10/Python-3.5.10.tgz && \
    tar -xzf Python-3.5.10.tgz && \
    cd Python-3.5.10 && \
    ./configure --prefix=/usr/local/python3.5 --enable-shared LDFLAGS="-Wl,-rpath /usr/local/python3.5/lib" && \
    make -j$(nproc) && \
    make install && \
    ln -s /usr/local/python3.5/bin/python3 /usr/local/bin/python3.5 && \
    cd /tmp && rm -rf Python-3.5.10*

# Build Python 3.6.15 (last 3.6 release)
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.6.15/Python-3.6.15.tgz && \
    tar -xzf Python-3.6.15.tgz && \
    cd Python-3.6.15 && \
    ./configure --prefix=/usr/local/python3.6 --enable-shared LDFLAGS="-Wl,-rpath /usr/local/python3.6/lib" && \
    make -j$(nproc) && \
    make install && \
    ln -s /usr/local/python3.6/bin/python3 /usr/local/bin/python3.6 && \
    cd /tmp && rm -rf Python-3.6.15*

# Build Python 3.7.17 (last 3.7 release)
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.7.17/Python-3.7.17.tgz && \
    tar -xzf Python-3.7.17.tgz && \
    cd Python-3.7.17 && \
    ./configure --prefix=/usr/local/python3.7 --enable-shared LDFLAGS="-Wl,-rpath /usr/local/python3.7/lib" && \
    make -j$(nproc) && \
    make install && \
    ln -s /usr/local/python3.7/bin/python3 /usr/local/bin/python3.7 && \
    cd /tmp && rm -rf Python-3.7.17*

# Install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:$PATH"

# Use uv to install Python 3.8-3.13
RUN uv python install 3.8 3.9 3.10 3.11 3.12 3.13 3.14

# Create symlinks for uv-managed Pythons
RUN ln -s /root/.local/share/uv/python/cpython-3.8.*/bin/python3 /usr/local/bin/python3.8 && \
    ln -s /root/.local/share/uv/python/cpython-3.9.*/bin/python3 /usr/local/bin/python3.9 && \
    ln -s /root/.local/share/uv/python/cpython-3.10.*/bin/python3 /usr/local/bin/python3.10 && \
    ln -s /root/.local/share/uv/python/cpython-3.11.*/bin/python3 /usr/local/bin/python3.11 && \
    ln -s /root/.local/share/uv/python/cpython-3.12.*/bin/python3 /usr/local/bin/python3.12 && \
    ln -s /root/.local/share/uv/python/cpython-3.13.*/bin/python3 /usr/local/bin/python3.13 && \
    ln -s /root/.local/share/uv/python/cpython-3.14.*/bin/python3 /usr/local/bin/python3.14

# Verify all installations
RUN echo "Verifying Python installations:" && \
    python3.0 --version && \
    python3.1 --version && \
    python3.2 --version && \
    python3.3 --version && \
    python3.4 --version && \
    python3.5 --version && \
    python3.6 --version && \
    python3.7 --version && \
    python3.8 --version && \
    python3.9 --version && \
    python3.10 --version && \
    python3.11 --version && \
    python3.12 --version && \
    python3.13 --version && \
    python3.14 --version

WORKDIR /workspace

CMD ["/bin/bash"]