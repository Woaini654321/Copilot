# VS Code 策略检查工具
# 用于检查和解决"无法写入 chat.agent.enabled，因为它是在系统策略中配置的"错误

Write-Host "正在检查 VS Code 策略设置..." -ForegroundColor Cyan

# 检查可能的系统策略文件路径
$policyPaths = @(
    "$env:APPDATA\Code\User\settings.json",
    "$env:ProgramData\Code\User\settings.json",
    "$env:ALLUSERSPROFILE\Microsoft\VSCode\User\settings.json"
)

$foundPolicyFile = $false

foreach ($path in $policyPaths) {
    if (Test-Path $path) {
        Write-Host "发现设置文件: $path" -ForegroundColor Green
        
        # 检查文件内容中是否包含策略设置
        $content = Get-Content $path -Raw -ErrorAction SilentlyContinue
        if ($content -match "chat.agent.enabled") {
            Write-Host "在此文件中找到 chat.agent.enabled 设置!" -ForegroundColor Yellow
            $foundPolicyFile = $true
            
            Write-Host "设置内容片段:"
            $content | Select-String "chat.agent.enabled" -Context 2,2 | ForEach-Object { $_.Line }
        }
    }
}

# 检查注册表中的策略
Write-Host "检查注册表中的策略..."
$regPaths = @(
    "HKCU:\Software\Policies\Microsoft\VSCode",
    "HKLM:\Software\Policies\Microsoft\VSCode"
)

foreach ($path in $regPaths) {
    if (Test-Path $path) {
        Write-Host "发现注册表策略路径: $path" -ForegroundColor Yellow
        Get-ItemProperty $path -ErrorAction SilentlyContinue | Format-List
        $foundPolicyFile = $true
    }
}

if (-not $foundPolicyFile) {
    Write-Host "未找到明确的策略文件或注册表配置。" -ForegroundColor Red
}

# 解决方案
Write-Host "`n可能的解决方案:" -ForegroundColor Cyan
Write-Host "1. 如果这是公司电脑，请联系您的IT管理员解除该限制。"
Write-Host "2. 如果这是个人电脑，您可以尝试:"
Write-Host "   a. 以管理员身份运行 VS Code"
Write-Host "   b. 检查并修改上述找到的配置文件"
Write-Host "   c. 如果您有管理员权限，编辑注册表中的策略"
Write-Host "3. 创建一个新的用户配置文件并安装 VS Code"
Write-Host "4. 如果您使用的是便携版 VS Code，尝试切换到常规安装版"

Write-Host "`n按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")