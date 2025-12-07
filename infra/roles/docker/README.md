# Ansible Role: Docker Installation and Setup

This Ansible role installs Docker CE on Ubuntu, sets up the necessary user permissions, and runs a test NGINX container.

## Requirements

- Ansible 2.9+
- Ubuntu 18.04 or later
- `docker-py` Python module (if using `docker_container` module)

## Role Variables

No variables are required for this role. It uses the system's codename automatically via `ansible_lsb.codename` for the Docker repository.

## Tasks

This role performs the following tasks:

1. **Add Docker GPG key**  
   Adds Docker’s official GPG key to ensure package authenticity.
   ```yaml
   - name: Add Docker GPG key
     apt_key:
       url: https://download.docker.com/linux/ubuntu/gpg
       state: present
   ```

2. **Add Docker APT repository**  
   Adds the Docker stable repository for the detected Ubuntu version.
   ```yaml
   - name: Add Docker APT repository
     apt_repository:
       repo: deb [arch=amd64] https://download.docker.com/linux/ubuntu {{ ansible_lsb.codename }} stable
   ```

3. **Install Docker CE**  
   Installs Docker CE, Docker CLI, and containerd.
   ```yaml
   - name: Install Docker CE
     apt:
       name:
         - docker-ce
         - docker-ce-cli
         - containerd.io
       state: present
       update_cache: yes
   ```

4. **Ensure docker group exists**  
   Creates the `docker` group if it does not exist.
   ```yaml
   - name: Ensure docker group exists
     group:
       name: docker
       state: present
   ```

5. **Add user to docker group**  
   Adds the `devops` user to the `docker` group for Docker command access without `sudo`.
   ```yaml
   - name: Add devops user to docker group
     user:
       name: devops
       append: yes
       groups: docker
   ```

6. **Run test NGINX container**  
   Runs a test container with NGINX to verify Docker installation.
   ```yaml
   - name: Run test nginx container
     docker_container:
       name: nginx-test
       image: nginx
       ports:
         - "80:80"
       state: started
   ```

## Example Playbook

```yaml
- hosts: all
  become: yes
  roles:
    - docker_install
```

## License

MIT

## Author

Arushi Gupta
