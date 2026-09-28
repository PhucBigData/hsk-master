/**
 * Trọn bộ 17 Chủ điểm Ngữ pháp HSK 2 tổng hợp chính xác từ tài liệu PDF của học viên
 * Kèm ví dụ, Pinyin, Dịch nghĩa tiếng Việt, Audio phát âm và bài tập kiểm tra phản xạ
 */

export const HSK2_GRAMMAR = [
  {
    id: 1,
    title: "1. Đại từ nhân xưng mở rộng",
    category: "Đại từ",
    summary: "Ngoài bộ đại từ HSK 1 (我, 你, 我们, 你们, 他, 她, 他们, 她们), HSK 2 bổ sung các đại từ thông dụng sau:",
    formula: "大家 (Mọi người) | 您 (Ngài - kính trọng) | 它 (Nó - con vật/đồ vật) | 它们 (Chúng nó)",
    details: [
      {
        word: "大家",
        pinyin: "dàjiā",
        meaning: "Mọi người",
        exampleZh: "大家好，我是小王。",
        examplePy: "Dàjiā hǎo, wǒ shì Xiǎo Wáng.",
        exampleVi: "Xin chào mọi người, tôi là Tiểu Vương."
      },
      {
        word: "您",
        pinyin: "nín",
        meaning: "Ngài (kính trọng người lớn tuổi, thầy cô, đối tác)",
        exampleZh: "老师，您好！",
        examplePy: "Lǎoshī, nín hǎo!",
        exampleVi: "Chào thầy/cô ạ!"
      },
      {
        word: "它",
        pinyin: "tā",
        meaning: "Nó (đồ vật, con vật)",
        exampleZh: "它是猫，很可爱。",
        examplePy: "Tā shì māo, hěn kě'ài.",
        exampleVi: "Nó là con mèo, rất dễ thương."
      },
      {
        word: "它们",
        pinyin: "tāmen",
        meaning: "Chúng nó (số nhiều)",
        exampleZh: "它们都是猫。",
        examplePy: "Tāmen dōu shì māo.",
        exampleVi: "Chúng nó đều là mèo."
      }
    ],
    quiz: {
      question: "Để chào người lớn tuổi hoặc đối tác một cách trang trọng, ta dùng câu nào?",
      options: ["你好", "您好", "大家好", "它好"],
      answer: 1,
      explain: "Dùng đại từ '您' (nín) để thể hiện sự lễ phép, kính trọng."
    }
  },
  {
    id: 2,
    title: "2. Đại từ chỉ thị & '每' (Mỗi)",
    category: "Đại từ",
    summary: "Chỉ vị trí gần / xa người nói và dùng từ '每' để chỉ tần suất.",
    formula: "这 (gần) - 那 (xa) | 这儿 (ở đây) - 那儿 (ở kia) | 每 + Lượng từ + Danh từ",
    details: [
      {
        word: "这",
        pinyin: "zhè",
        meaning: "Cái này, đây (chỉ gần)",
        exampleZh: "这是我的书。",
        examplePy: "Zhè shì wǒ de shū.",
        exampleVi: "Đây là sách của tôi."
      },
      {
        word: "那",
        pinyin: "nà",
        meaning: "Cái kia, đó (chỉ xa)",
        exampleZh: "那是老师的电脑。",
        examplePy: "Nà shì lǎoshī de diànnǎo.",
        exampleVi: "Kia là máy tính của thầy giáo."
      },
      {
        word: "这儿 / 那儿",
        pinyin: "zhèr / nàr",
        meaning: "Ở đây / Ở kia",
        exampleZh: "我在这儿，他在那儿。",
        examplePy: "Wǒ zài zhèr, tā zài nàr.",
        exampleVi: "Tôi ở đây, anh ấy ở kia."
      },
      {
        word: "每",
        pinyin: "měi",
        meaning: "Mỗi (chỉ sự lặp lại đều đặn)",
        exampleZh: "他每天 5 点起床。",
        examplePy: "Tā měitiān 5 diǎn qǐchuáng.",
        exampleVi: "Mỗi ngày anh ấy thức dậy lúc 5 giờ."
      }
    ],
    quiz: {
      question: "Chọn câu đúng để nói: 'Mỗi buổi sáng tôi đều uống trà.'",
      options: ["我这早上喝茶。", "我每早上喝茶。", "我每天早上都喝茶。", "我哪儿早上喝茶。"],
      answer: 2,
      explain: "Cấu trúc thường dùng: 每 + Danh từ thời gian + 都..."
    }
  },
  {
    id: 3,
    title: "3. Bộ đại từ nghi vấn HSK 1 & HSK 2",
    category: "Nghi vấn",
    summary: "Hệ thống từ để hỏi căn bản nhất để giao tiếp và đặt câu hỏi phản xạ.",
    formula: "谁 (ai) | 什么 (cái gì) | 哪 (nào) | 哪儿 (ở đâu) | 多少 (bao nhiêu) | 几 (mấy < 10) | 怎么 (thế nào) | 为 (vì sao/vì cái gì)",
    details: [
      {
        word: "谁",
        pinyin: "shéi",
        meaning: "Ai",
        exampleZh: "他是谁？",
        examplePy: "Tā shì shéi?",
        exampleVi: "Anh ấy là ai?"
      },
      {
        word: "什么",
        pinyin: "shénme",
        meaning: "Cái gì",
        exampleZh: "你在做什么？",
        examplePy: "Nǐ zài zuò shénme?",
        exampleVi: "Bạn đang làm gì thế?"
      },
      {
        word: "哪 / 哪儿",
        pinyin: "nǎ / nǎr",
        meaning: "Nào / Ở đâu",
        exampleZh: "你喜欢哪本书？你去哪儿？",
        examplePy: "Nǐ xǐhuan nǎ běn shū? Nǐ qù nǎr?",
        exampleVi: "Bạn thích quyển sách nào? Bạn đi đâu?"
      },
      {
        word: "多少 vs 几",
        pinyin: "duōshao vs jǐ",
        meaning: "Bao nhiêu (số lớn/không rõ) vs Mấy (số nhỏ < 10)",
        exampleZh: "这个多少钱？你有几个朋友？",
        examplePy: "Zhè ge duōshao qián? Nǐ yǒu jǐ ge péngyou?",
        exampleVi: "Cái này bao nhiêu tiền? Bạn có mấy người bạn?"
      },
      {
        word: "怎么 vs 怎么样",
        pinyin: "zěnme vs zěnmeyàng",
        meaning: "Làm thế nào (phương thức) vs Như thế nào (tính chất/trạng thái)",
        exampleZh: "你怎么去学校？今天天气怎么样？",
        examplePy: "Nǐ zěnme qù xuéxiào? Jīntiān tiānqì zěnmeyàng?",
        exampleVi: "Bạn đi học bằng cách nào? Thời tiết hôm nay ra sao?"
      },
      {
        word: "为",
        pinyin: "wèi",
        meaning: "Vì cái gì, vì ai",
        exampleZh: "为你们的幸福干杯！",
        examplePy: "Wèi nǐmen de xìngfú gānbēi!",
        exampleVi: "Cạn ly vì hạnh phúc của các bạn!"
      }
    ],
    quiz: {
      question: "Hỏi giá tiền một món đồ: 'Cái áo này bao nhiêu tiền?' dùng từ nghi vấn nào?",
      options: ["几", "怎么", "多少", "什么"],
      answer: 2,
      explain: "Hỏi giá tiền dùng '多少钱' (duōshao qián)."
    }
  },
  {
    id: 4,
    title: "4. Chữ số thứ tự & Lượng từ",
    category: "Số từ - Lượng từ",
    summary: "Biểu thị số thứ tự, trọng lượng và cách dùng lượng từ đặc biệt.",
    formula: "第 + Số đếm (Số thứ tự) | Số từ + 公斤 (Trọng lượng) | 等一下 | 每次",
    details: [
      {
        word: "第 + Số đếm",
        pinyin: "dì + số",
        meaning: "Thứ nhất, thứ hai, thứ ba...",
        exampleZh: "第一、第二、第三。",
        examplePy: "Dì-yī, dì-èr, dì-sān.",
        exampleVi: "Thứ nhất, thứ 2, thứ 3."
      },
      {
        word: "公斤",
        pinyin: "gōngjīn",
        meaning: "Kilôgam (kg)",
        exampleZh: "这块西瓜 3 公斤。",
        examplePy: "Zhè kuài xīguā 3 gōngjīn.",
        exampleVi: "Miếng dưa hấu này nặng 3 kg."
      },
      {
        word: "一下 / 次",
        pinyin: "yīxià / cì",
        meaning: "Một chút, một lát / Lần",
        exampleZh: "请等一下。每次去中国我都买茶。",
        examplePy: "Qǐng děng yīxià. Měi cì qù Zhōngguó wǒ dōu mǎi chá.",
        exampleVi: "Xin đợi một chút. Mỗi lần đi Trung Quốc tôi đều mua trà."
      }
    ],
    quiz: {
      question: "'Người đứng thứ nhất' nói thế nào trong tiếng Trung?",
      options: ["一个人", "第一个人", "次一个人", "每一个人"],
      answer: 1,
      explain: "Dùng '第' + số đếm để tạo số thứ tự: 第一个 (thứ nhất)."
    }
  },
  {
    id: 5,
    title: "5. Toàn tập Phó từ HSK 2",
    category: "Phó từ",
    summary: "Hệ thống phó từ phong phú diễn đạt phủ định, mức độ, thời gian, ngữ khí và tần suất.",
    formula: "别 (Đừng) | 非常 / 最 (Vô cùng / Nhất) | 正在 (Đang) | 已经 (Đã) | 就 (Sớm/Liền) | 也 / 还 / 真 | 再 (Lại)",
    details: [
      {
        word: "别",
        pinyin: "bié",
        meaning: "Đừng (khuyên ngăn/cấm đoán)",
        exampleZh: "你别出去，外面下雨呢。",
        examplePy: "Nǐ bié chūqù, wàimiàn xiàyǔ ne.",
        exampleVi: "Bạn đừng ra ngoài, bên ngoài đang mưa đấy."
      },
      {
        word: "非常 / 最",
        pinyin: "fēicháng / zuì",
        meaning: "Vô cùng / Nhất",
        exampleZh: "这条裙子非常好看。我最喜欢吃饺子。",
        examplePy: "Zhè tiáo qúnzi fēicháng hǎokàn. Wǒ zuì xǐhuan chī jiǎozi.",
        exampleVi: "Chiếc váy này vô cùng đẹp. Tôi thích ăn sủi cảo nhất."
      },
      {
        word: "正在",
        pinyin: "zhèngzài",
        meaning: "Đang diễn ra (nhấn mạnh quá trình)",
        exampleZh: "我正在写汉字。",
        examplePy: "Wǒ zhèngzài xiě hànzì.",
        exampleVi: "Tôi đang viết chữ Hán."
      },
      {
        word: "已经",
        pinyin: "yǐjīng",
        meaning: "Đã (hành động đã xảy ra xong)",
        exampleZh: "他已经回家了。",
        examplePy: "Tā yǐjīng huíjiā le.",
        exampleVi: "Anh ấy đã về nhà rồi."
      },
      {
        word: "就",
        pinyin: "jiù",
        meaning: "Liền, ngay, sớm (sự việc nối tiếp hoặc sớm hơn dự định)",
        exampleZh: "我 7 点就上学了。",
        examplePy: "Wǒ 7 diǎn jiù shàngxué le.",
        exampleVi: "Mới 7 giờ là tôi đã đi học rồi."
      },
      {
        word: "也 / 还 / 真",
        pinyin: "yě / hái / zhēn",
        meaning: "Cũng / Vẫn còn / Thật là",
        exampleZh: "我也有一本书。他还没吃完。小美真漂亮！",
        examplePy: "Wǒ yě yǒu yī běn shū. Tā hái méi chī wán. Xiǎoměi zhēn piàoliang!",
        exampleVi: "Tôi cũng có 1 quyển sách. Anh ấy vẫn chưa ăn xong. Tiểu Mỹ thật xinh đẹp!"
      },
      {
        word: "再",
        pinyin: "zài",
        meaning: "Lại (lặp lại hành động trong tương lai)",
        exampleZh: "我明天再来。",
        examplePy: "Wǒ míngtiān zài lái.",
        exampleVi: "Ngày mai tôi lại đến."
      }
    ],
    quiz: {
      question: "Điền vào chỗ trống: '我 ____ 在写汉字，请别说话。'",
      options: ["已经", "正", "真", "最"],
      answer: 1,
      explain: "'正在' hoặc '正' diễn tả hành động đang diễn ra."
    }
  },
  {
    id: 6,
    title: "6. Liên từ: '因为...所以...' & '但是'",
    category: "Liên từ",
    summary: "Nối các vế câu diễn tả nguyên nhân - kết quả và quan hệ tương phản đối lập.",
    formula: "因为 + Nguyên nhân, 所以 + Kết quả | ... 但是 + Ý đối lập",
    details: [
      {
        word: "因为...所以...",
        pinyin: "yīnwèi... suǒyǐ...",
        meaning: "Bởi vì... cho nên...",
        exampleZh: "因为雨很大，所以我们不能去公园跑步。",
        examplePy: "Yīnwèi yǔ hěn dà, suǒyǐ wǒmen bù néng qù gōngyuán pǎobù.",
        exampleVi: "Bởi vì mưa rất to nên chúng tôi không thể đến công viên chạy bộ."
      },
      {
        word: "但是",
        pinyin: "dànshì",
        meaning: "Nhưng, nhưng mà",
        exampleZh: "他 70 岁了，但是身体很好。",
        examplePy: "Tā 70 suì le, dànshì shēntǐ hěn hǎo.",
        exampleVi: "Ông ấy đã 70 tuổi rồi nhưng sức khỏe vẫn rất tốt."
      }
    ],
    quiz: {
      question: "Chọn từ điền vào vế sau: '虽然汉语很难，____ 很有意思。'",
      options: ["因为", "所以", "但是", "一起"],
      answer: 2,
      explain: "'但是' biểu thị ý tương phản (tuy khó nhưng rất thú vị)."
    }
  },
  {
    id: 7,
    title: "7. Bộ Giới từ HSK 2 (从, 对, 比, 向, 离)",
    category: "Giới từ",
    summary: "Biểu thị điểm xuất phát, đối tượng tác động, so sánh, phương hướng và khoảng cách.",
    formula: "从 A 到 B | A 对 B + Tính từ/Động từ | A 比 B + Tính từ | 向 + Đối tượng | A 离 B + Khoảng cách",
    details: [
      {
        word: "从...到...",
        pinyin: "cóng... dào...",
        meaning: "Từ... đến... (không gian hoặc thời gian)",
        exampleZh: "从这里到公园还有 2 公里。",
        examplePy: "Cóng zhèlǐ dào gōngyuán hái yǒu 2 gōnglǐ.",
        exampleVi: "Từ đây đến công viên còn 2 km."
      },
      {
        word: "对",
        pinyin: "duì",
        meaning: "Đối với (ảnh hưởng/thái độ tới đối tượng)",
        exampleZh: "经常锻炼对身体很好。",
        examplePy: "Jīngcháng duànliàn duì shēntǐ hěn hǎo.",
        exampleVi: "Thường xuyên tập thể dục rất tốt cho sức khỏe."
      },
      {
        word: "比",
        pinyin: "bǐ",
        meaning: "So với (câu so sánh hơn)",
        exampleZh: "我比他高。",
        examplePy: "Wǒ bǐ tā gāo.",
        exampleVi: "Tôi cao hơn anh ấy."
      },
      {
        word: "向",
        pinyin: "xiàng",
        meaning: "Hướng về, với (chỉ hướng động tác)",
        exampleZh: "小王向老师感谢。",
        examplePy: "Xiǎo Wáng xiàng lǎoshī gǎnxiè.",
        exampleVi: "Tiểu Vương bày tỏ lòng cảm ơn tới thầy giáo."
      },
      {
        word: "离",
        pinyin: "lí",
        meaning: "Cách... (khoảng cách cự ly)",
        exampleZh: "学校离我家很远。",
        examplePy: "Xuéxiào lí wǒ jiā hěn yuǎn.",
        exampleVi: "Trường học cách nhà tôi rất xa."
      }
    ],
    quiz: {
      question: "Câu nào diễn tả đúng: 'Nhà tôi cách công ty không xa'?",
      options: ["我家从公司不远。", "我家离公司不远。", "我向公司不远。", "我对公司不远。"],
      answer: 1,
      explain: "Biểu thị khoảng cách giữa hai địa điểm dùng '离' (lí)."
    }
  },
  {
    id: 8,
    title: "8. Trợ động từ: 可以, 要, 可能",
    category: "Động từ năng nguyện",
    summary: "Biểu thị khả năng, sự cho phép, ý muốn hoặc dự đoán xác suất.",
    formula: "可以 (Có thể - được phép) | 要 (Phải / Muốn / Sắp) | 可能 (Có khả năng / Có lẽ)",
    details: [
      {
        word: "可以",
        pinyin: "kěyǐ",
        meaning: "Có thể (cho phép hoặc đủ điều kiện)",
        exampleZh: "等我做完就可以吃了。",
        examplePy: "Děng wǒ zuò wán jiù kěyǐ chī le.",
        exampleVi: "Đợi tôi nấu xong là có thể ăn rồi."
      },
      {
        word: "要",
        pinyin: "yào",
        meaning: "Cần phải / Muốn làm",
        exampleZh: "我要走了，明天见。",
        examplePy: "Wǒ yào zǒu le, míngtiān jiàn.",
        exampleVi: "Tôi phải đi rồi, mai gặp nhé."
      },
      {
        word: "可能",
        pinyin: "kěnéng",
        meaning: "Có khả năng, có lẽ (ước lượng)",
        exampleZh: "明天可能风大。",
        examplePy: "Míngtiān kěnéng fēng dà.",
        exampleVi: "Ngày mai có thể gió lớn."
      }
    ],
    quiz: {
      question: "Khi xin phép người khác: 'Tôi có thể ngồi ở đây không?', ta dùng từ nào?",
      options: ["要", "可以", "可能", "得"],
      answer: 1,
      explain: "Xin phép hoặc hỏi sự đồng ý dùng '可以' (kěyǐ): 我可以坐这儿吗？"
    }
  },
  {
    id: 9,
    title: "9. Trợ từ: 得, 吧, 着, 过",
    category: "Trợ từ",
    summary: "Các trợ từ trọng yếu bậc nhất HSK 2: bổ ngữ trạng thái, ngữ khí thúc giục, tiếp diễn và trải nghiệm quá khứ.",
    formula: "Động từ + 得 + Tính từ | Câu + 吧 | Động từ + 着 | Động từ + 过",
    details: [
      {
        word: "得 (Bổ ngữ trạng thái)",
        pinyin: "de",
        meaning: "Đánh giá, nhận xét kết quả hành động",
        exampleZh: "你做得非常好！",
        examplePy: "Nǐ zuò de fēicháng hǎo!",
        exampleVi: "Bạn làm cực kỳ tốt!"
      },
      {
        word: "吧 (Trợ từ ngữ khí)",
        pinyin: "ba",
        meaning: "Yêu cầu, rủ rê, thương lượng nhẹ nhàng",
        exampleZh: "快睡觉吧。",
        examplePy: "Kuài shuìjiào ba.",
        exampleVi: "Mau đi ngủ đi nào."
      },
      {
        word: "着 (Trợ từ động thái)",
        pinyin: "zhe",
        meaning: "Biểu thị sự tiếp diễn của động tác hoặc duy trì trạng thái",
        exampleZh: "他在学校门口站着。",
        examplePy: "Tā zài xuéxiào ménkǒu zhàn zhe.",
        exampleVi: "Anh ấy đang đứng ở cổng trường."
      },
      {
        word: "过 (Trợ từ động thái)",
        pinyin: "guò",
        meaning: "Đã từng (trải nghiệm trong quá khứ nay không còn tiếp diễn)",
        exampleZh: "我来过中国。",
        examplePy: "Wǒ lái guo Zhōngguó.",
        exampleVi: "Tôi từng đến Trung Quốc rồi."
      }
    ],
    quiz: {
      question: "Câu nào nói đúng để khen bạn mình: 'Cậu nói tiếng Trung rất lưu loát'?",
      options: ["你说中国话好。", "你说汉语说得很好。", "你说的汉语很好吧。", "你说汉语过很好。"],
      answer: 1,
      explain: "Cấu trúc bổ ngữ trạng thái: Động từ + Tân ngữ + Động từ + 得 + Tính từ."
    }
  },
  {
    id: 10,
    title: "10. Động từ trùng điệp (Lặp lại động từ)",
    category: "Động từ",
    summary: "Dùng để biểu thị hành động diễn ra trong thời gian ngắn, thử làm hoặc làm cho ngữ khí nhẹ nhàng, thân mật.",
    formula: "A 一 A (试一试) | AB-AB (学习学习) | AAB (唱唱歌)",
    details: [
      {
        word: "A 一 A",
        pinyin: "A yī A",
        meaning: "Thử làm một chút (động từ đơn âm)",
        exampleZh: "这件衣服，你试一试吧。",
        examplePy: "Zhè jiàn yīfu, nǐ shì yi shì ba.",
        exampleVi: "Chiếc áo này, bạn mặc thử một chút xem."
      },
      {
        word: "AB-AB",
        pinyin: "ABAB",
        meaning: "Lặp lại động từ song âm tiết",
        exampleZh: "周末我们去图书馆学习学习。",
        examplePy: "Zhōumò wǒmen qù túshūguǎn xuéxí xuéxí.",
        exampleVi: "Cuối tuần chúng mình đi thư viện học tập nhé."
      },
      {
        word: "AAB",
        pinyin: "AAB",
        meaning: "Động từ li hợp lặp lại",
        exampleZh: "休息的时候，大家唱唱歌、跳跳舞。",
        examplePy: "Xiūxi de shíhou, dàjiā chàng chàng gē, tiào tiào wǔ.",
        exampleVi: "Lúc nghỉ ngơi, mọi người cùng nhau ca hát, nhảy múa."
      }
    ],
    quiz: {
      question: "Động từ li hợp '散步' (đi dạo) khi lặp lại sẽ thành dạng nào?",
      options: ["散步散步", "散散步", "散一步", "散步步"],
      answer: 1,
      explain: "Động từ li hợp (Động từ + Tân ngữ) lặp lại theo quy tắc AAB: 散散步."
    }
  },
  {
    id: 11,
    title: "11. Câu hỏi phỏng đoán '吧' & Câu hỏi chính phản",
    category: "Mẫu câu hỏi",
    summary: "Hỏi khi đã có phỏng đoán 70-80% hoặc dùng hình thức Khẳng định + Phủ định.",
    formula: "Mệnh đề + 吧？| Động từ + 不 + Động từ？| ...好吗？",
    details: [
      {
        word: "吧？(Phỏng đoán)",
        pinyin: "ba?",
        meaning: "Phải không, đúng chứ? (đã đoán trước nhưng hỏi để xác nhận)",
        exampleZh: "你是越南人吧？",
        examplePy: "Nǐ shì Yuènán rén ba?",
        exampleVi: "Bạn là người Việt Nam phải không?"
      },
      {
        word: "Câu hỏi chính phản",
        pinyin: "V + bù + V",
        meaning: "Có... hay không?",
        exampleZh: "你吃不吃包子？/ 你去不去？",
        examplePy: "Nǐ chī bu chī bāozi? / Nǐ qù bu qù?",
        exampleVi: "Bạn có ăn bánh bao không? / Bạn có đi không?"
      },
      {
        word: "好吗？",
        pinyin: "hǎo ma?",
        meaning: "Được không? (trưng cầu ý kiến đối phương)",
        exampleZh: "明天 8 点见，好吗？",
        examplePy: "Míngtiān 8 diǎn jiàn, hǎo ma?",
        exampleVi: "8 giờ ngày mai gặp nhau, được không?"
      }
    ],
    quiz: {
      question: "Câu nào dưới đây là câu hỏi chính phản chuẩn xác?",
      options: ["你看不看电影？", "你看电影吗？", "你看电影吧？", "你看什么电影？"],
      answer: 0,
      explain: "Cấu trúc chính phản là [Động từ + 不 + Động từ]: 看不看."
    }
  },
  {
    id: 12,
    title: "12. Câu cầu khiến '不要' & Câu cảm thán '真'",
    category: "Mẫu câu giao tiếp",
    summary: "Khuyên nhủ, yêu cầu lịch sự và bộc lộ cảm xúc khen ngợi trực tiếp.",
    formula: "不要 + Động từ (Đừng/Không được...) | 真 + Tính từ / Tâm lý (Thật là...)",
    details: [
      {
        word: "不要",
        pinyin: "bùyào",
        meaning: "Đừng, không nên (khuyên nhủ chân thành)",
        exampleZh: "晚上不要吃太多。",
        examplePy: "Wǎnshang bùyào chī tài duō.",
        exampleVi: "Buổi tối đừng ăn quá nhiều nhé."
      },
      {
        word: "真",
        pinyin: "zhēn",
        meaning: "Thật là, quả là (cảm thán)",
        exampleZh: "这道中国菜真好吃！",
        examplePy: "Zhè dào Zhōngguó cài zhēn hǎochī!",
        exampleVi: "Món ăn Trung Quốc này thật là ngon!"
      }
    ],
    quiz: {
      question: "Khi muốn khuyên ai đó đừng thức khuya, ta nói:",
      options: ["别不睡觉。", "不要睡太晚。", "真睡太晚。", "已经睡太晚。"],
      answer: 1,
      explain: "Dùng '不要' để khuyên nhủ: 不要睡太晚 (đừng ngủ quá muộn)."
    }
  },
  {
    id: 13,
    title: "13. Các Cấu trúc đặc biệt HSK 2 (So sánh 比, 要...了, 着)",
    category: "Cấu trúc đặc biệt",
    summary: "3 mẫu câu kinh điển xuất hiện dày đặc trong đề thi HSK 2 và HSK 3.",
    formula: "A 比 B + Tính từ (So sánh) | 快要/要...了 (Sắp... rồi) | V + 着 (Tiếp diễn)",
    details: [
      {
        word: "Câu so sánh: 比",
        pinyin: "A bǐ B + Adj",
        meaning: "A hơn B về mặt nào đó",
        exampleZh: "他比我大，今天比昨天冷。",
        examplePy: "Tā bǐ wǒ dà, jīntiān bǐ zuótiān lěng.",
        exampleVi: "Anh ấy lớn tuổi hơn tôi. Hôm nay lạnh hơn hôm qua."
      },
      {
        word: "Sắp xảy ra: 要...了",
        pinyin: "yào... le",
        meaning: "Sắp sửa... rồi (chuẩn bị diễn ra ngay)",
        exampleZh: "飞机要起飞了，请系好安全带。",
        examplePy: "Fēijī yào qǐfēi le, qǐng jì hǎo ānquándài.",
        exampleVi: "Máy bay sắp cất cánh rồi, xin thắt chặt dây an toàn."
      },
      {
        word: "Trạng thái tiếp diễn: 着",
        pinyin: "zhe",
        meaning: "Đang duy trì trạng thái hoặc đi kèm hành động",
        exampleZh: "外面下着雨，大家坐在屋里听着音乐。",
        examplePy: "Wàimiàn xià zhe yǔ, dàjiā zuò zài wū lǐ tīng zhe yīnyuè.",
        exampleVi: "Bên ngoài trời đang mưa, mọi người ngồi trong phòng nghe nhạc."
      }
    ],
    quiz: {
      question: "Nói câu: 'Táo đắt hơn dưa hấu' trong tiếng Trung:",
      options: ["苹果离西瓜贵。", "苹果对西瓜贵。", "苹果比西瓜贵。", "苹果向西瓜贵。"],
      answer: 2,
      explain: "Câu so sánh hơn dùng chữ '比': A 比 B + Tính từ."
    }
  }
];
