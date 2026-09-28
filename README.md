# 🇨🇳 HSK Reflex & Hanzi Master

Ứng dụng web tương tác rèn luyện từ vựng, ngữ pháp, bút thuận Hán tự và phản xạ tốc độ cho người học tiếng Trung HSK 1, 2 và chuyển tiếp HSK 3.

👉 **Trải nghiệm trực tuyến tại**: [https://phucbigdata.github.io/hsk-master/](https://phucbigdata.github.io/hsk-master/)

---

## 🌟 Tính Năng Nổi Bật

1. **Luyện Viết Chữ Hán Từng Nét (Hanzi Writer)**
   - Khung vẽ tương tác trên lưới ô chữ Mễ (米字格).
   - Xem hoạt ảnh bút thuận (ngang trước sổ sau, phẩy trước mác sau...).
   - Tự tay dùng chuột / màn hình cảm ứng vẽ từng nét có chấm điểm và phát hiện lỗi sai.
   - Nhập chữ Hán tùy ý để luyện viết.

2. **Đấu Trường Phản Xạ 5 Giây (Reflex Arena)**
   - Rèn luyện tư duy trực tiếp tiếng Trung không dịch thầm.
   - 3 chế độ: Chớp mắt đoán nghĩa, Bắt âm thanh (nghe chọn chữ), Bắn tỉa ngữ pháp.
   - Hệ thống đếm giờ, streak combo, âm thanh Web Audio và tổng kết câu sai.

3. **17 Chủ Điểm Ngữ Pháp HSK 2 Toàn Diện**
   - Đầy đủ 17 chủ điểm ngữ pháp trọng yếu: Đại từ, Phó từ, Giới từ, Liên từ, Trợ từ kết cấu `得`, Trợ từ động thái `着`/`过`, Câu so sánh `比`, Động từ trùng điệp...
   - Tích hợp giọng đọc bản xứ cho từng câu ví dụ.
   - Mini-quiz kiểm tra tức thì sau mỗi bài học.

4. **Pinyin & 4 Thanh Điệu Chuẩn Bắc Kinh**
   - Hướng dẫn trực quan cao độ 4 thanh điệu.
   - Bí quyết phát âm các âm bật hơi dễ nhầm (`b/p`, `d/t`, `g/k`, `j/q/x`, `z/c/s` vs `zh/ch/sh`).
   - Thử thách nghe và chọn Pinyin có dấu.

5. **Thẻ Nhớ Flashcard 3D**
   - Lật thẻ 3D: Chữ Hán ➔ Pinyin, Âm Hán-Việt, Nghĩa và câu ví dụ giao tiếp.
   - Bộ lọc theo HSK 1, HSK 2, HSK 3 và danh sách từ cần ôn lại.

6. **Phát Âm Giọng Người Bản Xứ (Human Studio Voice)**
   - Sử dụng giọng phát thanh viên tiếng Trung bản xứ tự nhiên, chuẩn xác từng thanh điệu.
   - Hỗ trợ nghe chậm 0.7x - 0.85x.

---

## 🚀 Công Nghệ Sử Dụng

- **Frontend**: React 18, Vite 5, Tailwind CSS
- **Thư pháp & Bút thuận**: HanziWriter (SVG Canvas)
- **Audio**: HTML5 Audio + Web Audio API Synthesizer + Web Speech API fallback
- **Hiệu ứng**: Canvas Confetti, Lucide Icons

---

## 💻 Hướng Dẫn Chạy Cục Bộ (Local)

```bash
# Cài đặt thư viện
bun install   # hoặc npm install

# Chạy server phát triển
bun run dev   # hoặc npm run dev

# Đóng gói sản phẩm
bun run build # hoặc npm run build
```
