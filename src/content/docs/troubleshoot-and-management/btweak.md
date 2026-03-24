---
order: 7
title: btweak - BerserkArch Management Tool
description: Command-line tool for managing Docker containers, installing security tool packages, and fixing common system issues in BerserkArch.
hero:
  actions:
    - text: Github
      link: https://github.com/berserkarch/btweak
    - text: PyPi
      link: https://pypi.org/project/btweak/
---

## BerserkArch Management with btweak

BerserkArch includes `btweak`, a powerful command-line tool for managing containers, installing tools, and fixing common issues. While you can use standard Docker commands, `btweak` simplifies BerserkArch-specific workflows.

### Installation (if not already is)

```bash
pipx install btweak
```

### Available Commands

```bash
btweak fix      # Fix common system issues
btweak tools    # Manage security tool packages
btweak docker   # Manage BerserkArch and other containers
```

### Managing Docker Containers

#### List Available Containers

```bash
# View all container groups
btweak docker -l

# View BerserkArch containers specifically
btweak docker -g 1

# Search for specific containers
btweak docker -s kali
btweak docker -s burp
```

#### Quick Container Launch

Instead of typing long `docker run` commands, use `btweak`:

```bash
# Run BerserkArch latest
btweak docker -r berserkarch-latest

# Run offsec variant
btweak docker -r berserkarch-offsec

# Run in separate terminal
btweak docker -r berserkarch-base-devel -t

# Pass additional Docker flags
btweak docker -r berserkarch-deb -f "-v ~/myproject:/workspace"
```

**Pre-configured run commands include:**

- Security options (`--security-opt seccomp=unconfined --privileged`)
- Proper hostnames and container names
- User context (offsec runs as non-root user)
- Network configurations
- Volume mounts to standard locations

#### Container Groups Available

**1. BerserkArch Containers**

- `berserkarch-latest` - Base system
- `berserkarch-offsec` - Security tools (runs as user, not root)
- `berserkarch-base-devel` - Development environment
- `berserkarch-deb` - Debian compatibility layer

**2. Penetration Testing**

- Kali Linux (CLI and GUI variants)
- Parrot OS containers

**3. Tool Containers**
Pre-configured standalone security tools organized by category:

- Web Security (Burp Suite, OWASP ZAP, etc.)
- Network Analysis (Wireshark, tcpdump, etc.)
- Password Cracking (Hashcat, John, etc.)
- Forensics (Volatility, Autopsy, etc.)

**4. GUI Applications**

- Disposable browsers (Firefox, Chrome, Tor)
- Office suites
- Download managers
- VPN clients

### Tool Package Management

BerserkArch organizes security tools into installable groups:

```bash
# List all tool groups
btweak tools -l

# View specific group details
btweak tools -g 2  # Pentest Top 10

# Install a tool group
sudo btweak tools -i 2  # Install Pentest Top 10
sudo btweak tools -i 6  # Install Information Gathering tools
```

**Available Tool Groups:**

1. Minimal Tools Group (7+ meta-packages)
2. Pentest Top 10 (10 essential tools)
3. Exploitation (8+ packages)
4. Fuzzing (6+ packages)
5. Hardware Hacking (10+ packages)
6. Information Gathering (47+ packages)
7. Password Attack (45+ packages)
8. Post Exploitation (24+ packages)
9. Web Exploitation (74+ packages)
10. Utilities (1+ packages)

### System Fixes

Common issues can be resolved with `btweak fix`:

```bash
# Fix pacman GPG key issues
sudo btweak fix -g

# Fix "unable to lock database" errors
sudo btweak fix --db-lck
```

### Docker Cleanup

```bash
# WARNING: Removes ALL Docker data
btweak docker -C
```

This removes all containers, images, volumes, and networks. Use with caution.

### Practical btweak Examples

**Launch offsec container with custom volume:**

```bash
btweak docker -r berserkarch-offsec -f "-v ~/pentest:/data"
```

**Run Kali GUI container:**

```bash
btweak docker -r kali-gui
# Access via browser at localhost:3000
```

**Install web hacking tools, then launch container:**

```bash
sudo btweak tools -i 9  # Install web exploitation group
btweak docker -r berserkarch-offsec
```

**Search and run specific tool container:**

```bash
btweak docker -s burp
btweak docker -r burpsuite
```
