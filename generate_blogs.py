import os
import datetime

titles = [
    "SECURITY ADVISORY: ZERO-DAY KERNEL PANIC",
    "DEPRECATING GCC: THE MOVE TO CLANG",
    "BTRFS SNAPSHOTS: BUILDING A SURVIVAL PLAN",
    "HARDENING WAYLAND: THE STRUGGLE CONCLUDES",
    "PACMAN PARALLEL DOWNLOADS OPTIMIZATION",
    "RUST IN THE KERNEL: A NEW ERA",
    "SYSTEMD VS OPENRC: THE ENDLESS WAR",
    "X11 IS DEAD: EMBRACING THE VOID",
    "NEOVIM 0.10: BLADE OF THE DEVELOPER"
]

descriptions = [
    "A critical vulnerability has been detected in the core memory management subsystem. Immediate patching required to prevent unauthorized root privilege escalation.",
    "We are officially transitioning our primary compilation toolchain. This document outlines the performance metrics driving the shift.",
    "Data corruption is inevitable. Learn how to architect a bulletproof BTRFS snapshot system using automated hooks.",
    "Securing Wayland compositors against keylogging vectors. A brutalist approach to display server architecture.",
    "Tuning pacman.conf for maximum throughput. Stop waiting and start executing.",
    "The memory-safe crusade continues. Analyzing the impact of newly merged Rust bindings within the core tree.",
    "A philosophical and technical breakdown of init systems. Why we chose the path of least resistance.",
    "X11 development has flatlined. It is time to let go of the rotting corpse and fully commit to the Wayland protocol.",
    "Unleash the full potential of your text editor. Essential Lua configurations for the ruthless coder."
]

tags_list = [
    '["SECURITY", "VULN"]',
    '["GCC", "CLANG"]',
    '["BTRFS", "BACKUP"]',
    '["WAYLAND", "SECURITY"]',
    '["PACMAN", "SYSADMIN"]',
    '["KERNEL", "RUST"]',
    '["SYSTEMD", "INIT"]',
    '["WAYLAND", "X11"]',
    '["NEOVIM", "DEV"]'
]

base_date = datetime.date(2026, 3, 20)

os.makedirs('src/content/blog', exist_ok=True)

for i in range(9):
    date_str = (base_date - datetime.timedelta(days=i*2)).isoformat()
    filename = f"src/content/blog/post-{i+1}.mdx"
    content = f"""---
title: "{titles[i]}"
description: "{descriptions[i]}"
pubDate: {date_str}
author: "SYS_ADMIN"
tags: {tags_list[i]}
draft: false
---

# {titles[i]}

## EXECUTIVE SUMMARY

{descriptions[i]}

### DETAILED DIAGNOSTICS

Execute the following verification sequence directly within your terminal to validate current system states:

```bash
# Verify kernel integrity
uname -r
dmesg | grep -i error
```

- System metric validation successful
- All daemons responding
- Secure handshake established

The abyss stares back, but the system remains secure. End of line.
"""
    with open(filename, 'w') as f:
        f.write(content)
print("9 blogs generated.")
