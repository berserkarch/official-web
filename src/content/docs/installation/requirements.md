---
order: 2
title: System Requirements
description: Guide to install berserk arch os on VMs, or bare-metal.
---

The installation requirements for **Berserk Arch** will vary depending on what you would like to install and your setup. For system requirements:

- On the low end, you can set up Berserk Arch as a basic Secure Shell (SSH) server with no desktop, using as little as
  - `128` MB of RAM (512 MB recommended) and
  - `2` GB of disk space.

    <br/>


- On the higher end, if you opt to install the default Xfce4 desktop, you should really aim for at least
  - `2` GB of RAM and
  - `20` GB of disk space.
  - When using resource-intensive applications, such as Burp Suite, they recommend at least 8 GB of RAM (and even more if it is a large web application!) or using simultaneous programs at the same time.

<br/>
<br/>

## Installation Prerequisites

This guide will make also the following assumptions when installing Berserk Arch:

- Using the amd64 installer image.
- CD/DVD drive / USB boot support.
- Single disk to install to.
- Connected to a network (with DHCP & DNS enabled) which has outbound Internet access.
