#!/bin/bash

# VS Code Insiders 回退脚本
# 使用方法: ./rollback-code-insiders.sh [版本号]

echo "===== VS Code Insiders 版本回退工具 ====="
echo

# 检查操作系统类型
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM="darwin-universal"
    APP_PATH="/Applications/Visual Studio Code - Insiders.app"
    BACKUP_PATH="/Applications/Visual Studio Code - Insiders.bak.app"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="linux-x64"
    APP_PATH="$HOME/.vscode-insiders"
    BACKUP_PATH="$HOME/.vscode-insiders.bak"
elif [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "win"* ]]; then
    echo "Windows系统请参考说明文档中的Windows回退方法"
    exit 1
else
    echo "不支持的操作系统: $OSTYPE"
    exit 1
fi

# 检查是否安装了VS Code Insiders
if [[ ! -d "$APP_PATH" ]]; then
    echo "错误: 未在默认路径找到VS Code Insiders，请确认安装路径"
    exit 1
fi

# 获取当前版本（如果可能）
if [[ -f "$APP_PATH/Contents/Resources/app/package.json" ]]; then
    CURRENT_VERSION=$(grep -o '"version": "[^"]*"' "$APP_PATH/Contents/Resources/app/package.json" | cut -d'"' -f4)
    echo "当前安装的VS Code Insiders版本: $CURRENT_VERSION"
fi

# 版本选择
if [[ -z "$1" ]]; then
    # 列出一些最近的版本供选择
    echo "未指定目标版本。"
    echo "请从以下选项选择要回退的目标版本:"
    echo "1) 1.85.0-insider (2023年11月)"
    echo "2) 1.84.0-insider (2023年10月)"
    echo "3) 1.83.0-insider (2023年9月)"
    echo "4) 输入自定义版本号"
    echo
    read -p "请选择 [1-4]: " VERSION_CHOICE
    
    case $VERSION_CHOICE in
        1) TARGET_VERSION="1.85.0-insider" ;;
        2) TARGET_VERSION="1.84.0-insider" ;;
        3) TARGET_VERSION="1.83.0-insider" ;;
        4) 
            read -p "请输入目标版本号 (格式如 1.XX.0-insider): " TARGET_VERSION
            ;;
        *) 
            echo "无效选择，退出"
            exit 1
            ;;
    esac
else
    TARGET_VERSION="$1"
fi

echo "准备回退到版本: $TARGET_VERSION"
read -p "是否继续? [y/N] " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
    echo "操作已取消"
    exit 0
fi

# 创建临时目录
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR" || exit 1

# 下载特定版本
echo "正在下载VS Code Insiders..."
DOWNLOAD_URL="https://update.code.visualstudio.com/$TARGET_VERSION/$PLATFORM/insider"
curl -L "$DOWNLOAD_URL" -o "vscode-insiders.zip"

if [[ $? -ne 0 || ! -f "vscode-insiders.zip" ]]; then
    echo "下载失败。版本可能不存在或网络问题。"
    echo "请访问 https://github.com/microsoft/vscode/releases 查找可用版本"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# 备份当前版本
echo "备份当前版本..."
if [[ -d "$BACKUP_PATH" ]]; then
    echo "发现之前的备份，移除中..."
    rm -rf "$BACKUP_PATH"
fi

echo "将当前版本移至备份位置: $BACKUP_PATH"
mv "$APP_PATH" "$BACKUP_PATH"

# 解压并安装
echo "正在安装目标版本..."
if [[ "$PLATFORM" == "darwin-universal" ]]; then
    # macOS
    unzip -q "vscode-insiders.zip"
    mv "Visual Studio Code - Insiders.app" "/Applications/"
else
    # Linux
    mkdir -p "$APP_PATH"
    unzip -q "vscode-insiders.zip" -d "$APP_PATH"
fi

# 清理
cd - > /dev/null
rm -rf "$TEMP_DIR"

echo
echo "✅ VS Code Insiders 版本回退完成!"
echo "如需恢复之前的版本，请运行:"
echo "rm -rf \"$APP_PATH\" && mv \"$BACKUP_PATH\" \"$APP_PATH\""
echo
echo "提示: 要防止自动更新，请在设置中添加: \"update.mode\": \"none\""