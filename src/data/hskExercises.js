/**
 * Trọn bộ Đề Luyện Tập Ngữ Pháp Sơ Cấp (2) tổng hợp 100% từ tài liệu PDF của học viên
 * Gồm 44 câu hỏi trắc nghiệm ngữ pháp + 10 câu bài dịch thực hành (Trung -> Việt & Việt -> Trung)
 */

export const HSK_PRACTICE_QUESTIONS = [
  // --- TRANG 1 ---
  {
    id: 1,
    type: "fill_position",
    title: "1. Điền 多 (duō) vào vị trí thích hợp",
    sentence: "我①有②很③狗。(Wǒ ① yǒu ② hěn ③ gǒu.)",
    options: ["A. ①", "B. ②", "C. ③"],
    answer: 2, // C: rất nhiều chó => 我有很多狗 (vị trí ③)
    correctSentence: "我有很多狗。",
    pinyin: "Wǒ yǒu hěn duō gǒu.",
    meaning: "Tôi có rất nhiều chó.",
    explain: "Cấu trúc: 很 + 多 + Danh từ (rất nhiều...)."
  },
  {
    id: 2,
    type: "fill_position",
    title: "2. Điền 多 (duō) vào vị trí thích hợp",
    sentence: "你家①离②超市③有④远？(Nǐ jiā ① lí ② chāoshì ③ yǒu ④ yuǎn?)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 3, // D: ④ => 有多远 (bao xa)
    correctSentence: "你家离超市有多远？",
    pinyin: "Nǐ jiā lí chāoshì yǒu duō yuǎn?",
    meaning: "Nhà bạn cách siêu thị bao xa?",
    explain: "Cấu trúc hỏi khoảng cách cự ly: 有多 + Tính từ (有多远: xa bao nhiêu?)."
  },
  {
    id: 3,
    type: "arrange",
    title: "3. Sắp xếp câu",
    sentence: "要(yào) 多(duō) 你(nǐ) 休息(xiūxi) 说(shuō) 医生(yīshēng)",
    options: [
      "A. 你说要休息多医生。",
      "B. 你说医生要休息多。",
      "C. 医生说你要休息多。",
      "D. 医生说你要多休息。"
    ],
    answer: 3, // D
    correctSentence: "医生说你要多休息。",
    pinyin: "Yīshēng shuō nǐ yào duō xiūxi.",
    meaning: "Bác sĩ nói bạn phải nghỉ ngơi nhiều.",
    explain: "Trong tiếng Trung, phó từ '多' đứng TRƯỚC động từ để khuyên làm gì nhiều hơn: 多 + Động từ (多休息)."
  },
  {
    id: 4,
    type: "arrange",
    title: "4. Sắp xếp câu",
    sentence: "是(shì) 他们(tāmen) 我的(wǒ de) 都(dōu) 朋友(péngyou)",
    options: [
      "A. 他们是我的朋友都。",
      "B. 我的朋友是他们都。",
      "C. 他们都是我的朋友。",
      "D. 我的朋友都是他们。"
    ],
    answer: 2, // C
    correctSentence: "他们都是我的朋友。",
    pinyin: "Tāmen dōu shì wǒ de péngyou.",
    meaning: "Bọn họ đều là bạn của tôi.",
    explain: "Phó từ '都' (đều) luôn đứng trước động từ '是': 主语 + 都 + 是..."
  },
  {
    id: 5,
    type: "arrange",
    title: "5. Sắp xếp câu",
    sentence: "七岁 了 还 你 不会 衣服 都 穿",
    options: [
      "A. 你七岁了穿衣服还不会都。",
      "B. 都七岁了你还不会穿衣服。",
      "C. 你七岁了还不会穿衣服都。",
      "D. 还七岁了你都穿衣服不会。"
    ],
    answer: 1, // B
    correctSentence: "都七岁了你还不会穿衣服。",
    pinyin: "Dōu qī suì le nǐ hái bù huì chuān yīfu.",
    meaning: "Đã 7 tuổi rồi mà con vẫn chưa biết mặc quần áo.",
    explain: "Cấu trúc nhấn mạnh: 都...了，还... (Đã... rồi mà vẫn...)."
  },
  {
    id: 6,
    type: "fill_word",
    title: "6. Điền từ thích hợp",
    sentence: "—— 饺子怎么样？(Jiǎozi zěnmeyàng?)\n—— 好吃，我明天______要吃。(Hǎochī, wǒ míngtiān ______ yào chī.)",
    options: ["A. 又", "B. 还", "C. 再", "D. 都"],
    answer: 1, // B. 还 (hoặc C. 再, nhưng với '要吃' thì '还要吃' là tự nhiên nhất)
    correctSentence: "好吃，我明天还要吃。",
    pinyin: "Hǎochī, wǒ míngtiān hái yào chī.",
    meaning: "Ngon lắm, ngày mai tôi vẫn muốn ăn nữa.",
    explain: "'还要' biểu thị ý muốn lặp lại hoặc tiếp tục thực hiện hành động."
  },
  {
    id: 7,
    type: "fill_position",
    title: "7. Điền 还 (hái) vào vị trí thích hợp",
    sentence: "外面①为什么②在③下④雨？(Wàimiàn ① wèishénme ② zài ③ xià ④ yǔ?)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 1, // B. ② => 为什么还在下雨
    correctSentence: "外面为什么还在下雨？",
    pinyin: "Wàimiàn wèishénme hái zài xià yǔ?",
    meaning: "Bên ngoài vì sao vẫn còn đang mưa thế?",
    explain: "'还' đứng trước phó từ thời gian '在' để biểu thị hành động vẫn đang tiếp diễn: 还在 + V."
  },
  {
    id: 8,
    type: "fill_position",
    title: "8. Điền 就 (jiù) vào vị trí thích hợp",
    sentence: "①商店的②左边③是④我的家。(① Shāngdiàn de ② zuǒbiān ③ shì ④ wǒ de jiā.)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 2, // C. ③ => 左边就是我的家
    correctSentence: "商店的左边就是我的家。",
    pinyin: "Shāngdiàn de zuǒbiān jiù shì wǒ de jiā.",
    meaning: "Bên trái của cửa hàng chính là nhà tôi.",
    explain: "'就是' dùng để nhấn mạnh, khẳng định sự việc."
  },

  // --- TRANG 2 ---
  {
    id: 9,
    type: "arrange",
    title: "9. Sắp xếp câu",
    sentence: "就 马上 开始 电影 了",
    options: [
      "A. 电影开始了马上就。",
      "B. 电影马上就要开始了。",
      "C. 电影就马上开始了。",
      "D. 电影就开始了马上。"
    ],
    answer: 1, // B
    correctSentence: "电影马上就要开始了。",
    pinyin: "Diànyǐng mǎshàng jiù yào kāishǐ le.",
    meaning: "Bộ phim sắp sửa bắt đầu ngay rồi.",
    explain: "Cấu trúc sắp sửa xảy ra: 马上就要 + Động từ + 了."
  },
  {
    id: 10,
    type: "fill_word",
    title: "10. Điền từ thích hợp",
    sentence: "我们可以看看这本书吗？(Wǒmen kěyǐ kànkan zhè běn shū ma?)\n—— 你们看___。(Nǐmen kàn ___.)",
    options: ["A. 吗", "B. 吧", "C. 啊", "D. 呢"],
    answer: 1, // B. 吧
    correctSentence: "你们看吧。",
    pinyin: "Nǐmen kàn ba.",
    meaning: "Các bạn xem đi.",
    explain: "Trợ từ ngữ khí '吧' đặt cuối câu để đồng ý, cho phép hoặc khuyên nhủ nhẹ nhàng."
  },
  {
    id: 11,
    type: "fill_position",
    title: "11. Điền 吧 (ba) vào vị trí thích hợp",
    sentence: "你们①俩②以前③认识④？(Nǐmen ① liǎ ② yǐqián ③ rènshi ④?)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 3, // D. ④ => 认识吧？
    correctSentence: "你们俩以前认识吧？",
    pinyin: "Nǐmen liǎ yǐqián rènshi ba?",
    meaning: "Hai bạn trước đây đã quen biết nhau phải không?",
    explain: "'吧' đặt ở cuối câu dùng để hỏi mang tính phỏng đoán xác nhận."
  },
  {
    id: 12,
    type: "fill_position",
    title: "12. Điền 着 (zhe) vào vị trí thích hợp",
    sentence: "他①刚才②一直③看④天空。(Tā ① gāngcái ② yīzhí ③ kàn ④ tiānkōng.)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 3, // D. ④ => 看着天空
    correctSentence: "他刚才一直看着天空。",
    pinyin: "Tā gāngcái yīzhí kàn zhe tiānkōng.",
    meaning: "Vừa nãy anh ấy cứ nhìn lên bầu trời suốt.",
    explain: "Trợ từ động thái '着' đứng ngay sau động từ để biểu thị hành động đang tiếp diễn: V + 着."
  },
  {
    id: 13,
    type: "choose_correct",
    title: "13. Câu nào đúng?",
    sentence: "Chọn câu sử dụng chuẩn ngữ pháp:",
    options: [
      "A. 他来着了。",
      "B. 他正吃着饭呢。",
      "C. 他们去着公园。",
      "D. 我喝过着果汁。"
    ],
    answer: 1, // B
    correctSentence: "他正吃着饭呢。",
    pinyin: "Tā zhèng chī zhe fàn ne.",
    meaning: "Anh ấy đang ăn cơm.",
    explain: "Cấu trúc tiếp diễn: 正 + V + 着 + Tân ngữ + 呢."
  },
  {
    id: 14,
    type: "choose_incorrect",
    title: "14. Câu nào không đúng?",
    sentence: "Chọn câu sai quy tắc ngữ pháp:",
    options: [
      "A. 给我看看。",
      "B. 我可以尝一尝吗?",
      "C. 我们去吃饭吃饭吧?",
      "D. 我们休息休息吧。"
    ],
    answer: 2, // C
    correctSentence: "Câu sai là C. Vì '吃饭' là động từ li hợp, dạng lặp lại đúng là '吃吃饭' chứ không nói '吃饭吃饭'.",
    pinyin: "Wǒmen qù chī chī fàn ba?",
    meaning: "Động từ li hợp lặp lại theo dạng AAB (吃吃饭).",
    explain: "Động từ li hợp (Động từ + Tân ngữ) khi lặp lại phải có dạng AAB: 吃吃饭, 散散步, 唱唱歌."
  },
  {
    id: 15,
    type: "choose_correct",
    title: "15. Câu nào đúng?",
    sentence: "Chọn câu trùng điệp động từ chính xác:",
    options: [
      "A. 我有有书。",
      "B. 给你介绍介绍他。",
      "C. 他是一是中国人。",
      "D. 你想喝水喝水吗?"
    ],
    answer: 1, // B
    correctSentence: "给你介绍介绍他。",
    pinyin: "Gěi nǐ jièshào jièshào tā.",
    meaning: "Để tôi giới thiệu anh ấy cho bạn một chút.",
    explain: "Động từ song âm tiết '介绍' lặp lại dạng ABAB: 介绍介绍."
  },
  {
    id: 16,
    type: "choose_correct",
    title: "16. Câu nào đúng?",
    sentence: "Chọn câu dùng tính từ trùng điệp đúng ngữ pháp:",
    options: [
      "A. 这个蛋糕大大。",
      "B. 他长得高高。",
      "C. 这个水果非常甜甜的。",
      "D. 我有一支长长的笔。"
    ],
    answer: 3, // D
    correctSentence: "我有一支长长的笔。",
    pinyin: "Wǒ yǒu yī zhī chángcháng de bǐ.",
    meaning: "Tôi có một chiếc bút thon dài.",
    explain: "Tính từ trùng điệp AA đứng trước danh từ làm định ngữ bắt buộc phải có '的': 长长的笔."
  },
  {
    id: 17,
    type: "choose_incorrect",
    title: "17. Câu nào không đúng?",
    sentence: "Chọn câu sai quy tắc trùng điệp tính từ:",
    options: [
      "A. 他的眼睛大大的。",
      "B. 这种水很酸酸的。",
      "C. 那棵树高高的。",
      "D. 他慢慢地走着。"
    ],
    answer: 1, // B
    correctSentence: "Câu sai là B. Tính từ đã trùng điệp (酸酸的) mang sẵn sắc thái mức độ cao, KHÔNG ĐƯỢC đi cùng phó từ chỉ mức độ '很'.",
    pinyin: "Zhè zhǒng shuǐ suānsuān de.",
    meaning: "Loại nước này chua chua.",
    explain: "Quy tắc vàng: Tuyệt đối không thêm '很, 非常, 太' trước tính từ đã trùng điệp (không nói: 很酸酸的)."
  },
  {
    id: 18,
    type: "fill_word",
    title: "18. Điền từ thích hợp",
    sentence: "我的家_____超市只有两百米。(Wǒ de jiā _____ chāoshì zhǐ yǒu liǎng bǎi mǐ.)",
    options: ["A. 从", "B. 到", "C. 离", "D. 来"],
    answer: 2, // C. 离
    correctSentence: "我的家离超市只有两百米。",
    pinyin: "Wǒ de jiā lí chāoshì zhǐ yǒu liǎng bǎi mǐ.",
    meaning: "Nhà tôi cách siêu thị chỉ có hai trăm mét.",
    explain: "Chỉ khoảng cách giữa hai địa điểm dùng giới từ '离': Địa điểm A + 离 + Địa điểm B + Khoảng cách."
  },

  // --- TRANG 3 ---
  {
    id: 19,
    type: "fill_word",
    title: "19. Điền từ thích hợp",
    sentence: "请你_____第二个词开始读，读___第十三个词。(Qǐng nǐ _____ dì-èr ge cí kāishǐ dú, dú ___ dì-shísān ge cí.)",
    options: ["A. 从；从", "B. 从；到", "C. 离；离", "D. 离；到"],
    answer: 1, // B. 从；到
    correctSentence: "请你从第二个词开始读，读到第十三个词。",
    pinyin: "Qǐng nǐ cóng dì-èr ge cí kāishǐ dú, dú dào dì-shísān ge cí.",
    meaning: "Xin mời bạn đọc từ từ thứ hai, đọc đến từ thứ mười ba.",
    explain: "Cặp giới từ biểu thị điểm bắt đầu và kết thúc: 从...到... (từ... đến...)."
  },
  {
    id: 20,
    type: "fill_word",
    title: "20. Điền từ thích hợp",
    sentence: "他今天有_____不高兴。(Tā jīntiān yǒu _____ bù gāoxìng.)",
    options: ["A. 一点儿", "B. 十分", "C. 很", "D. 非常"],
    answer: 0, // A. 一点儿
    correctSentence: "他今天有一点儿不高兴。",
    pinyin: "Tā jīntiān yǒu yìdiǎnr bù gāoxìng.",
    meaning: "Hôm nay anh ấy có chút không vui.",
    explain: "Cấu trúc: 有点儿 / 有一点儿 + Tính từ tiêu cực (biểu thị không vừa ý, hơi hơi...)."
  },
  {
    id: 21,
    type: "fill_position",
    title: "21. Điền 一点儿 (yì diǎnr) vào vị trí thích hợp",
    sentence: "你能不能①帮②我买③葡萄④？(Nǐ néng bu néng ① bāng ② wǒ mǎi ③ pútao ④?)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 2, // C. ③ => 买一点儿葡萄
    correctSentence: "你能不能帮我买一点儿葡萄？",
    pinyin: "Nǐ néng bu néng bāng wǒ mǎi yìdiǎnr pútao?",
    meaning: "Bạn có thể giúp tôi mua một ít nho không?",
    explain: "'一点儿' bổ nghĩa cho danh từ đứng trước danh từ: Động từ + 一点儿 + Danh từ (买一点儿葡萄)."
  },
  {
    id: 22,
    type: "fill_position",
    title: "22. Điền 真 (zhēn) vào vị trí thích hợp",
    sentence: "①认识②你③高兴④啊! (① rènshi ② nǐ ③ gāoxìng ④ a!)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 2, // C. ③ => 认识你真高兴啊!
    correctSentence: "认识你真高兴啊！",
    pinyin: "Rènshi nǐ zhēn gāoxìng a!",
    meaning: "Quen biết bạn thật là vui!",
    explain: "Phó từ '真' đứng trước tính từ để tạo câu cảm thán: 真 + Tính từ + 啊！"
  },
  {
    id: 23,
    type: "fill_position",
    title: "23. Điền 很 (hěn) vào vị trí thích hợp",
    sentence: "那边①有一棵②大的③树④。(Nàbiān ① yǒu yì kē ② dà de ③ shù ④.)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 1, // B. ② => 很大的一棵树 hoặc 一棵很大的树
    correctSentence: "那边有一棵很大的树。",
    pinyin: "Nàbiān yǒu yì kē hěn dà de shù.",
    meaning: "Ở đằng kia có một cái cây rất to.",
    explain: "'很' bổ nghĩa cho tính từ '大': 很 + Tính từ + 的 + Danh từ."
  },
  {
    id: 24,
    type: "fill_word",
    title: "24. Điền từ thích hợp",
    sentence: "——你吃___早饭了吗？(Nǐ chī ___ zǎofàn le ma?)\n——吃过了。(Chī guò le.)",
    options: ["A. 了过", "B. 过", "C. 在", "D. 着"],
    answer: 1, // B. 过
    correctSentence: "——你吃过早饭了吗？——吃过了。",
    pinyin: "Nǐ chī guo zǎofàn le ma? — Chī guo le.",
    meaning: "— Bạn đã ăn bữa sáng chưa? — Ăn rồi.",
    explain: "Trợ từ '过' hỏi về trải nghiệm hoặc hành động đã từng hoàn thành."
  },
  {
    id: 25,
    type: "fill_position",
    title: "25. Điền 了 (le) vào vị trí thích hợp",
    sentence: "我①看②了这部③电影④。(Wǒ ① kàn ② zhè bù ③ diànyǐng ④.)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 1, // B. ② => 我看了这部电影
    correctSentence: "我看了这部电影。",
    pinyin: "Wǒ kàn le zhè bù diànyǐng.",
    meaning: "Tôi đã xem bộ phim này rồi.",
    explain: "Trợ từ động thái '了' đứng ngay sau động từ: Động từ + 了 + Số/Lượng + Tân ngữ."
  },
  {
    id: 26,
    type: "fill_word",
    title: "26. Điền từ thích hợp (Khuyên ngăn, cấm đoán)",
    sentence: "图书馆里____大声说话。(Túshūguǎn lǐ ____ dàshēng shuōhuà.)",
    options: ["A. 别", "B. 不要", "C. 不", "D. 没有"],
    answer: 0, // Cả A và B đều đúng, câu hỏi PDF ghi chú nhiều đáp án
    correctSentence: "图书馆里别/不要大声说话。",
    pinyin: "Túshūguǎn lǐ bié / bùyào dàshēng shuōhuà.",
    meaning: "Trong thư viện đừng nói chuyện to tiếng.",
    explain: "Cả '别' và '不要' đều biểu thị ý khuyên ngăn, cấm đoán: 别/不要 + V."
  },
  {
    id: 27,
    type: "fill_position",
    title: "27. Điền 别 (bié) vào vị trí thích hợp",
    sentence: "你①能②不③能④吵了？(Nǐ ① néng ② bù ③ néng ④ chǎo le?)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 3, // D. ④ => 能不能别吵了？
    correctSentence: "你能不能别吵了？",
    pinyin: "Nǐ néng bu néng bié chǎo le?",
    meaning: "Bạn có thể đừng làm ồn nữa được không?",
    explain: "'别' đứng trước động từ '吵' (làm ồn): 别 + Động từ + 了."
  },

  // --- TRANG 4 ---
  {
    id: 28,
    type: "fill_position",
    title: "28. Điền 让 (ràng) vào vị trí thích hợp",
    sentence: "爸爸①我②去超市③买④蔬菜。(Bàba ① wǒ ② qù chāoshì ③ mǎi ④ shūcài.)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 0, // A. ① => 爸爸让我去超市
    correctSentence: "爸爸让我去超市买蔬菜。",
    pinyin: "Bàba ràng wǒ qù chāoshì mǎi shūcài.",
    meaning: "Bố bảo tôi đi siêu thị mua rau.",
    explain: "Câu kiêm ngữ chữ 让: Chủ ngữ 1 + 让 + Tân ngữ (Chủ ngữ 2) + Động từ."
  },
  {
    id: 29,
    type: "choose_correct",
    title: "29. Câu nào đúng?",
    sentence: "Chọn câu dùng chữ '让' chính xác:",
    options: [
      "A. 我弟弟让去学校。",
      "B. 他让我是中国人。",
      "C. 这里让开心。",
      "D. 我让他走了。"
    ],
    answer: 3, // D
    correctSentence: "我让他走了。",
    pinyin: "Wǒ ràng tā zǒu le.",
    meaning: "Tôi để cho anh ấy đi rồi.",
    explain: "Cấu trúc câu chữ 让: Chủ ngữ + 让 + Đối tượng + Hành động (我让他走)."
  },
  {
    id: 30,
    type: "fill_position",
    title: "30. Điền 比 (bǐ) vào vị trí thích hợp",
    sentence: "我①他②高③三④厘米。(Wǒ ① tā ② gāo ③ sān ④ límǐ.)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 0, // A. ① => 我比他高三厘米
    correctSentence: "我比他高三厘米。",
    pinyin: "Wǒ bǐ tā gāo sān límǐ.",
    meaning: "Tôi cao hơn anh ấy 3 cm.",
    explain: "Cấu trúc câu so sánh chữ 比: A + 比 + B + Tính từ + Mức độ chênh lệch."
  },
  {
    id: 31,
    type: "choose_correct",
    title: "31. Câu nào đúng ngữ cảnh giao tiếp?",
    sentence: "Chọn đoạn đối thoại tự nhiên, chính xác nhất:",
    options: [
      "A. —— 这是你的吗？—— 可以。",
      "B. —— 我们去看电影，好吗？—— 是的。",
      "C. —— 你喝不喝果汁？—— 嗯，谢谢。",
      "D. —— 你吃完了？—— 可以。"
    ],
    answer: 2, // C: ③ —— 你喝不喝果汁？—— 嗯，谢谢。
    correctSentence: "—— 你喝不喝果汁？—— 嗯，谢谢。",
    pinyin: "— Nǐ hē bu hē guǒzhī? — Ǹg, xièxie.",
    meaning: "— Bạn có uống nước ép không? — Dạ có, cảm ơn bạn.",
    explain: "Khi được mời đồ uống bằng câu hỏi chính phản (喝不喝), câu đáp lịch sự là đồng ý và nói cảm ơn."
  },
  {
    id: 33,
    type: "arrange",
    title: "33. Sắp xếp câu",
    sentence: "冰激凌 吃 你 吃 不 (Bīngjīlíng chī nǐ chī bù)",
    options: [
      "A. 你吃冰激凌不吃？",
      "B. 你不吃冰激凌吃？",
      "C. 你吃不吃冰激凌？",
      "D. 冰激凌你吃不吃？"
    ],
    answer: 2, // C
    correctSentence: "你吃不吃冰激凌？",
    pinyin: "Nǐ chī bu chī bīngjīlíng?",
    meaning: "Bạn có ăn kem không?",
    explain: "Cấu trúc câu hỏi chính phản: Chủ ngữ + Động từ + 不 + Động từ + Tân ngữ (你吃不吃冰激凌)."
  },
  {
    id: 34,
    type: "fill_word",
    title: "34. Điền từ thích hợp",
    sentence: "飞机马上_____起飞了。(Fēijī mǎshàng _____ qǐfēi le.)",
    options: ["A. 要", "B. 快", "C. 快要", "D. 就要"],
    answer: 3, // D. 就要 (hoặc A. 要)
    correctSentence: "飞机马上就要起飞了。",
    pinyin: "Fēijī mǎshàng jiù yào qǐfēi le.",
    meaning: "Máy bay sắp sửa cất cánh ngay rồi.",
    explain: "Cấu trúc: 马上就要 + V + 了 (sắp sửa diễn ra ngay)."
  },
  {
    id: 35,
    type: "fill_word",
    title: "35. Điền từ thích hợp",
    sentence: "中秋节____了，你想吃月饼吗？(Zhōngqiū jié ____ le, nǐ xiǎng chī yuèbǐng ma?)",
    options: ["A. 要", "B. 快", "C. 快要", "D. 就要"],
    answer: 2, // C. 快要 (hoặc B. 快)
    correctSentence: "中秋节快要到了/快要了，你想吃月饼吗？",
    pinyin: "Zhōngqiū jié kuàiyào le, nǐ xiǎng chī yuèbǐng ma?",
    meaning: "Sắp đến Tết Trung thu rồi, bạn có muốn ăn bánh trung thu không?",
    explain: "Cấu trúc: 快 / 快要...了 biểu thị thời điểm sắp tới gần."
  },
  {
    id: 36,
    type: "fill_word",
    title: "36. Điền câu thích hợp",
    sentence: "你在干什么？(Nǐ zài gàn shénme?)",
    options: [
      "A. 我看着电视呢。",
      "B. 正跳着舞。",
      "C. 正在开会。",
      "D. 正唱着歌呢。"
    ],
    answer: 2, // C
    correctSentence: "（我）正在开会。",
    pinyin: "Zhèngzài kāihuì.",
    meaning: "Tôi đang họp.",
    explain: "'正在 + Động từ' là cách trả lời tiêu chuẩn và trực tiếp nhất cho câu hỏi hành động đang diễn ra."
  },

  // --- TRANG 5 ---
  {
    id: 37,
    type: "fill_word",
    title: "37. Điền câu thích hợp",
    sentence: "你在等谁？(Nǐ zài děng shuí?)",
    options: [
      "A. 我正在等着你呢。",
      "B. 我在等小明。",
      "C. 在等着呢。",
      "D. 正等呢。"
    ],
    answer: 1, // B
    correctSentence: "我在等小明。",
    pinyin: "Wǒ zài děng Xiǎomíng.",
    meaning: "Tôi đang đợi Tiểu Minh.",
    explain: "Câu hỏi nhắm vào đối tượng '谁' (ai), câu trả lời phải nêu rõ tên đối tượng được đợi."
  },
  {
    id: 38,
    type: "fill_word",
    title: "38. Điền từ thích hợp (Bổ ngữ kết quả)",
    sentence: "你们都吃____了吗？(Nǐmen dōu chī ____ le ma?)",
    options: ["A. 对", "B. 完", "C. 会", "D. 懂"],
    answer: 1, // B. 完
    correctSentence: "你们都吃完了吗？",
    pinyin: "Nǐmen dōu chī wán le ma?",
    meaning: "Các bạn đều đã ăn xong rồi à?",
    explain: "Bổ ngữ kết quả: 吃完 (ăn xong, hoàn thành bữa ăn)."
  },
  {
    id: 39,
    type: "fill_word",
    title: "39. Điền từ thích hợp (Bổ ngữ kết quả)",
    sentence: "小明，这件衣服没洗______，上面还是脏的。(Xiǎomíng, zhè jiàn yīfu méi xǐ ______, shàngmiàn háishi zāng de.)",
    options: ["A. 完", "B. 好", "C. 了", "D. 干净"],
    answer: 3, // D. 干净
    correctSentence: "小明，这件衣服没洗干净，上面还是脏的。",
    pinyin: "Xiǎomíng, zhè jiàn yīfu méi xǐ gānjìng, shàngmiàn háishi zāng de.",
    meaning: "Tiểu Minh, cái áo này chưa giặt sạch, bên trên vẫn còn bẩn kìa.",
    explain: "Bổ ngữ kết quả chỉ trạng thái: 洗干净 (giặt sạch)."
  },
  {
    id: 40,
    type: "fill_word",
    title: "40. Điền từ thích hợp (Bổ ngữ khả năng)",
    sentence: "那边的那座山你看得____吗？(Nàbiān de nà zuò shān nǐ kàn de ____ ma?)",
    options: ["A. 干净", "B. 下", "C. 完", "D. 见"],
    answer: 3, // D. 见
    correctSentence: "那边的那座山你看得见吗？",
    pinyin: "Nàbiān de nà zuò shān nǐ kàn de jiàn ma?",
    meaning: "Ngọn núi ở đằng kia bạn có nhìn thấy được không?",
    explain: "Bổ ngữ khả năng thị giác: 看得见 (nhìn thấy được) vs 看不见 (không nhìn thấy)."
  },
  {
    id: 41,
    type: "fill_position",
    title: "41. Điền 得 (de) vào vị trí thích hợp",
    sentence: "这首歌①他②唱③不④好。(Zhè shǒu gē ① tā ② chàng ③ bù ④ hǎo.)",
    options: ["A. ①", "B. ②", "C. ③", "D. ④"],
    answer: 2, // C. ③ => 唱得不好
    correctSentence: "这首歌他唱得不好。",
    pinyin: "Zhè shǒu gē tā chàng de bù hǎo.",
    meaning: "Bài hát này anh ấy hát không hay.",
    explain: "Bổ ngữ trạng thái phủ định: Động từ + 得 + 不 + Tính từ (唱得不好)."
  },
  {
    id: 42,
    type: "fill_word",
    title: "42. Hoàn thành hội thoại",
    sentence: "—— 他们怎么样？(Tāmen zěnmeyàng?)\n—— 小明跑得很快，_______________。",
    options: [
      "A. 大卫跑得慢多了。",
      "B. 大卫不跑得慢。",
      "C. 大卫跑得了。",
      "D. 大卫跑不了。"
    ],
    answer: 0, // A
    correctSentence: "大卫跑得慢多了。",
    pinyin: "Dàwèi pǎo de màn duō le.",
    meaning: "David chạy chậm hơn nhiều.",
    explain: "So sánh mức độ bổ ngữ trạng thái: 跑得慢多了 (chạy chậm hơn rất nhiều)."
  },
  {
    id: 43,
    type: "fill_word",
    title: "43. Điền từ thích hợp",
    sentence: "我已经来这里______。(Wǒ yǐjīng lái zhèlǐ ______.)",
    options: ["A. 很快了", "B. 很好", "C. 不怎么样", "D. 三天了"],
    answer: 3, // D. 三天了
    correctSentence: "我已经来这里三天了。",
    pinyin: "Wǒ yǐjīng lái zhèlǐ sān tiān le.",
    meaning: "Tôi đã đến đây được 3 ngày rồi.",
    explain: "Bổ ngữ thời lượng diễn tả khoảng thời gian duy trì hành động: 来这里 + Khoảng thời gian + 了."
  },
  {
    id: 44,
    type: "fill_word",
    title: "44. Hoàn thành hội thoại",
    sentence: "—— 你去过中国吗？(Nǐ qù guò Zhōngguó ma?)",
    options: [
      "A. 我去了中国了。",
      "B. 我去中国。",
      "C. 我去过中国两次。",
      "D. 我想不去。"
    ],
    answer: 2, // C
    correctSentence: "我去过中国两次。",
    pinyin: "Wǒ qù guo Zhōngguó liǎng cì.",
    meaning: "Tôi đã từng đi Trung Quốc hai lần.",
    explain: "Trả lời câu hỏi trải nghiệm '去过...吗': Tôi đã từng đi... (去过... + số lần)."
  }
];

// --- TRANG 6: BÀI DỊCH THỰC HÀNH ---
export const HSK_TRANSLATION_EXERCISES = {
  // Bài 1: Dịch xuôi (Trung -> Việt)
  forward: [
    {
      id: 1,
      chinese: "你会说汉语吗？",
      pinyin: "Nǐ huì shuō Hànyǔ ma?",
      vietnamese: "Bạn biết nói tiếng Trung không?",
      hints: "会 (biết qua học tập), 汉语 (tiếng Trung)",
      grammarPoint: "Trợ động từ '会' chỉ kỹ năng học được."
    },
    {
      id: 2,
      chinese: "我昨天买了一点儿水果。",
      pinyin: "Wǒ zuótiān mǎi le yìdiǎnr shuǐguǒ.",
      vietnamese: "Hôm qua tôi đã mua một ít hoa quả.",
      hints: "昨天 (hôm qua), 一点儿 (một ít), 水果 (hoa quả)",
      grammarPoint: "Động từ + 了 + 一点儿 + Danh từ."
    },
    {
      id: 3,
      chinese: "我们一起去看电影吧。",
      pinyin: "Wǒmen yīqǐ qù kàn diànyǐng ba.",
      vietnamese: "Chúng ta cùng nhau đi xem phim đi.",
      hints: "一起 (cùng nhau), 看电影 (xem phim), 吧 (rủ rê)",
      grammarPoint: "一起 + V... 吧 (rủ cùng làm gì đó)."
    },
    {
      id: 4,
      chinese: "他跑得很快。",
      pinyin: "Tā pǎo de hěn kuài.",
      vietnamese: "Anh ấy chạy rất nhanh.",
      hints: "跑 (chạy), 得 (bổ ngữ trạng thái), 很快 (rất nhanh)",
      grammarPoint: "Bổ ngữ trạng thái: Động từ + 得 + Tính từ."
    },
    {
      id: 5,
      chinese: "我的家离学校很近。",
      pinyin: "Wǒ de jiā lí xuéxiào hěn jìn.",
      vietnamese: "Nhà của tôi cách trường học rất gần.",
      hints: "离 (cách), 学校 (trường học), 近 (gần)",
      grammarPoint: "Cấu trúc khoảng cách: A + 离 + B + Tính từ."
    }
  ],

  // Bài 2: Dịch ngược (Việt -> Trung)
  reverse: [
    {
      id: 1,
      vietnamese: "Tôi thích học tiếng Trung.",
      chinese: "我喜欢学汉语。",
      pinyin: "Wǒ xǐhuan xué Hànyǔ.",
      pinyinAlt: "Wǒ xǐhuan xuéxí Hànyǔ.",
      chineseAlt: "我喜欢学习汉语。",
      hints: "喜欢 (thích), 学 / 学习 (học), 汉语 (tiếng Trung)"
    },
    {
      id: 2,
      vietnamese: "Cô ấy đang đọc sách.",
      chinese: "她正在看书。",
      pinyin: "Tā zhèngzài kàn shū.",
      pinyinAlt: "Tā zài kàn shū.",
      chineseAlt: "她在看书呢。",
      hints: "正在 / 在 (đang), 看书 (đọc sách)"
    },
    {
      id: 3,
      vietnamese: "Hôm nay thời tiết rất nóng.",
      chinese: "今天天气很热。",
      pinyin: "Jīntiān tiānqì hěn rè.",
      pinyinAlt: "Jīntiān tiānqì fēicháng rè.",
      chineseAlt: "今天天气非常热。",
      hints: "今天 (hôm nay), 天气 (thời tiết), 热 (nóng)"
    },
    {
      id: 4,
      vietnamese: "Tôi muốn mua một cốc trà sữa.",
      chinese: "我想买一杯奶茶。",
      pinyin: "Wǒ xiǎng mǎi yì bēi nǎichá.",
      pinyinAlt: "Wǒ yào mǎi yì bēi nǎichá.",
      chineseAlt: "我要买一杯奶茶。",
      hints: "想 (muốn), 杯 (cốc - lượng từ), 奶茶 (trà sữa)"
    },
    {
      id: 5,
      vietnamese: "Chúng ta đi siêu thị trước, sau đó ăn cơm.",
      chinese: "我们先去超市，然后吃饭。",
      pinyin: "Wǒmen xiān qù chāoshì, ránhòu chī fàn.",
      pinyinAlt: "Wǒmen xiān qù chāoshì, zài chī fàn.",
      chineseAlt: "我们先去超市，再吃饭。",
      hints: "先...然后... (trước... sau đó...), 超市 (siêu thị), 吃饭 (ăn cơm)"
    }
  ]
};
