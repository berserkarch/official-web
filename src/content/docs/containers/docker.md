---
order: 8
title: Using Berserk Arch Docker Containers
description: Complete guide to deploying and managing BerserkArch OS in Docker containers with practical examples and configurations.
hero:
  actions:
    - text: explore
      link: https://hub.docker.com/r/berserkarch/berserkarch/tags
---

## Overview

BerserkArch is an Arch-based Linux distribution optimized for hackers, developers, and penetration testing. Running it in Docker containers provides isolated, reproducible environments without full VM overhead.

## Available Images

BerserkArch maintains several Docker images for different use cases:

- **latest** - Base system with essential tools
- **deb** - Debian package compatibility layer
- **base-devel** - Development environment with build tools
- **offsec** - Offensive security toolkit
- **base** - Minimal Arch base

All images target `linux/amd64` architecture.

## Image Flavors Explained

### latest

The default BerserkArch image containing the base Arch Linux system with commonly used tools and utilities. This is suitable for general-purpose containerized workflows.

**Use cases:**

- Quick testing and development
- Running scripts and automation
- General containerized tasks

**Key characteristics:**

- Bleeding-edge Arch packages
- Minimal footprint
- pacman package manager
- Rolling release updates

### base

The absolute minimal BerserkArch installation - just the core Arch base system without additional tools. Start here if you want maximum control over what gets installed.

**Use cases:**

- Building custom images with minimal bloat
- Learning Arch internals
- Creating specialized containers from scratch

**Key characteristics:**

- Smallest image size
- Only essential system packages
- Build your own toolset

### base-devel

Extends the base image with the complete Arch Linux development toolchain. Includes compilers, build tools, headers, and everything needed for compiling software from source.

**Pre-installed tools:**

- GCC/G++ compiler suite
- make, cmake, autotools
- pkg-config, binutils
- Development headers and libraries
- base-devel package group

**Use cases:**

- Compiling C/C++/Rust projects
- Building packages from AUR
- Cross-compilation workflows
- Creating development environments

**Why use this:**
Arch's bleeding-edge toolchains give you the latest compiler features and optimizations, but some older codebases may have compatibility issues with cutting-edge versions.

### deb

This flavor includes Debian compatibility layers and package management tools, allowing you to install `.deb` packages alongside Arch packages. Critical for tools that only provide Debian packages or behave differently on bleeding-edge systems.

**Pre-installed:**

- dpkg and alien for .deb handling
- Debian package conversion tools
- Compatibility libraries

**Use cases:**

- Running tools only distributed as .deb files
- Testing cross-distro compatibility
- Working with Perl/Ruby/Python tools that need stable system libraries
- Legacy application support

**Technical details:**
Some interpreted languages (Perl, Ruby, Python) and their modules can behave unpredictably with Arch's rolling-release libraries. The deb flavor provides stable Debian-based versions of critical system libraries while maintaining Arch's package manager for other tools.

**Example scenario:**

```bash
# Some Ruby gems fail to compile against Arch's latest OpenSSL
# Use deb image to install Debian's stable Ruby environment
docker run -it berserkarch/berserkarch:deb bash
dpkg -i ruby-stable.deb
gem install problematic-gem  # Now works with stable libs
```

### offsec

The comprehensive offensive security and penetration testing image. Pre-loaded with security tools, exploits frameworks, and network analysis utilities.

**Pre-installed categories:**

- **Network scanning:** nmap, masscan, zmap
- **Web application testing:** Burp Suite, OWASP ZAP, sqlmap
- **Exploitation frameworks:** Metasploit, BeEF
- **Password cracking:** hashcat, john, hydra
- **Wireless testing:** aircrack-ng suite
- **Forensics tools:** binwalk, volatility
- **Reverse engineering:** radare2, ghidra, IDA
- **Enumeration:** enum4linux, gobuster, ffuf

**Use cases:**

- Penetration testing engagements
- Security research and exploit development
- CTF competitions
- Security training and labs
- Malware analysis

**Network capabilities:**
Designed to run with elevated privileges for raw packet access:

```bash
docker run -it --privileged \
  --cap-add=NET_ADMIN \
  --cap-add=NET_RAW \
  --network host \
  berserkarch/berserkarch:offsec
```

**Why Arch for security:**
Rolling release means you always have the latest security tools without waiting for distro package updates. Critical for zero-day exploits and cutting-edge techniques.

## Choosing the Right Flavor

| Need                | Recommended Image | Why                         |
| ------------------- | ----------------- | --------------------------- |
| General scripting   | `latest`          | Balanced base system        |
| Minimal container   | `base`            | Smallest footprint          |
| Compile software    | `base-devel`      | Full build toolchain        |
| Legacy .deb tools   | `deb`             | Debian compatibility        |
| Pentesting/Security | `offsec`          | Pre-loaded security tools   |
| Stable interpreters | `deb`             | Avoid bleeding-edge issues  |
| Latest exploits     | `offsec`          | Cutting-edge security tools |

## Installation

### Pull an Image

```bash
# Pull the latest base image
docker pull berserkarch/berserkarch:latest

# Pull specific variant
docker pull berserkarch/berserkarch:offsec
docker pull berserkarch/berserkarch:base-devel
```

### Verify Image

```bash
# Check downloaded images
docker images | grep berserkarch

# Inspect image details
docker inspect berserkarch/berserkarch:latest
```

## Basic Usage

### Interactive Shell

```bash
# Launch interactive bash session
docker run -it berserkarch/berserkarch:latest /bin/bash

# With specific shell
docker run -it berserkarch/berserkarch:latest /bin/zsh
```

### Running Commands

```bash
# Execute single command
docker run --rm berserkarch/berserkarch:latest pacman -Syu

# Check installed packages
docker run --rm berserkarch/berserkarch:latest pacman -Q
```

## Advanced Configuration

### Persistent Storage

```bash
# Mount host directory for persistent data
docker run -it \
  -v ~/berserk-data:/data \
  berserkarch/berserkarch:latest

# Mount multiple volumes
docker run -it \
  -v ~/projects:/workspace \
  -v ~/.ssh:/root/.ssh:ro \
  berserkarch/berserkarch:base-devel
```

### Network Configuration

```bash
# Use host network stack
docker run -it --network host berserkarch/berserkarch:offsec

# Expose specific ports
docker run -it \
  -p 8080:8080 \
  -p 4444:4444 \
  berserkarch/berserkarch:latest

# Custom network
docker network create berserk-net
docker run -it --network berserk-net berserkarch/berserkarch:latest
```

### Resource Limits

```bash
# Limit CPU and memory
docker run -it \
  --cpus="2.0" \
  --memory="4g" \
  --memory-swap="6g" \
  berserkarch/berserkarch:base-devel

# Set CPU priority
docker run -it \
  --cpu-shares=1024 \
  berserkarch/berserkarch:latest
```

## Development Environment Setup

### Base Development Container

```bash
# Use base-devel image for compilation
docker run -it \
  -v $(pwd):/workspace \
  -w /workspace \
  berserkarch/berserkarch:base-devel \
  bash

# Inside container, install additional tools
pacman -S git cmake ninja gdb
```

### Custom Dockerfile

```dockerfile
FROM berserkarch/berserkarch:base-devel

# Install development tools
RUN pacman -Syu --noconfirm && \
    pacman -S --noconfirm \
    vim \
    neovim \
    tmux \
    git \
    docker \
    python \
    python-pip \
    nodejs \
    npm

# Set up working directory
WORKDIR /workspace

# Configure user (optional)
RUN useradd -m -s /bin/bash developer && \
    echo "developer ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER developer

CMD ["/bin/bash"]
```

Build custom image:

```bash
docker build -t myberserk:dev .
docker run -it -v $(pwd):/workspace myberserk:dev
```

## Offensive Security Use Cases

### Using offsec Image

```bash
# Launch with privileged mode for network tools
docker run -it --privileged \
  --network host \
  -v ~/pentest:/pentest \
  berserkarch/berserkarch:offsec

# Inside container
nmap -sV target.com
metasploit-framework
burpsuite
```

### Isolated Testing Environment

```bash
# Create isolated container for testing
docker run -it \
  --cap-add=NET_ADMIN \
  --cap-add=NET_RAW \
  --device /dev/net/tun \
  -v ~/tools:/tools \
  berserkarch/berserkarch:offsec \
  /bin/bash
```

## Package Management

### Installing Packages

```bash
# Update system
docker run -it berserkarch/berserkarch:latest bash -c "pacman -Syu"

# Install specific packages
docker run -it berserkarch/berserkarch:latest bash -c "pacman -S --noconfirm python-pip"

# Using AUR helper (if available)
yay -S package-name
```

### Creating Custom Image with Packages

```dockerfile
FROM berserkarch/berserkarch:latest

RUN pacman -Syu --noconfirm && \
    pacman -S --noconfirm \
    python \
    python-pip \
    git \
    wget \
    curl \
    && pacman -Scc --noconfirm

RUN pip install requests beautifulsoup4 scrapy
```

## Docker Compose Configuration

### Development Stack

```yaml
version: "3.8"

services:
  berserk-dev:
    image: berserkarch/berserkarch:base-devel
    container_name: berserk-workspace
    volumes:
      - ./workspace:/workspace
      - ~/.ssh:/root/.ssh:ro
    working_dir: /workspace
    stdin_open: true
    tty: true
    network_mode: bridge

  berserk-test:
    image: berserkarch/berserkarch:latest
    container_name: berserk-test
    depends_on:
      - berserk-dev
    volumes:
      - ./test:/test
    command: /bin/bash -c "while true; do sleep 1000; done"
```

Run the stack:

```bash
docker-compose up -d
docker-compose exec berserk-dev bash
```

### Offensive Security Lab

```yaml
version: "3.8"

services:
  kali-box:
    image: berserkarch/berserkarch:offsec
    container_name: pentest-lab
    privileged: true
    network_mode: host
    volumes:
      - ./reports:/reports
      - ./tools:/tools
    stdin_open: true
    tty: true
    cap_add:
      - NET_ADMIN
      - NET_RAW
    devices:
      - /dev/net/tun
```

## Container Management

### Named Containers

```bash
# Create named container
docker run -it --name berserk-workspace \
  -v ~/projects:/workspace \
  berserkarch/berserkarch:base-devel

# Start/stop existing container
docker start berserk-workspace
docker stop berserk-workspace

# Attach to running container
docker attach berserk-workspace

# Execute command in running container
docker exec -it berserk-workspace pacman -Syu
```

### Container Persistence

```bash
# Commit changes to new image
docker commit berserk-workspace myberserk:custom

# Export container filesystem
docker export berserk-workspace > berserk-backup.tar

# Import filesystem
docker import berserk-backup.tar myberserk:restored
```

## Practical Workflows

### Web Development

```bash
# Run web development environment
docker run -it \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  -p 8080:8080 \
  berserkarch/berserkarch:base-devel \
  bash

# Inside container
pacman -S nodejs npm
npm install
npm run dev
```

### Compile Projects

```bash
# Compile C/C++ project
docker run --rm \
  -v $(pwd):/build \
  -w /build \
  berserkarch/berserkarch:base-devel \
  bash -c "cmake . && make"

# Compile with specific tools
docker run --rm \
  -v $(pwd):/src \
  -w /src \
  berserkarch/berserkarch:base-devel \
  gcc main.c -o output
```

### Security Scanning

```bash
# Network scanning
docker run -it --rm \
  --network host \
  berserkarch/berserkarch:offsec \
  nmap -sV -p- target.local

# Vulnerability assessment
docker run -it --rm \
  -v ~/scan-results:/results \
  berserkarch/berserkarch:offsec \
  nikto -h https://target.com -o /results/report.html
```

## Troubleshooting

### Common Issues

**Permission Denied on Volumes**

```bash
# Run with user mapping
docker run -it \
  -v $(pwd):/workspace \
  -u $(id -u):$(id -g) \
  berserkarch/berserkarch:latest
```

**Network Tools Require Privileges**

```bash
# Use --privileged flag
docker run -it --privileged \
  --cap-add=ALL \
  berserkarch/berserkarch:offsec
```

**Container Stops Immediately**

```bash
# Keep container running
docker run -dit berserkarch/berserkarch:latest /bin/bash
docker exec -it <container-id> bash
```

### Logging and Debugging

```bash
# View container logs
docker logs berserk-workspace

# Follow logs in real-time
docker logs -f berserk-workspace

# Inspect container details
docker inspect berserk-workspace

# Check resource usage
docker stats berserk-workspace
```

## Best Practices

### Security Considerations

- Avoid running containers as root when possible
- Use read-only volumes for sensitive data (`-v ~/.ssh:/root/.ssh:ro`)
- Limit container capabilities with `--cap-drop` and `--cap-add`
- Use user namespaces for additional isolation
- Regularly update base images

### Performance Optimization

- Use `.dockerignore` to exclude unnecessary files
- Minimize layer count in custom Dockerfiles
- Use multi-stage builds for smaller images
- Mount caches for package managers
- Clean package cache after installations

### Image Management

```bash
# Remove unused images
docker image prune

# Remove stopped containers
docker container prune

# Remove all unused data
docker system prune -a
```

## Additional Resources

- [Docker Hub Repository](https://hub.docker.com/r/berserkarch/berserkarch)
- [BerserkArch Documentation](#)
- [Arch Linux Wiki](https://wiki.archlinux.org/)
- [Docker Documentation](https://docs.docker.com/)
