# VS Code Insiders 版本回退指南

## 方法一：重新安装特定版本

### macOS 系统

1. 首先卸载当前版本
```bash
rm -rf "/Applications/Visual Studio Code - Insiders.app"
```

2. 访问 VS Code Insiders 版本历史页面：
   https://code.visualstudio.com/insiders/

3. 点击历史版本归档链接：
   [VS Code Insiders 历史版本](https://code.visualstudio.com/updates/)

4. 下载特定版本的安装包并安装

### Windows 系统

1. 卸载当前版本（通过控制面板或设置）

2. 访问 VS Code 归档页面
   https://code.visualstudio.com/updates/

3. 下载所需版本并安装

## 方法二：使用脚本回退到特定版本

### macOS 系统
```bash
#!/bin/bash

# 指定要回退到的版本号，例如：1.77.0
TARGET_VERSION="1.XX.0-insider"

# 下载特定版本
curl -L "https://update.code.visualstudio.com/latest/darwin-universal/insider" -o "vscode-insiders.zip"

# 备份当前版本
echo "备份当前版本..."
if [ -d "/Applications/Visual Studio Code - Insiders.app" ]; then
  mv "/Applications/Visual Studio Code - Insiders.app" "/Applications/Visual Studio Code - Insiders.bak.app"
fi

# 解压并安装
echo "安装目标版本..."
unzip -q "vscode-insiders.zip"
mv "Visual Studio Code - Insiders.app" "/Applications/"

# 清理
rm "vscode-insiders.zip"

echo "VS Code Insiders 版本回退完成"
```

## 方法三：阻止更新（保持当前版本）

1. 打开 VS Code Insiders 的设置

2. 添加以下设置禁止自动更新：
```json
{
  "update.mode": "none"
}
```

3. 如需临时处理，可以通过命令行临时阻止更新：

```bash
# macOS/Linux
export VSCODE_SKIP_UPDATES=1
"/Applications/Visual Studio Code - Insiders.app/Contents/MacOS/Electron"

# Windows (PowerShell)
$env:VSCODE_SKIP_UPDATES=1
& "C:\Users\用户名\AppData\Local\Programs\Microsoft VS Code Insiders\Code - Insiders.exe"
```

## 常见问题

- **Q: 如何查看当前安装的 VS Code Insiders 版本？**  
  A: 打开 VS Code Insiders，点击 Code > 关于 Visual Studio Code Insiders 或使用快捷键 ⌘+shift+P (macOS) / Ctrl+Shift+P (Windows) 输入 "About" 命令。

- **Q: 回退后自动更新了怎么办？**  
  A: 设置 `"update.mode": "none"` 或者断开网络连接后使用。

- **Q: 找不到特定版本怎么办？**  
  A: GitHub 上的 VS Code 仓库发布页面通常会保留历史版本：https://github.com/microsoft/vscode/releases