CREATE TABLE survey_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL,
    order_no TINYINT NOT NULL
);

CREATE TABLE survey_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    answer_text VARCHAR(255) NOT NULL,
    order_no TINYINT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES survey_questions(id)
);

INSERT INTO survey_questions (question_text, order_no) VALUES
    ('귀하의 투자 목적은 무엇입니까?', 1),
    ('투자 자금을 얼마나 오랜 기간 운용할 수 있습니까?', 2),
    ('금융자산 중 투자 자산이 차지하는 비중은?', 3),
    ('귀하의 소득 상태는 어떠합니까?', 4),
    ('투자 경험이 있는 상품은 무엇입니까?', 5),
    ('금융 투자 상품에 대한 이해 수준은?', 6),
    ('투자금이 10% 손실이 발생할 경우 귀하의 대응은?', 7),
    ('최대 어느 정도 손실까지 감내 가능합니까?', 8),
    ('투자 수익의 변동성에 대한 생각은?', 9),
    ('다음 중 본인과 가장 가까운 설명은?', 10);

INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (1, '원금 보전이 가장 중요', 1),
    (1, '원금 보전 + 소폭 수익', 2),
    (1, '자산의 중장기적 성장', 3),
    (1, '높은 수익 추구 (원금 손실 감수)', 4);
INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (2, '1년 미만', 1),
    (2, '1년 이상 ~ 3년 미만', 2),
    (2, '3년 이상 ~ 5년 미만', 3),
    (2, '5년 이상', 4);
INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (3, '10% 미만', 1),
    (3, '10% 이상 ~ 30% 미만', 2),
    (3, '30% 이상 ~ 50% 미만', 3),
    (3, '50% 이상', 4);
INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (4, '소득이 없거나 매우 불안정', 1),
    (4, '일정한 소득 있으나 여유 없음', 2),
    (4, '안정적 소득과 일부 여유 자금', 3),
    (4, '매우 안정적이며 여유 자금 충분', 4);
INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (5, '예·적금, CMA', 1),
    (5, '채권형 펀드, MMF', 2),
    (5, '주식형 펀드, ETF, 주식', 3),
    (5, '파생상품, ELW, 가상자산 등', 4);
INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (6, '거의 없음', 1),
    (6, '기본 구조는 이해', 2),
    (6, '위험·수익 구조 이해', 3),
    (6, '상품 구조와 리스크를 충분히 이해', 4);
INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (7, '즉시 전량 매도', 1),
    (7, '일부 매도', 2),
    (7, '보유 유지', 3),
    (7, '추가 투자 고려', 4);
INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (8, '5% 이내', 1),
    (8, '10% 이내', 2),
    (8, '20% 이내', 3),
    (8, '20% 초과 가능', 4);
INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (9, '변동성이 매우 싫다', 1),
    (9, '낮은 변동성 선호', 2),
    (9, '일정 변동성 감내 가능', 3),
    (9, '변동성이 커도 무관', 4);
INSERT INTO survey_answers (question_id, answer_text, order_no) VALUES
    (10, '안정적 수익만을 추구', 1),
    (10, '안정성과 수익의 균형', 2),
    (10, '수익 중심, 위험 일부 감수', 3),
    (10, '수익 최우선, 위험 적극 감수', 4);
