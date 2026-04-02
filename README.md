<p align="center">
  <img src="pictures/main.png" alt="Mint Playbook Banner" width="100%">
</p>

# Mint Playbook

Mint is a premier Windows optimization and privacy-focused configuration designed for deployment via the AME Wizard. It represents a comprehensive overhaul of the Windows operating system, meticulously engineered to provide a streamlined, high-performance, and secure environment. By eliminating telemetry, unnecessary system services, and deeply integrated bloatware, Mint offers a clean, efficient foundation for competitive gaming, professional workstations, and privacy enthusiasts.

## Core Philosophy

Mint is built on three foundational pillars: performance, privacy, and security. The project avoids the "over-tweaking" common in many optimization scripts, instead focusing on a balanced approach that maximizes system efficiency while maintaining essential functionality for daily use.

### Performance
Mint significantly reduces CPU and RAM overhead by disabling non-essential services and background processes. The system is tuned for low latency and high responsiveness, ensuring that hardware resources are dedicated to the user's primary applications.

### Privacy
Privacy is a core tenet of the Mint experience. The playbook implements extensive blocks against Microsoft's data collection mechanisms, telemetry, and tracking features. From deep registry modifications to host-level blocking, Mint ensures that your data remains yours.

### Security
While many optimization playbooks compromise security for speed, Mint prioritizes a hardened environment. It implements Attack Surface Reduction (ASR) rules, advanced exploit protection, and secure authentication policies to provide a robust defense against modern threats.

## Advanced Features

### Extreme Minimalism
Mint features a bespoke user interface designed for absolute focus:
- **Taskbar Minimalism**: The taskbar is stripped of all non-essential elements, including the clock, system tray icons, and notification center. It is centered, utilizes small icons, and is set to auto-hide by default for a truly immersive experience.
- **Explorer Refinement**: File Explorer is optimized with Compact Mode, removal of the "Home" and "Gallery" sidebar sections, and the enabling of file extensions by default.
- **Clean Desktop**: All desktop icons are hidden to maintain a clutter-free workspace.

### Comprehensive Optimization
- **Intelligent Debloating**: Deep removal of Microsoft Edge, OneDrive, Teams, and pre-installed UWP applications.
- **Service Management**: Fine-tuned service configuration targeting tracking, error reporting, and background maintenance tasks.
- **Context Menu Enhancement**: Restores the classic Windows 10 context menu and adds power-user tools like "Take Ownership" and "Open with Notepad".

### Tailored Experience Presets
Mint provides five distinct optimization profiles to suit any workflow:
- **Balanced**: A well-rounded profile for general use, maintaining a balance between speed and functionality.
- **Gaming Focused**: Optimized for low latency and high FPS, prioritizing game processes and disabling network throttling.
- **Performance Focused**: An aggressive profile designed to minimize resource usage for demanding workloads.
- **Privacy Focused**: Maximizes privacy by blocking all telemetry hosts and disabling cloud-integrated features.
- **Paranoid Mode**: The ultimate mode for extreme privacy and performance, implementing the most aggressive blocks possible.

## Edition Conversion

Mint includes the capability to perform a genuine conversion of the Windows edition to Enterprise LTSC. This provides users with the most stable, long-term support foundation available, further reducing system bloat and ensuring a consistent experience.

## Deployment and Usage

Mint is deployed as an encrypted `.apbx` playbook using the AME Wizard.

### Installation Steps
1. Download the latest version of the AME Wizard.
2. Import the `Mint.apbx` file from this repository.
3. When prompted, enter the decryption password: `malte`
4. Select your desired presets and optional components through the wizard interface.
5. Upon completion, restart your system to finalize the optimization process.

### System Requirements
- Windows 10 (22H2) or Windows 11 (22H2/23H2/24H2/25H2)
- A clean Windows installation is highly recommended.
- It is essential to create a system restore point before deployment.

## Resources and Support

- **Official Website**: [mint-playbook.io](https://mint-playbook.io/)
- **Documentation**: [docs.mint-playbook.io](https://docs.mint-playbook.io/)
- **GitHub Repository**: [github.com/Mint-D8/Mint-Playbook](https://github.com/Mint-D8/Mint-Playbook)
- **Support the Project**: [ko-fi.com/mintd8](https://ko-fi.com/mintd8)

---
*Disclaimer: Mint Playbook is provided as-is. While extensively tested, system modifications of this nature carry inherent risks. Always maintain backups of your critical data.*
