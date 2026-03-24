---
order: 5
title: Installing the system
description: Guide to install berserk arch os on Virtual Machines.
---

This guide provides step-by-step instructions for installing Berserk Arch Linux as a guest operating system in Virtual Machines, optimized for penetration testing and security research.

## Installation

After booting into the live iso, you'll see the **Berserk Welcome** screen.

From here we can take either of 2 ways:

1. Easy Installation (Offline)
2. Advanced Install (Online) -- (_Coming Soon_)

![Berserk Welcome](../../../assets/install/bwelcome.png)

### Starting the _Easy Installation_ (offline)

- Click On `Easy Installation (Offline)` button to launch the installer.

#### Installation

1. Choose the preferred language and click next

![Language](../../../assets/install/ins1.png)

<br/>

2. This is the latest release -- read and click next

![notes](../../../assets/install/ins2.png)

<br/>

3. Choose your region and timezone, either through clicking on the map or through the dropdown menu

- proceed with clicking next

![Region and timezone](../../../assets/install/ins3.png)

<br/>

4. Select the correct keyboard layout and click next

![Keyboard layout](../../../assets/install/ins4.png)

<br/>

5. Now at partitioning part, we have several options
   1. **Erase disk**
      - Now Select The swap type or no swap from the dropdown menu
      - Select the filesystem from the next dropdown.

   2. **Manual Partitioning**
      - _Coming Soon..._
      - If you've chosen this, you know what you're doing 😌
      - You can use `cfdisk`, `gdisk`, `fdisk`, `gparted`, or anything else and later selete each partition in calamares menu, your choice...

   3. **Now Choose if you want to `encrypt system`**
      - Click on the checkbox
      - Enter the password

   Now click next

![Partitioning](../../../assets/install/ins5.png)

<br/>

6. Choose the desired DE or WM
   - Available Options are:
     1. XFCE
     2. GNOME
     3. I3 WM
     4. Hyprland

   Now click next

![Choose DE or WM](../../../assets/install/ins6.png)

<br/>

7. Now create the user
   - Fill in the name
   - Username
   - hostname of the system
   - type and retype the password

   Then again click Next

![Users](../../../assets/install/ins7.png)

<br/>

8. This is the summary of your chosen options
   - If satisfied, click Install
   - else, click back and change what you like.

![Install](../../../assets/install/ins8.png)

<br/>

9. The installation is going to take a while, just wait for it

![Installing System](../../../assets/install/ins9.png)

<br/>

10. Click on Reboot to reboot the system.

![Reboot the System](../../../assets/install/ins10.png)

## Finish

![Finished](../../../assets/install/finished.png)

and Now we have installed Berserk Arch.
