#!/bin/bash

echo "Copilot 代理设置检查工具"
echo "=========================="
echo

# 检查VS Code设置
if command -v code &> /dev/null; then
    echo "正在检查VS Code设置..."
    
    # 检查用户设置文件路径
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        SETTINGS_PATH="$HOME/Library/Application Support/Code/User/settings.json"
    elif [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "win"* ]]; then
        # Windows
        SETTINGS_PATH="$APPDATA/Code/User/settings.json"
    else
        # Linux
        SETTINGS_PATH="$HOME/.config/Code/User/settings.json"
    fi
    
    if [ -f "$SETTINGS_PATH" ]; then
        echo "找到VS Code设置文件: $SETTINGS_PATH"
        
        # 如果有jq工具，使用它来检查设置
        if command -v jq &> /dev/null; then
            echo "使用jq检查代理设置..."
            PROXY_SETTING=$(jq -r '.["github.copilot.chat.agent.enabled"] // "未设置"' "$SETTINGS_PATH")
            HTTP_PROXY=$(jq -r '.["http.proxy"] // "未设置"' "$SETTINGS_PATH")
            
            echo "github.copilot.chat.agent.enabled: $PROXY_SETTING"
            echo "http.proxy: $HTTP_PROXY"
        else
            echo "未找到jq工具，手动查看设置文件中的github.copilot.chat.agent.enabled和http.proxy设置"
            echo "可以使用以下命令安装jq工具:"
            echo "  - macOS: brew install jq"
            echo "  - Ubuntu/Debian: sudo apt install jq"
            echo "  - Windows: 通过scoop或chocolatey安装"
        fi
    else
        echo "未找到VS Code设置文件"
    fi
else
    echo "未检测到VS Code安装"
fi

echo
echo "解决方案建议:"
echo "1. 如果您是在企业环境中，请联系您的IT管理员或系统管理员，他们可能通过组策略限制了此设置"
echo "2. 尝试在命令面板中运行 'Developer: Reload Window' 刷新VS Code"
echo "3. 尝试在命令面板中运行 'Preferences: Open User Settings (JSON)' 然后手动检查设置"
echo "4. 检查您是否有组织策略限制，可在VS Code中点击左下角齿轮图标，选择'Settings' > 'Policy' 查看"
echo "5. 如果需要配置代理，可以尝试在终端中设置环境变量:"
echo "   export HTTP_PROXY=http://proxy-server:port"
echo "   export HTTPS_PROXY=http://proxy-server:port"
echo
echo "如果问题仍然存在，可以参考GitHub Copilot官方文档寻求更多帮助。"

# 执行权限提示
echo
echo "请执行以下命令使脚本可执行："
echo "chmod +x check_copilot_settings.sh"
echo "然后运行: ./check_copilot_settings.sh"