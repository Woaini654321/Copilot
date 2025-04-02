#!/bin/bash
# VS Code 策略检查工具
# 用于检查和解决"无法写入 chat.agent.enabled，因为它是在系统策略中配置的"错误

echo -e "\033[36m正在检查 VS Code 策略设置...\033[0m"

# 检查可能的系统策略文件路径
declare -a POLICY_PATHS=(
    "$HOME/Library/Application Support/Code/User/settings.json"  # macOS
    "$HOME/.config/Code/User/settings.json"                      # Linux
    "/etc/vscode/settings.json"                                  # 可能的系统级配置
    "/usr/share/code/resources/app/product.json"                 # 产品配置
)

FOUND_POLICY_FILE=false

for path in "${POLICY_PATHS[@]}"; do
    if [ -f "$path" ]; then
        echo -e "\033[32m发现设置文件: $path\033[0m"
        
        # 检查文件内容中是否包含策略设置
        if grep -q "chat.agent.enabled" "$path"; then
            echo -e "\033[33m在此文件中找到 chat.agent.enabled 设置!\033[0m"
            FOUND_POLICY_FILE=true
            
            echo "设置内容片段:"
            grep -A 2 -B 2 "chat.agent.enabled" "$path"
        fi
    fi
done

# 检查 macOS 的配置文件
if [ "$(uname)" == "Darwin" ]; then
    echo "检查 macOS 的管理配置文件..."
    if [ -d "/Library/Managed Preferences" ]; then
        echo -e "\033[33m发现管理配置文件夹: /Library/Managed Preferences\033[0m"
        find "/Library/Managed Preferences" -name "*vscode*" -o -name "*code*" 2>/dev/null
        FOUND_POLICY_FILE=true
    fi
fi

if [ "$FOUND_POLICY_FILE" = false ]; then
    echo -e "\033[31m未找到明确的策略文件配置。\033[0m"
fi

# 解决方案
echo -e "\n\033[36m可能的解决方案:\033[0m"
echo "1. 如果这是公司电脑，请联系您的IT管理员解除该限制。"
echo "2. 如果这是个人电脑，您可以尝试:"
echo "   a. 检查并备份后修改上述找到的配置文件"
echo "   b. 使用管理员权限运行 VS Code（sudo code 命令 - 但不推荐）"
echo "   c. 检查是否有 MDM 配置文件锁定了设置"
echo "3. 创建一个新的用户账户并安装 VS Code"
echo "4. 如果您使用的是便携版 VS Code，尝试切换到常规安装版"

echo -e "\n按 Enter 键退出..."
read