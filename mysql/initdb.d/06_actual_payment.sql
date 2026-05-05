CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    item_id INT, -- 현금 입출금일 경우 NULL, 자산 매매일 경우 해당 ID
    type ENUM('DEPOSIT', 'WITHDRAWAL', 'BUY', 'SELL', 'INTEREST', 'DIVIDEND', 'FEE') NOT NULL,
    amount DECIMAL(18, 4) NOT NULL, -- 거래 금액 (현금 기준)
    quantity DECIMAL(18, 8) DEFAULT 0, -- 매수/매도한 수량 (주식, 코인 등)
    price_per_unit DECIMAL(18, 8), -- 당시 단가
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE item_position (
    project_id INT NOT NULL,
    item_id INT NOT NULL,
    
    total_quantity DECIMAL(18, 8) DEFAULT 0, -- 현재 보유 수량
    average_price DECIMAL(18, 8) DEFAULT 0,  -- 평균 매입 단가 (수익률 계산용)
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (project_id, item_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE item_price_history (
    item_id INT NOT NULL,
    price DECIMAL(18, 8) NOT NULL,
    recorded_date DATE NOT NULL,
    PRIMARY KEY (item_id, recorded_date),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE project_item_snapshots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    item_id INT NOT NULL,
    category_id INT NOT NULL, -- 카테고리별 통계를 위해 추가

    evaluation_amount BIGINT NOT NULL, -- 해당 자산의 평가 금액 (수량 * 현재가)
    invested_amount BIGINT NOT NULL,   -- 해당 자산에 들어간 원금
    recorded_date DATE NOT NULL,

    UNIQUE (project_id, item_id, recorded_date),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id, category_id) REFERENCES items(id, category_id)
);
