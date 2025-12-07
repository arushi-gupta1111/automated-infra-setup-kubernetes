# Ansible Role: Jenkins Setup with OpenJDK 21

This Ansible role installs and configures Jenkins on a Debian-based system with **OpenJDK 21**, sets up system-wide `JAVA_HOME`, configures the Jenkins repository securely, and adds Jenkins to the Docker group.

## Requirements

- Debian/Ubuntu-based system
- `ansible` >= 2.9
- Root or sudo privileges to install packages and modify system files

## Role Variables

This role does not require any external variables by default. All paths and settings are pre-configured for modern Debian-based systems.

- `java_home` – Automatically determined based on installed Java path.
- Jenkins GPG key and repository URLs are pre-configured.

## Tasks

The role performs the following steps:

1. **Install OpenJDK 21 JRE** – Required for running Jenkins.  
2. **Determine `JAVA_HOME`** – Finds the installed Java path and sets it system-wide in `/etc/profile.d/java_home.sh`.  
3. **Configure default Java link** – Ensures `/usr/lib/jvm/default-java` points to the correct Java installation.  
4. **Prepare APT keyrings** – Ensures `/etc/apt/keyrings` exists.  
5. **Remove old Jenkins sources and keys** – Cleans any previous Jenkins setup.  
6. **Download Jenkins GPG key** – Secures package downloads from the official Jenkins repository.  
7. **Add Jenkins repository** – Adds the official Jenkins repository with signed-by configuration.  
8. **Update APT cache** – Ensures latest package lists.  
9. **Install Jenkins** – Installs Jenkins along with OpenJDK 21 JRE.  
10. **Enable and start Jenkins service** – Ensures Jenkins is running on boot.  
11. **Configure Docker group** – Creates the `docker` group if missing.  
12. **Add Jenkins user to Docker group** – Grants Jenkins permission to run Docker commands.  
13. **Restart Jenkins** – Applies all configuration changes.

## Example Playbook

```yaml
- hosts: jenkins_servers
  become: yes
  roles:
    - role: jenkins_setup

