# Hướng Dẫn Quy Trình Gitflow & Xử Lý Hotfix Chuẩn Doanh Nghiệp

Tài liệu này đúc kết toàn bộ quy trình làm việc với Gitflow, cơ chế Branch Protection, chu trình phát triển tính năng (Feature Workflow) và quy trình xử lý sự cố khẩn cấp (Hotfix Workflow).

---

## 🌿 1. Cấu Trúc Nhánh

```text
               (feat/homepage)
                 /          \
                /   PR #1    \
(dev)     -----+--------------+-----------------------------+ (sync dev PR #7)
                               \                           /
                                \   PR #2                 /
(staging) -----------------------+-----------+-----------+ (sync staging PR #6)
                                              \         /
                                               \ PR #3 /
(prod)    --------------------------------------+-----+---------------+ (merged hotfix PR #5)
                                                       \             /
                                                        \  hotfix   /
                                                         +---------+
                                                     (hotfix/fix_login)
```

1. **`prod` (Production)**:
   - Đại diện cho môi trường chạy thực tế của người dùng.
   - Tuyệt đối không push code trực tiếp. Mọi thay đổi phải đi qua Pull Request đã được kiểm duyệt.
2. **`staging` (Pre-production / UAT)**:
   - Môi trường tiền phát hành dành cho kiểm thử chất lượng (QA/QC/UAT).
   - Tiếp nhận mã nguồn từ `dev` để đóng gói release candidate.
   - Được bảo vệ bằng Branch Protection.
3. **`dev` (Development)**:
   - Môi trường phát triển tích hợp. Nơi các nhánh tính năng (`feat/*`) được gộp vào sau khi review.
4. **`feat/<tên-tính-năng>`**:
   - Tách ra từ `dev`, phục vụ phát triển chức năng mới. Merge lại vào `dev` qua PR.
5. **`hotfix/<tên-sự-cố>`**:
   - Tách trực tiếp từ `prod` khi phát sinh sự cố nghiêm trọng trên production.
   - Sau khi merge vào `prod`, **bắt buộc** phải đồng bộ ngược (back-merge) về `staging` và `dev`.

---

## 🛡️ 2. Cấu hình Branch Protection (Ngăn Push Trực Tiếp)

Thiết lập trên GitHub Web (`Settings > Branches > Add branch protection rule`) hoặc qua GitHub CLI:

```bash
# Cấu hình bảo vệ cho prod (bắt buộc PR, áp dụng cho cả Admin)
@'
{
  "required_status_checks": null,
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0
  },
  "restrictions": null
}
'@ | gh api --method PUT repos/<owner>/<repo>/branches/prod/protection --input -

# Tương tự cho nhánh staging
@'
{
  "required_status_checks": null,
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0
  },
  "restrictions": null
}
'@ | gh api --method PUT repos/<owner>/<repo>/branches/staging/protection --input -
```

---

## 🚀 3. Quy Trình Phát Triển Tính Năng (Feature Workflow)

### Bước 1: Cập nhật nhánh dev và tạo nhánh feature
```bash
git checkout dev
git pull origin dev
git checkout -b feat/homepage
```

### Bước 2: Viết mã và Commit theo chuẩn Conventional Commits
```bash
# Chuẩn: feat: <mô tả ngắn gọn> #<id_issue>
git add .
git commit -m "feat: add homepage layout #1"
git push -u origin feat/homepage
```

### Bước 3: Tạo Pull Request vào `dev`
```bash
gh pr create --base dev --head feat/homepage --title "feat: add homepage layout #1" --body "Mô tả tính năng"
```

### Bước 4: Review code & Merge PR
Sau khi xem xét mã nguồn và phê duyệt:
```bash
gh pr merge <PR_NUMBER> --merge
```

### Bước 5: Đẩy sang `staging` để kiểm thử
```bash
gh pr create --base staging --head dev --title "release: sync dev to staging"
gh pr merge <PR_NUMBER> --merge
```

### Bước 6: Phát hành lên `prod`
Sau khi QA nghiệm thu hoàn tất trên staging:
```bash
gh pr create --base prod --head staging --title "release: v1.0.0 production deployment"
gh pr merge <PR_NUMBER> --merge
```

---

## 🚨 4. Quy Trình Xử Lý Sự Cố Khẩn Cấp (Hotfix Workflow)

Khi phát sinh lỗi khẩn cấp trực tiếp trên production:

### Bước 1: Tạo nhánh hotfix từ `prod`
```bash
git checkout prod
git pull origin prod
git checkout -b hotfix/fix_login_error
```

### Bước 2: Khắc phục lỗi và Commit
```bash
# Chuẩn: fix: <mô tả lỗi đã sửa> #<id_issue>
git add .
git commit -m "fix: resolve login endpoint on production #5"
git push -u origin hotfix/fix_login_error
```

### Bước 3: Tạo PR vào `prod` & Merge
```bash
gh pr create --base prod --head hotfix/fix_login_error --title "fix: resolve login endpoint on production #5"
gh pr merge <PR_NUMBER> --merge
```

### Bước 4: Đồng bộ ngược (Back-merge) - BƯỚC QUAN TRỌNG NHẤT
> Nếu không thực hiện bước này, đợt release tiếp theo từ `dev` sẽ ghi đè và làm sống lại lỗi vừa sửa!

1. **Đồng bộ từ `prod` sang `staging`**:
   ```bash
   gh pr create --base staging --head prod --title "chore(sync): back-merge hotfix into staging"
   gh pr merge <PR_NUMBER> --merge
   ```
2. **Đồng bộ từ `staging` sang `dev`**:
   ```bash
   gh pr create --base dev --head staging --title "chore(sync): back-merge hotfix into dev"
   gh pr merge <PR_NUMBER> --merge
   ```

### Bước 5: Dọn dẹp nhánh
```bash
git branch -d hotfix/fix_login_error
git push origin --delete hotfix/fix_login_error
```

---

## 🔗 Liên kết mẫu tham khảo thực tế trên Remote
Repository chính thức của dự án:
- **Repo:** [NguyenLeHai080/MintForge_Foundry](https://github.com/NguyenLeHai080/MintForge_Foundry)
- **PR tính năng:** [PR #1](https://github.com/NguyenLeHai080/MintForge_Foundry/pull/1)
- **PR lên staging:** [PR #2](https://github.com/NguyenLeHai080/MintForge_Foundry/pull/2)
- **PR lên prod:** [PR #3](https://github.com/NguyenLeHai080/MintForge_Foundry/pull/3)
- **PR Hotfix prod:** [PR #5](https://github.com/NguyenLeHai080/MintForge_Foundry/pull/5)
- **PR đồng bộ ngược staging:** [PR #6](https://github.com/NguyenLeHai080/MintForge_Foundry/pull/6)
- **PR đồng bộ ngược dev:** [PR #7](https://github.com/NguyenLeHai080/MintForge_Foundry/pull/7)
