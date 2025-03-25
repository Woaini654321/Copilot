#!/bin/bash

# 颜色输出设置
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}正在运行前端单元测试...${NC}"

# 运行所有测试
npm test

# 如果要运行特定的测试
# npm test -- tests/unit/components/SearchBox.spec.ts

# 如果要生成测试覆盖率报告
# npm run test:coverage

# 显示测试覆盖率报告的命令
echo -e "${GREEN}要生成测试覆盖率报告，请运行:${NC}"
echo -e "npm run test:coverage"

# 输出测试文档位置
echo -e "${GREEN}测试文档位于:${NC} ./tests/TEST_DOCUMENTATION.md"