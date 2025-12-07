# Ansible Role: System Setup for Kubernetes & Jenkins Deployment

This Ansible role prepares a Linux server for use as a **Kubernetes node** or **Jenkins build host** by updating the system, installing essential dependencies, creating a privileged `devops` user, configuring SSH access, and setting up a secure firewall (UFW).

---

## Role Overview

### Tasks performed:
1. **System Update**
   - Updates the APT cache.
   - Performs a full system upgrade.

2. **Kubernetes Prerequisites**
   - Disables swap (`swapoff -a`).
   - Comments out swap entries in `/etc/fstab`.

3. **Package Installation**
   - Installs essential packages:
     ```
     curl, git, apt-transport-https, ca-certificates,
     software-properties-common, gnupg, ufw, bridge-utils, groovy
     ```

4. **User Configuration**
   - Creates a `devops` user with sudo privileges.
   - Configures passwordless sudo.
   - Adds SSH public key for secure access.

5. **Firewall Configuration (UFW)**
   - Allows essential ports:
     - `22` (OpenSSH)
     - `80` (HTTP)
     - `443` (HTTPS)
     - `8080` (Jenkins)
     - `6443` (Kubernetes API)


