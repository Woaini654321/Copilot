#!/bin/bash

# 定义颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${GREEN}开始执行前端单元测试${NC}"
echo -e "${BLUE}=====================================${NC}"

# 运行测试并生成覆盖率报告
npm test -- --coverage

# 检查测试是否成功
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}测试执行失败，退出脚本${NC}"
  exit 1
fi

echo -e "${GREEN}测试执行成功，开始保存覆盖率报告...${NC}"

# 创建test-reports目录（如果不存在）
mkdir -p /Users/admin/Copilot/demo/test-reports

# 生成带有日期时间的目录名
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
REPORT_DIR="/Users/admin/Copilot/demo/test-reports/coverage-${TIMESTAMP}"

echo -e "${BLUE}将覆盖率报告保存到: ${REPORT_DIR}${NC}"

# 复制覆盖率报告到新的时间戳目录
cp -r /Users/admin/Copilot/demo/coverage "${REPORT_DIR}"

echo -e "${GREEN}覆盖率报告已保存${NC}"
echo -e "${BLUE}=====================================${NC}"
echo -e "${GREEN}测试完成！${NC}"
echo -e "${BLUE}覆盖率报告路径: ${REPORT_DIR}${NC}"
echo -e "${BLUE}=====================================${NC}"