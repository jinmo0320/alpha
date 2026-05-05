CREATE TABLE plans (
    id INT AUTO_INCREMENT PRIMARY KEY,

    initial_amount BIGINT,
    monthly_amount INT,
    start_date DATE,
    payment_day TINYINT,
    period INT,
    expected_return DECIMAL(5,4),
    target_amount BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE project_plans (
    project_id INT NOT NULL,
    plan_id INT NOT NULL UNIQUE,
    version INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,

    PRIMARY KEY (project_id, plan_id),
    UNIQUE (project_id, version),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);
